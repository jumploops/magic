import * as ts from 'typescript';

import { isFileMagic, isFunctionMagic } from './utils';
import { extractFunctionArgumentsAndReturn } from './extract';

export default function(program: ts.Program, pluginOptions: any) {
  const typeChecker = program.getTypeChecker();

  return (ctx: ts.TransformationContext) => {

    // Require statement for function that wraps external LLM call
    // TODO Must be importable by any library consumers
    const requireStatement = ts.factory.createVariableStatement(
      undefined,
      ctx.factory.createVariableDeclarationList(
        [
          ctx.factory.createVariableDeclaration(
            "{ fetchCompletion }",
            undefined,
            undefined,
            ctx.factory.createCallExpression(
              ctx.factory.createIdentifier('require'),
              undefined,
              [ctx.factory.createStringLiteral('@jumploops/magic')]
            )
          ),
        ],
        ts.NodeFlags.Const
      )
    );

    return (sourceFile: ts.SourceFile) => {

      // Function to ensure the LLM fetch function can be found in any files that contain magic functions
      function insertRequireDeclarationIfNeeded(sourceFile: ts.SourceFile) {
        const hasFetchCompletionDeclaration = sourceFile.statements.some((stmt) =>
          ts.isVariableStatement(stmt) && stmt.declarationList.declarations.some(
            (decl) =>
              ts.isVariableDeclaration(decl) &&
              ts.isIdentifier(decl.name) &&
              decl.name.text === "fetchCompletion"
          )
        );
        if (isFileMagic(sourceFile) && !hasFetchCompletionDeclaration) {
          sourceFile = ts.factory.updateSourceFile(
            sourceFile,
            [requireStatement, ...sourceFile.statements],
            sourceFile.isDeclarationFile,
            sourceFile.referencedFiles,
            sourceFile.typeReferenceDirectives,
            sourceFile.hasNoDefaultLib,
            sourceFile.libReferenceDirectives
          );
        }
        return sourceFile;
      }

      sourceFile = insertRequireDeclarationIfNeeded(sourceFile);

      function visitor(node: ts.Node): ts.Node {

        // Special logic for magic functions
        if (ts.isFunctionDeclaration(node) && isFunctionMagic(node, sourceFile)) {
          const schemaObject = extractFunctionArgumentsAndReturn(node, typeChecker, program);
          const schema = JSON.stringify(schemaObject);
          const existingFunction = node.body?.getText(sourceFile);

          // Create call to external LLM with function text and JSON schema of return arguments
          // TODO Handle argument passing to LLM
          const newStatement = ctx.factory.createReturnStatement(
            ctx.factory.createAwaitExpression(
              ctx.factory.createCallExpression(
                ctx.factory.createIdentifier('fetchCompletion'),
                undefined,
                [
                  ctx.factory.createStringLiteral(existingFunction),
                  ctx.factory.createObjectLiteralExpression(
                    [
                      ts.factory.createPropertyAssignment('schema', ctx.factory.createStringLiteral(schema)),
                    ],
                    true
                  ),
                ],
              ),
            ),
          );

          const newFunctionBody = ctx.factory.createBlock([newStatement], true);

          const newModifiers = node.modifiers?.filter((modifier) => [ts.SyntaxKind.ExportKeyword, ts.SyntaxKind.AsyncKeyword].includes(modifier.kind)) || [];

          if (!newModifiers.some(modifier => modifier.kind === ts.SyntaxKind.AsyncKeyword)) {
            newModifiers.push(ts.factory.createModifier(ts.SyntaxKind.AsyncKeyword));
          }

          const newNode = ctx.factory.updateFunctionDeclaration(
            node,
            newModifiers,
            node.asteriskToken,
            node.name,
            node.typeParameters,
            node.parameters,
            node.type,
            newFunctionBody
          );

          return ts.visitEachChild(newNode, visitor, ctx);
        }

        return ts.visitEachChild(node, visitor, ctx);
      }

      return ts.visitNode(sourceFile, visitor);
    };
  };
}
