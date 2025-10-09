// src/hooks/useMobileDetect.ts (usa el nombre que ya tienes)
import { useState, useEffect } from 'react';

export const useMobileDetect = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      // Detectar si es móvil basado en el ancho de pantalla
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    // Verificar al cargar
    checkDevice();

    // Verificar al cambiar tamaño
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  return isMobile;
};