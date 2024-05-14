import React from 'react'

export default function DatosDelPedido(props) {
    console.log(props)
  return (
    <>
        <h2 className='text-xl font-semibold text-zinc-900'>Pedido realizado</h2>

        <div className='flex space-x-5'>
            {/*
            <div className="">
                <img src= {props['datosDelPedido']['imagen_producto']} className='w-30 h-52 object-cover' alt="" />
            </div>
            */}

            <div className='space-y-2'>
                <p>Nombre producto: {props['datosDelPedido']['nombre_producto']}</p>
                <p>Cantidad: {props['datosDelPedido']['cantidad']}</p>
                <p>Material: {props['datosDelPedido']['material']}</p>
            </div>
        </div>
    </>
  )
}
