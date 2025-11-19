    import { useEffect } from "react";
    import { useParams } from "react-router-dom";

    export default function FormularioPago() {
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const iniciarPago = async () => {
        if (!id) return;

        try {
            console.log(`🔄 Iniciando pago para la orden ${id}...`);

            // Obtén el token guardado (por ejemplo en localStorage)
            const token = localStorage.getItem("token");

            if (!token) {
            console.error("❌ No hay token, el servidor rechazará la solicitud.");
            alert("Debes iniciar sesión para continuar con el pago.");
            return;
            }

            // ✅ Aquí haces el POST correcto al backend Deno
            const res = await fetch(`http://localhost:8001/pago/iniciar/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            });

            if (!res.ok) {
            throw new Error(`Error del servidor: ${res.status}`);
            }

            // El servidor devuelve el HTML del formulario PayU
            const html = await res.text();

            // 🚀 Crea un nuevo documento temporal para enviar el formulario automáticamente
            const nuevaVentana = window.open("", "_self");
            if (nuevaVentana) {
            nuevaVentana.document.write(html);
            nuevaVentana.document.close();
            }
        } catch (error) {
            console.error("Error al iniciar pago:", error);
            alert("Ocurrió un error al iniciar el pago. Revisa la consola.");
        }
        };

        iniciarPago();
    }, [id]);

    return (
        <div style={{ padding: "4rem", textAlign: "center" }}>
        <h2>Redirigiendo al pago...</h2>
        <p>Estamos preparando tu orden #{id}. Por favor, espera un momento.</p>
        <p>Si la redirección no ocurre automáticamente, revisa la consola para ver si hay errores.</p>
        </div>
    );
    }