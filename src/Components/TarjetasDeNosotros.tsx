import React from 'react';
import '../css/Nosotros.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';

const TarjetasInstitucionales: React.FC = () => {
    return (
        <section className="tarjetas-nosotros">
        <h2 className="titulo-tarjetas">Nuestra Esencia</h2>
        <div className="tarjetas-grid">
            <div className="tarjeta-nosotros">
            <div className="icono-tarjeta">
                <FontAwesomeIcon icon={faBullseye} />
            </div>
            <h3>Misión</h3>
            <p>
                Crear experiencias únicas a través del diseño en madera, combinando tecnología, funcionalidad y emoción para transformar hogares con calidez y propósito.
            </p>
            </div>

            <div className="tarjeta-nosotros">
            <div className="icono-tarjeta">
                <FontAwesomeIcon icon={faEye} />
            </div>
            <h3>Visión</h3>
            <p>
                Ser referentes en diseño emocional y sostenible, donde cada pieza de madera cuente una historia y conecte profundamente con quienes la habitan.
            </p>
            </div>

            <div className="tarjeta-nosotros">
            <div className="icono-tarjeta">
                <FontAwesomeIcon icon={faHeart} />
            </div>
            <h3>Valores</h3>
            <p>
                Artesanía, innovación, honestidad, sostenibilidad y compromiso con el bienestar de nuestros usuarios. Cada proyecto refleja lo que somos.
            </p>
            </div>
        </div>
        </section>
    );
    };

export default TarjetasInstitucionales;
