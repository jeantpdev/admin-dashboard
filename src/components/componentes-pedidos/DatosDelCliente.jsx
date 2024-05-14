import React from 'react'
import MapaDinamico from './MapaDinamico';

export default function DatosDelCliente(props) {

    return (
        <>
            <h2 className='text-xl font-semibold text-zinc-900'>Datos del cliente</h2>

            <div className='text-md space-y-2'>
                <p>Nombre: {props.datosCliente['nombre']} {props.datosCliente['apellido']}</p>
                <p>Ciudad: {props.datosCliente['ciudad']}</p>
                <p>Número de Teléfono: <a className='underline' target='__blank' href={`https://api.whatsapp.com/send/?phone=57${props.datosCliente['numero']}`}>{props.datosCliente['numero']}</a></p>
                <div className='space-y-2'>
                    <p>Dirección: {props.datosCliente['direccion']} (ubicacion aproximada)</p>
                    <MapaDinamico direccion={props.datosCliente['direccion']} />
                </div>
            </div>
        </>
    )
}
