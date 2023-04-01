import * as ts from 'typescript';

import { generateSchemaFromType } from './jsonSchemaGenerator';

export function extractFunctionArgumentsAndReturn(node: ts.FunctionDeclaration, typeChecker: ts.TypeChecker, program: ts.Program): void {
  if (!node.name || !node.type) return;

  //console.log(`Function: ${node.name.getText()}`);

  // Extracting argument types
  node.parameters.forEach((parameter) => {
    //    console.log(`Parameter: ${parameter.name.getText()} - Type: ${parameter.type?.getText()}`);
  });

  // Extracting return type
  const returnTypeText = node.type.getText();
  //  console.log(`Return type: ${returnTypeText}`);

  // Check if the return type is a Promise
  const returnType = typeChecker.getTypeFromTypeNode(node.type);
  const typeArgs = (returnType as ts.TypeReference).typeArguments;

  let schema;

  if (typeArgs && returnTypeText.startsWith('Promise')) {
    const nestedType = typeArgs[0];
    //    console.log(`Nested type: ${nestedType.toString()}`);

    // Generate JSON schema for nested type (Person)
    const nestedSchema = generateSchemaFromType(typeChecker, nestedType, program);
    //    console.log('JSON Schema:', JSON.stringify(nestedSchema, null, 2));
    schema = nestedSchema;
  } else {
    // Generate JSON schema for type (Person)
    schema = generateSchemaFromType(typeChecker, returnType, program);
    //    console.log('JSON Schema:', JSON.stringify(schema, null, 2));
  }
  return schema;
}
