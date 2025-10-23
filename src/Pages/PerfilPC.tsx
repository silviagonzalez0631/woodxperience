
    import React from "react";

    const PerfilPC: React.FC = () => {
    const usuarioGuardado = localStorage.getItem("usuario");
    const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

    if (!usuario) {
        return (
        <div className="perfil-pc-container">
            <h2>No has iniciado sesión</h2>
            <p>Por favor inicia sesión para ver tu perfil.</p>
        </div>
        );
    }

    return (
        <div className="perfil-pc-container">
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Rol:</strong> {usuario.rol}</p>

        <button
            onClick={() => {
            localStorage.removeItem("usuario");
            localStorage.removeItem("token");
            window.location.href = "/";
            }}
            style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#c62828",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            }}
        >
            Cerrar Sesión
        </button>
        </div>
    );
    };

    export default PerfilPC;
