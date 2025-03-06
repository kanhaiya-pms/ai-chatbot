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

```javascript
"use client";
import MyComponent from 'ai-chatbotfast';

function App() {
  return <MyComponent/>;
}

export default App;
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

MIT License © 2025 Kanhaiya

