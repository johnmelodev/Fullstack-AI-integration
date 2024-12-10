# Brio AI - Chatbot Application with Gemini AI Integration

## Description

**Brio AI** is a chatbot application designed to provide an interactive and seamless user experience. The project integrates **Gemini AI** for intelligent and dynamic responses to user queries. Using modern front-end and back-end technologies, this application enables real-time communication between users and the AI-powered chatbot.

### Key Features

- **Frontend**:
  - Interactive chatbot interface.
  - Loading messages displayed while the bot processes responses.
  - Dynamic display of user and bot messages.
  
- **Backend**:
  - Node.js server handling bot responses and integrating with Gemini AI.
  - Simple API to facilitate communication between the front-end and back-end.
  
- **Gemini AI Integration**:
  - The chatbot is powered by Gemini AI to ensure intelligent, context-aware responses.
  - Real-time interactions with Gemini AI, enhancing the quality of the chatbot’s answers.

The project uses modern technologies such as React, Node.js, and Gemini AI to ensure an optimized, scalable, and professional user experience.

## Technologies Used

- **Frontend**:
  - React.js
  - React Markdown
  - CSS (Custom Styles)
  
- **Backend**:
  - Node.js
  - Express (if used, can be modified based on needs)
  - Gemini AI API (for intelligent responses)
  
- **Other Technologies**:
  - npm (Node Package Manager)
  - Vite (for front-end bundling and optimization)

## How to Run the Project

### Prerequisites

Make sure you have **Node.js** and **npm** installed on your machine. If not, you can install Node.js from the [official website](https://nodejs.org/).

### Running the Backend

Install the necessary dependencies:

npm install

To run the backend server, use the following command:

node server.js

### Running the Frontend

Install the necessary dependencies:

npm install

To run the frontend server, use the following command:

npm run dev

### Project Structure

/brio-ai
├── /backend
│   ├── server.js         # Main backend file
│   ├── /node_modules     # Backend dependencies
│   └── gemini-ai.js      # Integration with Gemini AI API
│
├── /frontend
│   ├── /src
│   │   ├── /components   # React components
│   │   ├── /styles       # CSS styles
│   │   └── App.jsx       # Main React component
│   ├── index.html        # Main frontend HTML
│   ├── package.json      # Frontend dependencies
│   └── vite.config.js    # Vite configuration
│
├── README.md             # This documentation file
└── /node_modules         # Global project dependencies





