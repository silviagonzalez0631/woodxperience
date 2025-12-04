    import type { ReactNode } from "react";
    import { Navigate } from "react-router-dom";
    import { obtenerRolUsuario } from "../utils/usuario";

    export default function RutaProtegidaAdmin({ children }: { children: ReactNode }) {
    const rol = obtenerRolUsuario();
    const esAdmin = rol === "admin";

    if (!esAdmin) {
        return <Navigate to="/inicio" replace />;
    }
    return children;
    }
