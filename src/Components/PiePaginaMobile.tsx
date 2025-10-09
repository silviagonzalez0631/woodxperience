// src/components/PiePaginaMobile.tsx
import React from 'react';

const PiePaginaMobile: React.FC = () => {
  return (
    <footer className="pie-pagina-mobile">
      <div className="pie-pagina-content">
        <p>WOODXPERIENCE - MADERA QUE INSPIRA</p>
        <div className="enlaces-mobile">
          <a href="#contacto">Contacto</a>
          <a href="#terminos">Términos</a>
          <a href="#privacidad">Privacidad</a>
        </div>
      </div>
    </footer>
  );
};

export default PiePaginaMobile;