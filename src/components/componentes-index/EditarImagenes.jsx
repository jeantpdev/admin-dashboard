import React, { useState } from 'react';
import axios from 'axios';

const EditarImagen = (props) => {

    const [imagenPrincipal, setImagenPrincipal] = useState(props.imagen_principal);
    const [imagenesProductos, setImagenesProductos] = useState(props.imagenes_productos);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const enviarEliminarImagen = async (datosImagen) => {
        const access_token = localStorage.getItem('access_token')
        try {
            const response = await axios.post('https://mongodb-productos.onrender.com/eliminar-imagen/', datosImagen, {
                headers: {
                    'Authorization' : 'Bearer ' + access_token
                  },
            });
            return response.data['status_imagen_eliminada'];
        } catch (error) {
            console.error('Error al enviar las imágenes:', error);
            throw error; 
        }
    }
    
    
    const handleDeleteImagenPrincipal = async () => {
        const datosImagen = {
            id: props.id,
            imagen_url: imagenPrincipal,
            tipo_imagen: "principal",
            index: 0
        }

        try {
            const res = await enviarEliminarImagen(datosImagen);

            if (res == "correcto"){
                setImagenPrincipal("no dado");
            }
        } catch (error) {
            console.error('Error al eliminar la imagen:', error);
        }
    }

    const handleDeleteImagenSecundaria = async (imagen, index) => {
        const access_token = localStorage.getItem('access_token')
        const datosImagen = {
            id: props.id,
            imagen_url: imagen,
            tipo_imagen: "secundaria",
            index: index
        };
    
        try {
            const res = await enviarEliminarImagen(datosImagen);
            if (res === "correcto") {

                const response = await axios.get('https://mongodb-productos.onrender.com/productos/', {
                    headers: {
                        'Authorization' : 'Bearer ' + access_token,
                        'Content-Type': 'multipart/form-data',
                      },
                });
                
                const producto = response.data.productos.find(producto => producto._id === datosImagen.id);
    
                if (producto) {
                    const nuevasImagenes = producto.imagenes_productos;
                    setImagenesProductos(nuevasImagenes);
                } else {
                    console.error('Producto no encontrado');
                }
            }
        } catch (error) {
            console.error('Error al eliminar la imagen:', error);
        }
    };
    
    const handleFileChange = (event) => {
        const files = event.target.files;
        const filesArray = Array.from(files);
        setSelectedFiles(filesArray);
    };

    const enviarImagenesAlServidor = async (tipo_imagen) => {
        const access_token = localStorage.getItem('access_token')

        if (selectedFiles.length === 0){
            console.log("Tienes que seleccionar imagenes")
        }else{
            const formData = new FormData();
            selectedFiles.forEach((file) => {
              formData.append('imagenes', file); // Usa 'imagenes' como nombre del campo
            });

            formData.append('id', props.id)
            formData.append("tipo_imagen", tipo_imagen)
          
            try {
              const response = await axios.post('https://mongodb-productos.onrender.com/guardar-imagen/', formData, {
                headers: {
                    'Authorization' : 'Bearer ' + access_token,
                    'Content-Type': 'multipart/form-data'
                },
              });
              if (response.status == 200){
                console.log('Respuesta del servidor:', response.data);
                if(tipo_imagen == "imagen principal"){
                    actualizarImagenPrincipal(response.data["urls_imagenes"][0])
                    const formData = new FormData();
                    selectedFiles.forEach((file) => {
                        URL.revokeObjectURL(file);
                      });
                }

                if (tipo_imagen === "imagenes secundarias") {
                    const nuevasImagenes = [...imagenesProductos, ...response.data["urls_imagenes"]];
                    actualizarImagenesSecundarias(nuevasImagenes);
                    const formData = new FormData();
                    selectedFiles.forEach((file) => {
                      URL.revokeObjectURL(file);
                    });
                  }

              }

            } catch (error) {
              console.error('Error al enviar las imágenes:', error);
            }  
        }

      };

      const actualizarImagenPrincipal = (imagenNueva) => {
        setImagenPrincipal(imagenNueva)
      }

      const actualizarImagenesSecundarias = (imagenesNuevas) => {
        setImagenesProductos(imagenesNuevas)
      }

    return (
        <div className='w-full'>
            <div className='space-y-2'>
                <label htmlFor="imagen principal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen principal</label>
                    <div className='flex justify-start gap-x-5'>
                        <div className="inline-block relative">
                            <img src= {imagenPrincipal == "no dado" ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" : `${imagenPrincipal}` } className='w-20 h-18 object-cover' alt="" />
                            <button aria-label='boton para eliminar imagen' className="absolute bg-gray-800 right-0 top-0 text-white px-2 py-1 rounded" onClick={handleDeleteImagenPrincipal}>X</button>
                        </div>
                        { imagenPrincipal == "no dado" ?
                            <div className='flex flex-col gap-y-5 justify-center items-center'>
                                    <label htmlFor="imagenes" className=" text-sm font-medium text-gray-700">Seleccionar imágenes</label>
                                    <input type="file" id="imagenes" onChange={handleFileChange} />
                                    <div>
                                        <button className=" text-xs font-medium text-white p-2 bg-gray-800 rounded-md" onClick={() => enviarImagenesAlServidor("imagen principal")}>Enviar Imágenes</button>
                                    </div>
                            </div>:null
                        }
                    </div>

                <div className=''>
                    <label htmlFor="imagen principal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagenes secundarias</label>
                    <div className='flex gap-2 flex-wrap'>
                        { imagenesProductos != "no dado" ?
                        imagenesProductos.map((imagen, index) => (
                            <div key={index} className="relative">
                                <img src={imagen} className='w-20 h-18 object-cover' alt="" />
                                <button aria-label='boton para eliminar imagen' className="absolute top-0 right-0 bg-gray-800 text-white px-2 py-1 rounded" onClick={() => handleDeleteImagenSecundaria(imagen, index)}>X</button>
                            </div>
                        )): 
                        <div className="relative">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" className='w-20 h-18' alt="" />
                            <button aria-label='boton para eliminar imagen' className="absolute top-0 right-0 bg-gray-800 text-white px-2 py-1 rounded" onClick={() => handleDeleteImagenSecundaria(imagen, index)}>X</button>
                        </div>
                    }
                        <div className='flex flex-col gap-y-5 justify-center items-center'>
                            <label htmlFor="imagenes" className=" text-sm font-medium text-gray-700">Seleccionar imágenes</label>
                            <input type="file" id="imagenes" multiple onChange={handleFileChange} />
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
