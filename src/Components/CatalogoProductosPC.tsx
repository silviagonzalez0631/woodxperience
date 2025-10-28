    import React from 'react';
    import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    const irADetalle = (id: number) => {
        navigate(`/producto/${id}`);
    };

    //Función para construir la URL de la imagen desde backend
    const getImagenUrl = (path?: string) => {
        if (!path) return "/imagenes/default.jpg";
        if (path.startsWith("http")) return path;
        return `http://localhost:8001${path}`;
    };

    return (
        <div className="grid-productos-pc">
        {productos.map((producto) => (
            <div
            key={producto.id}
            className="producto-card-pc"
            onClick={() => irADetalle(producto.id)}
            style={{ cursor: 'pointer' }}
            >
            <div className="producto-imagen-container">
                <img
                src={getImagenUrl(producto.imagenes?.[0])}
                alt={producto.titulo}
                className="producto-imagen-pc"
                />
            </div>
            <h3 className="producto-titulo-pc">{producto.titulo}</h3>
            <p className="producto-descripcion-pc">{producto.descripcion}</p>
            <div className="producto-precio-pc">${producto.precio.toLocaleString()}</div>

            <button
                className="btn-ver-detalles"
                onClick={(e) => {
                e.stopPropagation(); 
                irADetalle(producto.id);
                }}
            >
                Ver detalles
            </button>
            </div>
        ))}
        </div>
    );
    };

    export default CatalogoProductosPC;
