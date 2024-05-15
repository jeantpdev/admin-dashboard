import { convertirAMoneda } from '@/utils/Funct'
import p from 'dist/_astro/LoginForm.DPr3K8e2'
import React from 'react'

export default function DatosDelPedido(props) {

    const titulosTabla = [
        "Producto",
        "Material",
        "Cantidad",
        "Sub total",
        "Descuento",
        "Precio total"
    ]

    const facturacionTotal = props.datosDelPedido.reduce((total, pedido) => {
        return total + pedido.precio_total;
    }, 0);

    return (
        <>
            <div className="relative overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {
                                titulosTabla.map((titulo, index) => (
                                    <th scope="col" key={index} className="px-6 py-3">{titulo}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {props.datosDelPedido.map((pedido, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{pedido.nombre_producto}</td>
                                <td className="px-6 py-4">{pedido.material}</td>
                                <td className="px-6 py-4">{pedido.cantidad}</td>
                                {/* <td className="px-6 py-4">{pedido.precio_total / pedido.cantidad}</td> */}
                                <td className="px-6 py-4">{convertirAMoneda(pedido.total)}</td>
                                <td className="px-6 py-4">{pedido.descuento == 0 ? "No aplica" : pedido.descuento + " %"}</td>
                                <td className="px-6 py-4">{convertirAMoneda(pedido.precio_total)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='grid justify-end p-6'>
                    <p>Suma total: {convertirAMoneda(facturacionTotal)}</p>
            </div>


        </>
    )
}
