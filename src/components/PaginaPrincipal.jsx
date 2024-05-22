import React, { useState, useEffect } from 'react';
import Tabla from '@/components/componente-tabla/Tabla.jsx';
import AgregarProducto from '@/components/componentes-productos/AgregarProducto';
import { traerProductos } from '@/utils/api.js';
import { traerPedidos } from '@/utils/apiPedidos.js';
import IconoAgregar from './Icons/IconoAgregar';

export default function PaginaPrincipal(props) {

  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [menuAgregarProductoAbierto, setMenuAgregarProductoAbierto] = useState(false);

  //* Funcion aparte que llama a los datos de la BD
  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        window.location.assign("/login");
      }

      if (props.tipo === "productos") {
        console.log("Actualizando tabla...")
        const response = await traerProductos();
        setProductos(response.productos);
        console.log("Tabla actualizada")
      } else if (props.tipo === "pedidos") {
        const response = await traerPedidos();
        setPedidos(response.pedidos);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  //* Cuando cargue la pagina, se ejecutara useEffect, el cual hace el llamado fetchData
  useEffect(() => {
    fetchData();
  }, []);

  const handleAbrirMenuAgregarProducto = () => {
    setMenuAgregarProductoAbierto(true);
  };

  const handleCloseMenu = () => {
    setMenuAgregarProductoAbierto(false);
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-extrabold text-zinc-800">{props.tipo === "productos" ? "Productos" : "Pedidos"}</h1>
        {props.tipo === "productos" && (
          <button className="flex gap-2 bg-slate-800 p-2 text-white rounded-md" onClick={handleAbrirMenuAgregarProducto}><IconoAgregar />Agregar producto</button>
        )}
      </div>
      
      {menuAgregarProductoAbierto && (
        <div>
          <AgregarProducto
            onClose={handleCloseMenu}
            actualizar_tabla={fetchData} // fetchData se envia como parametro
          />
        </div>
      )}

      <div className="flex flex-col mt-12">
        <Tabla 
          data={props.tipo === "productos" ? productos : pedidos} 
          titulosTabla={props.titulosTabla} 
          fila={props.tipo}
          actualizar_tabla={fetchData}  // fetchData se envia como parametro 
        />
      </div>

    </>
  );
}
