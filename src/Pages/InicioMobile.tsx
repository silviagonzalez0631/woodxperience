// InicioMobile.tsx
import React from 'react';

const InicioMobile: React.FC = () => {
  const productos = [
    {
      titulo: "Soporte de cuchillos en forma medieval",
      rating: 4.9
    },
    {
      titulo: "Portabotellas en forma de ave", 
      rating: 4.8
    },
    {
      titulo: "Cuadro infantil de jirafas",
      rating: 4.5
    },
    {
      titulo: "Mesa de Madera",
      rating: 4.5
    },
    {
      titulo: "Maceteros rústicos",
      rating: 4.7
    },
    {
      titulo: "Figura WALL-E",
      rating: 4.8
    }
  ];

  return (
    <div className="mobile-content">
      <div className="section-header">
        <h2 className="section-titulo">Productos</h2>
      </div>
      
      <div className="productos-grid-mobile">
        {productos.map((producto, index) => (
          <div key={index} className="producto-card-mobile">
            <div className="producto-imagen-mobile">
              Imagen
            </div>
            <h3 className="producto-titulo-mobile">{producto.titulo}</h3>
            <div className="producto-rating-mobile">
              ★ {producto.rating}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InicioMobile;