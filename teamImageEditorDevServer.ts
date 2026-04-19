import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Readable } from 'node:stream';
import sharp from 'sharp';
import ts from 'typescript';
import type { Plugin } from 'vite';

export type TeamDevImageKind = 'memberPortrait' | 'departmentHeader';
export type TeamImageSaveTargetKind =
  | 'existing-asset'
  | 'new-member-asset'
  | 'new-header-asset';
export type SharpOutputFormat = 'jpeg' | 'png' | 'webp';

export type TeamImageAssetReferenceInput = {
  kind: TeamDevImageKind;
  departmentName: string;
  memberName?: string;
  importIdentifier: string;
  assetImportPath: string;
  assetRelativePath: string;
};

export type TeamImageSaveRequestPayload = TeamImageAssetReferenceInput & {
  targetId: string;
  assetDisplayPath: string;
  assetFileName: string;
  outputFormat: SharpOutputFormat;
  saveTargetKind: TeamImageSaveTargetKind;
};

const DEV_ROUTE_PATH = '/__dev/team-image-editor/save';
const TEAM_PAGE_RELATIVE_PATH =
  'src/features/marketing/team/pages/TeamPage.tsx';

const isString = (value: unknown): value is string => typeof value === 'string';

const getObjectProperty = (node: ts.ObjectLiteralExpression, name: string) =>
  node.properties.find(
    (property): property is ts.PropertyAssignment =>
      ts.isPropertyAssignment(property) &&
      ts.isIdentifier(property.name) &&
      property.name.text === name
  );

const getStringPropertyValue = (
  node: ts.ObjectLiteralExpression,
  name: string
): string | null => {
  const property = getObjectProperty(node, name);

  if (!property) {
    return null;
  }

  if (
    ts.isStringLiteral(property.initializer) ||
    ts.isNoSubstitutionTemplateLiteral(property.initializer)
  ) {
    return property.initializer.text;
  }

  return null;
};

const getArrayPropertyValue = (
  node: ts.ObjectLiteralExpression,
  name: string
): ts.ArrayLiteralExpression | null => {
  const property = getObjectProperty(node, name);

  if (!property || !ts.isArrayLiteralExpression(property.initializer)) {
    return null;
  }

  return property.initializer;
};

const getTeamDepartmentsArray = (sourceFile: ts.SourceFile) => {
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) {
      continue;
    }

    for (const declaration of statement.declarationList.declarations) {
      if (
        ts.isIdentifier(declaration.name) &&
        declaration.name.text === 'TEAM_DEPARTMENTS' &&
        declaration.initializer &&
        ts.isArrayLiteralExpression(declaration.initializer)
      ) {
        return declaration.initializer;
      }
    }
  }

  throw new Error('Unable to find TEAM_DEPARTMENTS in TeamPage.tsx');
};

const findDepartmentNode = (
  sourceFile: ts.SourceFile,
  departmentName: string
) => {
  const departmentsArray = getTeamDepartmentsArray(sourceFile);

  for (const element of departmentsArray.elements) {
    if (!ts.isObjectLiteralExpression(element)) {
      continue;
    }

    if (getStringPropertyValue(element, 'department') === departmentName) {
      return element;
    }
  }

  throw new Error(
    `Unable to find department "${departmentName}" in TeamPage.tsx`
  );
};

const findMemberNode = (
  sourceFile: ts.SourceFile,
  departmentName: string,
  memberName: string
) => {
  const departmentNode = findDepartmentNode(sourceFile, departmentName);
  const membersArray = getArrayPropertyValue(departmentNode, 'members');

  if (!membersArray) {
    throw new Error(
      `Unable to find members array for department "${departmentName}"`
    );
  }

  for (const element of membersArray.elements) {
    if (!ts.isObjectLiteralExpression(element)) {
      continue;
    }

    if (getStringPropertyValue(element, 'name') === memberName) {
      return element;
    }
  }

  throw new Error(
    `Unable to find member "${memberName}" in department "${departmentName}"`
  );
};

const createPropertyAssignment = (
  propertyName: string,
  value: string,
  valueKind: 'identifier' | 'string'
) =>
  ts.factory.createPropertyAssignment(
    propertyName,
    valueKind === 'identifier'
      ? ts.factory.createIdentifier(value)
      : ts.factory.createStringLiteral(value)
  );

