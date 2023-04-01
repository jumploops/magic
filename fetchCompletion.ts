// fetchCompletion.ts
import { Configuration, OpenAIApi } from 'openai';

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

    Prompt: ${existingFunction.replace('{', '').replace('}', '').replace('//', '').replace('\n', '')}

    JSON Schema: ${JSON.stringify(schema, null, 2)}
  `;

  process.env.DEBUG && console.log(prompt);

  try {
    completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });
  } catch (err) {
    console.error(err);
    return;
  }

  //TODO add in Schema validation
  return JSON.parse(completion.data.choices[0].message.content);
}
