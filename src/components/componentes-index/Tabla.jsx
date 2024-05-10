import React, { useState, useEffect } from 'react'
import FilaTabla from '@/components/componentes-index/FilaTabla'

export default function Tabla(props) {

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="">Imagen</th>
                        <th scope="col" className="px-6 py-3">Nombre producto</th>
                        <th scope="col" className="px-6 py-3">Categoria</th>
                        <th scope="col" className="px-6 py-3">Precio</th>
                        <th scope="col" className="px-6 py-3"></th> {/* Espacio para los iconos de editar y eliminar*/}
                    </tr>
                </thead>
                <tbody>
                    {props.data && props.data.map((producto) => (
                        <FilaTabla
                            key={producto._id}
                            categoria={producto.categoria}
                            nombre_producto={producto.nombre_producto}
                            precio={producto.precio}
                            descripcion={producto.descripcion}
                            imagen_principal={producto.imagen_principal}
                            imagenes_productos={producto.imagenes_productos}
                            dimensiones={producto.dimensiones}
                            descuento={producto.descuento}
                            material={producto.material}
                            _id={producto._id}
                            actualizar_tabla = {props.actualizar_tabla}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}