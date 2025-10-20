import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const BarraInferiorMobile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

const [usuario, setUsuario] = useState<{ nombre: string; email: string; rol: string } | null>(null);

useEffect(() => {
  const actualizarUsuario = () => {
    const usuarioGuardado = localStorage.getItem("usuario");
    setUsuario(usuarioGuardado ? JSON.parse(usuarioGuardado) : null);
  };

  actualizarUsuario(); // ejecuta al montar

  // escucha cambios en el storage desde otras pestañas
  window.addEventListener("storage", actualizarUsuario);

  // escucha cambios internos (cuando tú haces login o logout)
  const intervalo = setInterval(actualizarUsuario, 500); // revisa cada medio segundo

  return () => {
    window.removeEventListener("storage", actualizarUsuario);
    clearInterval(intervalo);
  };
}, []);



  const perfilItem = usuario
    ? {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
        label: "Perfil",
        path: "/perfil",
      }
    : {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 17l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
        label: "Login",
        path: "/Login",
      };

  const menuItems = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: "Inicio",
      path: "/",
    },
    perfilItem,
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: "Favoritos",
      path: "/favoritos",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      label: "Contacto",
      path: "/contacto",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="barra-inferior-mobile">
      {menuItems.map((item, index) => (
        <button
          key={index}
          className={`boton-barra ${isActive(item.path) ? 'activo' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <span className="icono-barra">{item.icon}</span>
          <span className="texto-barra">{item.label}</span>
          {isActive(item.path) && <div className="indicador-activo"></div>}
        </button>
      ))}
    </div>
  );
};

export default BarraInferiorMobile;
