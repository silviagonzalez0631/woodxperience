import React from 'react';
import { useCarrito } from '../Pages/Context/CarrritoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'; 

const ToastCarrito: React.FC = () => {
  const { toastVisible, ultimoAgregado } = useCarrito();

  if (!toastVisible || !ultimoAgregado) return null;

  return (
    <div className="toast-carrito show">
      <div className="toast-content">
        <div className="toast-icon">
          <FontAwesomeIcon icon={faCartShopping} />
        </div>
        <div className="toast-text">
          <strong>Agregado al carrito</strong>
          <div className="toast-title">{ultimoAgregado.titulo}</div>
        </div>
      </div>
    </div>
  );
};

export default ToastCarrito;
