import React from 'react'
import MapaDinamico from './MapaDinamico';

export default function DatosDelCliente(props) {

    console.log(props)

    return (
        <div className='space-y-2'>
            <h2 className='text-sm lg:text-lg font-semibold text-zinc-900'>Datos del cliente</h2>
            <div className='text-md space-y-2'>
                <p className='text-sm'>Nombre: {props['datosCliente'].nombre} {props['datosCliente'].apellido}</p>
                <p className='text-sm'>Ciudad: {props['datosCliente'].ciudad}</p>
                <p className='text-sm'>Celular: <a className='underline' target='__blank' href={`https://api.whatsapp.com/send/?phone=57${props['datosCliente'].numero}`}>{props['datosCliente'].numero}</a></p>
                <p className='text-sm'>Correo: <a className='underline' href={`mailto:${props['datosCliente'].correo}`}>{props['datosCliente'].correo}</a></p>
                <p className='text-sm'>Dirección: {props['datosCliente'].direccion}</p>
            </div>
        </div>
    )
}
