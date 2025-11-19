import React, { useEffect, useState } from 'react';
import CatalogoProductosPC from '../Components/CatalogoProductosPC';
import '../css/ProductosPage.css';
import destacado1 from '/imagenes/53640ca5041335d934de074b3f8d760a.jpg';
import destacado2 from '/imagenes/18d5a056241554bff84bb5c034837fb1.png';
import destacado3 from '/imagenes/5a0b3c8baf8d29bed046aa4f36edb86e_0.jpg';

type Producto = {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  imagenes: string[];
};

const ProductosPagePC: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
  const fetchProductos = async () => {
    try {
      const res = await fetch("http://localhost:8001/productos"); // ← URL actualizada
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setProductos(json.data);
      }
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  fetchProductos();
}, []);
  return (
    <div className="productos-page-container">
      {/* Llamado a la acción */}
      <section className="cta-section">
        <div className="cta-video-background">
          <video autoPlay muted loop playsInline>
            <source src="/videos/VideoMueblesFondo.mp4" type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
        </div>
        <div className="cta-content">
          <h2>¿Tienes una idea en mente?</h2>
          <p>Transformamos tus visiones en piezas tangibles de calidad excepcional</p>
          <div className="cta-buttons">
            <button className="cta-btn primary">Solicitar Cotización</button>
            <button className="cta-btn secondary">Ver Portafolio Completo</button>
          </div>
        </div>
      </section>

{/* Sección Productos Destacados */}
<section className="destacados-section">
  <div className="section-header">
    <h2 className="titulo-productos-pc">Productos Destacados</h2>
    <p>Explora nuestras piezas más solicitadas: escritorios, mesas, sillas y más</p>
  </div>

  <div className="destacados-grid">
    <div className="destacado-card featured">
      <div className="destacado-image">
        <img src={destacado1} alt="Escritorio moderno" />
        <div className="featured-badge">Más Popular</div>
      </div>
      <div className="destacado-content">
        <h3>Escritorio Moderno</h3>
        <p>Diseño funcional en madera clara, ideal para espacios de trabajo elegantes</p>
        <div className="precio-destacado">Desde $320.000</div>
        <button className="btn-destacado">Ver Detalles</button>
      </div>
    </div>

    <div className="destacado-card">
      <div className="destacado-image">
        <img src={destacado2} alt="Mesa comedor" />
      </div>
      <div className="destacado-content">
        <h3>Mesa de Comedor</h3>
        <p>Mesa robusta para 6 personas, acabados en roble natural y estilo clásico</p>
        <div className="precio-destacado">Desde $450.000</div>
        <button className="btn-destacado">Ver Detalles</button>
      </div>
    </div>

    <div className="destacado-card">
      <div className="destacado-image">
        <img src={destacado3} alt="Silla ergonómica" />
      </div>
      <div className="destacado-content">
        <h3>Silla Ergonómica</h3>
        <p>Comodidad y estilo en una pieza de madera curvada, perfecta para oficina o comedor</p>
        <div className="precio-destacado">Desde $180.000</div>
        <button className="btn-destacado">Ver Detalles</button>
      </div>
    </div>
  </div>
</section>


      {/* Catálogo completo con diseño heredado de trabajos destacados */}
      <CatalogoProductosPC productos={productos} />
    </div>
  );
};

export default ProductosPagePC;
