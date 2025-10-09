// src/App.tsx (actualizado)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { useMobileDetect } from './hooks/useMobileDetect';
import NosotrosPC from './Pages/NosotrosPC';
import AcercaDeMobile from './Pages/AcercaDeMobile';
import Login from "./Pages/Login";
import Registro from "./Pages/Registro";
import './index.css';

function App() {
  const isMobile = useMobileDetect();

  return (
    <Router>
      <div className="app-container">
        <BarraNavegacion />
        
        <main style={{flex: 1, paddingBottom: isMobile ? '90px' : '0'}}>
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
          </Routes>
        </main>
        
        {/* COMPONENTES MÓVIL */}
        {isMobile && (
          <>
            <BarraInferiorMobile />
            <BotonCarritoMobile />
          </>
        )}
        
        {/* COMPONENTES PC */}
        {!isMobile && <PiePagina />}
        {!isMobile && <BotonFlotante />}
      </div>
    </Router>
  );
}

export default App;