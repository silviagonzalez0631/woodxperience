import React, { useEffect, useState } from 'react';

type Producto = {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  imagenes: string[];
};

const ProductosPC: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("http://localhost:8001/productos");
        const json = await res.json();
        if (json.success) {
          setProductos(json.data);
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <section className="seccion-productos-pc">
      <h2 className="titulo-productos-pc">Visualiza nuestros productos</h2>
      
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductosPC;
