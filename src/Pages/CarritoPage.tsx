import React from 'react';
import { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../Pages/Context/CarrritoContext';
import '../css/CarritoPage.css';

    const CarritoPage: React.FC = () => {
    const { carrito, actualizarCantidad, eliminarProducto } = useCarrito();
    const navigate = useNavigate();
    useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);



    if (carrito.length === 0) {
    return (
        <div className="carrito-vacio">
        <h2>Tu carrito de compras</h2>
        <p>Tu carrito está vacío. Agrega productos para continuar.</p>
        </div>
    );
    }

    const handleComprar = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        navigate("/login"); // redirige sin alertas
        return;
    }

    if (carrito.length === 0) {
        navigate("/productos"); // o muestra un mensaje en pantalla
        return;
    }

    try {
        const productos = carrito.map((p) => ({
        productoId: p.id,
        cantidad: p.cantidad,
        precio: p.precio,
        }));

        const subtotal = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
        const envioTotal = carrito.length * 159;
        const total = subtotal + envioTotal;

        const res = await fetch("http://localhost:8001/crear-orden", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            productos,
            envio: envioTotal,
            total,
        }),
        });

        const data = await res.json();

        if (res.status === 403 && data.redirigir) {
        navigate(data.redirigir); // redirige al formulario de dirección
        return;
        }

        if (data.success) {
        navigate(`/pago/${data.id}`); // redirige al pago
        } else {
        console.error("Error al crear la orden:", data.error);
        }
    } catch (error) {
        console.error("Error de conexión al comprar:", error);
    }
    };




    const subtotal = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    const envioTotal = carrito.length * 159;
    const total = subtotal + envioTotal;

    return (
        <div className="carrito-page">
        <main className="carrito-grid">
            {carrito.length === 0 ? (
            <div className="carrito-vacio">
                <h2>Tu carrito de compras</h2>
                <p>Tu carrito está vacío. Agrega productos para continuar.</p>
            </div>
            ) : (
            <>
                <section className="carrito-productos">
                <h2>Productos en tu carrito</h2>
                <div className="carrito-lista">
                    {carrito.map((p) => (
                    <div key={p.id} className="carrito-page-item">
                        <img src={p.imagen} alt={p.titulo} />
                        <div className="carrito-page-info">
                        <h4>{p.titulo}</h4>

                        <div className="cantidad-precio">
                            <div className="cantidad-control">
                            <button
                                onClick={() =>
                                p.cantidad > 1 && actualizarCantidad(p.id, p.cantidad - 1)
                                }
                            >
                                
                            </button>
                            <span>{p.cantidad}</span>
                            <button onClick={() => actualizarCantidad(p.id, p.cantidad + 1)}>
                                +
                            </button>
                            </div>
                            <p className="precio-unitario">
                            ${(p.precio * p.cantidad).toLocaleString()}
                            </p>
                        </div>

                        <p className="envio">Envío: $159</p>

                        <button className="btn-eliminar-inline" onClick={() => eliminarProducto(p.id)}>
                            Eliminar producto
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
                </section>

                <aside className="carrito-resumen">
                <h3>Resumen de compra</h3>
                <p>Subtotal: ${subtotal.toLocaleString()}</p>
                <p>Envío: ${envioTotal.toLocaleString()}</p>
                <h4>Total: ${total.toLocaleString()}</h4>
                <button className="btn-finalizar" onClick={handleComprar}>¡Comprar!</button>
                <button className="btn-regresar" onClick={() => navigate('/productos')}>
                    ← Regresar a productos
                </button>
                <button className="btn-cupon">Ingresar código de descuento</button>
                
                </aside>
            </>
            )}
        </main>
        </div>
    );
    };

export default CarritoPage;