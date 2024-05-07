import React, { useState } from 'react';
import axios from 'axios';
import EditarImagen from './EditarImagenes';
export default function EditarProducto({producto, onClose}) {

    console.log(producto)


    const [id, setId] = useState(producto._id);
    const [nombreProductoEditado, setNombreProductoEditado] = useState(producto.nombre_producto);
    const [categoriaEditada, setCategoriaEditada] = useState(producto.categoria);
    const [precioEditado, setPrecioEditado] = useState(producto.precio);
    const [descripcionEditada, setDescripcionEditada] = useState(producto.descripcion);
    const [descuentoEditado, setDescuentoEditada] = useState(producto.descuento);
    const [imagenPrincipalEditada, setImagenesPrincipalEditada] = useState(producto.imagen_principal);
    const [imagenesProductosEditada, setImagenesProductosEditada] = useState(producto.imagenes_productos);
    const [dimensionesEditada, setDimensionesEditada] = useState(producto.dimensiones);
    const [materialEditada, setMaterialEditado] = useState(producto.material);

    const handleGuardarCambios = (event) => { 
        event.preventDefault();
        // Construye el objeto de datos que enviarás al servidor
        const datosActualizados = {
          _id: id,
          nombre_producto: nombreProductoEditado,
          categoria: categoriaEditada,
          precio: precioEditado,
          descripcion: descripcionEditada,
          descuento: descuentoEditado,
          imagen_principal: imagenPrincipalEditada,
          imagenes_productos: imagenesProductosEditada,
          dimensiones: dimensionesEditada,
          material: materialEditada
        };
    
        // Realiza la solicitud HTTP para enviar los datos actualizados al servidor
        axios.put('https://mongodb-productos.onrender.com/editar-producto/', datosActualizados)
          .then(response => {
            alert('Datos actualizados correctamente:');
            console.log(response.data)
          })
          .catch(error => {
            console.error('Error al enviar los datos:', error);
          });
    
      };

      const handleCloseMenu = () => {
        onClose();
      };


  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-4 rounded-lg w-11/12 sm:w-10/12 lg:w-5/12 h-5/6 overflow-auto">
        <div className="py-2 px-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm lg:text-xl font-bold text-gray-900">Editar producto</h2>
                <button onClick={handleCloseMenu}>X</button>
            </div>

            <div className=''>
                {/* COMPONENTE DE IMAGENES */}
                <div>
                    <EditarImagen id= {id} imagen_principal = {imagenPrincipalEditada} imagenes_productos = {imagenesProductosEditada}/>
                </div>
                {/* COMPONENTE DE FORMULARIO DEL PRODUCTO */}
                <div>
                    <form action="#">
                        <div className="grid gap-2">
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nombre producto</label>
                                <input type="text" name="name" id="name" onChange={(e) => setNombreProductoEditado(e.target.value)} value={nombreProductoEditado} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " placeholder="Type product name" required="" />
                            </div>
                            <div className="">
                                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900">Categoria</label>
                                <input type="text" name="brand" id="brand" onChange={(e) => setCategoriaEditada(e.target.value)} value={categoriaEditada} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " placeholder="Product brand" required="" />
                            </div>
                            <div className="">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Precio</label>
                                <input type="number" name="price" id="price" onChange={(e) => setPrecioEditado(e.target.value)} value={precioEditado} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " placeholder="$2999" required="" />
                            </div>
                            <div className="">
                                <label htmlFor="descuento" className="block mb-2 text-sm font-medium text-gray-900">Descuento</label>
                                <input type="number" name="descuento" id="descuento" onChange={(e) => setDescuentoEditada(e.target.value)} value={descuentoEditado} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg" placeholder="descuento" required="" />
                            </div>

                            <div className="">
                                <label htmlFor="dimensiones" className="block mb-2 text-sm font-medium text-gray-900">Dimensiones</label>
                                <input type="text" name="dimensiones" id="dimensiones" onChange={(e) => setDimensionesEditada(e.target.value)} value={dimensionesEditada} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg" placeholder="dimensiones" required="" />
                            </div>
                            <div className="">
                                <label htmlFor="material" className="block mb-2 text-sm font-medium text-gray-900">Materiales</label>
                                <input type="text" name="material" id="material" onChange={(e) => setMaterialEditado(e.target.value)} value={materialEditada} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " placeholder="material" required="" />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Descripcion</label>
                                <textarea id="description" className='block w-full resize-none rounded-xl bg-gray-50 border border-gray-300 text-gray-900' onChange={(e) => setDescripcionEditada(e.target.value)} value={descripcionEditada} rows="4" ></textarea>
                            </div>
                        </div>
                        <div className='grid items-center justify-end'>
                            <button type="submit" onClick={handleGuardarCambios} className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center bg-primary-700 rounded-lg bg-slate-700 text-white ">
                                Editar producto
                            </button>
                        </div>
                    </form>
                </div>

            </div>


        </div>
    </div>
</div>
  )
}