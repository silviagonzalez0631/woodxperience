import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

type Props = {
  onClick: () => void;
};

const BotonFlotante: React.FC<Props> = ({ onClick }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mostrarBoton = () => {
      const scroll = document.documentElement.scrollTop;
      setVisible(scroll > 700); // aparece después de 700px
    };

    window.addEventListener('scroll', mostrarBoton);
    return () => window.removeEventListener('scroll', mostrarBoton);
  }, []);

  return (
    <button
      className={`boton-flotante ${visible ? 'visible' : ''}`}
      onClick={onClick} // ← ahora usa la función que viene de AppContent
    >
      <FaShoppingCart />
    </button>
  );
};

export default BotonFlotante;
