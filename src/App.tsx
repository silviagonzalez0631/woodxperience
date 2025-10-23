// src/App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useMobileDetect } from './hooks/useMobileDetect';
import AppContent from './AppContent'; 

function App() {
  const isMobile = useMobileDetect();

  return (
    <Router>
      <AppContent isMobile={isMobile} />
    </Router>
  );
}

export default App;
