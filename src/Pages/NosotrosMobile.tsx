// src/pages/NosotrosMobile.tsx
import React from 'react';
import '../css/NosotrosMobile.css';

// Importar imágenes
import cocinaImagen from '/imagenes/5a0b3c8baf8d29bed046aa4f36edb86e_0.jpg';
import disenoImagen from '/imagenes/1-6-1024x768.jpg';
import iluminacionImagen from '/imagenes/14-1024x683.jpg';


const NosotrosMobile: React.FC = () => {
  return (
    <div className="nosotros-mobile-container">
      {/* Título Principal */}
      <section className="titulo-principal-mobile">
        <h1>Conoce Nuestros Trabajos</h1>
      </section>

      {/* Sección de Servicios */}
      <section className="servicios-section-mobile">
        <h2 className="titulo-servicios-mobile">Nuestros Servicios</h2>
        
        <div className="servicios-lista-mobile">
          {/* Servicio 1 */}
          <div className="servicio-item-mobile">
            <div className="servicio-header-mobile">
              <h3>Muebles Personalizados</h3>
            </div>
            <div className="servicio-content-mobile">
              <p>
                Diseñamos y fabricamos piezas únicas que se adaptan a tus necesidades y estilo. 
                Desde mesas hasta armarios a medida.
              </p>
            </div>
          </div>

          {/* Servicio 2 */}
          <div className="servicio-item-mobile">
            <div className="servicio-header-mobile">
              <h3>Diseño de Interiores</h3>
            </div>
            <div className="servicio-content-mobile">
              <p>
                Integramos la madera en proyectos de remodelación y decoración para dar 
                calidez y carácter a tus espacios.
              </p>
            </div>
          </div>

          {/* Servicio 3 */}
          <div className="servicio-item-mobile">
            <div className="servicio-header-mobile">
              <h3>Construcción en Madera</h3>
            </div>
            <div className="servicio-content-mobile">
              <p>
                Desarrollamos desde pequeños proyectos hasta grandes estructuras como 
                pérgolas, decks o cabañas, siempre con materiales de calidad.
              </p>
            </div>
          </div>

          {/* Servicio 4 */}
          <div className="servicio-item-mobile">
            <div className="servicio-header-mobile">
              <h3>Restauración de Muebles</h3>
            </div>
            <div className="servicio-content-mobile">
              <p>
                Damos nueva vida a tus muebles antiguos o desgastados. Con técnicas de 
                restauración y acabados modernos, transformamos cada pieza en algo único 
                y funcional, listo para seguir contando historias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Cocinas a Medida */}
      <section className="cocinas-section-mobile">
        <div className="cocinas-content-mobile">
          <h2>Cocinas a Medida: Elegancia funcional para el Hogar Moderno</h2>
          
          <div className="cocinas-texto-mobile">
            <p className="cita-mobile">
              "La cocina es mucho más que un lugar para cocinar, es un centro de reunión, 
              una oficina improvisada y, a menudo, el corazón del hogar. Por eso, en 
              WoodXperience, diseñamos cocinas integradas que no solo son visualmente 
              impactantes, sino también perfectamente funcionales."
            </p>

            <p>
              Desde la selección de las maderas, resistentes y duraderas, hasta los 
              herrajes de última generación, cada detalle está pensado para hacer tu 
              vida más fácil. Invertir en una cocina a medida es invertir en calidad de vida.
            </p>

            <p>
              Más allá de los grandes proyectos, nuestra pasión se refleja en los detalles. 
              Cada pieza de madera, como esta mesa auxiliar con forma natural o estas 
              figuras decorativas, lleva consigo el alma de la artesanía. Son objetos 
              únicos que aportan calidez, carácter y un toque orgánico a cualquier espacio.
            </p>
          </div>

          <div className="cocinas-imagen-mobile">
            <img src={cocinaImagen} alt="Cocina a medida moderna" />
          </div>
        </div>
      </section>

      {/* Sección Diseños a Medida */}
      <section className="disenos-section-mobile">
        <div className="disenos-content-mobile">
          <div className="disenos-imagen-mobile">
            <img src={disenoImagen} alt="Diseños a medida" />
          </div>
          
          <div className="disenos-texto-mobile">
            <h2>Diseños a medida para tu hogar</h2>
            <p>
              En WoodXperience fabricamos muebles y estructuras únicas que combinan 
              funcionalidad y estilo. Desde escaleras modernas hasta piezas personalizadas, 
              la madera cobra vida en cada rincón de tu casa.
            </p>
            <button className="btn-ver-3d-mobile">Ver en 3D</button>
          </div>
        </div>
      </section>

      {/* Sección Iluminación con estilo natural */}
      <section className="iluminacion-section-mobile">
        <div className="iluminacion-content-mobile">
          <div className="iluminacion-texto-mobile">
            <h2>Iluminación con estilo natural</h2>
            <p>
              Dale un toque cálido y auténtico a tus espacios con nuestras lámparas y 
              accesorios de madera. Cada pieza está diseñada artesanalmente para que 
              la naturaleza también ilumine tu hogar.
            </p>
          </div>
          <div className="iluminacion-imagen-mobile">
            <img src={iluminacionImagen} alt="Iluminación natural" />
          </div>
        </div>
      </section>

      {/* Sección Productos Destacados */}
      <section className="productos-destacados-mobile">
        <div className="productos-grid-mobile">
          {/* Producto 1 */}
          <div className="producto-card-mobile">
            <div className="producto-info-mobile">
              <h3>Decoración en Moderna</h3>
              <p>Un espacio para disfrutar de una convivencia agradable, en madera lisa y...</p>
              <div className="producto-precio-mobile">$ 500.000</div>
              <button className="btn-producto-mobile">Ver en 3D</button>
            </div>
          </div>
          
          {/* Producto 2 */}
          <div className="producto-card-mobile">
            <div className="producto-info-mobile">
              <h3>Llavero de Casa</h3>
              <div className="producto-precio-mobile">$ 70.000</div>
            </div>
          </div>
          
          {/* Producto 3 */}
          <div className="producto-card-mobile">
            <div className="producto-info-mobile">
              <h3>Casa estilo Clásico</h3>
              <p>Casa en Madera de Roble y construida en base a los diseños antiguos de la época...</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NosotrosMobile;