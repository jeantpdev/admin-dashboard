import React, { useState } from 'react';
import EditarProducto from '@/components/componentes-productos/EditarProducto.jsx'
import { convertirAMoneda } from '@/utils/Funct.jsx';
import { eliminarProducto } from '@/utils/api.js';
import { showAlert } from '@/utils/Alerts.js';
import IconoEditar from '@/components/Icons/IconoEditar';
import IconoEliminar from '@/components/Icons/IconoEliminar';
import Swal from 'sweetalert2';

export default function FilaTabla(props) {

    const [productoEditado, setProductoEditado] = useState(null);
    const [menuEdicionAbierto, setMenuEdicionAbierto] = useState(false);

    const handleEditarProducto = (producto) => {
        setProductoEditado(producto);// Recibe todas las props
        setMenuEdicionAbierto(true);
    };

    const manejarConfirmacion = (id) =>{
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Quieres eliminar este producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminarlo"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "¡Eliminado!",
                    text: "El producto ha sido eliminado!",
                    icon: "success"
                });
                handleEliminar(id)
            }
        });
    }

    const handleEliminar = async (id) => {
        try {

            const response = await eliminarProducto(id);
            console.log('Producto eliminado:', response);
            showAlert("Producto eliminado")
            props.actualizar_tabla()
        } catch (error) {
            console.error('Error al eliminar el producto:', error.message);
        }
    };

    const handleCloseMenu = () => {
        setMenuEdicionAbierto(false);
        props.actualizar_tabla() // Se recibe actualizar_tabla para que cuando se cierre el modal, se ejecute fetchData y se actualicen los datos de la pagina
    };

    return (
        <>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 h-10">
                <td className="">
                    {props.imagen_principal !== "no dado" ? <img src={props.imagen_principal} className='h-10' /> : <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" className='h-10' />}
                </td>

                <td scope="row" className="px-6 py-5 font-medium text-gray-900 whitespace-nowrap text-ellipsis">
                    {props.nombre_producto}
                </td>
                <td className="px-6 text-ellipsis">
                    {props.categoria}
                </td>
                <td className="px-6">
                    {convertirAMoneda(props.precio)}
                </td>

                <td className="py-5 space-x-2 px-6 flex">
                    <button onClick={() => handleEditarProducto(props)}><IconoEditar /></button>
                    <button onClick={() => manejarConfirmacion(props._id)}><IconoEliminar /></button>
                </td>
            </tr>

            {menuEdicionAbierto && (
                <div>
                    {productoEditado && (
                        <EditarProducto
                            producto={productoEditado}
                            onClose={handleCloseMenu}
                        />
                    )}
                </div>
            )}


        </>
    );
}
