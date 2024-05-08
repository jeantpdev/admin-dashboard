import React, { useState } from 'react';
import axios from 'axios';
import { generarNumeroAleatorio } from '@/utils/Funct';
import SubirImagenes from '@/components/componentes-index/SubirImagenes.jsx'

export default function AgregarProducto({ onClose }) {
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        categoria: '',
        precio: '',
        descuento: '',
        dimensiones: '',
        material: '',
        descripcion: ''
    });

    const [imagenPrincipal, setImagenPrincipal] = useState("");
    const [imagenesSecundaria, setImagenesSecundaria] = useState([]);


    const [imagenPrincipalSeleccionada, setImagenPrincipalSeleccionada] = useState([]);
    const [imagenesSecundariasSeleccionada, setImagenesSecundariasSeleccionada] = useState([]);

    const manejoImagenPrincipal = (event) => {
        const files = event.target.files;
        const filesArray = Array.from(files);
        setImagenPrincipalSeleccionada(filesArray);
    };

    const manejoImagenesSecundarias= (event) => {
        const files = event.target.files;
        const filesArray = Array.from(files);
        setImagenesSecundariasSeleccionada(filesArray);
    };

const handleAgregarNuevoProducto = async (event) => {
    event.preventDefault();

    // Preparar imagen para enviar al servidor
    const formData = new FormData();
    imagenPrincipalSeleccionada.forEach((file) => {
        formData.append('imagen_principal', file);
    });

    imagenesSecundariasSeleccionada.forEach((file) => {
        formData.append('imagenes_secundarias', file);
    });
    
    try {
        const res = await enviarImagenes(formData);
        const { url_imagen_principal, urls_imagenes_secundarias } = res.data;

        const datosProducto = {
            _id: generarNumeroAleatorio(),
            nombre_producto: nuevoProducto.nombre,
            categoria: nuevoProducto.categoria,
            precio: nuevoProducto.precio,
            descuento: nuevoProducto.precio || 0,
            descripcion: nuevoProducto.descripcion || "no dado",
            imagen_principal: url_imagen_principal, // Actualizar aquí con el valor recién asignado
            imagenes_productos: urls_imagenes_secundarias, // Actualizar aquí con el valor recién asignado
            dimensiones: nuevoProducto.dimensiones || "no dado",
            material: nuevoProducto.material || "no dado"
        };

        console.log(datosProducto);

        const resInsertarProducto = await enviarDatosProductos(datosProducto)

        console.log(resInsertarProducto)

        if(resInsertarProducto.status == 200){
            alert("Producto creado")
            onclose
        }

    } catch (error) {
        console.error('Error al enviar las imágenes:', error);
    }
};



    const enviarImagenes = async(formData) =>{
        try {
            const response = await axios.post('https://mongodb-productos.onrender.com/crear-imagen/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Imágenes enviadas exitosamente');
            return response
        } catch (error) {
            console.error('Error al enviar las imágenes:', error);
        }
    }

    const enviarDatosProductos = async(datosProducto) =>{

        try {
            const response = await axios.post('https://mongodb-productos.onrender.com/insertar-producto/', datosProducto, {
            });
            console.log('Producto enviado exitosamente');
            return response
        } catch (error) {
            console.error('Error al enviar los datos del producto:', error);
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg h-5/6 overflow-auto mx-auto">
                <div className="py-2 px-4 mx-auto max-w-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-sm lg:text-xl font-bold text-gray-900 dark:text-white">Agregar producto</h2>
                        <button onClick={onClose}>X</button>
                    </div>

                    {/* IMAGENES */}
                    <div className='w-full space-y-2'>
                        <label htmlFor="imagenes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccionar imágenes</label>
                        <input type="file" onChange={manejoImagenPrincipal} /> {/* ACA SE GUARDAN LA IMAGEN EN selectedFile */}
                        <input type="file" multiple onChange={manejoImagenesSecundarias} /> {/* ACA SE GUARDAN LA IMAGEN EN selectedFile */}
                       {/* <button onClick={enviarImagenesAlServidor}>Enviar Imágenes</button> */} 
                    </div>
                    {/* IMAGENES */}

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
                            <div className="w-full">
                                <label htmlFor="descuento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descuento</label>
                                <input type="number" name="descuento" id="descuento" onChange={(e) => setNuevoProducto({ ...nuevoProducto, descuento: e.target.value })} value={nuevoProducto.descuento} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " placeholder="descuento" required="" />
                            </div>
                            <div className="w-full">
                                <label htmlFor="dimensiones" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dimsiones</label>
                                <input type="text" name="dimensiones" id="dimensiones" onChange={(e) => setNuevoProducto({ ...nuevoProducto, dimensiones: e.target.value })} value={nuevoProducto.dimensiones} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " placeholder="dimensiones" required="" />
                            </div>
                            <div className="w-full">
                                <label htmlFor="materiales" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Materiales</label>
                                <input type="text" name="materiales" id="materiales" onChange={(e) => setNuevoProducto({ ...nuevoProducto, material: e.target.value })} value={nuevoProducto.material} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " placeholder="materiales" required="" />
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
