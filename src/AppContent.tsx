// src/App.tsx
import { useState } from 'react';
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
import ToastCarrito from './Components/ToastCarrito';
import NosotrosMobile from './Pages/NosotrosMobile';
import NosotrosPC from './Pages/NosotrosPC';
import AcercaDeMobile from './Pages/AcercaDeMobile';
import Login from './Pages/Login';
import Registro from './Pages/Registro';
import PerfilMobile from './Pages/PerfilMobile';
import CarritoCompra from './Components/CarritoCompra';
import CarritoPage from './Pages/CarritoPage';
import PerfilPC from './Pages/ModalPerfilPC';
import ModalCarritoPC from './Pages/ModalCarritoPC';
import RespuestaPago from './Pages/RespuestaPago';
import PerfilDireccion from './Pages/PerfilDireccion';
import FormularioPago from './Components/FormularioPago';

// Panel de administrador
import AdminLayout from './Pages/Admin/AdminLayout'; // This path is correct if AdminLayout.tsx is in src/admin/
import DashboardPage from './Pages/Admin/DashboardPage';
import UsuariosPage from './Pages/Admin/UsuariosPage';
import ProductosPage from './Pages/Admin/ProductosPage';
import OrdenesPage from './Pages/Admin/OrdenesPage';
import PagosPage from './Pages/Admin/PagosPage';
import ResenasPage from './Pages/Admin/ResenasPage';

import './index.css';

    function AppContent({ isMobile }: { isMobile: boolean }) {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const ocultarBarra = location.pathname === '/Login' || location.pathname === '/Registro';
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
        {!isAdminRoute && !ocultarBarra && <BarraNavegacion />}

        <main style={{ flex: 1, paddingBottom: isMobile && !isAdminRoute ? '90px' : '0' }}>
            <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/Inicio" element={<Inicio />} /> 
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/nosotros" element={isMobile ? <NosotrosMobile /> : <NosotrosPC />} />
            <Route path="/acerca" element={isMobile ? <AcercaDeMobile /> : <NosotrosPC />} />
            <Route path="/productos" element={<ProductosPagePC />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/perfil" element={isMobile ? <PerfilMobile /> : <PerfilPC />} />
            <Route path="/modal-carrito" element={<ModalCarritoPC />} />
            <Route path="/carrito" element={<CarritoPage />} />
            <Route path="/respuesta-pago" element={<RespuestaPago />} />
            <Route path="/perfil/direccion" element={<PerfilDireccion />} />
            <Route path="/pago/:id" element={<FormularioPago />} />
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="usuarios" element={<UsuariosPage />} />
                <Route path="productos" element={<ProductosPage />} />
                <Route path="ordenes" element={<OrdenesPage />} />
                <Route path="pagos" element={<PagosPage />} />
                <Route path="resenas" element={<ResenasPage />} />
            </Route>
            <Route path="*" element={<Error404 />} />
            </Routes>
        </main>

        {/* COMPONENTES MÓVIL */}
        {isMobile && !isAdminRoute && !ocultarBarra && (
            <>
                <BarraInferiorMobile />
                <BotonCarritoMobile />
                <ToastCarrito />
            </>
            )}


        {/* COMPONENTES PC */}
        {!isMobile && !isAdminRoute && usuarioLogueado && !isInicio && location.pathname !== '/carrito' && (
            <>
            <BotonFlotante onClick={toggleCarrito} />
            <ToastCarrito />
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
