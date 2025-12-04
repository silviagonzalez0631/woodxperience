    import { useState } from "react";
    import { useNavigate } from "react-router-dom";
    import {
    TextField,
    InputAdornment,
    Button,
    } from "@mui/material";
    import HomeIcon from "@mui/icons-material/Home";
    import LocationCityIcon from "@mui/icons-material/LocationCity";
    import PublicIcon from "@mui/icons-material/Public";
    import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
    import "../css/PerfilDireccion.css";

    export default function PerfilDireccion() {
    const [linea, setLinea] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [pais, setPais] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    const navigate = useNavigate();

    const handleGuardar = async () => {
        let tokenRaw = localStorage.getItem("token");
        if (tokenRaw && tokenRaw.startsWith('"') && tokenRaw.endsWith('"')) {
        tokenRaw = tokenRaw.slice(1, -1);
        }

        const token = tokenRaw;

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

        if (res.ok) {
        const data = await res.json();
        alert("Dirección guardada correctamente.");
        console.log("Respuesta del servidor:", data);
        navigate("/carrito");
        } else {
        try {
            const errorData = await res.json();
            console.error("Error del servidor:", errorData);
            alert("Error al guardar dirección: " + (errorData.error || "Error de validación o del servidor."));
        } catch {
            console.error("Error de red o servidor sin respuesta JSON:", res.status, res.statusText);
            alert(`Error ${res.status}: Fallo en la comunicación con el servidor.`);
        }
        }
    };

    return (
        <section className="form-direccion-background">

        <div className="form-direccion-container user_options-container">
            <h2 className="user_unregistered-title">Dirección de envío</h2>
            <p className="user_unregistered-text">Agrega tu dirección para poder realizar compras.</p>

            <div className="forms_field">
            <TextField
                placeholder="Dirección"
                type="text"
                value={linea}
                onChange={(e) => setLinea(e.target.value)}
                required
                fullWidth
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <HomeIcon />
                    </InputAdornment>
                ),
                }}
            />
            </div>

            <div className="forms_field">
            <TextField
                placeholder="Ciudad"
                type="text"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                required
                fullWidth
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <LocationCityIcon />
                    </InputAdornment>
                ),
                }}
            />
            </div>

            <div className="forms_field">
            <TextField
                placeholder="País"
                type="text"
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                required
                fullWidth
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <PublicIcon />
                    </InputAdornment>
                ),
                }}
            />
            </div>

            <div className="forms_field">
            <TextField
                placeholder="Código Postal"
                type="text"
                value={codigoPostal}
                onChange={(e) => setCodigoPostal(e.target.value)}
                required
                fullWidth
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <MarkunreadMailboxIcon />
                    </InputAdornment>
                ),
                }}
            />
            </div>

            <div className="forms_buttons">
            <Button
                variant="contained"
                className="forms_buttons-action"
                onClick={handleGuardar}
            >
                Guardar dirección
            </Button>
            </div>
        </div>
        </section>
    );
    }