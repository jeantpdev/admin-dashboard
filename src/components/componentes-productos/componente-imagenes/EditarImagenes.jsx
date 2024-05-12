import React, { useState } from 'react';
import axios from 'axios';
import { eliminarImagen, traerProductos, guardarImagen } from '@/utils/api.js';
import { archivos, crearForm, limpiarForm, limpiarArchivosElegidos } from '@/utils/Funct';

const EditarImagen = (props) => {

    const [imagenPrincipal, setImagenPrincipal] = useState(props.imagen_principal);
    const [imagenesProductos, setImagenesProductos] = useState(props.imagenes_productos);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const manejoDeArchivos = (event) => {
        const archivosElegidos = archivos(event)
        setSelectedFiles(archivosElegidos);
    };

    const actualizarImagenesSecundarias = (imagenesNuevas) => {
        setImagenesProductos(imagenesNuevas)
    }

    const actualizarImagenPrincipal = (imagenNueva) => {
        setImagenPrincipal(imagenNueva)
    }

    const actualizarVistaPreviaImagenesSecundarias = (response, datosImagen) => {
        const producto = response.productos.find(producto => producto._id === datosImagen.id);
        const nuevasImagenes = producto.imagenes_productos;
        return nuevasImagenes
    }

    const manejarEliminacionImagenPrincipal = async () => {
        
        const datosImagen = {
            id: props.id,
            imagen_url: imagenPrincipal,
            tipo_imagen: "principal",
            index: 0 // porque solamente contiene 1 elemento en su clave de la bd
        }

        try {
            const res = await eliminarImagen(datosImagen);

            if (res.data['status_imagen_eliminada'] == "correcto") {
                setImagenPrincipal("no dado"); // se actualiza el estado de la imagen. En el HTML se valida si es "no dado", se el asigna una URL

            }
        } catch (error) {
            console.error('Error al eliminar la imagen:', error);
        }
    }

    const manejarEliminacionImagenesSecundarias = async (imagen, index) => {

        const datosImagen = {
            id: props.id,
            imagen_url: imagen,
            tipo_imagen: "secundaria",
            index: index // El index actual de la imagen ya que contiene varias y con esta se busca en la bd y se elimina especificamente esa
        }

        try {
            const res = await eliminarImagen(datosImagen);
            if (res.status == 200) {
                const response = await traerProductos();
                const nuevasImagenes = actualizarVistaPreviaImagenesSecundarias(response, datosImagen)
                actualizarImagenesSecundarias(nuevasImagenes)
            }
        } catch (error) {
            console.error('Error al eliminar la imagen:', error);
        }
    };

    const enviarImagenesAlServidor = async (tipo_imagen) => {

        // Si no se ha elegido imagenes, error en consola
        if (!selectedFiles.length) {
            console.log("Tienes que seleccionar imagenes")
            return;
        }

        const formData = crearForm(selectedFiles, props.id, tipo_imagen)

        try {
            const response = await guardarImagen(formData)

            if (response) {
                //La repuesta viene en un array "url_imagenes"
                console.log("entraste a imagen principal")
                if (tipo_imagen === "imagen principal") {
                    //Si fue solo una imagen (imagen principal) se coje solamente el primer indice
                    actualizarImagenPrincipal(response.urls_imagenes[0])
                } else if (tipo_imagen === "imagenes secundarias") {
                    // Si fueron varias imagenes (imagenes productos) se hac una copia de la actual junto con las nuevas
                    const nuevasImagenes = [...imagenesProductos, ...response.urls_imagenes];
                    actualizarImagenesSecundarias(nuevasImagenes);
                }
                limpiarForm()
                limpiarArchivosElegidos(selectedFiles) 

            } else{
                console.log("Ocurio un error", response)
            }

        } catch (error) {
            console.error('Error al enviar las imágenes:', error);
        }
    };

    /*
    const handleCloseMenu = () => {
        props.onClose();
    };
    */

    return (
        <div className='w-full'>
            {/*
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm lg:text-xl font-bold text-gray-900">Editar producto</h2>
                <button onClick={handleCloseMenu}>X</button>
            </div>
            */}
            <div className='space-y-2'>
                <label htmlFor="imagen principal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen principal</label>
                <div className='flex justify-start gap-x-5'>
                    <div className="inline-block relative">
                        <img src={imagenPrincipal == "no dado" ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" : `${imagenPrincipal}`} className='w-20 h-18 object-cover' alt="" />
                        <button aria-label='boton para eliminar imagen' className="absolute bg-gray-800 right-0 top-0 text-white px-2 py-1 rounded" onClick={manejarEliminacionImagenPrincipal}>X</button>
                    </div>
                    {imagenPrincipal == "no dado" ?
                        <div className='flex flex-col gap-y-5 justify-center items-center'>
                            <label htmlFor="imagenes" className=" text-sm font-medium text-gray-700">Seleccionar imágenes</label>
                            <input type="file" id="imagenes" onChange={manejoDeArchivos} />
                            <div>
                                <button className=" text-xs font-medium text-white p-2 bg-gray-800 rounded-md" onClick={() => enviarImagenesAlServidor("imagen principal")}>Enviar Imágenes</button>
                            </div>
                        </div> : null
                    }
                </div>

                <div className=''>
                    <label htmlFor="imagen principal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagenes secundarias</label>
                    <div className='flex gap-2 flex-wrap'>
                        {imagenesProductos != "no dado" ?
                            imagenesProductos.map((imagen, index) => (
                                <div key={index} className="relative">
                                    <img src={imagen} className='w-20 h-18 object-cover' alt="" />
                                    <button aria-label='boton para eliminar imagen' className="absolute top-0 right-0 bg-gray-800 text-white px-2 py-1 rounded" onClick={() => manejarEliminacionImagenesSecundarias(imagen, index)}>X</button>
                                </div>
                            )) :
                            <div className="relative">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" className='w-20 h-18' alt="" />
                                <button aria-label='boton para eliminar imagen' className="absolute top-0 right-0 bg-gray-800 text-white px-2 py-1 rounded" onClick={() => manejarEliminacionImagenesSecundarias(imagen, index)}>X</button>
                            </div>
                        }
                        <div className='flex flex-col gap-y-5 justify-center items-center'>
                            <label htmlFor="imagenes" className=" text-sm font-medium text-gray-700">Seleccionar imágenes</label>
                            <input type="file" id="imagenes" multiple onChange={manejoDeArchivos} />
                            <div>
                                <button className=" text-xs font-medium text-white p-2 bg-gray-800 rounded-md" onClick={() => enviarImagenesAlServidor("imagenes secundarias")}>Enviar Imágenes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default EditarImagen;
