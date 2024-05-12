import axios from 'axios';

const getAccessToken = () => {
    return localStorage.getItem('access_token');
};

export const traerPedidos = async () => {
    const access_token = getAccessToken();
    try {
        const response = await axios.get('http://127.0.0.1:5900/pedidos/', { 
            headers: {
              'Authorization' : 'Bearer ' + access_token
            }
          });
        return response.data; // O puedes devolver cualquier otra cosa que necesites
    } catch (error) {
        throw new Error('Error al eliminar el producto:', error);
    }
};