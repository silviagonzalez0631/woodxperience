import React from 'react';
import { useCarrito } from '../Pages/Context/CarrritoContext';
import '../css/CarritoCompra.css';

const CarritoCompra: React.FC = () => {
  const { carrito } = useCarrito(); // ← aquí obtienes los productos

  const subtotal = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const envioTotal = carrito.length * 159; // puedes ajustar lógica de envío
  const total = subtotal + envioTotal;

  return (
    <div className="carrito">
      <div className="carrito-header">
        <h3>Tu carrito</h3>
        <button className="cerrar-btn">✕</button>
      </div>

      <div className="carrito-items">
        {carrito.map((p) => (
          <div key={p.id} className="item">
            <img src={p.imagen} alt={p.titulo} />
            <div className="info">
              <h4>{p.titulo}</h4>
              <p>Precio: ${p.precio}</p>
              <p>Cantidad: {p.cantidad}</p>
              <p>Envío: $159</p>
            </div>
          </div>
        ))}
      </div>

      <div className="carrito-footer">
        <p>Subtotal: ${subtotal}</p>
        <p>Envío: ${envioTotal}</p>
        <h4>Total: ${total}</h4>
        <button className="btn-pagar">Continuar compra</button>
      </div>
    </div>
  );
};

export default CarritoCompra;
