import React from 'react';
import { useCarrito } from '../Pages/Context/CarrritoContext'; // ajusta la ruta

    type Producto = {
    id: number;
    titulo: string;
    descripcion: string;
    precio: number;
    imagenes: string[];
    };

    type Props = {
    productos: Producto[];
    };

    const CatalogoProductosPC: React.FC<Props> = ({ productos }) => {
    const { agregarProducto } = useCarrito();

    const handleAgregar = (producto: Producto) => {
        const token = localStorage.getItem("token");

        if (!token) {
        window.location.href = "/modal-carrito";
        return;
        }

        agregarProducto({
        id: producto.id,
        titulo: producto.titulo,
        precio: producto.precio,
        imagen: producto.imagenes?.[0] ?? "/imagenes/default.jpg",
        cantidad: 1,
        });
    };

    return (
        <div className="grid-productos-pc">
        {productos.map((producto) => (
            <div key={producto.id} className="producto-card-pc">
            <div className="producto-imagen-container">
                <img
                src={producto.imagenes?.[0] ?? "/imagenes/default.jpg"}
                alt={producto.titulo}
                className="producto-imagen-pc"
                />
            </div>
            <h3 className="producto-titulo-pc">{producto.titulo}</h3>
            <p className="producto-descripcion-pc">{producto.descripcion}</p>
            <div className="producto-precio-pc">${producto.precio.toLocaleString()}</div>

            <button
                className="btn-agregar-carrito"
                onClick={() => handleAgregar(producto)}
            >
                Agregar al carrito
            </button>
            </div>
        ))}
        </div>
    );
    };

export default CatalogoProductosPC;
