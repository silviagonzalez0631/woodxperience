// src/components/BarraNavegacion.tsx
import React, { useEffect, useState } from 'react';
import { useMobileDetect } from '../hooks/useMobileDetect.tsx';
import { Link } from 'react-router-dom';
import Buscador from './Buscador';

const BarraNavegacion: React.FC = () => {
  const isMobile = useMobileDetect();
  const [usuario, setUsuario] = useState<{ nombre: string; email: string; rol: string } | null>(null);

  useEffect(() => {
    const actualizarUsuario = () => {
      const usuarioGuardado = localStorage.getItem("usuario");
      setUsuario(usuarioGuardado ? JSON.parse(usuarioGuardado) : null);
    };

    actualizarUsuario(); // ejecuta al montar

    const intervalo = setInterval(actualizarUsuario, 500); // revisa cada medio segundo
    window.addEventListener("storage", actualizarUsuario); // escucha cambios en otras pestañas

    return () => {
      clearInterval(intervalo);
      window.removeEventListener("storage", actualizarUsuario);
    };
  }, []);

  // Versión móvil
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

            <Buscador />

            <nav className="nav-mobile">
            <Link to="/" className="nav-link">Inicio</Link>

            {!usuario && (
              <Link to="/login" className="nav-link">Login</Link>
            )}

            {usuario && (
              <>
                <Link to="/productos" className="nav-link">Productos</Link>
                <Link to="/nosotros" className="nav-link">Sobre nosotros</Link>
                <Link to="/acerca" className="nav-link">Acerca de nosotros</Link>
                <Link to="/perfil" className="nav-link">Perfil</Link>
              </>
            )}
          </nav>


          </div>
        </header>
      </div>
    );
  }

  // Versión PC
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

      {!usuario && (
        <Link to="/login" className="nav-link-pc login">Login</Link>
      )}

      {usuario && (
        <>
          <Link to="/productos" className="nav-link-pc">Productos</Link>
          <Link to="/nosotros" className="nav-link-pc">Sobre Nosotros</Link>
          <Link to="/perfil" className="nav-link-pc">Perfil</Link>
        </>
      )}
    </nav>



      </header>
    </div>
  );
};

export default BarraNavegacion;
