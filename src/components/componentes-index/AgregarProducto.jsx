import React, { useState } from 'react';
import axios from 'axios';
import { generarNumeroAleatorio } from '@/utils/Funct';
import SubirImagenes from '@/components/componentes-index/SubirImagenes.jsx'

export default function AgregarProducto({ onClose }) {
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        categoria: '',
        precio: '',
        descripcion: ''
    });

    const handleAgregarNuevoProducto = (event) => {
        event.preventDefault();
        // Construye el objeto de datos que enviarás al servidor para agregar un nuevo producto

        const nuevoProductoData = {
            _id: generarNumeroAleatorio(),
            nombre_producto: nuevoProducto.nombre,
            categoria: nuevoProducto.categoria,
            precio: nuevoProducto.precio,
            descuento: nuevoProducto.precio || 0,
            descripcion: nuevoProducto.descripcion || "no dado",
            imagen_principal: nuevoProducto.imagen_principal || "no dado",
            imagenes_productos: nuevoProducto.imagenes_productos || "no dado",
            dimensiones: nuevoProducto.dimensiones || "no dado",
            material: nuevoProducto.material || "no dado"
        };

        // Realiza la solicitud HTTP para agregar el nuevo producto al servidor
        axios.post('https://mongodb-productos.onrender.com/insertar-producto/', nuevoProductoData)
            .then(response => {
                console.log('Nuevo producto agregado correctamente:', response.data);
                // Puedes realizar cualquier otra acción después de agregar el nuevo producto, como cerrar el menú
            })
            .catch(error => {
                console.error('Error al agregar el nuevo producto:', error);
                // Maneja el error de acuerdo a tus necesidades
            });
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg">
                <div className="py-2 px-4 mx-auto max-w-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-sm lg:text-xl font-bold text-gray-900 dark:text-white">Agregar producto</h2>
                        <button onClick={onClose}>X</button>
                    </div>
                    <SubirImagenes />
                    <form onSubmit={handleAgregarNuevoProducto}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre producto</label>
                                <input type="text" name="name" id="name" onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })} value={nuevoProducto.nombre} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " placeholder="nombre del producto" required="" />
                            </div>
                            <div className="w-full">
                                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoria</label>
                                <input type="text" name="brand" id="brand" onChange={(e) => setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })} value={nuevoProducto.categoria} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " placeholder="categoria" required="" />
                            </div>
                            <div className="w-full">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio</label>
                                <input type="number" name="price" id="price" onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })} value={nuevoProducto.precio} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " placeholder="precio" required="" />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
                                <textarea id="description" onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })} value={nuevoProducto.descripcion} rows="8" className="block py-2 px-6 w-full resize-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="descripcion del producto"></textarea>
                            </div>
                        </div>
                        <div className='grid items-center justify-end'> 
                            <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center bg-primary-700 rounded-lg bg-slate-700 text-white focus:ring-4 hover:bg-primary-800">
                                Agregar producto
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
