    import { useState } from "react";
    import { useNavigate } from "react-router-dom";

export default function PerfilDireccion() {
    const [linea, setLinea] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [pais, setPais] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    const navigate = useNavigate();

    const handleGuardar = async () => {
        let tokenRaw = localStorage.getItem("token");

        // 📌 CORRECCIÓN: Limpiar el token de comillas dobles si se guardó serializado.
        if (tokenRaw && tokenRaw.startsWith('"') && tokenRaw.endsWith('"')) {
            tokenRaw = tokenRaw.slice(1, -1);
        }
        
        const token = tokenRaw;

        if (!token) {
            alert("Debes iniciar sesión.");
            navigate("/login");
            return;
        }

        const res = await fetch("http://10.221.253.235:8001/direcciones", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Aseguramos que el token limpio se envíe
                Authorization: `Bearer ${token}`, 
            },
            body: JSON.stringify({
                linea_direccion1: linea,
                ciudad,
                pais,
                codigo_postal: codigoPostal,
                es_principal: true,
            }),
        });

        if (res.ok) {
            // 2xx status codes (201 Created)
            const data = await res.json();
            alert("Dirección guardada correctamente.");
            console.log("Respuesta del servidor:", data);
            navigate("/carrito");
        } else {
            // Manejo de errores más detallado
            try {
                const errorData = await res.json();
                console.error("Error del servidor:", errorData);
                alert("Error al guardar dirección: " + (errorData.error || "Error de validación o del servidor."));
            } catch { // 👈 SOLUCIÓN FINAL: Dejar el 'catch' sin parámetro
                // Si la respuesta no es JSON (ej. error 500 puro)
                console.error("Error de red o servidor sin respuesta JSON:", res.status, res.statusText);
                alert(`Error ${res.status}: Fallo en la comunicación con el servidor.`);
            }
        }
    };

    return (
        <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
            <h2>Dirección de envío</h2>
            <p>Agrega tu dirección para poder realizar compras.</p>

            <label>Dirección:</label>
            <input 
                type="text"
                value={linea} 
                onChange={(e) => setLinea(e.target.value)} 
                required 
            />

            <label>Ciudad:</label>
            <input 
                type="text"
                value={ciudad} 
                onChange={(e) => setCiudad(e.target.value)} 
                required 
            />

            <label>País:</label>
            <input 
                type="text"
                value={pais} 
                onChange={(e) => setPais(e.target.value)} 
                required 
            />

            <label>Código Postal:</label>
            <input 
                type="text"
                value={codigoPostal} 
                onChange={(e) => setCodigoPostal(e.target.value)} 
                required 
            />

            <button onClick={handleGuardar} style={{ marginTop: "1rem" }}>
                Guardar dirección
            </button>
        </div>
    );
}