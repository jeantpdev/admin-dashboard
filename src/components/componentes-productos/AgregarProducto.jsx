import React, { useState, useEffect } from 'react';
import { showAlert, showLoader, showError } from '@/utils/Alerts.js';
import { generarNumeroAleatorio } from '@/utils/Funct';
import { enviarDatosProductos, enviarImagenes } from '@/utils/api';
import Swal from 'sweetalert2';

export default function AgregarProducto(props) {
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        categoria: '',
        precio: '',
        descuento: '',
        dimensiones: '',
        material: '',
        descripcion: ''
    });

    // Permite actualizar un preview de las imagenes a enviar luego de ser seleccionadas "seleccionar archivos"
    const [imagenPrincipal, setImagenPrincipal] = useState("");
    const [imagenesSecundaria, setImagenesSecundaria] = useState([]);

    const handleCloseMenu = () => {
        props.onClose()
        props.actualizar_tabla()
    }

    // Permite almacenar las imagenes seleccionadas con el "seleccionar archivo"
    const [imagenPrincipalSeleccionada, setImagenPrincipalSeleccionada] = useState([]);
    const [imagenesSecundariasSeleccionada, setImagenesSecundariasSeleccionada] = useState([]);

    const manejoImagenPrincipal = (event) => {
        const files = event.target.files;
        const filesArray = Array.from(files);
        setImagenPrincipalSeleccionada(filesArray)
    };

    const manejoImagenesSecundarias = (event) => {
        const files = event.target.files;
        const filesArray = Array.from(files);
        setImagenesSecundariasSeleccionada(filesArray);
    };

    // Se ejecuta cada que imagenPrincipalSeleccionada cambia y permite ver la preview de la imagen seleccionada
    useEffect(() => {
        if (imagenPrincipalSeleccionada.length != 0) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagenPrincipal(reader.result);
            };
            reader.readAsDataURL(imagenPrincipalSeleccionada[0]);
        }

    }, [imagenPrincipalSeleccionada]);

    // Se ejecuta cada que imagenPrincipalSeleccionada cambia y permite ver la preview de las imagenes seleccionadas
    useEffect(() => {
        if (imagenesSecundariasSeleccionada.length !== 0) {
            const promises = imagenesSecundariasSeleccionada.map(file => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        resolve(reader.result);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(promises)
                .then(results => {
                    setImagenesSecundaria(results);
                })
                .catch(error => {
                    console.error("Error al cargar imágenes:", error);
                });
        }
    }, [imagenesSecundariasSeleccionada]);

    const agregarImagenesFormData = () => {
        const formData = new FormData();
    
        if (!imagenPrincipalSeleccionada.length && !imagenesSecundariasSeleccionada.length) {
            return false;
        }
    
        imagenPrincipalSeleccionada.forEach((file) => {
            formData.append('imagen_principal', file);
        });
    
        imagenesSecundariasSeleccionada.forEach((file) => {
            formData.append('imagenes_secundarias', file);
        });
    
        return formData;
    }
    
    const enviarImagenesServidor = async (formData) => {
        try {
            const res = await enviarImagenes(formData);
            const { url_imagen_principal, urls_imagenes_secundarias } = res;
    
            return { url_imagen_principal, urls_imagenes_secundarias };
        } catch (error) {
            console.error('Error al enviar las imágenes:', error);
            throw error;
        }
    }
    
    const handleAgregarNuevoProducto = async (event) => {
        event.preventDefault();
        showLoader("Enviando imágenes...");
    
        const formData = agregarImagenesFormData();
    
        if (!formData) {
            showError("Verifica haber elegido imágenes");
            return;
        }
    
        try {
            const { url_imagen_principal, urls_imagenes_secundarias } = await enviarImagenesServidor(formData);
            showLoader("Enviando datos del producto...");
    
            const datosProducto = {
                _id: generarNumeroAleatorio(),
                nombre_producto: nuevoProducto.nombre,
                categoria: nuevoProducto.categoria,
                precio: nuevoProducto.precio,
                descuento: nuevoProducto.descuento || 0,
                descripcion: nuevoProducto.descripcion || "no dado",
                imagen_principal: url_imagen_principal,
                imagenes_productos: urls_imagenes_secundarias,
                dimensiones: nuevoProducto.dimensiones || "no dado",
                material: nuevoProducto.material || "no dado"
            };
        
            const res = await enviarDatosProductos(datosProducto);
            Swal.close()
            showAlert("Producto agregado!")
        } catch (error) {
            console.error('Error al enviar los datos del producto:', error);
            showError('Error al enviar los datos del producto');
            Swal.close()
        }

    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg w-11/12 sm:w-10/12 lg:w-5/12 h-5/6 overflow-auto">
                <div className="py-2 px-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-sm lg:text-xl font-bold text-gray-900 dark:text-white">Agregar producto</h2>
                        <button onClick={handleCloseMenu}>X</button>
                    </div>

                    {/* IMAGENES */}
                    <div className='w-full space-y-5'>
                        <div className="space-y-5">
                            <label htmlFor="imagenes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccionar imagen principal</label>
                            <img src={imagenPrincipal == "" ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" : `${imagenPrincipal}`} className='w-20 h-18 object-cover' alt="" />
                            <input type="file" onChange={manejoImagenPrincipal} /> {/* ACA SE GUARDAN LA IMAGEN EN selectedFile */}
                        </div>

                        <div className='flex gap-2 flex-wrap'>

                            {imagenesSecundaria != 0 ?
                                imagenesSecundaria.map((imagen, index) => (
                                    <div key={index} className="relative">
                                        <img src={imagen} className='w-20 h-18 object-cover' alt="" />
                                    </div>
                                )) :
                                <div className="relative">
                                    <label htmlFor="imagenes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccionar imagen secundaria</label>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" className='w-20 h-18' alt="" />
                                </div>
                            }
                        </div>

                        <input type="file" multiple onChange={manejoImagenesSecundarias} />
                    </div>

                    <form onSubmit={handleAgregarNuevoProducto}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre producto</label>
                                <input type="text" name="name" id="name" onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })} value={nuevoProducto.nombre} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg" placeholder="nombre del producto" required />
                            </div>
                            <div className="w-full">
                                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoria</label>
                                <input type="text" name="brand" id="brand" onChange={(e) => setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })} value={nuevoProducto.categoria} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg" placeholder="categoria" required />
                            </div>
                            <div className="w-full">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio</label>
                                <input type="number" name="price" id="price" onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })} value={nuevoProducto.precio} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg" placeholder="precio" required />
                            </div>
                            <div className="w-full">
                                <label htmlFor="descuento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descuento</label>
                                <input type="number" name="descuento" id="descuento" onChange={(e) => setNuevoProducto({ ...nuevoProducto, descuento: e.target.value })} value={nuevoProducto.descuento} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg" placeholder="descuento" required />
                            </div>
                            <div className="w-full">
                                <label htmlFor="dimensiones" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dimsiones</label>
                                <input type="text" name="dimensiones" id="dimensiones" onChange={(e) => setNuevoProducto({ ...nuevoProducto, dimensiones: e.target.value })} value={nuevoProducto.dimensiones} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg" placeholder="dimensiones" required />
                            </div>
                            <div className="w-full">
                                <label htmlFor="materiales" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Materiales</label>
                                <input type="text" name="materiales" id="materiales" onChange={(e) => setNuevoProducto({ ...nuevoProducto, material: e.target.value })} value={nuevoProducto.material} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg" placeholder="materiales" required />
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
