import React, { useEffect, useState } from 'react';
import { useCarrito } from './Context/CarrritoContext';
import procesoImagen from '/imagenes/3-1024x768.jpeg';
import diseno1 from '/imagenes/1-6-1024x768.jpg';
import diseno2 from '/imagenes/14-1024x683.jpg';
import '../css/Inicio.css';

type Producto = {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  imagenes: string[];
};

const InicioMobile: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const token = localStorage.getItem("token");
  const usuarioLogueado = !!token;
  const { agregarProducto } = useCarrito();

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
    <div className="mobile-content">
      {!usuarioLogueado && (
        <>
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
                <button
                  className="btn-agregar-carrito-mobile"
                  onClick={() => handleAgregar(producto)}
                >
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {usuarioLogueado && (
        <>
          {/* Proceso Creativo */}
          <section className="proceso-section-mobile">
            <h2>Del Bosque a tu Hogar</h2>
            <div className="proceso-step-mobile">
              <h4>01. Selección Premium</h4>
              <p>Elegimos maderas de la más alta calidad, respetando siempre la sostenibilidad.</p>
            </div>
            <div className="proceso-step-mobile">
              <h4>02. Diseño Personalizado</h4>
              <p>Cada proyecto nace de tus necesidades y se adapta a tu espacio único.</p>
            </div>
            <div className="proceso-step-mobile">
              <h4>03. Artesanía Experta</h4>
              <p>Combinamos técnicas tradicionales con tecnología de vanguardia.</p>
            </div>
            <img src={procesoImagen} alt="Proceso creativo" className="proceso-imagen-mobile" />
          </section>

          {/* Inspiración visual */}
          <section className="inspiracion-mobile">
            <div className="inspiracion-item-mobile">
              <img src={diseno1} alt="Diseños a medida" />
              <h3>Diseños a medida para tu hogar</h3>
              <p>
                Fabricamos muebles y estructuras únicas que combinan funcionalidad y estilo. 
                Desde escaleras modernas hasta piezas personalizadas.
              </p>
              <button className="btn-ver-3d-mobile">Ver en 3D</button>
            </div>

            <div className="inspiracion-item-mobile">
              <img src={diseno2} alt="Iluminación natural" />
              <h3>Iluminación con estilo natural</h3>
              <p>
                Dale un toque cálido y auténtico a tus espacios con nuestras lámparas y accesorios de madera.
              </p>
              <button className="btn-ver-3d-mobile">Ver en 3D</button>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default InicioMobile;
