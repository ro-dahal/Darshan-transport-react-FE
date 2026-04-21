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

export type AboutDevImageKind = 'founderPortrait' | 'heroImage';

export type AboutImageSaveRequestPayload = {
  kind: AboutDevImageKind;
  targetId: string;
  transform: ImageTransform;
};

const DEV_ROUTE_PATH = '/__dev/about-image-editor/save';
const ABOUT_PAGE_RELATIVE_PATH =
  'src/features/marketing/about/pages/AboutPage.tsx';
const ABOUT_CONTENT_RELATIVE_PATH =
  'src/features/marketing/about/data/aboutContent.ts';

const isString = (value: unknown): value is string => typeof value === 'string';

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

export const createAboutImageEditorDevPlugin = (
  projectRoot: string
): Plugin => ({
  name: 'about-image-editor-dev-plugin',
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
        const payload = parseSavePayload(await request.text());
        const result = await handleAboutImageSaveRequest(projectRoot, payload);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Saving the About image transform failed.';

        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message }));
      }
    });
  },
});
