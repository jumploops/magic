// fetchCompletion.ts
import { Configuration, OpenAIApi } from 'openai';

import { validateAPIResponse } from './validateResponse';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function fetchCompletion(existingFunction: string, { schema }: { schema: any }) {
  let completion;

  // TODO improve Prompt cleanup
  const prompt = `
    You are a robotic assistant. Your only language is code. You only respond with valid JSON. Nothing but JSON. 

    Your goal is to read a prompt and create a response, in JSON, that matches to a JSON schema. 

    If the JSON Schema type is "array", only return the array, not the array nested in an object wrapper, even if the array itself contains objects or otherwise.

    For example, if you're planning to return:
      { "list": [ { "name": "Alice" }, { "name": "Bob" }, { "name": "Carol"}] } 
    Instead just return:
      [ { "name": "Alice" }, { "name": "Bob" }, { "name": "Carol"}]

    If the JSON schema is type "object", just return valid JSON. Don't include trailing commas, as they are invalid JSON.
     
    For example, if you're planning to return:
      { 
        "abc": "123", 
        "def": "456", 
        "ghi": "789", 
      }
    Instead return:
      { 
        "abc": "123", 
        "def": "456", 
        "ghi": "789"
      }

    Prompt: ${existingFunction.replace('{', '').replace('}', '').replace('//', '').replace('\n', '')}

    JSON Schema: 
    \`\`\`
      ${JSON.stringify(JSON.parse(schema), null, 2)}
    \`\`\`
  `;

  process.env.DEBUG && console.log(prompt);

  try {
    completion = await openai.createChatCompletion({
      model: process.env.OPENAI_MODEL ? process.env.OPENAI_MODEL : 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });
  } catch (err) {
    console.error(err);
    return;
  }

  process.env.DEBUG && console.log(completion.data.choices[0].message)
  const response = JSON.parse(completion.data.choices[0].message.content);

  if (!validateAPIResponse(response, JSON.parse(schema))) {
    process.env.DEBUG && console.log(response);
    throw new Error("Invalid JSON response from LLM");
  }

  return JSON.parse(completion.data.choices[0].message.content);
}
