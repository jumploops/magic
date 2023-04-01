# @jumploops/magic

The `@jumploops/magic` npm package lets you add `@magic` comments to TypeScript functions, which are then transformed into calls to external large language models (LLM), such as GPT-4 from OpenAI. This allows you to magically generate functions leveraging the power of AI.

## Features

- Seamlessly transform your TypeScript functions with a simple `@magic` comment.
- Integrate the latest AI language models such as GPT-4 from OpenAI.
- Effortless setup with your existing TypeScript project.

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
      { "transform": "@jumploops/magic/transform", "import": "default" }
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
      { "transform": "@jumploops/magic/transform", "import": "default" }
    ]
  }
}
```

Compile your project using ttypescript:

```bash
ttsc
```

## Usage

With @jumploops/magic, transform your TypeScript functions by adding the `//@magic` comment.

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
> interface Person {
>  firstName: string;
>  lastName: string;
> }
> ```

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

## Contributing

We welcome contributions! Please open an issue or submit a pull request if you'd like to help improve @jumploops/magic.

## License

MIT License.
