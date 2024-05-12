import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { generarNumeroAleatorio } from '@/utils/Funct';

export default function AgregarProducto(props) {

    const handleCloseMenu = () =>{
        props.onClose()
        props.actualizar_tabla()
    }

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
        setImagenPrincipalSeleccionada(filesArray)
    };

    useEffect(() => {
        if(imagenPrincipalSeleccionada.length != 0){
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagenPrincipal(reader.result);
            };
            reader.readAsDataURL(imagenPrincipalSeleccionada[0]);
        }

    }, [imagenPrincipalSeleccionada]);

    const manejoImagenesSecundarias = (event) => {
        const files = event.target.files;
        const filesArray = Array.from(files);
        setImagenesSecundariasSeleccionada(filesArray);
    };

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

const handleAgregarNuevoProducto = async (event) => {
    event.preventDefault();

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
            descuento: nuevoProducto.descuento || 0,
            descripcion: nuevoProducto.descripcion || "no dado",
            imagen_principal: url_imagen_principal, // Actualizar aquí con el valor recién asignado
            imagenes_productos: urls_imagenes_secundarias, // Actualizar aquí con el valor recién asignado
            dimensiones: nuevoProducto.dimensiones || "no dado",
            material: nuevoProducto.material || "no dado"
        };

        console.log(datosProducto);

        const resInsertarProducto = await enviarDatosProductos(datosProducto)

        console.log(resInsertarProducto)

    } catch (error) {
        console.error('Error al enviar las imágenes:', error);
    }
};

    const enviarImagenes = async(formData) =>{
        const access_token = localStorage.getItem('access_token')
        try {
            const response = await axios.post('http://127.0.0.1:5900/crear-imagen/', formData, {
                headers: {
                    'Authorization' : 'Bearer ' + access_token,
                    'Content-Type': 'multipart/form-data'
                },
            });
            console.log('Imágenes enviadas exitosamente');
            return response
        } catch (error) {
            console.error('Error al enviar las imágenes:', error);
        }
    }

    const enviarDatosProductos = async(datosProducto) =>{
        const access_token = localStorage.getItem('access_token')
        try {
            const response = await axios.post('http://127.0.0.1:5900/insertar-producto/', datosProducto, {
                headers: {
                    'Authorization' : 'Bearer ' + access_token
                },
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
                        <button onClick={handleCloseMenu}>X</button>
                    </div>

                    {/* IMAGENES */}
                    <div className='w-full space-y-5'>
                        <div className="space-y-5">
                                <label htmlFor="imagenes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccionar imagen principal</label>
                                <img src= {imagenPrincipal == "" ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" : `${imagenPrincipal}` } className='w-20 h-18 object-cover' alt="" />
                                <input type="file" onChange={manejoImagenPrincipal} /> {/* ACA SE GUARDAN LA IMAGEN EN selectedFile */}
                            </div>

                        <div className='flex gap-2 flex-wrap'> 

                            { imagenesSecundaria != 0 ?
                            imagenesSecundaria.map((imagen, index) => (
                                <div key={index} className="relative">
                                    <img src={imagen} className='w-20 h-18 object-cover' alt="" />
                                </div>
                            )): 
                            <div className="relative">
                                <label htmlFor="imagenes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccionar imagen secundaria</label>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" className='w-20 h-18' alt="" />
                            </div>
                            }
                        </div>

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
