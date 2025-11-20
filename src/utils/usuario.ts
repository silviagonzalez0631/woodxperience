    export type RolUsuario = "admin" | "cliente" | "";

    export function obtenerUsuario() {
    try {
        // session storage para admin, localStorage para cliente
        const usuarioRaw = localStorage.getItem("usuario") || sessionStorage.getItem("usuario");
        
        return usuarioRaw ? JSON.parse(usuarioRaw) : {};
    } catch {
        return {};
    }
    }

    export function obtenerRolUsuario(): RolUsuario {
    const usuario = obtenerUsuario();
    return (usuario?.rol as RolUsuario) || "";
    }