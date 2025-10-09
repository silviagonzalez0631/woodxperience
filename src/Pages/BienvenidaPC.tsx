// BienvenidaPC.tsx
import React from 'react';

// Importar las imágenes directamente
import imagen1 from '/imagenes/53640ca5041335d934de074b3f8d760a.jpg';
import imagen2 from '/imagenes/18d5a056241554bff84bb5c034837fb1.png';
import imagen3 from '/imagenes/3-1024x768.jpeg';
import imagen4 from '/imagenes/63f6968fee52c-035_NT_AZC-CPT-JMC-122022-4-(1)_11zon.jpg';
import imagen5 from '/imagenes/herramientas-de-carpinteria.webp';

const BienvenidaPC: React.FC = () => {
  return (
    <section className="seccion-bienvenida-pc">
      <div className="contenedor-bienvenida">
        {/* Columna izquierda - Texto */}
        <div className="columna-izquierda">
          <p className="subtitulo-bienvenida">¡BIENVENIDO A UNA EXPERIENCIA INOLVIDABLE!</p>
          
          
          <div className="descripcion-bienvenida">
            <p>Descubre el poder de la madera como nunca antes: explora, gira y sumérgete en cada detalle con visualización inmersiva en 3D.</p>
            <p> Diseña tu espacio, elige tus piezas y vive una experiencia que transforma lo natural en extraordinario.</p>
          </div>

          <div className="boton-bienvenida">
          <button className="boton-cta" onClick={() => console.log("Ir a productos")}>
            ¡COMPRA TUS PRODUCTOS Y DISFRUTA!
          </button>
        </div>

        </div>

        {/* Columna derecha - Grid de imágenes */}
        <div className="columna-derecha">
          {/* Primera fila - 2 imágenes */}
          <div className="fila-superior">
            <div className="espacio-imagen">
              <img 
                src={imagen1} 
                alt="Producto de madera" 
              />
            </div>
            <div className="espacio-imagen">
              <img 
                src={imagen2} 
                alt="Herramientas de carpintería" 
              />
            </div>
          </div>
          
          {/* Segunda fila - 3 imágenes */}
          <div className="fila-inferior">
            <div className="espacio-imagen">
              <img 
                src={imagen3} 
                alt="Mueble de madera" 
              />
            </div>
            <div className="espacio-imagen">
              <img 
                src={imagen4} 
                alt="Trabajo artesanal" 
              />
            </div>
            <div className="espacio-imagen">
              <img 
                src={imagen5} 
                alt="Proyecto en madera" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BienvenidaPC;