// ProductosPC.tsx
import React from 'react';

// Importar las imágenes de la carpeta imagnesfigms
import producto1 from '/imagenes/53640ca5041335d934de074b3f8d760a.jpg';
import producto2 from '/imagenes/18d5a056241554bff84bb5c034837fb1.png';
import producto3 from '/imagenes/3-1024x768.jpeg';
import producto4 from '/imagenes/63f6968fee52c-035_NT_AZC-CPT-JMC-122022-4-(1)_11zon.jpg';
import producto5 from '/imagenes/herramientas-de-carpinteria.webp';
// Si tienes más imágenes, agrega más importaciones aquí

const ProductosPC: React.FC = () => {
  const productos = [
    {
      id: 1,
      titulo: "Escritorio de Estudio",
      descripcion: "Mueble con cajones y puertas corredizas hecho en madera natural, con diseño creativo en...",
      precio: "$ 90.000",
      imagen: producto1
    },
    {
      id: 2,
      titulo: "Portabotellas en forma de pato invertido",
      descripcion: "Elegante soporte artesanal tallado en madera, diseñado...",
      precio: "$ 70.000",
      imagen: producto2
    },
    {
      id: 3,
      titulo: "Mesa de Oficina",
      descripcion: "Escritorio minimalista con base en A hecho en madera natural, con diseño creativo en...",
      precio: "$ 100.000",
      imagen: producto3
    },
    {
      id: 4,
      titulo: "Mueble de Casa",
      descripcion: "Mueble cuadrado con base geométrica hecho en madera natural, con diseño creativo en...",
      precio: "$ 60.000",
      imagen: producto4
    },
    {
      id: 5,
      titulo: "Figura Decorativa con forma de WALL-E",
      descripcion: "WALL-E decorativo hecho en madera natural perfecta para...",
      precio: "$ 90.000",
      imagen: producto5
    },
    {
      id: 6,
      titulo: "Soporte de cuchillos en forma de Guardia",
      descripcion: "Organizador de cuchillos hecho en madera natural, con diseño creativo en...",
      precio: "$ 50.000",
      imagen: producto1 // Puedes usar la misma imagen o importar otra
    }
  ];

  return (
    <section className="seccion-productos-pc">
      <h2 className="titulo-productos-pc">Visualiza nuestros productos</h2>
      
      <div className="grid-productos-pc">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-card-pc">
            <div className="producto-imagen-container">
              <img 
                src={producto.imagen} 
                alt={producto.titulo}
                className="producto-imagen-pc"
              />
            </div>
            <h3 className="producto-titulo-pc">{producto.titulo}</h3>
            <p className="producto-descripcion-pc">{producto.descripcion}</p>
            <div className="producto-precio-pc">{producto.precio}</div>
            <button className="boton-ver-3d-pc">
              VER EN 3D
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductosPC;