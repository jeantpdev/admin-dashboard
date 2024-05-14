import React from 'react'

export default function DatosFacturacion(props) {
    return (
        <>
            <h2 className='text-xl font-semibold text-zinc-900'>Datos de facturacion</h2>
            <div className='space-y-2'>
                <p>Total: {props.datosFacturacion['total']}</p>
                <p>Descuento: {props.datosFacturacion['descuento']} %</p>
                <p>Precio total: {props.datosFacturacion['precio_total']}</p>
            </div>

        </>
    )
}
