// src/pages/ProductosPagePC.tsx
import React from 'react';
import ProductosPC from './ProductosPC';
import '../css/ProductosPage.css';

// Importar imágenes
import heroImagen from '/imagenes/1-6-1024x768.jpg';
import destacado1 from '/imagenes/53640ca5041335d934de074b3f8d760a.jpg';
import destacado2 from '/imagenes/18d5a056241554bff84bb5c034837fb1.png';
import procesoImagen from '/imagenes/3-1024x768.jpeg';

const ProductosPagePC: React.FC = () => {
  return (
    <div className="productos-page-container">
      {/* Hero Section Moderna */}
      <section className="productos-hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Descubre la Magia de la Madera</h1>
            <p className="hero-subtitle">
              Donde la tradición artesanal se encuentra con el diseño innovador
            </p>
            <p className="hero-description">
              Cada pieza cuenta una historia única, creada con pasión y perfeccionada con precisión. 
              Transformamos la madera en experiencias que perduran.
            </p>
            <button className="hero-cta-btn">Explorar Colección</button>
          </div>
          <div className="hero-image">
            <img src={heroImagen} alt="Artesanía en madera" />
          </div>
        </div>
      </section>

      {/* Sección Destacados */}
      <section className="destacados-section">
        <div className="section-header">
          <h2>Piezas Exclusivas</h2>
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

      {/* Sección Proceso Creativo */}
      <section className="proceso-section">
        <div className="proceso-content">
          <div className="proceso-text">
            <h2>Del Bosque a tu Hogar</h2>
            <div className="proceso-steps">
              <div className="proceso-step">
                <div className="step-number">01</div>
                <div className="step-content">
                  <h4>Selección Premium</h4>
                  <p>Elegimos maderas de la más alta calidad, respetando siempre la sostenibilidad</p>
                </div>
              </div>
              <div className="proceso-step">
                <div className="step-number">02</div>
                <div className="step-content">
                  <h4>Diseño Personalizado</h4>
                  <p>Cada proyecto nace de tus necesidades y se adapta a tu espacio único</p>
                </div>
              </div>
              <div className="proceso-step">
                <div className="step-number">03</div>
                <div className="step-content">
                  <h4>Artesanía Experta</h4>
                  <p>Combinamos técnicas tradicionales con tecnología de vanguardia</p>
                </div>
              </div>
            </div>
          </div>
          <div className="proceso-image">
            <img src={procesoImagen} alt="Proceso de creación" />
          </div>
        </div>
      </section>

      {/* Llamado a la acción */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>¿Tienes una idea en mente?</h2>
          <p>Transformamos tus visiones en piezas tangibles de calidad excepcional</p>
          <div className="cta-buttons">
            <button className="cta-btn primary">Solicitar Cotización</button>
            <button className="cta-btn secondary">Ver Portafolio Completo</button>
          </div>
        </div>
      </section>

      {/* Tu componente ProductosPC existente - Se mantiene igual */}
      <ProductosPC />
    </div>
  );
};

export default ProductosPagePC;