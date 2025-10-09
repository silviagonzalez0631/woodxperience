import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const BotonFlotante: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mostrarBoton = () => {
      const scroll = document.documentElement.scrollTop;
      setVisible(scroll > 700); // aparece después de 700px
    };

    window.addEventListener('scroll', mostrarBoton);
    return () => window.removeEventListener('scroll', mostrarBoton);
  }, []);

  const handleClick = () => {
    console.log("Ir al carrito");
    // Aquí puedes redirigir o abrir modal
  };

  return (
    <button
      className={`boton-flotante ${visible ? 'visible' : ''}`}
      onClick={handleClick}
    >
      <FaShoppingCart />
    </button>
  );
};

export default BotonFlotante;
