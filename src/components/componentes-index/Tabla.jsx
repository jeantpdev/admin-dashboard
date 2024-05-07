import React, {useState, useEffect} from 'react'
import FilaTabla from '@/components/componentes-index/FilaTabla'
import axios from 'axios';

export default function tabla(props) {

    const [data, setData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Realiza la solicitud HTTP a la API
          const response = await axios.get('https://mongodb-productos.onrender.com/productos/');
          // Establece los datos en el estado
          setData(response.data.productos);
        } catch (error) {
          // Maneja cualquier error que pueda ocurrir
          console.error('Error al obtener los datos:', error);
        }
      };
  
      // Llama a la función fetchData al montar el componente
      fetchData();
  
      // Limpia cualquier efecto secundario en caso de desmontaje del componente
      return () => {
        // Código de limpieza (si es necesario)
      };
    }, []); // El segundo argumento de useEffect se pasa como un array vacío para indicar que este efecto no depende de ninguna variable

    return (
    <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="">
                        Imagen
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Nombre producto
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Categoria
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Precio
                    </th>
                    <th scope="col" className="px-6 py-3">
                        
                    </th>
                </tr>
            </thead>
            <tbody>
            {data && data.map((producto) => (
                <FilaTabla
                  key={producto._id}
                  categoria={producto.categoria}
                  nombre_producto={producto.nombre_producto}
                  precio={producto.precio}
                  descripcion={producto.descripcion}
                  imagen_principal={producto.imagen_principal}
                  imagenes_productos={producto.imagenes_productos}
                  dimensiones = {producto.dimensiones}
                  descuento = {producto.descuento}
                  material = {producto.material}
                  _id={producto._id}
                />
              ))}
            </tbody>
        </table>
    </div>
  )
}