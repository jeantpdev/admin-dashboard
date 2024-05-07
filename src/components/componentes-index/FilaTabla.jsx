import React, { useState } from 'react';
import { convertirAMoneda } from '@/utils/Funct.jsx';
import EditarProducto from './EditarProducto.jsx';

export default function FilaTabla(props) {

  const [productoEditado, setProductoEditado] = useState(null);
  const [menuEdicionAbierto, setMenuEdicionAbierto] = useState(false);

    // Función para manejar la edición de un producto
    const handleEditarProducto = (producto) => {
      setProductoEditado(producto);
      setMenuEdicionAbierto(true);
    };

  const handleEliminar = (id) => {
    // Lógica para manejar la eliminación del producto con el ID proporcionado
    console.log(`Eliminando producto con ID: ${id}`);
    // Aquí podrías realizar la eliminación del producto
  };

  const handleCloseMenu = () => {
    setMenuEdicionAbierto(false);
  };

  return (
    <>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 h-10">
          <td className="">
            {props.imagen_principal !== "no dado" ? <img src={props.imagen_principal} className='h-10'/> : <img src= "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" className='h-10'/>}
          </td>
          
          <td scope="row" className="px-6 py-5 font-medium text-gray-900 whitespace-nowrap text-ellipsis">
              {props.nombre_producto}
          </td>
          <td className="px-6 text-ellipsis">
              {props.categoria}
          </td>
          <td className="px-6">
              {convertirAMoneda(props.precio)}
          </td>

          <td className="py-5 space-x-2 px-6 flex">
              <button onClick={() => handleEditarProducto(props)}>Editar</button>
              <button onClick={() => handleEliminar(props._id)}>Eliminar</button>
          </td>
        </tr>

        {menuEdicionAbierto && (
          <div>
            {/* Mostrar el componente correspondiente */}
            {productoEditado && (
              <EditarProducto
                producto={productoEditado}
                onClose={handleCloseMenu}
              />
            )}
          </div>
        )}

        
    </>
  );
}
