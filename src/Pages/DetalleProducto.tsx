import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { useCarrito } from "../Pages/Context/CarrritoContext";
import "../css/DetallesProducto.css";
import ModelViewer from "../Components/ModelViewer";

type Producto = {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  imagenes: string[];
  modelo3D?: string;
};

// 1. Ajustar el tipo Reseña
type Reseña = {
  id: number;
  producto_id: number;
  usuario_id: number;
  puntuacion: number;
  comentario: string;
  nombre_usuario?: string; // nombre_usuario es ahora opcional
};

export default function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarProducto } = useCarrito();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [reseñas, setReseñas] = useState<Reseña[]>([]);
  const [nuevaReseña, setNuevaReseña] = useState("");
  const [estrellas, setEstrellas] = useState(5);

  const fetchReseñas = useCallback(async () => {
    if (!id) return;
    try {
      const res = await fetch(`http://localhost:8001/reseñas`);
      const json = await res.json();
      
      // 2. Hacer la obtención de datos más robusta
      let reseñaData: Reseña[] = [];
      if (json.success && Array.isArray(json.data)) {
        reseñaData = json.data;
      } else if (Array.isArray(json)) { // Manejar el caso de que la API devuelva un array directamente
        reseñaData = json;
      }

      const productId = parseInt(id, 10);
      const reseñasDelProducto = reseñaData.filter(
        (reseña: Reseña) => reseña.producto_id === productId
      );
      setReseñas(reseñasDelProducto);

    } catch (error) {
      console.error("Error al cargar reseñas:", error);
    }
  }, [id]);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(`http://localhost:8001/productos/${id}`);
        const json = await res.json();
        if (json.success) {
          setProducto(json.data);
        }
      } catch (error) {
        console.error("Error al cargar producto:", error);
      }
    };

    fetchProducto();
    fetchReseñas();
  }, [id, fetchReseñas]);

  const handleAgregar = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/modal-carrito");
      return;
    }

    if (producto) {
      agregarProducto({
        id: producto.id,
        titulo: producto.titulo,
        precio: producto.precio,
        imagen: producto.imagenes?.[0] ?? "/imagenes/default.jpg",
        cantidad: 1,
      });

      navigate("/productos");
    }
  };

  const handleEnviarReseña = async () => {
    const token = localStorage.getItem("token");
    const usuarioData = localStorage.getItem("usuario");

    if (!token || !usuarioData) {
      alert("Debes iniciar sesión para dejar una reseña.");
      navigate("/login");
      return;
    }

    const usuario = JSON.parse(usuarioData);
    if (!producto || !usuario?.id) {
      alert("No se pudo enviar la reseña. Faltan datos.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8001/reseñas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          producto_id: producto.id,
          usuario_id: usuario.id,
          puntuacion: estrellas,
          comentario: nuevaReseña,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setNuevaReseña("");
        setEstrellas(5);
        fetchReseñas(); 
      } else {
        alert(`Error al enviar la reseña: ${json.message}`);
      }
    } catch (error) {
      console.error("Error al enviar reseña:", error);
      alert("Ocurrió un error al enviar la reseña.");
    }
  };

  const renderizarEstrellas = (puntuacion: number) => {
    return "★".repeat(puntuacion) + "☆".repeat(5 - puntuacion);
  };

  if (!producto) return <p className="detalle-cargando">Cargando producto...</p>;

  return (
    <>
      <div className="detalle-producto-layout">
        <div className="detalle-imagenes">
          {producto.modelo3D ? (
            <ModelViewer
              src={producto.modelo3D}
              alt={producto.titulo}
              style={{ width: "100%", height: "400px", borderRadius: "12px" }}
            />
          ) : (
            <img
              src={producto.imagenes?.[0]}
              alt={producto.titulo}
              className="detalle-imagen-principal"
            />
          )}
        </div>

        <div className="detalle-info">
          <h1 className="detalle-titulo">{producto.titulo}</h1>
          <p className="detalle-descripcion">{producto.descripcion}</p>
          <div className="detalle-precio">${producto.precio.toLocaleString()}</div>

          <div className="detalle-botones">
            <button className="btn-agregar" onClick={handleAgregar}>
              Agregar al carrito
            </button>
            {producto.modelo3D && (
              <button className="btn-3d" onClick={() => navigate("/productos")}>
                Regresar
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="detalle-reseñas">
        <h2 className="reseñas-titulo">Reseñas de clientes</h2>

        {reseñas.length > 0 ? (
          reseñas.map((reseña) => {
            // 3. Lógica a prueba de fallos para mostrar el nombre
            const displayName = reseña.nombre_usuario || `Usuario #${reseña.usuario_id}`;
            const avatarChar = displayName.charAt(0).toUpperCase();

            return (
              <div className="reseña-item" key={reseña.id}>
                <div className="reseña-avatar">{avatarChar}</div>
                <div className="reseña-contenido">
                  <p className="reseña-nombre">{displayName}</p>
                  <div className="reseña-estrellas">{renderizarEstrellas(reseña.puntuacion)}</div>
                  <p className="reseña-texto">{reseña.comentario}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>Este producto aún no tiene reseñas. ¡Sé el primero en dejar una!</p>
        )}

        <div className="reseña-formulario">
          <textarea
            className="reseña-textarea"
            placeholder="Escribe tu reseña aquí..."
            value={nuevaReseña}
            onChange={(e) => setNuevaReseña(e.target.value)}
          />
          <div className="reseña-estrellas-selector">
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                className={num <= estrellas ? "estrella activa" : "estrella"}
                onClick={() => setEstrellas(num)}
              >
                ★
              </span>
            ))}
          </div>
          <button className="btn-comentar-reseña" onClick={handleEnviarReseña}>
            Enviar reseña
          </button>
        </div>
      </div>
    </>
  );
}