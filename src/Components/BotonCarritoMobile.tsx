// src/components/BotonCarritoMobile.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCarrito } from '../Pages/Context/CarrritoContext';

const BotonCarritoMobile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const { toastVisible } = useCarrito();

  return (
    <>
      <button
        className={`boton-carrito-flotante ${isActive('/carrito') ? 'activo' : ''} ${toastVisible ? 'pulse' : ''}`}
        onClick={() => navigate('/carrito')}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="21" r="1" stroke="currentColor" strokeWidth="2"/>
          <circle cx="20" cy="21" r="1" stroke="currentColor" strokeWidth="2"/>
          <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <span className="texto-carrito">Carrito</span>
    </>
  );
};

export default BotonCarritoMobile;