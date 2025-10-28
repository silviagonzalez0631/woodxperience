import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';import '../css/ProductosPage.css';

import { Autoplay,Pagination } from 'swiper/modules';
import 'swiper/css';            
import 'swiper/css/pagination';   


// Imágenes de tu colección
import imagen1 from '/imagenes/Carrusel1.jpg';
import imagen2 from '/imagenes/Carrusel2.jpg';
import imagen3 from '/imagenes/Carrusel3.jpg';

    const CarruselHero: React.FC = () => {
    return (
        <section className="carrusel-hero">
        <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{
                delay: 5000, // tiempo en milisegundos (6 segundos)
                disableOnInteraction: false, // sigue moviéndose aunque el usuario interactúe
            }}
            pagination={{ clickable: true }}
            loop={true}
            speed={1000}
            className="swiper-hero"
            >

            <SwiperSlide>
            <div className="slide-content">
                <img src={imagen1} alt="Producto 1" />
                <div className="texto-overlay">
                <h1>Descubre la Magia de la Madera</h1>
                <p>Diseño artesanal con alma natural</p>
                <button>Explorar Colección</button>
                </div>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="slide-content">
                <img src={imagen2} alt="Producto 2" />
                <div className="texto-overlay">
                <h1>Transforma tu Espacio</h1>
                <p>Elegancia, textura y calidez</p>
                <button>Ver Productos</button>
                </div>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="slide-content">
                <img src={imagen3} alt="Producto 3" />
                <div className="texto-overlay">
                <h1>Diseño que Inspira</h1>
                <p>Experiencias visuales en 3D</p>
                <button>Explora Experiencia</button>
                </div>
            </div>
            </SwiperSlide>
        </Swiper>
        </section>
    );
    };

export default CarruselHero;
