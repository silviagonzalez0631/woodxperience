// src/pages/AcercaDeMobile.tsx
import React from 'react';
import '../css/AcercaDeMobile.css';

const AcercaDeMobile: React.FC = () => {
  return (
    <div className="acerca-de-mobile-container">
      {/* Título Principal */}
      <section className="titulo-acerca-mobile">
        <h1>Acerca de nosotros</h1>
      </section>

      {/* Descripción Principal */}
      <section className="descripcion-section-mobile">
        <div className="descripcion-content-mobile">
          <p>
            En WoodXperience! creemos que la madera tiene el poder de transformar espacios 
            y contar historias. Somos una carpintería que nació con la pasión de dar forma 
            a cada pieza con dedicación, creatividad y respeto por este noble material.
          </p>
        </div>
      </section>

      {/* Sección de Contacto */}
      <section className="contacto-section-mobile">
        <h2 className="titulo-contacto-mobile">Ponte en contacto conmigo</h2>
        
        <div className="formulario-contacto-mobile">
          {/* Campos de Nombre y Apellido en línea */}
          <div className="campos-en-linea-mobile">
            <div className="campo-grupo-mobile">
              <label className="etiqueta-campo-mobile">Nombre</label>
              <div className="campo-valor-mobile">Jane</div>
            </div>
            <div className="campo-grupo-mobile">
              <label className="etiqueta-campo-mobile">Apellido</label>
              <div className="campo-valor-mobile">Sintinerton</div>
            </div>
          </div>

          {/* Campo Email */}
          <div className="campo-grupo-mobile">
            <label className="etiqueta-campo-mobile">Dirección de correo electrónico</label>
            <div className="campo-valor-mobile">email@janesfakedomain.net</div>
          </div>

          {/* Campo Mensaje */}
          <div className="campo-grupo-mobile">
            <label className="etiqueta-campo-mobile">Tu mensaje</label>
            <textarea 
              className="campo-textarea-mobile"
              placeholder="Introduce tu pregunta o mensaje"
              rows={4}
            />
          </div>

          {/* Botón Enviar */}
          <button className="btn-enviar-mobile">
            Enviar Mensaje
          </button>
        </div>
      </section>

      {/* Información Adicional */}
      <section className="info-adicional-mobile">
        <div className="info-card-mobile">
          <h3>Nuestra Misión</h3>
          <p>
            Crear piezas únicas que combinen la belleza natural de la madera con 
            el diseño contemporáneo, siempre manteniendo los más altos estándares 
            de calidad y sostenibilidad.
          </p>
        </div>
        
        <div className="info-card-mobile">
          <h3>Horarios de Atención</h3>
          <p>
            Lunes a Viernes: 8:00 AM - 6:00 PM<br/>
            Sábados: 9:00 AM - 2:00 PM<br/>
            Domingos: Cerrado
          </p>
        </div>
      </section>
    </div>
  );
};

export default AcercaDeMobile;