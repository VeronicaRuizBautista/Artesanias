import React from 'react'
import { Link } from 'react-router-dom'

export default function Purchase() {
  return (
    <div className='flex flex-col justify-center items-center'>
        <div className='flex justify-center pt-10'>
            <img src='/img/PurchaseDoneImage.png' className='w-[250px]'/>
        </div>
        <div className='flex flex-col justify-center items-center pt-5 pb-8'>
            <h3 className='text-[1.5em] pb-5'>!Compra realizada con exito!</h3>
            <img src='/img/rhombuses.png' className='w-[250px] pb-5'/>
            <p className='text-center text-[1.1em] pb-3'>Gracias por apoyar a los artesanos Santandereanos, puedes revisar tu compra en la opción de</p>
            <Link to={'/purchases/success'} className = "bg-[#703A31] rounded-sm">
                <button className='text-white w-[6em] h-[2em]'>Compras</button>
            </Link>
            <img src='/img/rhombuses.png' className='w-[250px] pt-5'/>
        </div>
        <div className='flex flex-col gap-5 pb-5'>
            <p className='text-center text-[1.1em] px-4'>Vincula tu correo para recibir más detalles sobre tus compras realizadas</p>
            <form className="flex flex-col justify-center items-center">
                <input type='email' placeholder='Añadir correo electrónico' className='bg-[#703A31]  p-4 rounded-sm w-[22em] h-[2.2em]'/>
                <button className='mt-4 bg-[#703A31] text-white px-8 py-2 rounded-lg hover:bg-[#6a2926] transition'>Enviar</button>
            </form>
        </div>
        <Link to={'/'} className='flex flex-col justify-center items-center bg-[#703A31] w-[12em] h-[2.2em] text-white '>
            <a className='text-[1.3em]'>Regresar al inicio</a>
        </Link>
    </div>
  )
}