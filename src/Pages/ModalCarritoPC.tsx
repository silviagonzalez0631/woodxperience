
    import React from "react";
    import { useNavigate } from "react-router-dom";

    const ModalCarritoPC: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="modal-carrito-pc-container">
        <div className="modal-carrito-pc-box">
            <h2>¡Hola!</h2>
            <p>Para agregar productos al carrito, primero debes iniciar sesión.</p>

            <div className="modal-carrito-pc-botones">
            <button
                className="btn-modal-carrito crear"
                onClick={() => navigate("/registro")}
            >
                Crear cuenta
            </button>
            <button
                className="btn-modal-carrito ingresar"
                onClick={() => navigate("/login")}
            >
                Ingresar
            </button>
            </div>

            <button
            className="btn-volver-inicio"
            onClick={() => navigate("/")}
            >
            Volver al inicio
            </button>
        </div>
        </div>
    );
    };

    export default ModalCarritoPC;
