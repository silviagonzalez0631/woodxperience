import React, { useEffect, useState } from 'react';

type Producto = {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  imagenes: string[];
};

const InicioMobile: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("http://localhost:8001/productos");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
        const productosConImagenes = json.data.map((p: Producto) => ({
          ...p,
          imagenes: Array.isArray(p.imagenes) ? p.imagenes : [],
          precio: typeof p.precio === "string" ? parseFloat(p.precio) : p.precio,
        }));

          setProductos(productosConImagenes);
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="mobile-content">
      <div className="section-header">
        <h2 className="section-titulo">Productos</h2>
      </div>

      <div className="productos-grid-mobile">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-card-mobile">
            <div className="producto-imagen-mobile">
              <img
                src={producto.imagenes?.[0] ?? "/imagenes/default.jpg"}
                alt={producto.titulo}
                className="producto-imagen-mobile-img"
              />
            </div>
            <h3 className="producto-titulo-mobile">{producto.titulo}</h3>
            <p className="producto-descripcion-mobile">{producto.descripcion}</p>
            <div className="producto-precio-mobile">
              ${producto.precio.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InicioMobile;
