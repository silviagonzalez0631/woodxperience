import React from 'react';
import '../../css/admin/AdminDashboard.css';

    const Footer: React.FC = () => {
    return (
        <footer className="dashboard-footer">
        <p>© {new Date().getFullYear()} WoodXperience. Todos los derechos reservados.</p>
        </footer>
    );
    };

export default Footer;
