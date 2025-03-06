# ai-chatbotfast

AI-powered chatbot package for fast and efficient conversational AI in Node.js applications.

## Installation

Install the package using npm:

```sh
npm install ai-chatbotfast
```

Or using yarn:

```sh
yarn add ai-chatbotfast
```

## Usage

Import and initialize the chatbot:

```javascript
const Chatbot = require('ai-chatbotfast');

const bot = new Chatbot({
  apiKey: 'your-api-key', // Replace with your actual API key
  model: 'gpt-3.5-turbo' // Choose a model version if applicable
});

bot.sendMessage('Hello, how are you?')
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

## Features

- 🔥 **Fast and lightweight** chatbot integration
- 🤖 Supports AI-based responses
- ⚡ Easy to set up and use
- 🛠 Configurable settings for different AI models

## Configuration

You can pass the following options when initializing the chatbot:

| Option  | Type   | Description |
|---------|--------|-------------|
| `apiKey` | `string` | Your API key for the AI model |
| `model`  | `string` | AI model to use (e.g., `gpt-3.5-turbo`) |
| `temperature` | `number` | Adjusts randomness in responses (default: `0.7`) |

Example:

```javascript
const bot = new Chatbot({
  apiKey: 'your-api-key',
  model: 'gpt-4',
  temperature: 0.9
});
```

## Contribution

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

MIT License © 2025 kanhaiya

