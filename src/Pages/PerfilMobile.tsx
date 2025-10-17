    import React from "react";

    const Perfil: React.FC = () => {
    const usuarioGuardado = localStorage.getItem("usuario");
    const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

    if (!usuario) {
        return (
        <div className="perfil-container">
            <h2>Lo siento, no has iniciado sesión</h2>
            <p>Por favor inicia sesión para ver tu perfil.</p>
        </div>
        );
    }

    return (
        <div className="perfil-container">
        <h2>Mi Perfil</h2>
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Rol:</strong> {usuario.rol}</p>

        <button
            onClick={() => {
            localStorage.removeItem("usuario");
            localStorage.removeItem("token");
            window.location.href = "/"; // Redirige al inicio y recarga la página
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

    export default Perfil;
