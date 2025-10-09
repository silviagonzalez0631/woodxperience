import React from 'react';
import { useParams } from 'react-router-dom';

const DetalleProducto: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="app-container">
      <div className="mobile-content">
        <div style={{padding: '1rem'}}>
          <h1>Detalle del Producto {id}</h1>
          <p>Página de detalle del producto</p>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;