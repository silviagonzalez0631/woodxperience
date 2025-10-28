import React from 'react';
import '../css/Nosotros.css';
import TarjetasInstitucionales from '../Components/TarjetasDeNosotros';
import ServiciosNosotros from '../Components/ServiciosNosotros';
import SeccionPrincipalNosotros from '../Components/SeccionPrincipalNosotros';
import IluminacionNatural from '../Components/IluminacionNatural';

const NosotrosPC: React.FC = () => {
  return (
    <div className="nosotros-container">
      {/* Banner institucional */}
      <section className="bannerNosotros">
      <div className="bannerNosotros_contenido">
        <div className="bannerNosotros_texto">
          <h1>Bienvenido a WoodXperience</h1>
          <p>
            Donde la tecnología se encuentra con la calidez de la madera. 
            Descubre cómo transformamos ideas en experiencias tangibles.
          </p>
        </div>
        <div className="bannerNosotros_imagen">
          <img src="/imagenes/CarpinteroBanner.jpg" alt="Banner institucional WoodXperience" />
        </div>
      </div>
    </section>

      {/* Sección Principal */}
      <SeccionPrincipalNosotros />
      {/* Tarjetas institucionales */}
      <TarjetasInstitucionales />
      {/* Sección de Servicios */}
      <ServiciosNosotros />

      {/* Sección Iluminación con estilo natural */}
      <IluminacionNatural />


      
    </div>
  );
};

export default NosotrosPC;
