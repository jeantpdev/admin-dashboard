import axios from 'axios';
//https://mongodb-productos.onrender.com/
//https://mongodb-productos.onrender.com/
const getAccessToken = () => {
    return localStorage.getItem('access_token');
};

export const guardarImagen = async (formData) => {
    const access_token = getAccessToken();

    try {
        const response = await axios.post('https://mongodb-productos.onrender.com/guardar-imagen/', formData, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data
    } catch (error) {
        console.log(error)
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
        return response.data; // O puedes devolver cualquier otra cosa que necesites
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
        return response.data; // O puedes devolver cualquier otra cosa que necesites
    } catch (error) {
        throw new Error('Error al eliminar el producto:', error);
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
        return response;
    } catch (error) {
        throw new Error('Error al enviar las imágenes:', error);
    }
}