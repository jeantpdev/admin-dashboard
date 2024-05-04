import React, { useState } from 'react';
import { convertirAMoneda } from '@/utils/Funct.jsx';
import axios from 'axios';
import Modal from './Modal';
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
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {props.nombre_producto}
          </th>
          <td className="px-6 py-4">
              {props.categoria}
          </td>
          <td className="px-6 py-4">
              {convertirAMoneda(props.precio)}
          </td>

          <td className="px-6 py-4 flex space-x-5">
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
