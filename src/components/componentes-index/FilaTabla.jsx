import React, { useState } from 'react';
import { convertirAMoneda } from '@/utils/Funct.jsx';

export default function FilaTabla(props) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [nombreProductoEditado, setNombreProductoEditado] = useState(props.nombre_producto);
  const [categoriaEditada, setCategoriaEditada] = useState(props.categoria);
  const [precioEditado, setPrecioEditado] = useState(props.precio);

  const handleEditar = (id) => {
    // Lógica para manejar la edición del producto con el ID proporcionado
    console.log(`Editando producto con ID: ${id}`);
    // Aquí podrías abrir el menú de edición y pasar los datos necesarios
    setMenuAbierto(true);
  };

  const handleEliminar = (id) => {
    // Lógica para manejar la eliminación del producto con el ID proporcionado
    console.log(`Eliminando producto con ID: ${id}`);
    // Aquí podrías realizar la eliminación del producto
  };

  const handleCloseMenu = () => {
    // Lógica para cerrar el menú
    setMenuAbierto(false);
  };

  const handleGuardarCambios = () => {
    // Lógica para guardar los cambios
    // Puedes enviar los datos actualizados a través de una función de retroceso (callback) o cualquier otro método que uses en tu aplicación
    console.log("Guardando cambios...");
    console.log("Nombre editado:", nombreProductoEditado);
    console.log("Categoría editada:", categoriaEditada);
    console.log("Precio editado:", precioEditado);
    // Cierra el menú después de guardar los cambios
    handleCloseMenu();
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
            <button onClick={() => handleEditar(props._id)}>Editar</button>
            <button onClick={() => handleEliminar(props._id)}>Eliminar</button>
        </td>

        {menuAbierto && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
                <h2>Editar Producto</h2>
                <input
                type="text"
                value={nombreProductoEditado}
                onChange={(e) => setNombreProductoEditado(e.target.value)}
                placeholder="Nombre del producto"
                />
                <input
                type="text"
                value={categoriaEditada}
                onChange={(e) => setCategoriaEditada(e.target.value)}
                placeholder="Categoría"
                />
                <input
                type="number"
                value={precioEditado}
                onChange={(e) => setPrecioEditado(e.target.value)}
                placeholder="Precio"
                />
                <button onClick={handleGuardarCambios}>Guardar Cambios</button>
                <button onClick={handleCloseMenu}>Cerrar</button>
            </div>
            </div>
        )}
        </tr>
    </>
  );
}
