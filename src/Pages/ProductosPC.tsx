import React, { useEffect, useState } from 'react';
import { useCarrito } from './Context/CarrritoContext'; // ajusta la ruta

type Producto = {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  imagenes: string[];
};

const ProductosPC: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const { agregarProducto } = useCarrito();

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

  const handleAgregar = (producto: Producto) => {
    const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/modal-carrito"; // ← redirige a tu nueva página
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
    <>
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

              <button 
                className="btn-agregar-carrito" 
                onClick={() => handleAgregar(producto)}
              >
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </section>

    </>
  );
};

export default ProductosPC;
