import React, { useState } from 'react';
import axios from 'axios';

export default function EditarProducto({producto, onClose}) {

    const [id, setId] = useState(producto._id);
    const [nombreProductoEditado, setNombreProductoEditado] = useState(producto.nombre_producto);
    const [categoriaEditada, setCategoriaEditada] = useState(producto.categoria);
    const [precioEditado, setPrecioEditado] = useState(producto.precio);
    const [descripcionEditada, setDescripcionEditada] = useState(producto.descripcion);

    const handleGuardarCambios = (event) => { 
        event.preventDefault();
        // Construye el objeto de datos que enviarás al servidor
        const datosActualizados = {
          _id: id,
          nombre_producto: nombreProductoEditado,
          categoria: categoriaEditada,
          precio: precioEditado,
          descripcion: descripcionEditada
        };
    
        // Realiza la solicitud HTTP para enviar los datos actualizados al servidor
        axios.put('https://mongodb-productos.onrender.com/editar-producto/', datosActualizados)
          .then(response => {
            alert('Datos actualizados correctamente:');
            console.log(response.data)
          })
          .catch(error => {
            console.error('Error al enviar los datos:', error);
          });
    
      };

      const handleCloseMenu = () => {
        onClose();
      };


  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-4 rounded-lg">
        <div className="py-2 px-4 mx-auto max-w-2xl">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm lg:text-xl font-bold text-gray-900 dark:text-white">Editar producto</h2>
                <button onClick={handleCloseMenu}>X</button>
            </div>
            <form action="#">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="sm:col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre producto</label>
                        <input type="text" name="name" id="name" onChange={(e) => setNombreProductoEditado(e.target.value)} value={nombreProductoEditado} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full py-2 px-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" />
                    </div>
                    <div className="w-full">
                        <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoria</label>
                        <input type="text" name="brand" id="brand" onChange={(e) => setCategoriaEditada(e.target.value)} value={categoriaEditada} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full py-2 px-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product brand" required="" />
                    </div>
                    <div className="w-full">
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio</label>
                        <input type="number" name="price" id="price" onChange={(e) => setPrecioEditado(e.target.value)} value={precioEditado} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full py-2 px-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="" />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
                        <textarea id="description" onChange={(e) => setDescripcionEditada(e.target.value)} value={descripcionEditada} rows="8" className="block py-2 px-6 w-full resize-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
                    </div>
                </div>
                <div className='grid items-center justify-end'>
                    <button type="submit" onClick={handleGuardarCambios} className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center bg-primary-700 rounded-lg bg-slate-700 text-white focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Editar producto
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}