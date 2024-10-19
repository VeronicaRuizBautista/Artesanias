import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { CategoryHeaders } from '../components/CategoryHeaders'
import { Muesca } from '../components/Muesca'
import { useState, useEffect } from 'react';

export default function CustomerSupport() {

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
            <CategoryHeaders title='Atención al cliente' />

            <main className="h-[calc(100dvh-90px)] w-full flex flex-col gap-[20px] text-9D1A1A font-semibold pt-[30px] px-[20px]">

                <section className='flex flex-col gap-[15px] w-full text-blanco'>
                    <h2 className='text-9D1A1A font-bold text-lg'>Preguntas frecuentes</h2>
                    <div className="bg-703A31 w-full py-[15px] px-[10px] min-h-max rounded-md text-sm">
                        <p>¿Cómo compro en la app?</p>
                    </div>
                    <div className="bg-703A31 w-full py-[15px] px-[10px] min-h-max rounded-md text-sm">
                        <p>¿Cómo me inscribo en un taller?</p>
                    </div>
                    <div className="bg-703A31 w-full py-[15px] px-[10px] min-h-max rounded-md text-sm">
                        <p>¿Cómo escaneo el QR interactivo?</p>
                    </div>
                    <div className="bg-703A31 w-full py-[15px] px-[10px] min-h-max rounded-md text-sm">
                        <p>¿Cómo cambio la moneda en la app?</p>
                    </div>
                    <div className="bg-703A31 w-full py-[15px] px-[10px] min-h-max rounded-md text-sm">
                        <p>¿Cómo reporto un problema?</p>
                    </div>
                </section>
                <section className='flex flex-col gap-[15px] w-full text-blanco'>
                    <h2 className='text-9D1A1A font-bold text-lg'>¿Necesitas atención personalizada? habla con nuestro equipo de soporte</h2>
                    <Link to={'/chat/Soporte'} className="flex items-center gap-[10px] bg-703A31 w-full py-[10px] px-[10px] min-h-max rounded-md text-sm">
                        <svg width="30" height="30" viewBox="0 0 84 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M39.3995 66.2578L23.6665 86.1113C22.3935 87.7178 19.8155 86.5974 20.1214 84.5706L22.5776 68.2986C22.7837 66.9332 21.5721 65.751 20.1972 65.8798C18.1716 66.0694 15.4584 66.1403 13.5 65.5C9.39096 64.1565 5.43571 58.6457 4.31444 56.9794C4.10479 56.6679 4 56.3008 4 55.9253V13.8603C4 13.3111 4.22583 12.7861 4.62451 12.4084L12.9215 4.54809C13.2929 4.19615 13.7852 4 14.2969 4H68.7602C69.2376 4 69.6992 4.17078 70.0617 4.48149L79.3016 12.4014C79.7449 12.7813 80 13.336 80 13.9199V56.387C80 56.4623 80.0042 56.5356 80.0093 56.6107C80.0799 57.64 80.2662 65.5 69.5 65.5H40.9567C40.3459 65.5 39.7788 65.7791 39.3995 66.2578Z" stroke="white" strokeWidth="7" />
                        </svg>
                        <p>Empieza un chat</p>
                    </Link>
                    <div className="flex items-center gap-[10px] bg-703A31 w-full py-[10px] px-[10px] min-h-max rounded-md text-sm">
                        <svg width="30" height="30" viewBox="0 0 99 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 28.3204C6.20698 37.2443 11.5805 54.0366 25.6859 70.3489C41.6145 88.9645 60.1338 96.8325 68.9618 99.9991C71.4566 99.9991 75.103 99.7115 79.133 98.0802C87.865 94.4338 91.8951 87.045 92.9506 84.7423C92.2788 82.4391 90.9356 78.9849 88.0571 75.5306C83.6429 70.0613 78.1735 67.8542 75.6788 66.9907C72.5121 68.43 67.4265 72.46 65.5076 75.2425C53.2252 71.2124 31.4432 48.6628 27.797 34.6535C30.4837 32.6384 33.1705 30.6234 35.8572 28.6083C35.8572 26.7851 35.3774 21.3157 31.2513 16.2301C27.797 12.008 23.5749 10.2808 21.7518 9.70508C15.8025 11.0485 4.95954 22.5631 4 28.4164V28.3204Z" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M48.9668 25.1074L63.7117 32.1112C66.0285 33.2117 67.8338 35.1603 68.7546 37.5542L74.203 51.7202" stroke="white" strokeWidth="7" />
                            <path d="M53.5547 4L80.4104 17.0209C82.6182 18.0914 84.3554 19.9362 85.2914 22.2042L95.768 47.5898" stroke="white" strokeWidth="7" />
                        </svg>
                        <p>Programa una llamada</p>
                    </div>
                </section>

            </main>

        </>

    )

}