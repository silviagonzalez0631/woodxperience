import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useMobileDetect } from './hooks/useMobileDetect';
import AppContent from './AppContent';
import { CarritoProvider } from './Pages/Context/CarrritoContext'; // ← nuevo

function App() {
  const isMobile = useMobileDetect();

  return (
    <CarritoProvider>
      <Router>
        <AppContent isMobile={isMobile} />
      </Router>
    </CarritoProvider>
  );
}

export default App;
