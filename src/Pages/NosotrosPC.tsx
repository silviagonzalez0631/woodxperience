// src/pages/NosotrosPC.tsx
import React from 'react';
import '../css/Nosotros.css';

// Importar las imágenes
import cocinaImagen from '/imagenes/cocina-madera-9c529749.jpeg';
import diseno1 from '/imagenes/1-6-1024x768.jpg';
import diseno2 from '/imagenes/14-1024x683.jpg';
import producto1 from '/imagenes/18-1024x575.jpg';
import producto2 from '/imagenes/18d5a056241554bff84bb5c034837fb1.png';
import producto3 from '/imagenes/1E1E013A-7731-421A-A227-668AB5D4ADEE.webp';

const NosotrosPC: React.FC = () => {
  return (
    <div className="nosotros-container">
      {/* Sección Cocinas a Medida - Estructura vertical */}
      <section className="cocinas-medida-section">
        <div className="cocinas-vertical">
          {/* Parte superior: Título y descripción corta */}
          <div className="cocinas-superior">
            <h2>Cocinas a Medida: Elegancia funcional para el Hogar Moderno</h2>
            <p className="intro-text">
              Descubre cómo la carpintería de diseño transforma el corazón de tu casa en un lugar práctico y acogedor.
            </p>
          </div>
          
          {/* Parte central: Imagen */}
          <div className="cocinas-centro">
            <div className="cocinas-imagen">
              <img src={cocinaImagen} alt="Cocina moderna de diseño" />
            </div>
          </div>
          
          {/* Parte inferior: Texto largo */}
          <div className="cocinas-inferior">
            <div className="descripcion-texto">
              <p>
                <strong>La cocina es mucho más que un lugar para cocinar; es un centro de reunión, 
                una oficina improvisada y, a menudo, el corazón del hogar.</strong> Por eso, en WoodXperience, 
                diseñamos cocinas integradas que no solo son visualmente impactantes, sino también 
                perfectamente funcionales.
              </p>
              
              <p>
                Desde la selección de la madera, resistente y duradera, hasta los herrajes de última 
                generación, cada detalle está pensado para hacer tu vida más fácil. Invertir en una 
                cocina a medida es invertir en calidad de vida.
              </p>

              <p>
                Más allá de los grandes proyectos, nuestra pasión se refleja en los detalles. Cada 
                pieza de madera, como esta mesa auxiliar con forma natural o estas figuras decorativas, 
                lleva consigo el ritmo de la artesanía. Son objetos únicos que aportan calidez, carácter 
                y un toque orgánico a cualquier espacio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Las demás secciones se mantienen igual */}
      <section className="productos-destacados-section">
        <h2 className="titulo-seccion">Nuestros Trabajos Destacados</h2>
        
        <div className="productos-grid">
          <div className="producto-card">
            <div className="producto-imagen">
              <img src={producto1} alt="Decoración moderna" />
            </div>
            <div className="producto-info">
              <h3>Decoración en Moderna</h3>
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

      <section className="disenos-personalizados-section">
        <div className="disenos-content">
          <div className="diseno-item">
            <div className="diseno-texto">
              <h2>Diseños a medida para tu hogar</h2>
              <p>
                En WoodXperience fabricamos muebles y estructuras únicas que combinan funcionalidad 
                y estilo. Desde escaleras modernas hasta piezas personalizadas, la madera cobra vida 
                en cada rincón de tu casa.
              </p>
              <button className="btn-3d">Ver en 3D</button>
            </div>
            <div className="diseno-imagen">
              <img src={diseno1} alt="Diseños a medida" />
            </div>
          </div>
          
          <div className="diseno-item">
            <div className="diseno-texto">
              <h2>Iluminación con estilo natural</h2>
              <p>
                Dale un toque cálido y auténtico a tus espacios con nuestras lámparas y accesorios 
                de madera. Cada pieza está diseñada artesanalmente para que la naturaleza también 
                ilumine tu hogar.
              </p>
              <button className="btn-3d">Ver en 3D</button>
            </div>
            <div className="diseno-imagen">
              <img src={diseno2} alt="Iluminación con madera" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NosotrosPC;