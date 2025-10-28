import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function FormularioPago() {
    const { id } = useParams<{ id: string }>(); // Obtén el ID de la orden

    useEffect(() => {
        if (id) {
            console.log(`Redirigiendo a PayU a través del servidor para la orden ${id}...`);
            
            // Redirige el navegador al endpoint del servidor que genera el formulario PayU
            window.location.replace(`http://localhost:8001/pago/iniciar/${id}`);
            
        }
    }, [id]);


    return (
        <div style={{ padding: "4rem", textAlign: "center" }}>
            <h2>Redirigiendo al pago...</h2>
            <p>Estamos preparando tu orden #{id}. Por favor, espera un momento.</p>
            <p>Si la redirección no ocurre automáticamente, revisa la consola para ver si hay errores.</p>
        </div>
    );
}
