# 🪄

## AI functions for Typescript

Magically run typesafe functions by utilizing large language models (LLMs) as a runtime. 

## tl;dr

<img src="https://user-images.githubusercontent.com/8540079/230755514-56193e38-019b-4a33-bd68-a0268fa0b787.png" width="600">

> **Warning**
>
> The code in this repository (including this README) was created with GPT-4. This is not a production repository and caution should be used when running this code. 

### How does it work? 

This library uses a [Typescript transformer](https://github.com/itsdouges/typescript-transformer-handbook) to take the return type of a function, convert that type [into a JSON Schema](https://github.com/YousefED/typescript-json-schema), and then replace the function body with code to query the [OpenAI API](https://github.com/openai/openai-node) and [validate the response](https://github.com/ajv-validator/ajv) against the JSON Schema.

_This library doesn't write code for your functions, it allows you to use LLMs as a runtime._


<details><summary><h3>Usage </h3></summary>

Transform your TypeScript functions by adding the `//@magic` comment.

Here's an example function:

```typescript
// @magic
async function example(): Promise<Mountain> {
  //Return the 3rd highest mountain
}
```

When this function is called, it'll leverage an AI language model like `GPT-4` and return the following result:

```typescript
{ name: 'Kangchenjunga', height: { meters: 8586, feet: 28169 } }
```

> **Note**: In this example, `Mountain` is defined as:
>
> ```typescript
> interface Height {
>   meters: number;
>   feet: number;
> }
> 
> interface Mountain {
>   name: string;
>   height: Height;
> }
> ```

</details>

### Prerequisites 

```bash
export OPENAI_API_KEY=your_api_key_here
export OPENAI_MODEL=gpt-4 #optional
```

### Installation

```bash
npm install --save @jumploops/magic
```

<details><summary><h4>Setup with `ts-patch`</h4></summary>
 
```bash
npm install -D ts-patch
ts-patch install
```

Now, add the plugin to your `tsconfig.json`:
```json
{
  "compilerOptions": {
    "plugins": [
      { "transform": "@jumploops/magic" }
    ]
  }
}
```
</details>

<details><summary><h4>Setup with `ttypescript`</h4></summary>

Install ttypescript:

```bash
npm i -D ttypescript
```

Next, add the plugin to your `tsconfig.json`:
```json
{
  "compilerOptions": {
    "plugins": [
      { "transform": "@jumploops/magic" }
    ]
  }
}
```

Compile your project using ttypescript:

```bash
ttsc
```

</details>

## Prior Art
This package took inspiration from [Marvin - build AI functions that use an LLM as a runtime](https://news.ycombinator.com/item?id=35366838)

## Contributing

We welcome contributions! Please open an issue or submit a pull request if you'd like to help improve @jumploops/magic.

## License

MIT License.
