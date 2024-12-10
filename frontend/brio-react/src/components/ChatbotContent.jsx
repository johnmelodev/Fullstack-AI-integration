import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import { useEffect, useRef } from "react";
import LoadingIndicator from "./LoadingIndicator"; // Importando o componente de carregamento
import "../styles/chatbot-content.css";

function ChatbotContent({ messages, isLoading }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chatbot-content" ref={contentRef}>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`${
            msg.sender === "user" ? "user-message" : "bot-message"
          } break-word`} // Aplica a classe break-word aqui
        >
          <ReactMarkdown>{msg.text}</ReactMarkdown>
        </div>
      ))}

      {isLoading && (
        <div className="loading-message">
          <LoadingIndicator /> {/* Exibe o carregamento */}
        </div>
      )}
    </div>
  );
}

ChatbotContent.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,  // Propriedade para controlar o carregamento
};

export default ChatbotContent;
