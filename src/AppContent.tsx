// src/App.tsx (actualizado)
import React from 'react';
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
import Login from "./Pages/Login";
import Registro from "./Pages/Registro";
import './index.css';
import PerfilMobile from './Pages/PerfilMobile';


//Componentes del panel de administrador
import AdminLayout from './Pages/Admin/AdminLayout';
import Dashboard from './Pages/Admin/Dashboard';





    function AppContent({ isMobile }: { isMobile: boolean }) {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');



    return (
        
        <div className="app-container">
            {!isAdminRoute && <BarraNavegacion />}
            
            <main style={{flex: 1, paddingBottom: isMobile && !isAdminRoute ? '90px' : '0'}}>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/producto/:id" element={<DetalleProducto />} />
                <Route path="/servicios" element={<Servicios />} />
                {/* Ruta condicional para Nosotros */}
                <Route path="/nosotros" element={isMobile ? <NosotrosMobile /> : <NosotrosPC />} />
                {/* Ruta para Acerca de Nosotros (solo móvil) */}
                <Route path="/acerca" element={isMobile ? <AcercaDeMobile /> : <NosotrosPC />} />
                <Route path="/productos" element={<ProductosPagePC />} />
                <Route path="*" element={<Error404 />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/perfil" element={isMobile ? <PerfilMobile /> : <Inicio />} />

                {/* Rutas del panel de administración */}
                <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />

            </Route>

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
            {!isMobile && !isAdminRoute && <PiePagina />}
            {!isMobile && !isAdminRoute && <BotonFlotante />}

        </div>

    );
    }

export default AppContent;