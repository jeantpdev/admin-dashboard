import React, { useState, useEffect } from 'react'
import Tabla from '@/components/componentes-index/Tabla.jsx'
import AgregarProducto from '@/components/componentes-index/AgregarProducto'
import { recargarPagina } from '@/utils/Funct';
import { traerProductos } from '@/utils/api.js';

export default function PaginaPrincipal() {

  const [data, setData] = useState(null);
  const [menuAgregarProductoAbierto, setMenuAgregarProductoAbierto] = useState(false);

  const fetchData = async () => {
      try {
          const response = await traerProductos();
          setData(response.productos);
          console.log("mostrando productos")
      } catch (error) {
          console.error(error.message);   
      }
  };


  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      window.location.assign("/login")
    }

    fetchData(); // Llama a la función fetchData al montar el componente
    return () => {
    };
  }, []);


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

      <div className="flex flex-col mt-12">
        <Tabla data = {data} actualizar_tabla = {fetchData}/>
      </div>

      {menuAgregarProductoAbierto && (
        <div>
          <AgregarProducto
            onClose={handleCloseMenu}
            actualizar_tabla = {fetchData}
          />
        </div>
      )

      }

    </>
  )
}