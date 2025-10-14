    import { useState, useEffect } from "react";
    import axios from "axios";
    import { useNavigate } from "react-router-dom";
    import {
    TextField,
    Button,
    Alert,
    InputAdornment,
    Checkbox,
    FormControlLabel,
    } from "@mui/material";
    import EmailIcon from "@mui/icons-material/Email";
    import LockIcon from "@mui/icons-material/Lock";
    import "../css/estilosLogin.css";

    interface LoginResponse {
    token: string;
    usuario: {
        id: string;
        nombre: string;
        email: string;
        rol: string;
    };
    }

    type BackendError = { error?: string };

    function isAxiosErrorLike<T = unknown>(
    error: unknown
    ): error is { isAxiosError: true; response?: { data?: T } } {
    return (
        typeof error === "object" &&
        error !== null &&
        "isAxiosError" in (error as Record<string, unknown>) &&
        (error as Record<string, unknown>)["isAxiosError"] === true
    );
    }

    export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState<"success" | "error">("success");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
        setTipoMensaje("error");
        setMensaje("Por favor completa todos los campos");
        return;
        }

        try {
        const res = await axios.post<{ data: LoginResponse }>(
            "http://localhost:8001/login",
            { email, password }
        );

        const { token, usuario } = res.data.data;

        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(usuario));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setTipoMensaje("success");
        setMensaje("Login exitoso");
        setTimeout(() => navigate("/Inicio"), 2000);
        } catch (error: unknown) {
        setTipoMensaje("error");
        if (isAxiosErrorLike<BackendError>(error)) {
            const msg = error.response?.data?.error ?? "Algo salió mal";
            setMensaje("Error: " + msg);
        } else if (error instanceof Error) {
            setMensaje(" " + error.message);
        } else {
            setMensaje("Error inesperado");
        }
        }
    };

    useEffect(() => {
        if (tipoMensaje === "success") {
        const timer = setTimeout(() => setMensaje(""), 3000);
        return () => clearTimeout(timer);
        }
    }, [tipoMensaje]);

    return (
        <section className="user">
        <video autoPlay loop muted playsInline className="background-video">
            <source src="/videos/FondoLogin.mp4" type="video/mp4" />
            Tu navegador no soporta videos HTML5.
        </video>
        <div className="user_options-container">
            <img
            src="/imagenes/LogoWoodXperience.png"
            alt="Logo WoodXperience"
            className="login-illustration"
            />

            <div className="user_options-text">
            <h2 className="user_unregistered-title">¡Bienvenido al Login!</h2>
            <p className="user_unregistered-text">
                En WoodXperience te invitamos a iniciar sesión para descubrir y comprar nuestros productos exclusivos.
            </p>
            </div>

            <div className="user_options-forms bounceRight">
            <div className="user_forms-login">
                <form className="forms_form" onSubmit={handleSubmit}>
                <fieldset className="forms_fieldset">
                    <div className="forms_field">
                    <TextField
                        placeholder="Correo electrónico"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <EmailIcon />
                            </InputAdornment>
                        ),
                        }}
                    />
                    </div>
                    <div className="forms_field">
                    <TextField
                        placeholder="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <LockIcon />
                            </InputAdornment>
                        ),
                        }}
                    />
                    </div>
                </fieldset>
                <div className="forms_buttons">
                    <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Recuérdame"
                    />
                    <Button type="submit" className="forms_buttons-action">
                    INGRESAR
                    </Button>
                    <p className="registro-link">
                    ¿No tienes cuenta?{" "}
                    <span className="registro-enlace" onClick={() => navigate("/Registro")}>
                        Regístrate aquí
                    </span>
                    </p>
                </div>
                {mensaje && <Alert severity={tipoMensaje}>{mensaje}</Alert>}
                </form>
            </div>
            </div>
        </div>
        </section>
    );
    }
