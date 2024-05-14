import React, { useState, useEffect } from 'react';

function MapaDinamico({ direccion }) {

  const [urlMapa, setUrlMapa] = useState('');

  useEffect(() => {
    async function obtenerCoordenadas(direccion) {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`);
        const data = await response.json();
        
        if (data.length > 0) {
          const ubicacion = {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon)
          };
          return ubicacion;
        } else {
          throw new Error('No se pudo encontrar la ubicación para la dirección proporcionada.');
        }
      } catch (error) {
        console.error('Error:', error.message);
        throw error;
      }
    }

    async function generarURLMapa() {
      try {
        const coordenadas = await obtenerCoordenadas(direccion);
        const latitud = coordenadas.lat;
        const longitud = coordenadas.lng;
        const url = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.296270560697!2d${longitud}!3d${latitud}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${latitud}!5e0!3m2!1ses!2sco!4v1715656537593!5m2!1ses!2sco`;
        setUrlMapa(url);
      } catch (error) {
        console.error('Error:', error.message);
      }
    }

    generarURLMapa();
  }, [direccion]);

  return (
    <div>
      {urlMapa && (
        <iframe
          title="mapa"
          className='w-full h-96'
          src={urlMapa}
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      )}
    </div>
  );
}

export default MapaDinamico;
