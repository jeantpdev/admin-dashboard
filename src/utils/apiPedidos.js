import axios from 'axios';

const getAccessToken = () => {
    return localStorage.getItem('access_token');
};

export const traerPedidos = async () => {
    const access_token = getAccessToken();
    try {
        const response = await axios.get('https://mongodb-productos.onrender.com/pedidos/', { 
            headers: {
              'Authorization' : 'Bearer ' + access_token
            }
          });
        return response.data;
    } catch (error) {
        throw new Error('Error al eliminar el producto:', error);
    }
};