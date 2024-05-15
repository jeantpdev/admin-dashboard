import React from 'react';
import DatosDelPedido from './DatosDelPedido';
import DatosDelCliente from './DatosDelCliente';
import DatosFacturacion from './DatosFacturacion';
export default function VerPedido(props) {

    const datosPedido = props.pedido['pedido']
    const pedido = props.pedido

    console.log(props)

    const datosCliente = {
        nombre: pedido.nombre,
        apellido: pedido.apellido,
        numero: pedido.numero,
        direccion: pedido.direccion,
        correo: pedido.correo,
        ciudad: pedido.ciudad
    }
    /*
    const datosFacturacion = {
        precio_total: pedido['pedido']['precio_total'],
        total: pedido['pedido']['total'],
        descuento: pedido['pedido']['descuento']
    }*/

    const handleCloseMenu = () =>{
        props.onClose()
    }

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg w-11/12 sm:w-10/12 lg:w-5/12 h-5/6 overflow-auto">
                <div className="py-2 px-4">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xs lg:text-xl font-bold text-gray-900 dark:text-white">Pedido ID: {props.pedido._id}</h2>
                        <button onClick={handleCloseMenu}>X</button>
                    </div>

                    <div className='space-y-5'>
                        <div className='border-b py-5 flex justify-between'>
                            <div className='space-y-2'>
                                <p className='text-xs md:text-base'>Fecha pedido: {props.pedido.fecha}</p>
                                <p className='text-xs md:text-base'>Hora pedido: {props.pedido.hora}</p>
                            </div>
                            <div className='flex space-x-2 items-center'>
                                <img src="/procure.svg" className='h-5 lg:h-10' alt="" />
                                <p>MiTienda</p>
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <DatosDelCliente datosCliente = {datosCliente} />
                        </div>
                        
                        
                        <DatosDelPedido datosDelPedido = {datosPedido} />
                        
                        { /*
                        <DatosFacturacion datosFacturacion = {datosFacturacion} />

                        */}

                    </div>

                </div>
            </div>
        </div>
    );
}
