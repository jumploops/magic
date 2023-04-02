# 🪄

## AI functions for Typescript

Magically generate results for your Typescript functions by utilizing large language models (LLMs) like GPT-4 from OpenAI. 

> **Warning**
>
> The code in this repository (including this README) was created with GPT-4. This is not a production repository and caution should be used when running this code. 

## tl;dr

<img width="709" alt="Screenshot 2023-04-01 at 12 30 42 AM" src="https://user-images.githubusercontent.com/8540079/229272667-eaf4ce30-14e9-48d2-b3c9-ba56bba961d8.png">


## Features

- Seamlessly transform your TypeScript functions with a simple `//@magic` comment
- Integrate the latest AI language models such as GPT-4 from OpenAI
- Effortless setup with your existing TypeScript project
- Automagically validate LLM responses against your Typescript interfaces

## Usage

Transform your TypeScript functions by adding the `//@magic` comment.

Here's an example function:

```typescript
import { Person } from './person';

// @magic
async function asyncFunction(): Promise<Person> {
  //Return the first name of the 5th president and the last name of the 40th president
}
```

When this function is called, it'll leverage an AI language model like `GPT-3.5-turbo` and return the following result:

```json
 { "firstName" : "James", "lastName" : "Reagan" }
```

> Note: In this example, `Person` is defined as:
>
> ```typescript
> type Person {
>  firstName: string;
>  lastName: string;
> }
> ```

## Installation

First, install `@jumploops/magic` as a development dependency using:

```bash
npm install --save-dev @jumploops/magic
```

### Setup with ts-patch

```bash
npm install -D ts-patch
ts-patch install
```

Now, add the plugin to your `tsconfig.json`:
```json
{
  "compilerOptions": {
    "plugins": [
      { "transform": "@jumploops/magic/transformer", "type": "program" }
    ]
  }
}
```

### Setup with ttypescript

Install ttypescript:

```bash
npm i -D ttypescript
```

Next, add the plugin to your `tsconfig.json`:
```json
{
  "compilerOptions": {
    "plugins": [
      { "transform": "@jumploops/magic/transformer", "type": "program" }
    ]
  }
}
```

Compile your project using ttypescript:

```bash
ttsc
```

## API Reference

### @magic

Use `//@magic` to annotate a TypeScript function that you want to transform into a call to an external LLM. The function should be async.

Example:

```typescript
// @magic
async function asyncFunction(): Promise<Person> {
  //Return the first name of the 5th president and the last name of the 40th president
}
```

## Prior Art
This package took inspiration from [Marvin - build AI functions that use an LLM as a runtime](https://news.ycombinator.com/item?id=35366838)

## Contributing

We welcome contributions! Please open an issue or submit a pull request if you'd like to help improve @jumploops/magic.

## License

MIT License.
