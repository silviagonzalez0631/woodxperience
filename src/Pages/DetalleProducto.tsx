import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCarrito } from "../Pages/Context/CarrritoContext";
import "../css/DetallesProducto.css";
import { getBackendAssetUrl } from './imageUtils';
import ModelViewer from "../Components/ModelViewer";

type Producto = {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  imagenes: string[];
  modelo3D?: string;
};

export default function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarProducto } = useCarrito();
  const [producto, setProducto] = useState<Producto | null>(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(`http://10.221.253.235:8001/productos/${id}`);
        const json = await res.json();
        if (json.success) {
          setProducto(json.data);
        }
      } catch (error) {
        console.error("Error al cargar producto:", error);
      }
    };

    fetchProducto();
  }, [id]);

  const handleAgregar = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para agregar al carrito.");
      navigate("/modal-carrito");
      return;
    }

    if (producto) {
      agregarProducto({
        id: producto.id,
        titulo: producto.titulo,
        precio: producto.precio,
        imagen: getBackendAssetUrl(producto.imagenes?.[0]),
        cantidad: 1,
      });

      alert("Producto agregado al carrito");
      navigate("/productos");
    }
  };

  if (!producto) return <p className="detalle-cargando">Cargando producto...</p>;

  return (
    <div className="detalle-producto-layout">
      <div className="detalle-imagenes">
        {producto.modelo3D ? (
          <ModelViewer
            src={getBackendAssetUrl(producto.modelo3D)}
            alt={producto.titulo}
            style={{ width: "100%", height: "400px", borderRadius: "12px" }}
          />
        ) : (
          <img
            src={getBackendAssetUrl(producto.imagenes?.[0])}
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
  );
}
