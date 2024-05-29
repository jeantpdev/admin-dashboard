import axios from 'axios';
//https://mongodb-productos.onrsender.com/
//http://127.0.0.1:590s0/
const getAccessToken = () => {
    return localStorage.getItem('access_token');
};


export const enviarDatosProductos = async(datosProducto) =>{
    const access_token = getAccessToken();

    try {
        const response = await axios.post('https://mongodb-productos.onrender.com/insertar-producto/', datosProducto, {
            headers: {
                'Authorization' : 'Bearer ' + access_token
            },
        });
        console.log(response)
        return response
    } catch (error) {
        console.error('Error al enviar los datos del producto:', error);
    }
}

export const enviarImagenes = async(formData) =>{
    const access_token = localStorage.getItem('access_token')
    try {
        const response = await axios.post('https://mongodb-productos.onrender.com/crear-imagen/', formData, {
            headers: {
                'Authorization' : 'Bearer ' + access_token,
                'Content-Type': 'multipart/form-data'
            },
        });
        console.log(response)
        return response.data
    } catch (error) {
        console.error('Error al enviar las imágenes:', error);
    }
}

export const guardarImagen = async (formData) => {
    const access_token = getAccessToken();

    try {
        const response = await axios.post('https://mongodb-productos.onrender.com/guardar-imagen/', formData, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response)
        return response.data
    } catch (error) {
        throw new Error('Error al enviar las imágenes:', error);
    }
};

export const eliminarProducto = async (id) => {
    const access_token = getAccessToken();
    try {
        const response = await axios.delete(`https://mongodb-productos.onrender.com/eliminar-producto/${id}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        });
        console.log(response)
        if (response.status == 200){
            return response.data; // O puedes devolver cualquier otra cosa que necesites
        }
    } catch (error) {
        throw new Error('Error al eliminar el producto:', error);
    }
};

export const traerProductos = async () => {
    const access_token = getAccessToken();
    try {
        const response = await axios.get('https://mongodb-productos.onrender.com/productos/', { 
            headers: {
              'Authorization' : 'Bearer ' + access_token
            }
          });
          console.log(response)
        return response.data; // O puedes devolver cualquier otra cosa que necesites
    } catch (error) {
        throw new Error('Error al eliminar el producto:', error);
    }
};

export const editarProducto = async (datosActualizados) => {
    const access_token = getAccessToken();
    try {
        const response = await axios.put('https://mongodb-productos.onrender.com/editar-producto/', datosActualizados, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        });
        console.log(response)
        if (response.status == 200){
            return response.data;
        }
       
    } catch (error) {
        throw new Error('Error al editar el producto:', error);
    }
};

export const eliminarImagen = async (datosImagen) => {
    const access_token = getAccessToken();

    try {
        const response = await axios.post('https://mongodb-productos.onrender.com/eliminar-imagen/', datosImagen, {
            headers: {
                'Authorization' : 'Bearer ' + access_token
              },
        });
        console.log(response)
        return response;
    } catch (error) {
        throw new Error('Error al enviar las imágenes:', error);
    }
}