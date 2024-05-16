import React, { useState, useEffect } from 'react'
import FilaTabla from '@/components/componente-tabla/FilaTabla'
import FilaProductos from '@/components/componente-tabla/Filas/Productos'
import FilaPedidos from '@/components/componente-tabla/Filas/Pedidos'
import Pedidos from './Filas/Pedidos'

export default function Tabla(props) {

    console.log(props)

    return (
        <div className="relative h-[800px] overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {
                            props.titulosTabla && props.titulosTabla.map((titulo, index) => (
                                <th scope="col" key={index} className={`${titulo == "Imagen" ? null : "px-6 py-3"} `}>{titulo}</th> 
                            )) 
                        }
                    </tr>
                </thead>
                <tbody>
                {props.fila == "productos" ? props.data.map((datos) => (
                    <FilaProductos
                        key={datos._id}
                        {...datos}
                        actualizar_tabla={props.actualizar_tabla} // fetchData como parametro para poder actualizar la tabla
                    />
                )):null
                }

                {props.fila === "pedidos" ? 
                    props.data
                        .sort((a, b) => {
                            const fechaA = a.fecha.split('/').reverse().join('-'); // Convertir la fecha a formato "yyyy-mm-dd" para que sea interpretable por Date
                            const fechaB = b.fecha.split('/').reverse().join('-');
                            return new Date(fechaB) - new Date(fechaA);
                        }) // Ordenar por fecha
                        .map((datos) => (
                            <FilaPedidos
                                key={datos._id}
                                {...datos}
                                actualizar_tabla={props.actualizar_tabla} // fetchData como parametro para poder actualizar la tabla
                            />
                        ))
                    : null
                }

                </tbody>
            </table>
        </div>
    )
}