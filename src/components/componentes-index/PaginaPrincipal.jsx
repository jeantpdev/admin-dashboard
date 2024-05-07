import React, { useState, useEffect } from 'react'
import Tabla from '@/components/componentes-index/Tabla.jsx'
import AgregarProducto from '@/components/componentes-index/AgregarProducto'

export default function PaginaPrincipal() {

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      window.location.assign("/login")
    }
  }, []); // El segundo argumento vacío [] asegura que el efecto solo se ejecute una vez después del montaje inicial del componente

  const [menuAgregarProductoAbierto, setMenuAgregarProductoAbierto] = useState(false);

  const handleAbrirMenuAgregarProducto = () => {
    setMenuAgregarProductoAbierto(true)
  }

  const handleCloseMenu = () => {
    setMenuAgregarProductoAbierto(false);
  };

  return (
    <>
        <div className="flex justify-between">
            <h1 className="text-3xl font-extrabold text-zinc-800">Productos</h1>
            <button className="bg-slate-800 p-2 text-white rounded-md" onClick={handleAbrirMenuAgregarProducto}>Agregar producto</button>
        </div>

        <div className = "flex flex-col mt-12">
            <Tabla />
        </div>

        {menuAgregarProductoAbierto && (
            <div>
                <AgregarProducto 
                    onClose = {handleCloseMenu}
                />
            </div>
        )

        }

    </>
  )
}