import React from 'react';
import { useCarrito } from '../Pages/Context/CarrritoContext';
import '../css/CarritoCompra.css';
import { useNavigate } from 'react-router-dom';
import { getBackendAssetUrl } from '../Pages/imageUtils';

type Props = {
  onClose: () => void;
  className?: string;
};

const CarritoCompra: React.FC<Props> = ({ onClose, className = '' }) => {
  const { carrito } = useCarrito();
  const navigate = useNavigate();

  return (
    <div className={`carrito ${className}`}>
      <div className="carrito-header">
        <h3>Tu carrito</h3>
        <button className="cerrar-btn" onClick={onClose}>✕</button>
      </div>

      <div className="carrito-items">
        {carrito.map((p) => (
          <div key={p.id} className="carrito-preview-item simple">

          <div className="carrito-info-texto">
          <span className="carrito-nombre">{p.titulo}</span>
          <img src={getBackendAssetUrl(p.imagen)} alt={p.titulo} className="carrito-item-icono" />
        </div>

        </div>

        ))}
      </div>

      <div className="carrito-mensaje">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
          alt="Video icon"
          className="carrito-icono"
        />
        <p className="carrito-texto">
          ¡Le diste Click al carrito!<br />
          ¿Desea continuar con su compra?
        </p>
      </div>

      <div className="carrito-footer">
        <button
          className="btn-pagar"
          onClick={() => {
            onClose();
            navigate('/carrito');
          }}
        >
          Continuar compra
        </button>
      </div>
    </div>
  );
};

export default CarritoCompra;