const upsertObjectLiteralProperties = (
  sourceText: string,
  sourceFile: ts.SourceFile,
  targetNode: ts.ObjectLiteralExpression,
  properties: ReadonlyArray<{
    name: string;
    value: string;
    valueKind: 'identifier' | 'string';
    after: string[];
  }>
) => {
  const nextProperties = [...targetNode.properties];
  let didChange = false;

  for (const propertySpec of properties) {
    if (getObjectProperty(targetNode, propertySpec.name)) {
      continue;
    }

    const insertionIndex =
      Math.max(
        ...propertySpec.after.map((propertyName) =>
          nextProperties.findIndex(
            (property) =>
              ts.isPropertyAssignment(property) &&
              ts.isIdentifier(property.name) &&
              property.name.text === propertyName
          )
        )
      ) + 1;

    nextProperties.splice(
      Math.max(insertionIndex, 0),
      0,
      createPropertyAssignment(
        propertySpec.name,
        propertySpec.value,
        propertySpec.valueKind
      )
    );
    didChange = true;
  }

  if (!didChange) {
    return sourceText;
  }

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const updatedNode = ts.factory.updateObjectLiteralExpression(
    targetNode,
    nextProperties
  );
  const replacement = printer.printNode(
    ts.EmitHint.Expression,
    updatedNode,
    sourceFile
  );

  return (
    sourceText.slice(0, targetNode.getStart(sourceFile)) +
    replacement +
    sourceText.slice(targetNode.getEnd())
  );
};

const upsertImportDeclaration = (
  sourceText: string,
  sourceFile: ts.SourceFile,
  importIdentifier: string,
  assetImportPath: string
) => {
  for (const statement of sourceFile.statements) {
    if (
      ts.isImportDeclaration(statement) &&
      ts.isStringLiteral(statement.moduleSpecifier) &&
      statement.moduleSpecifier.text === assetImportPath
    ) {
      const existingIdentifier =
        statement.importClause?.name?.text ?? importIdentifier;

      return {
        sourceText,
        importIdentifier: existingIdentifier,
      };
    }
  }

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const importStatement = ts.factory.createImportDeclaration(
    undefined,
    ts.factory.createImportClause(
      false,
      ts.factory.createIdentifier(importIdentifier),
      undefined
    ),
    ts.factory.createStringLiteral(assetImportPath)
  );
  const importText = printer.printNode(
    ts.EmitHint.Unspecified,
    importStatement,
    sourceFile
  );
  const importStatements = sourceFile.statements.filter(ts.isImportDeclaration);
  const insertionPoint = importStatements.at(-1)?.getEnd() ?? 0;
  const nextSourceText =
    sourceText.slice(0, insertionPoint) +
    (insertionPoint > 0 ? '\n' : '') +
    importText +
    '\n' +
    sourceText.slice(insertionPoint);

  return {
    sourceText: nextSourceText,
    importIdentifier,
  };
};

export const upsertTeamPageImageAssetReference = (
  sourceText: string,
  input: TeamImageAssetReferenceInput
) => {
  const parsedSourceFile = ts.createSourceFile(
    TEAM_PAGE_RELATIVE_PATH,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );
  const importResult = upsertImportDeclaration(
    sourceText,
    parsedSourceFile,
    input.importIdentifier,
    input.assetImportPath
  );
  const nextSourceFile = ts.createSourceFile(
    TEAM_PAGE_RELATIVE_PATH,
    importResult.sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );

  if (input.kind === 'memberPortrait') {
    if (!isString(input.memberName)) {
      throw new Error('memberName is required for member portrait updates');
    }

    const memberNode = findMemberNode(
      nextSourceFile,
      input.departmentName,
      input.memberName
    );

    return upsertObjectLiteralProperties(
      importResult.sourceText,
      nextSourceFile,
      memberNode,
      [
        {
          name: 'portraitSrc',
          value: importResult.importIdentifier,
          valueKind: 'identifier',
          after: ['role'],
        },
        {
          name: 'portraitAssetPath',
          value: input.assetRelativePath,
          valueKind: 'string',
          after: ['portraitSrc', 'role'],
        },
      ]
    );
  }

  const departmentNode = findDepartmentNode(
    nextSourceFile,
    input.departmentName
  );

  return upsertObjectLiteralProperties(
    importResult.sourceText,
    nextSourceFile,
    departmentNode,
    [
      {
        name: 'headerImageSrc',
        value: importResult.importIdentifier,
        valueKind: 'identifier',
        after: ['icon'],
      },
      {
        name: 'headerImageAssetPath',
        value: input.assetRelativePath,
        valueKind: 'string',
        after: ['headerImageSrc', 'icon'],
      },
    ]
  );
};

export const getSharpOutputFormatForAssetPath = (
  assetRelativePath: string
): SharpOutputFormat => {
  const normalizedPath = assetRelativePath.toLowerCase();

  if (normalizedPath.endsWith('.webp')) {
    return 'webp';
  }

  if (normalizedPath.endsWith('.png')) {
    return 'png';
  }

  return 'jpeg';
};

const ensureAssetPathIsSafe = (
  projectRoot: string,
  assetRelativePath: string
) => {
  const absoluteAssetPath = path.resolve(projectRoot, assetRelativePath);
  const absoluteAssetRoot = path.resolve(projectRoot, 'src/assets');

  if (!absoluteAssetPath.startsWith(absoluteAssetRoot + path.sep)) {
    throw new Error(
      `Refusing to write outside src/assets: ${assetRelativePath}`
    );
  }

  return absoluteAssetPath;
};

