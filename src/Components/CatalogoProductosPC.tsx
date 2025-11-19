    import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import { getBackendAssetUrl } from '../Pages/imageUtils';
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

    return (
        <section className="productos-destacados-section">
        <h2 className="titulo-seccion">Catálogo de Productos</h2>

        <div className="productos-grid">
            {productos.map((producto) => (
            <div
                key={producto.id}
                className="producto-card"
                onClick={() => irADetalle(producto.id)}
                style={{ cursor: 'pointer' }}
            >
                <div className="producto-imagen">
                <img
                    src={getBackendAssetUrl(producto.imagenes?.[0])}
                    alt={producto.titulo}
                />
                </div>
                <div className="producto-info">
                <h3>{producto.titulo}</h3>
                <p>{producto.descripcion.length > 100 ? producto.descripcion.slice(0, 100) + '...' : producto.descripcion}</p>

                <div className="producto-precio">${producto.precio.toLocaleString()}</div>
                <button
                    className="btn-3d"
                    onClick={(e) => {
                    e.stopPropagation();
                    irADetalle(producto.id);
                    }}
                >
                    Ver detalles
                </button>
                </div>
            </div>
            ))}
        </div>
        </section>
    );
    };

    export default CatalogoProductosPC;
