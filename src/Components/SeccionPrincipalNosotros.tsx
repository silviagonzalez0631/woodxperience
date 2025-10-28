import React from 'react';
import cocinaImagen from '/imagenes/cocina-madera-9c529749.jpeg';
import '../css/Nosotros.css';

const SeccionPrincipalNosotros: React.FC = () => {
    return (
        <section className="nosotros-section">
        <div className="nosotros-grid">
            <div className="nosotros-imagen">
            <img src={cocinaImagen} alt="Diseño en madera" />
            </div>
            <div className="nosotros-texto">
            <h2>Conectamos Tecnología y Calidez</h2>

            <p className="cita-nosotros">
                "Cada diseño en madera es una invitación a sentir, explorar y habitar con emoción lo que imaginas."
            </p>

            <p>
                En <strong>WoodXperience</strong> hemos desarrollado con esfuerzo y dedicación modelos en 3D para que tú, como usuario, 
                puedas interactuar mejor con los productos que serán parte de tu hogar. 
            </p>
            <p>
                Creemos que el diseño no solo debe verse bien, sino sentirse bien. Por eso, cada pieza que creamos está pensada para ofrecer 
                comodidad, funcionalidad y un entorno más cálido para nuestros queridos usuarios.
            </p>
            <p>
                Nuestra misión es transformar la experiencia de compra en una vivencia emocional, donde puedas visualizar, explorar y enamorarte 
                de cada detalle antes de que llegue a tu espacio.
            </p>
            </div>
        </div>
        </section>
    );
    };

export default SeccionPrincipalNosotros;
