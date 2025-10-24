
import React from 'react';
import '../css/Nosotros.css';

    const ServiciosWoodXperience: React.FC = () => {
    return (
        <section className="servicios-section">
        <h2 className="titulo-servicios">Nuestros Servicios</h2>
        <div className="servicios-grid">
            <div className="servicio-card">
            <h3>Muebles Personalizados</h3>
            <p>
                Diseñamos y fabricamos piezas únicas que se adaptan a tus necesidades y estilo. 
                Desde mesas hasta armarios a medida.
            </p>
            </div>
            <div className="servicio-card">
            <h3>Diseño de Interiores</h3>
            <p>
                Integramos la madera en proyectos de remodelación y decoración para dar 
                calidez y carácter a tus espacios.
            </p>
            </div>
            <div className="servicio-card">
            <h3>Construcción en Madera</h3>
            <p>
                Desarrollamos desde pequeños proyectos hasta grandes estructuras como 
                pérgolas, decks o cabañas, siempre con materiales de calidad.
            </p>
            </div>
            <div className="servicio-card">
            <h3>Restauración de Muebles</h3>
            <p>
                Damos nueva vida a tus muebles antiguos o desgastados. Con técnicas de 
                restauración y acabados modernos, transformamos cada pieza en algo único 
                y funcional, listo para seguir contando historias.
            </p>
            </div>
        </div>
        </section>
    );
    };

export default ServiciosWoodXperience;
