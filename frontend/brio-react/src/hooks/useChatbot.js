// src/hooks/useChatbot.js

import { useState } from "react";

function useChatbot() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Estado para carregamento

  const sendMessage = async (text) => {
    const userMessage = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true); // Ativa o carregamento

    try {
      const response = await fetch("http://localhost:5001/generate-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: text }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      const botMessage = { sender: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMessage = {
        sender: "bot",
        text: "Erro ao se comunicar com o servidor.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false); // Desativa o carregamento
    }
  };

  return { messages, sendMessage, isLoading };
}

export default useChatbot;
