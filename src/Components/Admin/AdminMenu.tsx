import { NavLink } from 'react-router-dom';
import '../../css/Admin/AdminMenu.css'; // si quieres estilos separados

export default function AdminMenu() {
    return (
        <nav className="admin-menu">
        <h2 className="admin-title">WOODXPERIENCE</h2>
        <ul>
            <li><NavLink to="/admin" className="link">📊 Dashboard</NavLink></li>
            <li><NavLink to="/admin/usuarios" className="link">👥 Usuarios</NavLink></li>
            <li><NavLink to="/admin/productos" className="link">🪵 Productos</NavLink></li>
            <li><NavLink to="/admin/configuracion" className="link">⚙️ Configuración</NavLink></li>
        </ul>
        </nav>
    );
}
