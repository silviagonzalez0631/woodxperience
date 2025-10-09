import React from 'react';

const Servicios: React.FC = () => {
  return (
    <div className="app-container">
      <div className="pagina-bienvenida">
        <div className="contenido-bienvenida">
          <h1 className="titulo-principal">WOODXPERIENCE</h1>
          <p className="subtitulo">MORTAL DEL NOMBRE, EXTRAORDENO DEL TRANSPECIAL</p>
          
          <div className="caja-destacada">
            <h2 style={{fontSize: '1.3rem', marginBottom: '1rem', color: '#5d4037'}}>
              ¡¡BIENVENIDO A UNA EXPERIENCIA INOLVIDABLE!
            </h2>
            
            <p style={{marginBottom: '1rem', lineHeight: '1.6', textAlign: 'left'}}>
              Descubre el poder de la madera como nunca antes: explora, gira y sumérgete 
              en cada detalle con visualización inmersiva en 3D. Diseña tu espacio, elige 
              tus piezas y vive una experiencia que transforma lo natural en extraordinario.
            </p>
            
            <p style={{fontWeight: 'bold', marginBottom: '1.5rem', color: '#8d6e63'}}>
              COMPRA TUS PRODUCTOS Y DISFRUTA!
            </p>
            
            <button className="boton-principal">
              Visualiza nuestros productos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servicios;