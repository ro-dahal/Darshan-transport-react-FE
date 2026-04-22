import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Readable } from 'node:stream';
import ts from 'typescript';
import type { Plugin } from 'vite';
import {
  DEFAULT_IMAGE_TRANSFORM,
  areImageTransformsEqual,
  formatTransformNumber,
  normalizeImageTransform,
  type ImageTransform,
} from './src/features/marketing/shared/dev-image-editor/imageTransformUtils';
import {
  ensureAssetPathIsSafe,
  getSharpOutputFormatForAssetPath,
  readImageMetadata,
  toRequestHeaders,
  writeOptimizedImageFile,
  type SharpOutputFormat,
} from './devImageEditorShared';

export type AboutDevImageKind = 'founderPortrait' | 'heroImage';

export type AboutImageSaveRequestPayload = {
  kind: AboutDevImageKind;
  targetId: string;
  transform: ImageTransform;
};

export type AboutImageUploadRequestPayload = {
  kind: AboutDevImageKind;
  targetId: string;
  importIdentifier: string;
  assetImportPath: string;
  assetRelativePath: string;
  outputFormat: SharpOutputFormat;
  transform: ImageTransform;
};

const DEV_SAVE_ROUTE_PATH = '/__dev/about-image-editor/save';
const DEV_UPLOAD_ROUTE_PATH = '/__dev/about-image-editor/upload';
const ABOUT_PAGE_RELATIVE_PATH =
  'src/features/marketing/about/pages/AboutPage.tsx';
const ABOUT_CONTENT_RELATIVE_PATH =
  'src/features/marketing/about/data/aboutContent.ts';

const isString = (value: unknown): value is string => typeof value === 'string';

const MIN_ABOUT_IMAGE_DIMENSIONS: Record<
  AboutDevImageKind,
  { width: number; height: number }
> = {
  founderPortrait: { width: 1200, height: 1200 },
  heroImage: { width: 2400, height: 1200 },
};

const createParsedSourceFile = (
  fileName: string,
  sourceText: string,
  scriptKind: ts.ScriptKind
) =>
  ts.createSourceFile(
    fileName,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    scriptKind
  );

const getObjectProperty = (node: ts.ObjectLiteralExpression, name: string) =>
  node.properties.find(
    (property): property is ts.PropertyAssignment =>
      ts.isPropertyAssignment(property) &&
      ((ts.isIdentifier(property.name) && property.name.text === name) ||
        ((ts.isStringLiteral(property.name) ||
          ts.isNoSubstitutionTemplateLiteral(property.name)) &&
          property.name.text === name))
  );

const getStringPropertyValue = (
  node: ts.ObjectLiteralExpression,
  name: string
): string | null => {
  const property = getObjectProperty(node, name);

  if (
    !property ||
    (!ts.isStringLiteral(property.initializer) &&
      !ts.isNoSubstitutionTemplateLiteral(property.initializer))
  ) {
    return null;
  }

  return property.initializer.text;
};

const updateObjectLiteralProperties = (
  sourceText: string,
  sourceFile: ts.SourceFile,
  targetNode: ts.ObjectLiteralExpression,
  properties: ReadonlyArray<{
    name: string;
    initializer: ts.Expression | null;
    after: string[];
  }>
) => {
  const nextProperties = [...targetNode.properties];
  let didChange = false;

  for (const propertySpec of properties) {
    const existingIndex = nextProperties.findIndex(
      (property) =>
        ts.isPropertyAssignment(property) &&
        ((ts.isIdentifier(property.name) &&
          property.name.text === propertySpec.name) ||
          ((ts.isStringLiteral(property.name) ||
            ts.isNoSubstitutionTemplateLiteral(property.name)) &&
            property.name.text === propertySpec.name))
    );

    if (!propertySpec.initializer) {
      if (existingIndex >= 0) {
        nextProperties.splice(existingIndex, 1);
        didChange = true;
      }
      continue;
    }

    const nextProperty = ts.factory.createPropertyAssignment(
      propertySpec.name,
      propertySpec.initializer
    );

    if (existingIndex >= 0) {
      nextProperties[existingIndex] = nextProperty;
      didChange = true;
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
        ),
        -1
      ) + 1;

    nextProperties.splice(Math.max(insertionIndex, 0), 0, nextProperty);
    didChange = true;
  }

  if (!didChange) {
    return sourceText;
  }

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const replacement = printer.printNode(
    ts.EmitHint.Expression,
    ts.factory.updateObjectLiteralExpression(targetNode, nextProperties),
    sourceFile
  );

  return (
    sourceText.slice(0, targetNode.getStart(sourceFile)) +
    replacement +
    sourceText.slice(targetNode.getEnd())
  );
};