const writeOptimizedImageFile = async (
  file: File,
  assetAbsolutePath: string,
  outputFormat: SharpOutputFormat
) => {
  const imageBuffer = Buffer.from(await file.arrayBuffer());
  const outputDirectory = path.dirname(assetAbsolutePath);
  await mkdir(outputDirectory, { recursive: true });

  const sharpImage = sharp(imageBuffer).rotate();

  switch (outputFormat) {
    case 'jpeg':
      await sharpImage
        .jpeg({ quality: 92, mozjpeg: true })
        .toFile(assetAbsolutePath);
      return;
    case 'png':
      await sharpImage.png({ compressionLevel: 9 }).toFile(assetAbsolutePath);
      return;
    case 'webp':
      await sharpImage.webp({ quality: 90 }).toFile(assetAbsolutePath);
      return;
    default: {
      const exhaustive: never = outputFormat;
      throw new Error(`Unsupported output format: ${exhaustive}`);
    }
  }
};

const parseSavePayload = (value: string | File | null) => {
  if (!isString(value)) {
    throw new Error('Missing Team image save metadata');
  }

  const parsed = JSON.parse(value) as Partial<TeamImageSaveRequestPayload>;
  const requiredFields: Array<keyof TeamImageSaveRequestPayload> = [
    'kind',
    'targetId',
    'departmentName',
    'assetDisplayPath',
    'assetFileName',
    'assetImportPath',
    'assetRelativePath',
    'importIdentifier',
    'outputFormat',
    'saveTargetKind',
  ];

  for (const field of requiredFields) {
    if (!isString(parsed[field]) && field !== 'memberName') {
      throw new Error(`Invalid Team image save metadata for ${field}`);
    }
  }

  if (parsed.kind !== 'memberPortrait' && parsed.kind !== 'departmentHeader') {
    throw new Error(`Unsupported Team image kind: ${String(parsed.kind)}`);
  }

  if (
    parsed.saveTargetKind !== 'existing-asset' &&
    parsed.saveTargetKind !== 'new-member-asset' &&
    parsed.saveTargetKind !== 'new-header-asset'
  ) {
    throw new Error(
      `Unsupported Team save target kind: ${String(parsed.saveTargetKind)}`
    );
  }

  if (
    parsed.outputFormat !== 'jpeg' &&
    parsed.outputFormat !== 'png' &&
    parsed.outputFormat !== 'webp'
  ) {
    throw new Error(
      `Unsupported Team image output format: ${parsed.outputFormat}`
    );
  }

  return parsed as TeamImageSaveRequestPayload;
};

const handleTeamImageSaveRequest = async (
  projectRoot: string,
  formData: FormData
) => {
  const payload = parseSavePayload(formData.get('metadata'));
  const uploadedFile = formData.get('file');

  if (!(uploadedFile instanceof File)) {
    throw new Error('Missing uploaded Team image file');
  }

  if (!uploadedFile.type.startsWith('image/')) {
    throw new Error(`Unsupported uploaded file type: ${uploadedFile.type}`);
  }

  const assetAbsolutePath = ensureAssetPathIsSafe(
    projectRoot,
    payload.assetRelativePath
  );
  await writeOptimizedImageFile(
    uploadedFile,
    assetAbsolutePath,
    payload.outputFormat
  );

  let updatedTeamPage = false;

  if (payload.saveTargetKind !== 'existing-asset') {
    const teamPageAbsolutePath = path.resolve(
      projectRoot,
      TEAM_PAGE_RELATIVE_PATH
    );
    const currentSource = await readFile(teamPageAbsolutePath, 'utf8');
    const nextSource = upsertTeamPageImageAssetReference(
      currentSource,
      payload
    );

    if (nextSource !== currentSource) {
      await writeFile(teamPageAbsolutePath, nextSource);
      updatedTeamPage = true;
    }
  }

  return {
    assetRelativePath: payload.assetRelativePath,
    updatedTeamPage,
  };
};

const toRequestHeaders = (
  headers: Record<string, string | string[] | undefined>
) =>
  Object.fromEntries(
    Object.entries(headers).flatMap(([key, value]) => {
      if (typeof value === 'string') {
        return [[key, value]];
      }

      if (Array.isArray(value)) {
        return [[key, value.join(', ')]];
      }

      return [];
    })
  );

export const createTeamImageEditorDevPlugin = (
  projectRoot: string
): Plugin => ({
  name: 'team-image-editor-dev-plugin',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.method !== 'POST' || req.url?.split('?')[0] !== DEV_ROUTE_PATH) {
        next();
        return;
      }

      try {
        const request = new Request(`http://127.0.0.1${req.url}`, {
          method: req.method,
          headers: new Headers(
            toRequestHeaders(
              req.headers as Record<string, string | string[] | undefined>
            )
          ),
          body: Readable.toWeb(req),
          duplex: 'half',
        } as RequestInit & { duplex: 'half' });
        const formData = await request.formData();
        const result = await handleTeamImageSaveRequest(projectRoot, formData);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Unknown Team image save error';

        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message }));
      }
    });
  },
});
