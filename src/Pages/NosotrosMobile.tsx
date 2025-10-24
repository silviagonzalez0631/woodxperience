// src/pages/NosotrosMobile.tsx
import React from 'react';
import '../css/NosotrosMobile.css';
import ServiciosMobile from '../Components/ServiciosNosotros';
import SeccionPrincipalNosotros from '../Components/SeccionPrincipalNosotros';
import TarjetasInstitucionales from '../Components/TarjetasDeNosotros';

// Importar imágenes
import iluminacionImagen from '/imagenes/14-1024x683.jpg';

const NosotrosMobile: React.FC = () => {
  return (
    <div className="nosotros-mobile-container">

      {/* Sección de Servicios */}
      <ServiciosMobile />

      {/* Sección principal */}
      <SeccionPrincipalNosotros />

      {/* Sección Misión, Visión, Valores */}
      <TarjetasInstitucionales />

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

    </div>
  );
};

export default NosotrosMobile;