const createTransformObjectLiteral = (transform: ImageTransform) =>
  ts.factory.createObjectLiteralExpression(
    [
      ts.factory.createPropertyAssignment(
        'xPercent',
        createNumericExpression(transform.xPercent)
      ),
      ts.factory.createPropertyAssignment(
        'yPercent',
        createNumericExpression(transform.yPercent)
      ),
      ts.factory.createPropertyAssignment(
        'scale',
        createNumericExpression(transform.scale)
      ),
    ],
    true
  );

function createNumericExpression(value: number) {
  const normalizedValue = Number(formatTransformNumber(value));

  return normalizedValue < 0
    ? ts.factory.createPrefixUnaryExpression(
        ts.SyntaxKind.MinusToken,
        ts.factory.createNumericLiteral(Math.abs(normalizedValue))
      )
    : ts.factory.createNumericLiteral(normalizedValue);
}

const createHeroTransformExpression = (transform: ImageTransform) =>
  ts.factory.createCallExpression(
    ts.factory.createIdentifier('normalizeAboutImageTransform'),
    undefined,
    areImageTransformsEqual(transform, DEFAULT_IMAGE_TRANSFORM)
      ? []
      : [createTransformObjectLiteral(transform)]
  );

const createFounderTransformExpression = (transform: ImageTransform) =>
  areImageTransformsEqual(transform, DEFAULT_IMAGE_TRANSFORM)
    ? null
    : createTransformObjectLiteral(transform);

const findAboutFoundersArray = (sourceFile: ts.SourceFile) => {
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) {
      continue;
    }

    for (const declaration of statement.declarationList.declarations) {
      if (
        ts.isIdentifier(declaration.name) &&
        declaration.name.text === 'ABOUT_FOUNDERS' &&
        declaration.initializer &&
        ts.isArrayLiteralExpression(declaration.initializer)
      ) {
        return declaration.initializer;
      }
    }
  }

  throw new Error('Unable to find ABOUT_FOUNDERS in aboutContent.ts');
};

const findFounderNode = (sourceFile: ts.SourceFile, targetId: string) => {
  const foundersArray = findAboutFoundersArray(sourceFile);

  for (const element of foundersArray.elements) {
    if (!ts.isObjectLiteralExpression(element)) {
      continue;
    }

    if (getStringPropertyValue(element, 'signatureLabel') === targetId) {
      return element;
    }
  }

  throw new Error(`Unable to find founder "${targetId}" in aboutContent.ts`);
};

// Re-used by the upload path: upserts an import declaration at the end of the
// existing import block (mirrors the team dev server's approach).
const upsertImportDeclaration = (
  sourceText: string,
  sourceFile: ts.SourceFile,
  importIdentifier: string,
  assetImportPath: string
): { sourceText: string; importIdentifier: string } => {
  for (const statement of sourceFile.statements) {
    if (
      ts.isImportDeclaration(statement) &&
      ts.isStringLiteral(statement.moduleSpecifier) &&
      statement.moduleSpecifier.text === assetImportPath
    ) {
      const existingIdentifier =
        statement.importClause?.name?.text ?? importIdentifier;
      return { sourceText, importIdentifier: existingIdentifier };
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

  return { sourceText: nextSourceText, importIdentifier };
};

// AST helper: update the `image` property of a founder + optionally update the
// imageTransform — used when a new file is uploaded for a founder portrait.
export const updateFounderImageInAboutContent = (
  sourceText: string,
  targetId: string,
  importIdentifier: string,
  assetImportPath: string,
  transform: ImageTransform
): string => {
  const sourceFile = createParsedSourceFile(
    ABOUT_CONTENT_RELATIVE_PATH,
    sourceText,
    ts.ScriptKind.TS
  );
  const importResult = upsertImportDeclaration(
    sourceText,
    sourceFile,
    importIdentifier,
    assetImportPath
  );
  const updatedSourceFile = createParsedSourceFile(
    ABOUT_CONTENT_RELATIVE_PATH,
    importResult.sourceText,
    ts.ScriptKind.TS
  );
  const founderNode = findFounderNode(updatedSourceFile, targetId);

  return updateObjectLiteralProperties(
    importResult.sourceText,
    updatedSourceFile,
    founderNode,
    [
      {
        name: 'image',
        initializer: ts.factory.createIdentifier(importResult.importIdentifier),
        after: ['role'],
      },
      {
        name: 'imageTransform',
        initializer: createFounderTransformExpression(transform),
        after: ['image'],
      },
    ]
  );
};

// AST helper: update the hero image import + transform in AboutPage.tsx.
const findHeroSelectionNode = (sourceFile: ts.SourceFile) => {
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) {
      continue;
    }

    for (const declaration of statement.declarationList.declarations) {
      if (
        ts.isIdentifier(declaration.name) &&
        declaration.name.text === 'ABOUT_HERO_SELECTION' &&
        declaration.initializer &&
        ts.isObjectLiteralExpression(declaration.initializer)
      ) {
        return declaration.initializer;
      }
    }
  }

  throw new Error('Unable to find ABOUT_HERO_SELECTION in AboutPage.tsx');
};

export const updateHeroImageInAboutPage = (
  sourceText: string,
  importIdentifier: string,
  assetImportPath: string,
  transform: ImageTransform
): string => {
  const sourceFile = createParsedSourceFile(
    ABOUT_PAGE_RELATIVE_PATH,
    sourceText,
    ts.ScriptKind.TSX
  );
  // Upsert the import for the new hero image.
  const importResult = upsertImportDeclaration(
    sourceText,
    sourceFile,
    importIdentifier,
    assetImportPath
  );
  const updatedSourceFile = createParsedSourceFile(
    ABOUT_PAGE_RELATIVE_PATH,
    importResult.sourceText,
    ts.ScriptKind.TSX
  );
  const heroSelectionNode = findHeroSelectionNode(updatedSourceFile);

  return updateObjectLiteralProperties(
    importResult.sourceText,
    updatedSourceFile,
    heroSelectionNode,
    [
      {
        name: 'imageSrc',
        initializer: ts.factory.createIdentifier(importResult.importIdentifier),
        after: ['label'],
      },
      {
        name: 'defaultTransform',
        initializer: createHeroTransformExpression(transform),
        after: ['imageSrc', 'label'],
      },
    ]
  );
};

export const updateFounderTransformInAboutContent = (
  sourceText: string,
  targetId: string,
  transform: ImageTransform
) => {
  const sourceFile = createParsedSourceFile(
    ABOUT_CONTENT_RELATIVE_PATH,
    sourceText,
    ts.ScriptKind.TS
  );
  const founderNode = findFounderNode(sourceFile, targetId);

  return updateObjectLiteralProperties(sourceText, sourceFile, founderNode, [
    {
      name: 'imageTransform',
      initializer: createFounderTransformExpression(transform),
      after: ['image'],
    },
  ]);
};

export const updateHeroTransformInAboutPage = (
  sourceText: string,
  transform: ImageTransform
) => {
  const sourceFile = createParsedSourceFile(
    ABOUT_PAGE_RELATIVE_PATH,
    sourceText,
    ts.ScriptKind.TSX
  );
  const heroSelectionNode = findHeroSelectionNode(sourceFile);

  return updateObjectLiteralProperties(
    sourceText,
    sourceFile,
    heroSelectionNode,
    [
      {
        name: 'defaultTransform',
        initializer: createHeroTransformExpression(transform),
        after: ['label'],
      },
    ]
  );
};

const parseSavePayload = (rawBody: string): AboutImageSaveRequestPayload => {
  const parsed = JSON.parse(rawBody) as Partial<AboutImageSaveRequestPayload>;

  if (parsed.kind !== 'founderPortrait' && parsed.kind !== 'heroImage') {
    throw new Error(`Unsupported About image kind: ${String(parsed.kind)}`);
  }

  if (!isString(parsed.targetId)) {
    throw new Error('Missing About image target id');
  }

  if (!parsed.transform || typeof parsed.transform !== 'object') {
    throw new Error('Missing About image transform');
  }

  return {
    kind: parsed.kind,
    targetId: parsed.targetId,
    transform: normalizeImageTransform(parsed.transform),
  };
};

const handleAboutImageSaveRequest = async (
  projectRoot: string,
  payload: AboutImageSaveRequestPayload
) => {
  if (payload.kind === 'heroImage') {
    const aboutPageAbsolutePath = path.resolve(
      projectRoot,
      ABOUT_PAGE_RELATIVE_PATH
    );
    const currentSource = await readFile(aboutPageAbsolutePath, 'utf8');
    const nextSource = updateHeroTransformInAboutPage(
      currentSource,
      payload.transform
    );

    if (nextSource !== currentSource) {
      await writeFile(aboutPageAbsolutePath, nextSource);
    }

    return {
      updatedFile: ABOUT_PAGE_RELATIVE_PATH,
    };
  }

  const aboutContentAbsolutePath = path.resolve(
    projectRoot,
    ABOUT_CONTENT_RELATIVE_PATH
  );
  const currentSource = await readFile(aboutContentAbsolutePath, 'utf8');
  const nextSource = updateFounderTransformInAboutContent(
    currentSource,
    payload.targetId,
    payload.transform
  );

  if (nextSource !== currentSource) {
    await writeFile(aboutContentAbsolutePath, nextSource);
  }

  return {
    updatedFile: ABOUT_CONTENT_RELATIVE_PATH,
  };
};

// ---------------------------------------------------------------------------
// Upload handler
// ---------------------------------------------------------------------------

