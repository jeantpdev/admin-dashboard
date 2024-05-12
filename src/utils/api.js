import axios from 'axios';
//https://mongodb-productoss.onrender.com/
//http://127.0.0.1:5900/
const getAccessToken = () => {
    return localStorage.getItem('access_token');
};

export const guardarImagen = async (formData) => {
    const access_token = getAccessToken();

    try {
        const response = await axios.post('http://127.0.0.1:5900/guardar-imagen/', formData, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data
    } catch (error) {
        throw new Error('Error al enviar las imágenes:', error);
    }
};

export const eliminarProducto = async (id) => {
    const access_token = getAccessToken();
    try {
        const response = await axios.delete(`http://127.0.0.1:5900/eliminar-producto/${id}`, {
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
        const response = await axios.get('http://127.0.0.1:5900/productos/', { 
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
        const response = await axios.put('http://127.0.0.1:5900/editar-producto/', datosActualizados, {
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
        const response = await axios.post('http://127.0.0.1:5900/eliminar-imagen/', datosImagen, {
            headers: {
                'Authorization' : 'Bearer ' + access_token
              },
        });
        return response;
    } catch (error) {
        throw new Error('Error al enviar las imágenes:', error);
    }
}