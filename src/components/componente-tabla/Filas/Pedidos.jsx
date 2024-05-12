import React, { useState } from 'react';
import EditarProducto from '@/components/componentes-productos/EditarProducto.jsx'
import { convertirAMoneda } from '@/utils/Funct.jsx';
import { eliminarProducto } from '@/utils/api.js';

export default function Pedidos(props) {

    const [datosPedido, setDatosPedido] = useState(null);
    const [menuVerPedidoAbierto, setMenuVerPedidoAbierto] = useState(false);

    const handleVerPedido = (datosPedido) => {
        setDatosPedido(datosPedido);// Recibe todas las props
        setMenuVerPedidoAbierto(true);
    };

    const handleEliminar = async (id) => {
        try {
            const response = await eliminarProducto(id);
            console.log('Producto eliminado:', response);
        } catch (error) {
            console.error('Error al eliminar el producto:', error.message);
        }
    };

    const handleCloseMenu = () => {
        setMenuVerPedidoAbierto(false);
        props.actualizar_tabla()
    };

    return (
        <>
            <tr className="bg-white border-b dark:bg-gray-800 h-10">
                <td className="text-gray-900 font-medium">
                    <p>{props._id}</p>
                </td>

                <td scope="row" className="px-6 py-5 font-medium ">
                    {props.fecha}
                </td>
                <td className="px-6">
                    {props.hora}
                </td>
                <td className="px-6">
                    {props.nombre_producto}
                </td>
                <td className="px-6">
                    {props.nombre}
                </td>
                <td className="px-6">
                    {props.apellido}
                </td>


                <td className="py-5 space-x-2 px-6 flex">
                    <button onClick={() => handleVerPedido(props)}>Ver</button>
                    <button onClick={() => handleEliminar(props._id)}>Eliminar</button>
                </td>
            </tr>

            {menuVerPedidoAbierto && (
                <div>
                    {datosPedido && (
                        <VerPedido
                            pedido={datosPedido}
                            onClose={handleCloseMenu}
                        />
                    )}
                </div>
            )}


        </>
    );
}
