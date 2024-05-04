import React, {useState} from 'react'
import Tabla from '@/components/componentes-index/Tabla.jsx'
import AgregarProducto from '@/components/componentes-index/AgregarProducto'

export default function PaginaPrincipal() {

  const [menuAgregarProductoAbierto, setMenuAgregarProductoAbierto] = useState(false);

  const handleAbrirMenuAgregarProducto = () => {
    setMenuAgregarProductoAbierto(true)
  }

  const handleCloseMenu = () => {
    setMenuAgregarProductoAbierto(false);
  };

  return (
    <>
        <div class="flex justify-between">
            <h1 class="text-3xl font-extrabold text-zinc-800">Productos</h1>
            <button class="bg-slate-800 p-2 text-white rounded-md" onClick={handleAbrirMenuAgregarProducto}>Agregar producto</button>
        </div>

        <div class = "flex flex-col mt-12">
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