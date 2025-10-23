import React, { createContext, useContext, useState } from 'react';

    type ProductoCarrito = {
    id: number;
    titulo: string;
    precio: number;
    imagen: string;
    cantidad: number;
    };

    type CarritoContextType = {
    carrito: ProductoCarrito[];
    agregarProducto: (producto: ProductoCarrito) => void;
    eliminarProducto: (id: number) => void;
    vaciarCarrito: () => void;
    actualizarCantidad: (id: number, nuevaCantidad: number) => void;
    };

    const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

    export const CarritoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);

    const agregarProducto = (producto: ProductoCarrito) => {
        setCarrito((prev) => {
        const existe = prev.find((p) => p.id === producto.id);
        if (existe) {
            return prev.map((p) =>
            p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
            );
        }
        return [...prev, { ...producto, cantidad: 1 }];
        });
    };

    const eliminarProducto = (id: number) => {
        setCarrito((prev) => prev.filter((p) => p.id !== id));
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    const actualizarCantidad = (id: number, nuevaCantidad: number) => {
        setCarrito((prev) =>
        prev.map((p) =>
            p.id === id ? { ...p, cantidad: nuevaCantidad } : p
        )
        );
    };

    return (
        <CarritoContext.Provider
        value={{ carrito, agregarProducto, eliminarProducto, vaciarCarrito, actualizarCantidad }}
        >
        {children}
        </CarritoContext.Provider>
    );
    };

    // eslint-disable-next-line react-refresh/only-export-components
    export const useCarrito = () => {
    const context = useContext(CarritoContext);
    if (!context) throw new Error("useCarrito debe usarse dentro de CarritoProvider");
    return context;
    };
