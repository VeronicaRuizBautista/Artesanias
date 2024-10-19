import React from 'react';
import { useNavigate } from 'react-router-dom';

// Definir el componente
function Carga() {



  return (
    <div className='bg-[url(/img/Fondo.png)] bg-cover bg-center h-screen flex items-center justify-center'>
        <img src='/img/ruraq_maki.png' alt="Centrada" className="w-64 h-auto animate-fade-in-out"/>
    </div>
  );
}

export default Carga;
