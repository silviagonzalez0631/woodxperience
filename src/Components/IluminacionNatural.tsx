// src/components/IluminacionNatural.tsx
import React from 'react';
import iluminacionImagen from '/imagenes/14-1024x683.jpg';
import '../css/Nosotros.css';
import '../css/NosotrosMobile.css';

    const IluminacionNatural: React.FC = () => {
    return (
        <section className="iluminacion-section">
        <div className="iluminacion-content">
            <div className="iluminacion-texto">
            <h2>Iluminación con estilo natural</h2>
            <p>
                Dale un toque cálido y auténtico a tus espacios con nuestras lámparas y 
                accesorios de madera. Cada pieza está diseñada artesanalmente para que 
                la naturaleza también ilumine tu hogar.
            </p>
            </div>
            <div className="iluminacion-imagen">
            <img src={iluminacionImagen} alt="Iluminación natural" />
            </div>
        </div>
        </section>
    );
    };

export default IluminacionNatural;
