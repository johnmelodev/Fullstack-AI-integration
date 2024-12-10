// src/components/LoadingIndicator.jsx

import '../styles/loading-indicator.css'; // Arquivo CSS para a animação

function LoadingIndicator() {
  return (
    <div className="loading-indicator">
      <div className="spinner"></div>
    </div>
  );
}

export default LoadingIndicator;
