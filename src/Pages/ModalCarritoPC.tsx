import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/ModalCarritoPC.css';

const ModalCarritoPC: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="modal-carrito-pc-container">
        <div className="modal-carrito-pc-box">
            <img 
            src="/imagenes/IconoDeNoAcceso.png" 
            alt="Icono login" 
            className="icono-login-modal"
            />
            <h2>¡Hola! ¿Desea adquirir los productos?</h2>
            <p>Para agregar productos al carrito y realizar la compra, debe iniciar sesión</p>

            <div className="modal-carrito-pc-botones">
            <button className="btn-modal-carrito crear" onClick={() => navigate("/registro")}>
                Crear cuenta
            </button>
            <button className="btn-modal-carrito ingresar" onClick={() => navigate("/login")}>
                Ingresar
            </button>
            </div>

            <button className="btn-volver-inicio" onClick={() => navigate("/")}>
            Volver al inicio
            </button>
        </div>
        </div>
    );
    };

export default ModalCarritoPC;