const parseUploadMetadata = (
  value: string | File | null
): AboutImageUploadRequestPayload => {
  if (typeof value !== 'string') {
    throw new Error('Missing About image upload metadata');
  }

  const parsed = JSON.parse(value) as Partial<AboutImageUploadRequestPayload>;

  if (parsed.kind !== 'founderPortrait' && parsed.kind !== 'heroImage') {
    throw new Error(`Unsupported About image kind: ${String(parsed.kind)}`);
  }

  if (!isString(parsed.targetId)) throw new Error('Missing targetId');
  if (!isString(parsed.importIdentifier))
    throw new Error('Missing importIdentifier');
  if (!isString(parsed.assetImportPath))
    throw new Error('Missing assetImportPath');
  if (!isString(parsed.assetRelativePath))
    throw new Error('Missing assetRelativePath');
  if (!parsed.transform || typeof parsed.transform !== 'object') {
    throw new Error('Missing About image transform');
  }

  const outputFormat = getSharpOutputFormatForAssetPath(
    parsed.assetRelativePath ?? ''
  );

  return {
    kind: parsed.kind,
    targetId: parsed.targetId,
    importIdentifier: parsed.importIdentifier,
    assetImportPath: parsed.assetImportPath,
    assetRelativePath: parsed.assetRelativePath,
    outputFormat,
    transform: normalizeImageTransform(parsed.transform),
  };
};

const handleAboutImageUploadRequest = async (
  projectRoot: string,
  formData: FormData
) => {
  const payload = parseUploadMetadata(formData.get('metadata'));
  const uploadedFile = formData.get('file');

  if (!(uploadedFile instanceof File)) {
    throw new Error('Missing uploaded file');
  }

  if (!uploadedFile.type.startsWith('image/')) {
    throw new Error(`Unsupported file type: ${uploadedFile.type}`);
  }

  const dimensions = await readImageMetadata(uploadedFile);
  const minimum = MIN_ABOUT_IMAGE_DIMENSIONS[payload.kind];

  if (dimensions.width < minimum.width || dimensions.height < minimum.height) {
    throw new Error(
      `Uploaded image is too small (${dimensions.width}x${dimensions.height}). ` +
        `Minimum is ${minimum.width}x${minimum.height}.`
    );
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

  // Update the source file with the new import + image property.
  if (payload.kind === 'founderPortrait') {
    const aboutContentAbsolutePath = path.resolve(
      projectRoot,
      ABOUT_CONTENT_RELATIVE_PATH
    );
    const currentSource = await readFile(aboutContentAbsolutePath, 'utf8');
    const nextSource = updateFounderImageInAboutContent(
      currentSource,
      payload.targetId,
      payload.importIdentifier,
      payload.assetImportPath,
      payload.transform
    );

    if (nextSource !== currentSource) {
      await writeFile(aboutContentAbsolutePath, nextSource);
    }
  } else {
    // heroImage — update AboutPage.tsx import
    const aboutPageAbsolutePath = path.resolve(
      projectRoot,
      ABOUT_PAGE_RELATIVE_PATH
    );
    const currentSource = await readFile(aboutPageAbsolutePath, 'utf8');
    const nextSource = updateHeroImageInAboutPage(
      currentSource,
      payload.importIdentifier,
      payload.assetImportPath,
      payload.transform
    );

    if (nextSource !== currentSource) {
      await writeFile(aboutPageAbsolutePath, nextSource);
    }
  }

  return { assetRelativePath: payload.assetRelativePath };
};

// ---------------------------------------------------------------------------
// Vite plugin
// ---------------------------------------------------------------------------

export const createAboutImageEditorDevPlugin = (
  projectRoot: string
): Plugin => ({
  name: 'about-image-editor-dev-plugin',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.method !== 'POST') {
        next();
        return;
      }

      const routePath = req.url?.split('?')[0];

      if (
        routePath !== DEV_SAVE_ROUTE_PATH &&
        routePath !== DEV_UPLOAD_ROUTE_PATH
      ) {
        next();
        return;
      }

      const makeRequest = () =>
        new Request(`http://127.0.0.1${req.url}`, {
          method: req.method,
          headers: new Headers(
            toRequestHeaders(
              req.headers as Record<string, string | string[] | undefined>
            )
          ),
          body: Readable.toWeb(req),
          duplex: 'half',
        } as RequestInit & { duplex: 'half' });

      try {
        let result: unknown;

        if (routePath === DEV_UPLOAD_ROUTE_PATH) {
          const request = makeRequest();
          const formData = await request.formData();
          result = await handleAboutImageUploadRequest(projectRoot, formData);
        } else {
          const request = makeRequest();
          const payload = parseSavePayload(await request.text());
          result = await handleAboutImageSaveRequest(projectRoot, payload);
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'The About image editor request failed.';

        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message }));
      }
    });
  },
});
