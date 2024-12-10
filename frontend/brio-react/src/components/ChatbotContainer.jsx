// src/components/ChatbotContainer.jsx

import ChatbotHeader from "./ChatbotHeader";
import ChatbotContent from "./ChatbotContent";
import ChatbotFooter from "./ChatbotFooter";
import useChatbot from "../hooks/useChatbot";
import "../styles/chat-bot-container.css";

function ChatbotContainer() {
  const { messages, sendMessage, isLoading } = useChatbot();

  return (
    <div className="chatbot-container">
      <ChatbotHeader />
      <ChatbotContent messages={messages} isLoading={isLoading} /> {/* Passando isLoading */}
      <ChatbotFooter onSendMessage={sendMessage} />
    </div>
  );
}

export default ChatbotContainer;
