
# AI Chatbot

A modern, real-time AI chatbot built with **React.js**, **Vite**, and **Tailwind CSS**, featuring a sleek, Figma-inspired user interface. The chatbot integrates with an **Ollama server** for instant query responses and includes features like chat history management, theme customization, and an interactive design to enhance user engagement.

## Features
- **Real-Time Chat**: Powered by an Ollama server for fast and accurate query responses.
- **Chat History**: Store and retrieve conversations using a JSON Server.
- **Chat Management**: Continue, rename, or delete previous chats.
- **Theme Customization**: Personalize the UI with customizable themes.
- **Modern UI**: Clean and interactive design built with Tailwind CSS, inspired by Figma.
- **Responsive Design**: Optimized for seamless use across devices.

## Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend Integration**: Ollama server for AI responses
- **Data Storage**: JSON Server for chat history
- **Design**: Figma-based UI

## Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [JSON Server](https://github.com/typicode/json-server) (for chat history storage)
- [Ollama Server](https://ollama.ai/) (for AI query processing)

## Installation

Follow these steps to set up and run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AmeneAhmadi/ai-chatbot.git
   cd chatbot
   ```

2. **Install Dependencies**:
   Using npm:
   ```bash
   npm install
   ```
   Or using yarn:
   ```bash
   yarn install
   ```

3. **Set Up JSON Server**:
   Start the JSON Server to manage chat history:
   ```bash
   npx json-server --watch public/db.json --port 5000
   ```

4. **Configure Ollama Server**:
   - Follow the [Ollama documentation](https://ollama.ai/) to set up and run the server locally or remotely.
   - Update the API endpoint in the project configuration (e.g., in `src/config.js`) to point to your Ollama server.

5. **Run the Development Server**:
   Start the Vite development server:
   ```bash
   npm run dev
   ```
   Or with yarn:
   ```bash
   yarn dev
   ```
   The app will be available at `http://localhost:5173` (or another port if specified).

6. **Build for Production** (optional):
   To create a production-ready build:
   ```bash
   npm run build
   ```
   The output will be in the `dist` folder.

## Usage
- Open the app in your browser.
- Start a new chat or continue a previous one.
- Use the settings to rename/delete chats or customize the theme.
- Enjoy a seamless and interactive AI chat experience!

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.


