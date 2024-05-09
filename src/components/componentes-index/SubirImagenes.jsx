import React, { useState } from 'react';
import axios from 'axios';

const SubirImagenes = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setSelectedFiles(filesArray);
  };

  const enviarImagenesAlServidor = async () => {
    const access_token = localStorage.getItem('access_token')
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('imagenes', file); // Usa 'imagenes' como nombre del campo
    });
  
    try {
      const response = await axios.post('http://127.0.0.1:5900/guardar-imagen/', formData, {
        headers: {
          'Authorization' : 'Bearer ' + access_token,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Respuesta del servidor:', response);
      console.log('Imágenes enviadas exitosamente');
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
