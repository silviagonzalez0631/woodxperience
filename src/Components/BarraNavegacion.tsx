// src/components/BarraNavegacion.tsx (versión móvil actualizada)
import React from 'react';
import { useMobileDetect } from '../hooks/useMobileDetect.tsx';
import { Link } from 'react-router-dom';
import Buscador from './Buscador';

const BarraNavegacion: React.FC = () => {
  const isMobile = useMobileDetect();

  // En la versión móvil de BarraNavegacion.tsx
if (isMobile) {
  return (
    <div className="mobile-content">
      <header className="header">
        <div className="header-mobile">
          <div className="logo-container">
            <img 
              src="/imagenes/LogoWoodXperience.png" 
              alt="WOODXPERIENCE" 
              className="logo-img"
            />
            <div className="logo-subtitulo">
              MADERA QUE INSPIRA, TECNOLOGIA QUE TRANSFORMA
            </div>
          </div>
          
          {/* BUSCADOR AGREGADO AQUÍ */}
          <Buscador />
          
          <nav className="nav-mobile">
            <Link to="/" className="nav-link">Inicio</Link>
            <Link to="/productos" className="nav-link">Productos</Link>
            <Link to="/nosotros" className="nav-link">Sobre nosotros</Link>
            <Link to="/acerca" className="nav-link">Acerca de nosotros</Link>
          </nav>
        </div>
      </header>
    </div>
  );
}

  // Versión PC (se mantiene exactamente igual)
  return (
    <div className="pc-content">
      <header className="barra-navegacion-pc">
        <div className="logo-pc">
          <img 
            src="/imagenes/logocudo.png" 
            alt="WOODXPERIENCE" 
            className="logo-img-pc"
          />
          <div className="texto-logo-pc">
            <div className="nombre-logo-pc">WOODXPERIENCE</div>
            <div className="subtitulo-logo-pc">MADERA QUE INSPIRA, TECNOLOGIA QUE TRANSFORMA</div>
          </div>
        </div>
        
        <nav className="nav-pc">
          <Link to="/" className="nav-link-pc">Inicio</Link>
          <Link to="/productos" className="nav-link-pc">Productos</Link>
          <Link to="/nosotros" className="nav-link-pc">Sobre Nosotros</Link>
          <Link to="/login" className="nav-link-pc login">Login</Link>
        </nav>
      </header>
    </div>
  );
};

export default BarraNavegacion;