// src/App.tsx
import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import BarraNavegacion from './Components/BarraNavegacion';
import Inicio from './Pages/Inicio';
import DetalleProducto from './Pages/DetalleProducto';
import Servicios from './Pages/Servicios';
import Error404 from './Pages/Error404';
import ProductosPagePC from './Pages/ProductosPagePC';
import PiePagina from './Components/PiePagina';
import BotonFlotante from './Components/BotonFlotante';
import BarraInferiorMobile from './Components/BarraInferiorMobile';
import BotonCarritoMobile from './Components/BotonCarritoMobile';
import NosotrosMobile from './Pages/NosotrosMobile';
import NosotrosPC from './Pages/NosotrosPC';
import AcercaDeMobile from './Pages/AcercaDeMobile';
import Login from './Pages/Login';
import Registro from './Pages/Registro';
import PerfilMobile from './Pages/PerfilMobile';
import CarritoCompra from './Components/CarritoCompra';
import CarritoPage from './Pages/CarritoPage';
import PerfilPC from './Pages/PerfilPC';
import ModalCarritoPC from './Pages/ModalCarritoPC';

// Panel de administrador
import AdminLayout from './Pages/Admin/AdminLayout';
import Dashboard from './Pages/Admin/Dashboard';

import './index.css';

    function AppContent({ isMobile }: { isMobile: boolean }) {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const isInicio = location.pathname === '/';
    const token = localStorage.getItem('token');
    const usuarioLogueado = !!token;

    const [mostrarCarrito, setMostrarCarrito] = useState(false);
    const [cerrandoCarrito, setCerrandoCarrito] = useState(false);

    const toggleCarrito = () => setMostrarCarrito((prev) => !prev);

    const cerrarCarritoConAnimacion = () => {
        setCerrandoCarrito(true);
        setTimeout(() => {
        setMostrarCarrito(false);
        setCerrandoCarrito(false);
        }, 300); // duración de la animación en ms
    };

    return (
        <div className="app-container">
        {!isAdminRoute && <BarraNavegacion />}

        <main style={{ flex: 1, paddingBottom: isMobile && !isAdminRoute ? '90px' : '0' }}>
            <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/nosotros" element={isMobile ? <NosotrosMobile /> : <NosotrosPC />} />
            <Route path="/acerca" element={isMobile ? <AcercaDeMobile /> : <NosotrosPC />} />
            <Route path="/productos" element={<ProductosPagePC />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/perfil" element={isMobile ? <PerfilMobile /> : <PerfilPC />} />
            <Route path="/modal-carrito" element={<ModalCarritoPC />} />
            <Route path="/carrito" element={<CarritoPage />} />
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
            </Route>
            <Route path="*" element={<Error404 />} />
            </Routes>
        </main>

        {/* COMPONENTES MÓVIL */}
        {isMobile && !isAdminRoute && (
            <>
            <BarraInferiorMobile />
            <BotonCarritoMobile />
            </>
        )}

        {/* COMPONENTES PC */}
        {!isMobile && !isAdminRoute && usuarioLogueado && !isInicio && location.pathname !== '/carrito' && (
            <>
            <BotonFlotante onClick={toggleCarrito} />
            {mostrarCarrito && (
                <CarritoCompra
                onClose={cerrarCarritoConAnimacion}
                className={cerrandoCarrito ? 'cerrando' : ''}
                />
            )}
            </>
        )}

        {!isMobile && !isAdminRoute && <PiePagina />}
        </div>
    );
    }

export default AppContent;
