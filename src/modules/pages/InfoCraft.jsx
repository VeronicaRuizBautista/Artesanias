import React, { useState, useEffect, useRef } from 'react';
import { Muesca } from '../components/Muesca';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { QRCodeSVG } from 'qrcode.react';

export default function InfoCraft() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [workshop, setWorkshop] = useState(null); 
  const [showVideo, setShowVideo] = useState(false);
  const data = useLoaderData();
  const { id } = useParams();  
  const hasFetchedWorkshops = useRef(false); 

  // Redirección si no hay datos
  if (!data) {
    navigate('/register');
  }

  const fetchWorkshops = async () => {
    try {
      console.log("hola desde fetchWorkshops");
      const response = await axios.get(`http://localhost:3000/workshops/${id}`, {
        withCredentials: true,
      });
      console.log("Datos del taller obtenidos:", response.data.data[0]);
      setWorkshop(response.data.data[0]); // Actualiza el estado de workshop
    } catch (error) {
      console.error('Error al obtener los datos del taller:', error);
    }
  };

  if (!hasFetchedWorkshops.current) {
    hasFetchedWorkshops.current = true;
    setUser([data.user]);
    fetchWorkshops();
  }

  const handlePlayClick = () => {
    setShowVideo(true); 
  };

  console.log("Estado actual de workshop:", workshop);

  // Renderización condicional
  if (!workshop) {
    return <div>Cargando datos del taller...</div>;
  }

  return (
    <div className="relative flex flex-col justify-center items-center w-full h-full ">
      {/* Muesca en la esquina superior izquierda */}
      <div className="absolute top-0 left-0">
        <Muesca />
      </div>

      <div className="relative flex flex-col items-center justify-center w-full mb-20 mt-[5em] h-[5em]">
        <img src="/img/rhombusesTitle.png" className="w-[20em] h-auto" alt="Rhombuses" />
      </div>

      <div className='text-left mb-2'>
        <h3 style={{ color: '#9D1A1A' }} className='text-[1em]'>Taller de arte {workshop.nombre_taller} - Documental</h3>
      </div>

      <div className="flex items-center justify-center bg-[#703A31] px-4 relative w-full h-[16em]">
      {showVideo ? (
        <iframe
          width="560"
          height="315"
          src={workshop.video} // URL embebida
          className="w-full h-full"
          title="Video Preview"
          allowFullScreen
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      ) : (
        <>
          <img src={workshop.imagen} className="w-full h-auto" alt="Video Preview" />
          <img
            src="/img/ButtonPlay.png"
            className="absolute w-[5em] h-auto cursor-pointer"
            alt="Play Button"
            onClick={handlePlayClick} // Agrega el controlador de clic
          />
        </>
      )}
      </div>

      {/* Información interactiva */}
      <div className="flex flex-col items-center text-left space-y-4 mx-6 mt-[2em]">
        <p style={{ color: '#9D1A1A' }} className="text-lg font-semibold text-left">Conoce más del taller de forma interactiva</p>
        <p className="text-base mb-[2em]">Escanea el código QR con tu celular y disfruta de la experiencia</p>
        <QRCodeSVG  value={workshop.videoQR} size={180} className="mt-[3em] bg-[#703A31]" /> {/* Código QR */}
      </div>
    </div>
  );
};



