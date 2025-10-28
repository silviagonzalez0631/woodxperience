    import { useState } from "react";
    import { useNavigate } from "react-router-dom";
    import "../css/PerfilDireccion.css";

    export default function PerfilDireccion() {
    const [linea, setLinea] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [pais, setPais] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    const navigate = useNavigate();

    const handleGuardar = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
        alert("Debes iniciar sesión.");
        navigate("/login");
        return;
        }

        const res = await fetch("http://localhost:8001/direcciones", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
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

        const data = await res.json();

        if (data.success) {
        alert("Dirección guardada correctamente.");
        navigate("/carrito");
        } else {
        alert("Error al guardar dirección: " + (data.error || "Respuesta inválida"));
        }
    };

    return (
        <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
        <h2>Dirección de envío</h2>
        <p>Agrega tu dirección para poder realizar compras.</p>

        <label>Dirección:</label>
        <input value={linea} onChange={(e) => setLinea(e.target.value)} required />

        <label>Ciudad:</label>
        <input value={ciudad} onChange={(e) => setCiudad(e.target.value)} required />

        <label>País:</label>
        <input value={pais} onChange={(e) => setPais(e.target.value)} required />

        <label>Código Postal:</label>
        <input value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} required />

        <button onClick={handleGuardar} style={{ marginTop: "1rem" }}>
            Guardar dirección
        </button>
        </div>
    );
    }
