import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Muesca } from '../components/Muesca';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';

export default function TallerCeramica() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [workshop, setWorkshop] = useState(null);
  const { id } = useParams();
  const data = useLoaderData();

  useEffect(() => {
    if (!data) {
      navigate('/register');
    } else {
      setUser(data.user);
      fetchWorkshops();
    }
  }, [data]);

  const fetchWorkshops = async () => {
    try {
      console.log("Fetching workshop data...");
      const response = await axios.get(`http://localhost:3000/workshops/${id}`, {
        withCredentials: true,
      });
      console.log("Workshop data received:", response.data.data[0]);
      setWorkshop(response.data.data[0]);
    } catch (error) {
      console.error('Error fetching workshop data:', error);
    }
  };

  if (!workshop) {
    return <div>Loading workshop information...</div>;
  }

  return (
    <div className="relative w-full h-full">
      {/* Muesca en la esquina superior izquierda */}
      <div className="absolute top-0 left-0">
        <Muesca />
      </div>

      {/* Imagen del taller */}
      <div className="w-full h-2/5">
        <img
          src={workshop.imagen || '/img/CraftsWorshopPhoto.png'}
          alt="Taller de Cerámica"
          className="object-cover w-full h-full"
        />
      </div>
      
      {/* Título del taller */}
      <div className="text-white bg-[#2E1108] relative flex items-center h-[3em]">
        <img src='/img/Rectangle.png' className='w-5' alt="Icono"/>
        <h2 className="text-2xl font-bold ml-4 text-[1.1em]">{workshop.nombre_taller}</h2>
      </div>

      <div className="flex flex-col p-4 space-y-4">
        {/* Descripción del taller */}
        <p>{workshop.descripcion}</p>

        {/* Especificaciones del taller */}
        <div className="space-y-2">
          <p><strong className="text-[1.2em]">{workshop.publico}</strong></p>
          <p style={{ color: '#9D1A1A' }} className='text-[.85em]'>*Los niños menores de 8 años se recomienda que estén acompañados de un adulto</p>
          <p><strong className="text-[--color-9D1A1A]">Duración:</strong> {workshop.duracion}</p>
          <p><strong className="text-[--color-9D1A1A]">Fecha de inicio:</strong> {workshop.fecha_inicio}</p>
          <p><strong className="text-[--color-9D1A1A]">Horario:</strong> {workshop.hora}</p>
          <p><strong className="text-[--color-9D1A1A]">Materiales:</strong> {workshop.materiales}</p>
          <p><strong className="text-[--color-9D1A1A]">Modalidad:</strong> {workshop.modalidad}</p>
          <p><strong className="text-[--color-9D1A1A]">Lugar:</strong> {workshop.lugar.ciudad}, {workshop.lugar.pais}</p>
        </div>

        {/* Botón de inscripción */}
        <div className="flex items-center gap-5 pt-5">
          <button className="flex justify-center items-center bg-[--color-2E1108] w-[12em] h-[2.5em] rounded-lg text-white">
            <img
              src="/img/BookInscription.png"
              alt="Icono de inscripción"
              className="w-6 h-auto mr-2"
            />
            Inscribirse al taller
          </button>
          <label className="text-[--color-9D1A1A] text-[.8em]">*Cupos limitados</label>
        </div>
      </div>
    </div>
  );
}
