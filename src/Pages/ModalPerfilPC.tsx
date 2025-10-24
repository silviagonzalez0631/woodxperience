import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/ModalPerfilPC.css";

    const ModalPerfilPC: React.FC = () => {
    const navigate = useNavigate();
    const usuarioGuardado = localStorage.getItem("usuario");
    const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

    const cerrarModal = () => navigate("/");

    if (!usuario) return null;

    return (
        <div className="modal-perfil-pc-container" onClick={cerrarModal}>
        <div className="modal-perfil-pc-box" onClick={(e) => e.stopPropagation()}>
            <div className="perfil-avatar-modal">
            <span>{usuario.nombre.charAt(0).toUpperCase()}</span>
            </div>
            <h2 className="perfil-nombre-modal">{usuario.nombre}</h2>
            <p className="perfil-email-modal">{usuario.email}</p>
            <p className="perfil-rol-modal">Rol: <strong>{usuario.rol}</strong></p>

            <button
            className="btn-modal-perfil cerrar"
            onClick={() => {
                localStorage.removeItem("usuario");
                localStorage.removeItem("token");
                navigate("/");
            }}
            >
            Cerrar sesión
            </button>
        </div>
        </div>
    );
    };

export default ModalPerfilPC;
