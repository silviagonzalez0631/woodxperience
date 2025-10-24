    import React from "react";
    import "../css/ModalPerfilPC.css"; // reutilizamos estilos

    const PerfilMobile: React.FC = () => {
    const usuarioGuardado = localStorage.getItem("usuario");
    const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

    if (!usuario) {
        return (
        <div className="modal-perfil-pc-box perfil-mobile-wrapper">
            <h2 className="perfil-nombre-modal">No has iniciado sesión</h2>
            <p className="perfil-email-modal">Por favor inicia sesión para ver tu perfil.</p>
            <button
            className="btn-modal-perfil ingresar"
            onClick={() => (window.location.href = "/login")}
            >
            Iniciar sesión
            </button>
        </div>
        );
    }

    return (
        <div className="modal-perfil-pc-box perfil-mobile-wrapper">
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
            window.location.href = "/";
            }}
        >
            Cerrar sesión
        </button>
        </div>
    );
    };

    export default PerfilMobile;
