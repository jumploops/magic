import Ajv from "ajv";
import ajvFormats from 'ajv-formats';


export function validateAPIResponse(apiResponse: any, schema: object): boolean {
  const ajvInstance = new Ajv();
  ajvFormats(ajvInstance);
  const validate = ajvInstance.compile(schema);
  const isValid = validate(apiResponse);

  if (!isValid) {
    console.log("Validation errors:", validate.errors);
  }

  return isValid;
}
