import React, { useEffect } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

export default function Entrada() {

	const navigate = useNavigate();
    const data = useLoaderData()


    useEffect(()=> {
        if (data) navigate('/')
    },[])
	const openPopup = (auth) => {
		const width = 600;
		const height = 700;
		const left = window.innerWidth / 2 - width / 2;
		const top = window.innerHeight / 2 - height / 2;
	
		const url = `http://localhost:3000/register/auth/${auth}`; // Cambia esto por tu URL del backend
		const popup = window.open(
		  url,
		  `${auth} Login`,
		  `width=${width},height=${height},top=${top},left=${left}`
		);
	
		// Escuchar el mensaje desde el popup
		const handleMessage = (event) => {
		  if (event.origin !== 'http://localhost:3000') return; // Cambia esto por tu URL del backend
	
		  if (event.data.success) {
			popup.close(); // Cierra el popup
			window.location.href = 'http://localhost:5173/'; // Redirige a tu frontend
		  }
		};
	
		window.addEventListener('message', (e) => handleMessage(e));
	
		const interval = setInterval(() => {
		  if (popup.closed) {
			clearInterval(interval);
			window.removeEventListener('message', handleMessage); // Limpia el listener si el popup se cierra
		  }
		}, 1000);
	  };




	return (
		<div className='bg-[url(/img/ImagenFondoEntrada.png)] bg-cover bg-center h-screen flex items-center justify-center relative bg-703A31'>
			<div className='text-center flex flex-col items-center justify-center'>
				<img src='/img/TituloEntrada.png' alt="Título" className='mb-8 w-3/4 mx-auto' /> {/* Imagen centrada */}

				<ul className='space-y-6 w-66 list-none'> {/* Lista centrada con ancho fijo */}
					<li>
						<button
							onClick={() => openPopup('github')}
							className='flex items-center gap-[10px] justify-start bg-[#703A31] text-white px-4 py-2 rounded hover:bg-[#6a2926] transition text-lg w-full text-left'>
							<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" className="fill-blanco">
								<path fillRule="evenodd" clipRule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z">
								</path>
							</svg>

							Regístrate con GitHub
						</button>
					</li>
					<li>
						<button 
							onClick={() => openPopup('discord')}
							className='flex items-center gap-[10px] justify-start bg-[#703A31] text-white px-4 py-2 rounded hover:bg-[#6a2926] transition text-lg w-full text-left'>
							<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" className="fill-blanco border-2 rounded-full">
								<path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z">
								</path>
							</svg>

							Regístrate con Discord
						</button>
					</li>
					<li>
						<button 
							onClick={() => openPopup('google')}
							className='flex items-center gap-[10px] justify-start bg-[#703A31] text-white px-4 py-2 rounded hover:bg-[#6a2926] transition text-lg w-full text-left'>
							<svg width="20" height="20" viewBox="0 0 84 63" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M6.01059 62.4773H19.258V30.305L0.33313 16.1113V56.8325C0.33313 59.9648 2.8782 62.4773 6.01059 62.4773Z" fill="white" />
								<path d="M64.7104 62.4773H77.9579C81.0903 62.4773 83.6353 59.9322 83.6353 56.7998V16.1113L64.7104 30.305" fill="white" />
								<path d="M64.7104 5.70299V30.3053L83.6353 16.1117V8.54172C83.6353 1.52646 75.6086 -2.48692 69.9964 1.72223" fill="white" />
								<path d="M19.2581 30.3035V5.70117L41.9679 22.7336L64.6778 5.70117V30.3035L41.9679 47.3359" fill="white" />
								<path d="M0.33313 8.54143V16.1114L19.258 30.305V5.7027L13.9721 1.72195C8.32726 -2.48721 0.33313 1.49354 0.33313 8.54143Z" fill="white" />
							</svg>

							Regístrate con Gmail
						</button>
					</li>
					<li>
						<Link to={'/register/email'} className='flex items-center gap-[10px] justify-start bg-[#703A31] text-white px-4 py-2 rounded hover:bg-[#6a2926] transition text-lg w-full text-left'>
							<svg width="25" height="25" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M50.5 0C22.6 0 0 22.6 0 50.4771C0 78.3542 22.6 100.954 50.5 100.954C78.3771 100.954 101 78.3542 101 50.4771C100.977 22.6 78.3771 0 50.5 0ZM81.3598 70.3237C81.3598 71.7004 80.2356 72.8476 78.836 72.8476H22.164C20.7874 72.8476 19.6402 71.7233 19.6402 70.3237V30.6533C19.6402 29.2767 20.7644 28.1295 22.164 28.1295H78.836C80.2126 28.1295 81.3598 29.2537 81.3598 30.6533V70.3237Z" fill="white" />
								<path d="M24.6649 37.1914V65.2062L40.5422 51.0497L24.6649 37.1914Z" fill="white" />
								<path d="M72.1134 34.1641H28.8638L50.4771 53.0471L72.1134 34.1641Z" fill="white" />
								<path d="M56.6949 54.3086L52.1519 58.2779C51.2112 59.1039 49.7887 59.1039 48.848 58.2779L44.3968 54.3774L29.4373 67.708H71.7462L56.6949 54.3086Z" fill="white" />
								<path d="M76.3122 65.07V37.1699L60.5037 50.9823L76.3122 65.07Z" fill="white" />
							</svg>

							Regístrate con tu correo
						</Link>
					</li>
					<li>
						<Link to={'/register/phone'} className='flex items-center gap-[10px] justify-start bg-[#703A31] text-white px-4 py-2 rounded hover:bg-[#6a2926] transition text-lg w-full text-left'>
							<svg width="25" height="25" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M50 0C22.381 0 0 22.381 0 50C0 77.619 22.381 100 50 100C77.619 100 100 77.619 100 50C100 22.381 77.619 0 50 0ZM76.756 64.494C75.7738 66.6964 74.0179 70.7738 73.3036 72.5595C73.1548 72.9464 72.9464 73.2738 72.619 73.5417C65.0298 80.119 49.9405 72.1131 38.4226 60.5655C26.875 49.0179 18.869 33.9286 25.4464 26.3393C25.7143 26.0417 26.0714 25.8036 26.4286 25.6548C28.2143 24.9405 32.2619 23.1845 34.494 22.2024C35.3571 21.8155 36.369 22.1429 36.8452 22.9464L43.6012 34.3155C43.9286 34.881 43.9583 35.5655 43.631 36.1607L39.4345 43.9583C39.0476 44.6726 39.1667 45.5655 39.7619 46.1607L46.2798 52.6786L52.7976 59.1964C53.3929 59.7917 54.2857 59.9107 55 59.5238L62.7976 55.3571C63.3631 55.0595 64.0774 55.0595 64.6429 55.3869L76.0119 62.1429C76.8155 62.619 77.1429 63.631 76.756 64.494Z" fill="white" />
							</svg>

							Regístrate con tu celular
						</Link>
					</li>
				</ul>

				<div className='mt-8 text-center text-[1.5em]'> {/* Centramos la sección de inicio de sesión */}
					<h3 className='font-semibold text-white'>¿Ya tienes una cuenta?</h3> {/* Texto blanco */}
					<ul>
						<li>
							<a href="/login" className=' hover:underline text-lg list-none text-FFA800'>Inicia sesión</a> {/* Texto blanco */}
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}






/* image 1 */


