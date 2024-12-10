import PropTypes from 'prop-types';
import { useState } from "react";
import "../styles/chatbot-footer.css";

function ChatbotFooter({ onSendMessage }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  // Função para capturar o Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend(); // Envia a mensagem ao pressionar Enter
    }
  };

  return (
    <footer className="chatbot-footer">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown} // Detecta pressionamento de tecla
        placeholder="Qual é a sua dúvida?"
      />
      <button onClick={handleSend}>Enviar</button>
    </footer>
  );
}

ChatbotFooter.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
};

export default ChatbotFooter;
