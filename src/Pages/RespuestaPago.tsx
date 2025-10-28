
    import { useSearchParams } from "react-router-dom";

    export default function RespuestaPago() {
    const [params] = useSearchParams();
    const estado = params.get("response_message_pol");
    const referencia = params.get("reference_sale");

    const mensaje =
        estado === "APPROVED"
        ? "¡Pago aprobado! 🎉 Tu orden está en proceso."
        : estado === "REJECTED"
        ? "Pago rechazado ❌. Intenta nuevamente."
        : "Estado de pago desconocido.";

    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>{mensaje}</h2>
        <p>Referencia: {referencia}</p>
        </div>
    );
    }
