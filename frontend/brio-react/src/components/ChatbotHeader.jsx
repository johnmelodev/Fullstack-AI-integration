import logo from "../assets/logo-brio.png";
import "../styles/chatbot-header-style.css";

function ChatbotHeader() {
  return (
    <header className="chatbot-header">
      <img src={logo} alt="Logo Brio" />
      <h1>Brio AI</h1>
    </header>
  );
}

export default ChatbotHeader;
