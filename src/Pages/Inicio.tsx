import React from 'react';
import { useMobileDetect } from '../hooks/useMobileDetect';
import InicioMobile from './InicioMobile';
import BienvenidaPC from './BienvenidaPC';
import ProductosPC from './ProductosPC';
import CarruselHero from '../Components/CarruselHero';
import procesoImagen from '/imagenes/3-1024x768.jpeg';
import diseno1 from '/imagenes/1-6-1024x768.jpg';
import diseno2 from '/imagenes/14-1024x683.jpg';
import '../css/Inicio.css';

const Inicio: React.FC = () => {
  const isMobile = useMobileDetect();
  const token = localStorage.getItem("token");
  const usuarioLogueado = !!token;

  if (isMobile) {
    return (
      <div className="mobile-content">
        <InicioMobile />
      </div>
    );
  }

  // Versión PC
return (
  <div className="pc-content">
    <BienvenidaPC />

    {usuarioLogueado && <CarruselHero />}
    {!usuarioLogueado && <ProductosPC />}

    {usuarioLogueado && (
      <>
        {/* Proceso Creativo */}
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

        {/* Inspiración visual: Diseños personalizados + Iluminación natural */}
        <section className="inspiracion-section">
          <div className="inspiracion-content">
            <div className="inspiracion-item">
              <div className="inspiracion-texto">
                <h2>Diseños a medida para tu hogar</h2>
                <p>
                  En WoodXperience fabricamos muebles y estructuras únicas que combinan funcionalidad 
                  y estilo. Desde escaleras modernas hasta piezas personalizadas, la madera cobra vida 
                  en cada rincón de tu casa.
                </p>
                <button className="btn-3d">Ver en 3D</button>
              </div>
              <div className="inspiracion-imagen">
                <img src={diseno1} alt="Diseños a medida" />
              </div>
            </div>

            <div className="inspiracion-item">
              <div className="inspiracion-texto">
                <h2>Iluminación con estilo natural</h2>
                <p>
                  Dale un toque cálido y auténtico a tus espacios con nuestras lámparas y accesorios 
                  de madera. Cada pieza está diseñada artesanalmente para que la naturaleza también 
                  ilumine tu hogar.
                </p>
                <button className="btn-3d">Ver en 3D</button>
              </div>
              <div className="inspiracion-imagen">
                <img src={diseno2} alt="Iluminación con madera" />
              </div>
            </div>
          </div>
        </section>
      </>
    )}
  </div>
);

};

export default Inicio;
