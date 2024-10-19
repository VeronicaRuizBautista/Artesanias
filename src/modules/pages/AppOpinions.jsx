import { Muesca } from '../components/Muesca'
import { CategoryHeaders } from '../components/CategoryHeaders'
import { Form, useLoaderData, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';

export default function AppOpinions() {

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
            <CategoryHeaders title='Comentarios a la app'/>

            <main className="h-[calc(100dvh-90px)] w-full font-semibold pt-[30px] px-[20px]">

                <Form method='post' action='/' className='w-full h-full flex flex-col gap-[20px]'>

                    <section className='flex flex-col gap-[15px] w-full text-blanco'>
                        <h2 className='text-9D1A1A font-bold text-lg'>Problemas frecuentes</h2>
                        <div className="bg-703A31 w-full py-[15px] px-[10px] min-h-max rounded-md text-sm">
                            <p>La aplicación no carga de manera correcta</p>
                        </div>
                        <div className="bg-703A31 w-full py-[15px] px-[10px] min-h-max rounded-md text-sm">
                            <p>Errores al querer comprar en la aplicación</p>
                        </div>
                        <div className="bg-703A31 w-full py-[15px] px-[10px] min-h-max rounded-md text-sm">
                            <p>No puedo ver las imágenes de las tiendas y/o artesanías</p>
                        </div>
                        <div className="bg-703A31 w-full py-[15px] px-[10px] min-h-max rounded-md text-sm">
                            <p>No me permite usar un cupón de descuento</p>
                        </div>
                        <div className="bg-703A31 w-full py-[15px] px-[10px] min-h-max rounded-md text-sm">
                            <p>No me deja inscribirme a los talleres</p>
                        </div>
                        <div className="bg-703A31 w-full py-[15px] px-[10px] min-h-max rounded-md text-sm">
                            <p>El QR interactivo no funciona de manera correcta</p>
                        </div>
                    </section>
                    <section className='flex flex-col gap-[20px] w-full text-blanco'>
                        <h2 className='text-9D1A1A font-bold text-lg'>Otro</h2>
                        <textarea 
                        placeholder='Describe aqui tu problema...' 
                        name='personal_opinion' 
                        className='h-[180px] bg-703A31 rounded-md focus:outline-none p-[15px]' 
                        type="text" ></textarea>
                        <div className='flex items-center justify-between'>

                            <input className='text-703A31 break-word text-xs file:bg-2E1108 file:text-sm file:text-blanco file:border-none file:p-[5px] file:rounded-md file:font-normal' type="file" accept="image/png, image/jpeg, image/jpg" name='capture' />
                            <button className='bg-2E1108 text-sm font-normal py-[5px] px-[7px] rounded-md' type='submit' >Enviar</button>

                        </div>
                    </section>

                </Form>

            </main>

        </>

    )

}