import React from 'react';
import { useCarrito } from '../Pages/Context/CarrritoContext';

const ToastCarrito: React.FC = () => {
  const { toastVisible, ultimoAgregado } = useCarrito();

  if (!toastVisible || !ultimoAgregado) return null;

  return (
    <div className="toast-carrito show">
      <div className="toast-content">
        <div className="toast-icon">🛒</div>
        <div className="toast-text">
          <strong>Agregado al carrito</strong>
          <div className="toast-title">{ultimoAgregado.titulo}</div>
        </div>
      </div>
    </div>
  );
};

export default ToastCarrito;
