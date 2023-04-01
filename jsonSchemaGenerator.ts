// jsonSchemaGenerator.ts
import * as ts from 'typescript';
import * as tsjson from 'typescript-json-schema';

export function generateSchemaFromType(typeChecker: ts.TypeChecker, type: ts.Type, program: ts.Program): object | null {
  const symbol = type.aliasSymbol || type.getSymbol();

  if (!symbol) return null;

  const compilerOptions = program.getCompilerOptions();

  const settings = tsjson.getDefaultArgs();
  settings.required = true;
  const generator = tsjson.buildGenerator(program, settings);

  if (!generator) return null;

  // Generate the JSON schema for the extracted type
  const schema = generator.getSchemaForSymbol(symbol.getName());
  return schema;
}
