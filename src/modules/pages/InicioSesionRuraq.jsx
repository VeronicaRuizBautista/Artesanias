import React, { useEffect, useState } from 'react';
import { Muesca } from '../components/Muesca';
import { Form, useLoaderData, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function InicioSesionRuraq() {

  const navigate = useNavigate();
  const data = useLoaderData()
  const [message, setMessage] = useState(null)


  useEffect(() => {
    if (data) navigate('/')
  }, [])

  const handleSubmit = (e) => {

    e.preventDefault()
    const formData = new FormData(e.target)
    
    let query = fetch('http://localhost:3000/login/auth/ruraqmaki', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: formData.get('username'), password: formData.get('password')}),
      credentials: 'include'
    }).then(res => {
      
      res.status == 200 ? navigate('/') : setMessage('Credenciales incorrectas')

    })
    

  }

  return (
    <>
      {/* Imagen en la esquina superior derecha */}
      <Muesca />
      <img
        src="/img/EsquinaSuperiorInicioSesionRuraq.png"
        className="absolute top-0 right-0 w-48 h-auto" // Cambiado a la esquina superior derecha y tamaño ajustado
        alt="Esquina Superior"
      />

      <Form onSubmit={handleSubmit} className="flex items-center justify-center h-[78vh] bg-gray-100">
        <div className="flex flex-col justify-center w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          {/* Campo para el nombre de usuario, celular o correo */}
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Nombre de usuario, celular o correo
          </label>
          <input
            type="text"
            id="username"
            name='username'
            required
            className="w-full px-3 py-2 mb-4 border rounded bg-[#2E1108] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#703A31]"
            placeholder="Ingresa tu nombre de usuario"
          />

          {/* Campo para la contraseña */}
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            required
            id="password"
            name='password'
            className="w-full px-3 py-2 mb-6 border rounded bg-[#2E1108] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#703A31]"
            placeholder="Ingresa tu contraseña"
          />
          {
            message && <p className='text-red-500 text-[13px] tracking-tighter'>{message}</p>
          }
          {/* Botón para iniciar sesión con estilo de enlace */}
          <button type='submit' className="mt-4 text-center">
            <p className="text-[#703A31] underline">
              Iniciar sesión
            </p>
          </button>

          {/* Enlace para "¿Olvidaste tu contraseña?" */}
          <div className="mt-4 text-center">
            <a href="#" className="text-[#703A31] underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </Form>

      {/* Imagen en la parte inferior */}
      <img
        src="/img/EsquinaInferiorInicioSesionRuraq.png"
        className="w-48 h-auto mt-4"
        alt="Esquina Inferior"
      />
    </>
  );
}
