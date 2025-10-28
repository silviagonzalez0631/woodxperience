import React, { useEffect, useState } from 'react';
import CatalogoProductosPC from '../Components/CatalogoProductosPC';
import '../css/ProductosPage.css';

import destacado1 from '/imagenes/53640ca5041335d934de074b3f8d760a.jpg';
import destacado2 from '/imagenes/18d5a056241554bff84bb5c034837fb1.png';
import producto1 from '/imagenes/18-1024x575.jpg';
import producto2 from '/imagenes/18d5a056241554bff84bb5c034837fb1.png';
import producto3 from '/imagenes/1E1E013A-7731-421A-A227-668AB5D4ADEE.webp';

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
        const res = await fetch("http://localhost:8001/productos");
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

      {/* Sección Destacados */}
      <section className="destacados-section">
        <div className="section-header">
          <h2 className="titulo-productos-pc">Piezas Exclusivas</h2>
          <p>Selección especial de nuestras creaciones más solicitadas</p>
        </div>
        
        <div className="destacados-grid">
          <div className="destacado-card featured">
            <div className="destacado-image">
              <img src={destacado1} alt="Mueble destacado" />
              <div className="featured-badge">Más Popular</div>
            </div>
            <div className="destacado-content">
              <h3>Colección Signature</h3>
              <p>Línea exclusiva donde el arte y la funcionalidad se fusionan en perfecta armonía</p>
              <div className="precio-destacado">Desde $90.000</div>
              <button className="btn-destacado">Ver Detalles</button>
            </div>
          </div>

          <div className="destacado-card">
            <div className="destacado-image">
              <img src={destacado2} alt="Decoración artesanal" />
            </div>
            <div className="destacado-content">
              <h3>Arte en Miniatura</h3>
              <p>Pequeñas obras maestras que agregan carácter a cualquier espacio</p>
              <div className="precio-destacado">Desde $50.000</div>
              <button className="btn-destacado">Descubrir</button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Trabajos Destacados */}
      <section className="productos-destacados-section">
        <h2 className="titulo-seccion">Nuestros Trabajos Destacados</h2>
        
        <div className="productos-grid">
          <div className="producto-card">
            <div className="producto-imagen">
              <img src={producto1} alt="Decoración moderna" />
            </div>
            <div className="producto-info">
              <h3>Decoración Moderna</h3>
              <p>Un espacio para disfrutar de una convivencia agradable, en madera lisa y...</p>
              <div className="producto-precio">$ 500.000</div>
              <button className="btn-3d">Ver en 3D</button>
            </div>
          </div>
          
          <div className="producto-card">
            <div className="producto-imagen">
              <img src={producto2} alt="Llavero de casa" />
            </div>
            <div className="producto-info">
              <h3>Llavero de Casa</h3>
              <p>Llavero de sala para las llaves en madera oscura y diseño abstracto, a colocar en la sala o entrada principal muestra de...</p>
              <div className="producto-precio">$ 70.000</div>
              <button className="btn-3d">Ver en 3D</button>
            </div>
          </div>
          
          <div className="producto-card">
            <div className="producto-imagen">
              <img src={producto3} alt="Casa estilo clásico" />
            </div>
            <div className="producto-info">
              <h3>Casa estilo Clásico</h3>
              <p>Casa en Madera de Roble y construida en base a los diseños antiguos de la época para...</p>
              <div className="producto-precio">$ 40.000.000</div>
              <button className="btn-3d">Ver en 3D</button>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo completo */}
      <CatalogoProductosPC productos={productos} />
    </div>
  );
};

export default ProductosPagePC;
