    import { useSearchParams, useNavigate } from "react-router-dom";
    import { useEffect, useState } from "react";
    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
    import { faCheckCircle, faTimesCircle, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

    import "../index.css";

    export default function RespuestaPago() {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(true);

    // 1. Capturar parámetros reales de PayU
    const estado = params.get("lapResponseCode") || params.get("message");
    const referencia = params.get("referenceCode");

    // 2. Capturar token si viene en la URL
    const token = params.get("token");
    useEffect(() => {
        if (token) {
        localStorage.setItem("token", token);
        }
    }, [token]);

    // 3. Mensaje según estado con íconos FontAwesome
    let mensaje;
    let icono;
    if (estado === "APPROVED") {
        mensaje = "¡Pago aprobado! Tu orden está en proceso.";
        icono = <FontAwesomeIcon icon={faCheckCircle} className="icon success" />;
    } else if (estado === "REJECTED") {
        mensaje = "Pago rechazado. Intenta nuevamente.";
        icono = <FontAwesomeIcon icon={faTimesCircle} className="icon error" />;
    } else {
        mensaje = "Estado de pago desconocido.";
        icono = <FontAwesomeIcon icon={faQuestionCircle} className="icon unknown" />;
    }

    // 4. Redirección automática
    useEffect(() => {
        const timer = setTimeout(() => {
        setCargando(false);
        navigate("/productos");
        }, 8000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="respuesta-container">
        <div className="respuesta-card">
            {icono}
            <h2 className="respuesta-mensaje">{mensaje}</h2>
            <p className="respuesta-ref">Referencia: {referencia}</p>
            {cargando && (
            <div className="respuesta-loader">
                <div className="loader" />
                <p>Redirigiendo a productos...</p>
            </div>
            )}
        </div>
        </div>
    );
    }
