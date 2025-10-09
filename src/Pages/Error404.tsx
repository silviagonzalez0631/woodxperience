import React from 'react';

const Error404: React.FC = () => {
  return (
    <div className="app-container">
      <div style={{padding: '2rem', textAlign: 'center'}}>
        <h1>404 - Página No Encontrada</h1>
        <p>La página que buscas no existe.</p>
      </div>
    </div>
  );
};

export default Error404;