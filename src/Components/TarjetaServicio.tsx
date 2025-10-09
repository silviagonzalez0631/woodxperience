// Tarjeta de servicio

import "../style/Inicio.css";

interface Props {
  titulo: string;
  descripcion: string;
  icono: string;
}

function TarjetaServicio({ titulo, descripcion, icono }: Props) {
  return (
    <div className="tarjeta">
      <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{icono}</div>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
    </div>
  );
}

export default TarjetaServicio;
