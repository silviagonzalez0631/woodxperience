import React from 'react';
import { FaFacebookF, FaInstagram, FaEnvelope } from 'react-icons/fa';

const PiePagina: React.FC = () => {
  return (
    <footer className="pie-pagina">
      <div className="footer-content">
        <div className="footer-logo">
          <img
            src="/imagenes/LogoWoodXperience.png"
            alt="Logo WoodXperience"
            className="footer-logo-img"
          />

        </div>

        <div className="footer-columns">
          <div className="footer-section">
            <h4>Legal</h4>
            <a href="#terminos" className="footer-link">Términos y condiciones</a>
            <a href="#privacidad" className="footer-link">Política de privacidad</a>
          </div>

          <div className="footer-section">
            <h4>Contacto</h4>
            <a href="#contacto" className="footer-link">Formulario</a>
            <a href="mailto:info@woodxperience.com" className="footer-link">
              <FaEnvelope /> info@woodxperience.com
            </a>
          </div>

          <div className="footer-section">
          <h4>Redes Sociales</h4>
          <div className="footer-social-icons">
            <a href="#" className="social-icon"><FaFacebookF /></a>
            <a href="#" className="social-icon"><FaInstagram /></a>
          </div>
        </div>

        </div>

        <div className="footer-divider"></div>

        <div className="footer-copyright">
          © 2025 WOODXPERIENCE. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default PiePagina;
