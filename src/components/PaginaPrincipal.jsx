import React, { useState, useEffect } from 'react';
import Tabla from '@/components/componente-tabla/Tabla.jsx';
import AgregarProducto from '@/components/componentes-productos/AgregarProducto';
import { traerProductos } from '@/utils/api.js';
import { traerPedidos } from '@/utils/apiPedidos.js';

export default function PaginaPrincipal(props) {
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [menuAgregarProductoAbierto, setMenuAgregarProductoAbierto] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          window.location.assign("/login");
        }

        if (props.data === "productos") {
          const response = await traerProductos();
          setProductos(response.productos);
        } else if (props.data === "pedidos") {
          const response = await traerPedidos();
          setPedidos(response.pedidos);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();

    return () => {};
  }, [props.data]);

  const handleAbrirMenuAgregarProducto = () => {
    setMenuAgregarProductoAbierto(true);
  };

  const handleCloseMenu = () => {
    setMenuAgregarProductoAbierto(false);
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-extrabold text-zinc-800">{props.data === "productos" ? "Productos" : "Pedidos"}</h1>
        {props.data === "productos" && (
          <button className="bg-slate-800 p-2 text-white rounded-md" onClick={handleAbrirMenuAgregarProducto}>Agregar producto</button>
        )}
      </div>

      <div className="flex flex-col mt-12">
        <Tabla 
          data={props.data === "productos" ? productos : pedidos} 
          titulosTabla={props.titulosTabla} 
          fila={props.data}
          actualizar_tabla={() => props.data === "productos" ? traerProductos() : traerPedidos()} 
        />
      </div>

      {menuAgregarProductoAbierto && (
        <div>
          <AgregarProducto
            onClose={handleCloseMenu}
            actualizar_tabla={traerProductos}
          />
        </div>
      )}
    </>
  );
}
