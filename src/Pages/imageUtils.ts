const BACKEND_BASE_URL = "http://10.191.4.235:8001";

export const getBackendAssetUrl = (path?: string): string => {
  if (!path) return "/imagenes/default.jpg"; // Fallback para rutas vacías o nulas
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path; // Si ya es una URL completa (ej. de un CDN o externo), la devuelve tal cual
  }
  return `${BACKEND_BASE_URL}${path}`; // Construye la URL completa con la IP del backend
};