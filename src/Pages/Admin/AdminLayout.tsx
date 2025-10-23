import { Outlet } from 'react-router-dom';
import AdminMenu from '../../Components/Admin/AdminMenu';
import '../../css/Admin/AdminLayout.css'; // si quieres estilos separados

export default function AdminLayout() {
    return (
        <div className="admin-layout">
        <AdminMenu />
        <div className="admin-content">
            <Outlet />
        </div>
        </div>
    );
    }
