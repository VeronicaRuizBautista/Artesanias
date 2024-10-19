import { useLoaderData, useNavigate } from "react-router-dom";
import { CategoryHeaders } from "../components/CategoryHeaders"
import { Muesca } from "../components/Muesca"
import { useState, useEffect } from "react";



export default function Settings() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const data = useLoaderData()


    useEffect(()=> {

        if (!data) navigate('/register')
        setUser(data.user[0])

    },[])

    return (

        <>

            <Muesca />
            <CategoryHeaders title='Ajustes' />

            <main className="h-[calc(100dvh-90px)] w-full flex flex-col gap-[20px] text-9D1A1A font-semibold pt-[30px] px-[20px]">

                <section className="flex flex-col gap-[5px]">
                    <h2>Global</h2>
                    <div className='flex flex-col justify-around text-blanco w-full h-[140px] bg-703A31 rounded-lg text-sm p-[15px]'>
                        <div className="flex justify-between">
                            <p>Cambiar país y región</p>
                            <p className="text-gray-400/60 text-end">Canadá, Toronto</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Cambiar idioma</p>
                            <p className="text-gray-400/60">Español</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Cambiar moneda</p>
                            <p className="text-gray-400/60">PEN</p>
                        </div>
                    </div>
                </section>
                <section className="flex flex-col gap-[5px]">
                    <h2>Notificaciones</h2>
                    <div className='flex flex-col justify-around text-blanco w-full h-[180px] bg-703A31 rounded-lg text-sm p-[15px]'>
                            <label className="flex items-center justify-between cursor-pointer">
                                <span>Mostrar notificaciones de compras</span>
                                <input type="checkbox" value="" className="sr-only peer" />
                                <div className="relative w-11 h-6 bg-2E1108 peer-focus:outline-none peer-focus:ring-4  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-FFA800 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-FFA800 after:border-FFA800 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-2E1108/40">
                                </div> 
                            </label>
                            <label className="flex items-center justify-between cursor-pointer">
                                <span>Mostrar notificaciones de descuentos</span>
                                <input type="checkbox" value="" className="sr-only peer" />
                                <div className="relative w-11 h-6 bg-2E1108 peer-focus:outline-none peer-focus:ring-4  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-FFA800 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-FFA800 after:border-FFA800 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-2E1108/40">
                                </div> 
                            </label>
                            <label className="flex items-center justify-between cursor-pointer">
                                <span>Mostrar notificaciones de talleres</span>
                                <input type="checkbox" value="" className="sr-only peer" />
                                <div className="relative w-11 h-6 bg-2E1108 peer-focus:outline-none peer-focus:ring-4  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-FFA800 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-FFA800 after:border-FFA800 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-2E1108/40">
                                </div> 
                            </label>
                            <label className="flex items-center justify-between cursor-pointer">
                                <span>Sonido de notificaciones</span>
                                <input type="checkbox" value="" className="sr-only peer" />
                                <div className="relative w-11 h-6 bg-2E1108 peer-focus:outline-none peer-focus:ring-4  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-FFA800 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-FFA800 after:border-FFA800 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-2E1108/40">
                                </div> 
                            </label>
                            
                    </div>
                </section>
                <section className="flex flex-col gap-[5px]">
                    <h2>Legal</h2>
                    <div className='flex flex-col justify-around text-blanco w-full h-[140px] bg-703A31 rounded-lg text-sm p-[15px]'>
                        <button className="p-[5px] text-start">Política de privacidad</button>
                        <button className="p-[5px] text-start">Información legal</button>
                        <button className="p-[5px] text-start">Libro de reclamaciones</button>
                    </div>
                </section>

            </main>

        </>

    )

}