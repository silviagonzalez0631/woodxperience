// src/Pages/CarritoPage.tsx
import React from 'react';
import { useCarrito } from '../Pages/Context/CarrritoContext';
import BarraNavegacion from '../Components/BarraNavegacion';
import PiePagina from '../Components/PiePagina';
import '../css/CarritoPage.css';

    const CarritoPage: React.FC = () => {
    const { carrito } = useCarrito();

    const subtotal = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    const envioTotal = carrito.length * 159;
    const total = subtotal + envioTotal;

    return (
        <div className="carrito-page">
        <BarraNavegacion />
        <main className="carrito-contenido">
            <h2>Tu carrito de compras</h2>

            {carrito.length === 0 ? (
            <p className="carrito-vacio">Tu carrito está vacío. Agrega productos para continuar.</p>
            ) : (
            <>
                <div className="carrito-lista">
                {carrito.map((p) => (
                    <div key={p.id} className="carrito-item">
                    <img src={p.imagen} alt={p.titulo} />
                    <div className="carrito-info">
                        <h4>{p.titulo}</h4>
                        <p>Precio: ${p.precio.toLocaleString()}</p>
                        <p>Cantidad: {p.cantidad}</p>
                        <p>Envío: $159</p>
                    </div>
                    </div>
                ))}
                </div>

                <div className="carrito-resumen">
                <p>Subtotal: ${subtotal.toLocaleString()}</p>
                <p>Envío: ${envioTotal.toLocaleString()}</p>
                <h3>Total: ${total.toLocaleString()}</h3>
                <button className="btn-finalizar">Continuar compra</button>
                </div>
            </>
            )}
        </main>
        <PiePagina />
        </div>
    );
};

export default CarritoPage;
