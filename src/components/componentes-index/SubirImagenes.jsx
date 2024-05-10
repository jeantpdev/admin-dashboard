import React, { useState } from 'react';
import { guardarImagen } from '@/utils/api.js';
import axios from 'axios';

const SubirImagenes = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setSelectedFiles(filesArray);
  };

  const enviarImagenesAlServidor = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('imagenes', file); //Se guarda en la clave 'imagenes' y su valor las imagenes
    });
  
    try {
      const response = await guardarImagen(formData)
      console.log('Producto eliminado:', response);
    } catch (error) {
      console.error('Error al enviar las imágenes:', error);
    }
  };

  return (
    <div className='w-full'>
      <label htmlFor="imagenes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccionar imágenes</label>
      <input type="file" id="imagenes" onChange={handleFileChange} />
      <button onClick={enviarImagenesAlServidor}>Enviar Imágenes</button>
    </div>
  );
};

export default SubirImagenes;
