
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import '../../css/Admin/AdminMenu.css';

export default function AdminMenu() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Botón hamburguesa solo en móvil */}
            <button className="admin-menu-hamburger" onClick={() => setOpen(true)}>
                <MenuIcon fontSize="large" />
            </button>

            {/* Menú lateral en escritorio y drawer en móvil */}
            <nav className={`admin-menu${open ? ' open' : ''}`}>
                <h2 className="admin-title">WOODXPERIENCE</h2>
                {/* Botón cerrar solo en móvil */}
                <button className="admin-menu-close" onClick={() => setOpen(false)}>
                    <CloseIcon fontSize="large" />
                </button>
                <ul>
                    <li><NavLink to="/admin" className="link" onClick={() => setOpen(false)}>📊 Dashboard</NavLink></li>
                    <li><NavLink to="/admin/usuarios" className="link" onClick={() => setOpen(false)}>👥 Usuarios</NavLink></li>
                    <li><NavLink to="/admin/productos" className="link" onClick={() => setOpen(false)}>🪵 Productos</NavLink></li>
                    <li><NavLink to="/admin/configuracion" className="link" onClick={() => setOpen(false)}>⚙️ Configuración</NavLink></li>
                </ul>
            </nav>

            {/* Fondo oscuro al abrir el menú en móvil */}
            {open && <div className="admin-menu-backdrop" onClick={() => setOpen(false)}></div>}
        </>
    );
}