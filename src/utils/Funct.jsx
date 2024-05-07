import React from 'react'

export const convertirAMoneda = (precio) => {
     return precio.toLocaleString('es-PE', { style: 'currency', currency: 'COP' })
};

export const calcularPrecioConDescuento = (precio, descuento) => {
    const precioNumerico = parseFloat(precio);
    const descuentoNumerico = parseFloat(descuento);
    let precioFinal = 0;
    if (descuentoNumerico != 0) {

        const precioConDescuento = precioNumerico * (1 - descuentoNumerico / 100);
        precioFinal = precioConDescuento
        return convertirAMoneda(precioFinal)

    } else {
        precioFinal = precio
        return convertirAMoneda(precioFinal)
    }
}

export const calcularPrecioConDescuentoYCantidad = (cantidad, precio, descuento) => {
    let total = 0;
    // Convierte el precio y el descuento a números decimales
    const precioNumerico = parseFloat(precio);
    const descuentoNumerico = parseFloat(descuento);
    
    if (descuentoNumerico != 0) {
        const precioConDescuento = precioNumerico * (1 - (descuentoNumerico / 100));
        total += precioConDescuento * cantidad;
        return convertirAMoneda(total); 
    } else {
        total += precioNumerico * cantidad;
        return convertirAMoneda(total); 
    }
}

export const calcularPrecioXCantidad = (precio, cantidad) => {
    let total = 0;
    return convertirAMoneda(total = (precio * cantidad));
}

export const generarNumeroAleatorio = () => {
    // Genera un número aleatorio entre 0 y 99999
    var numeroAleatorio = Math.floor(Math.random() * 100000);
    
    // Asegura que el número tenga 5 dígitos
    var numeroDe5Digitos = ('00000' + numeroAleatorio).slice(-5);
    
    return numeroDe5Digitos;
  }

  
