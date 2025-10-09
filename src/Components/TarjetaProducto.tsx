import React from 'react';

interface TarjetaProductoProps {
  titulo: string;
  rating: number;
}

const TarjetaProducto: React.FC<TarjetaProductoProps> = ({ titulo, rating }) => {
  return (
    <div className="producto-card">
      <h3 className="producto-titulo">{titulo}</h3>
      <div className="producto-rating">
        {'★'.repeat(5)} {rating}
      </div>
    </div>
  );
};

export default TarjetaProducto;