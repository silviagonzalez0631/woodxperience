

// Inicio.tsx
import React from 'react';
import { useMobileDetect } from '../hooks/useMobileDetect';
import InicioMobile from './InicioMobile';
import BienvenidaPC from './BienvenidaPC';
import ProductosPC from './ProductosPC';

const Inicio: React.FC = () => {
  const isMobile = useMobileDetect();

  if (isMobile) {
    return (
      <div className="mobile-content">
        
        <InicioMobile />
      </div>
    );
  }

  // Versión PC
  return (
    <div className="pc-content">
      <BienvenidaPC />
      <ProductosPC />
    </div>
  );
};

export default Inicio;