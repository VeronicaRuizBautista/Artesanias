import React, { useEffect } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

export default function InicioSesion() {

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

		const url = `http://localhost:3000/login/auth/${auth}`; // Cambia esto por tu URL del backend
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
		<div className='bg-[url(/img/ImagenFondoEntrada.png)] bg-cover bg-center h-screen flex items-center justify-center relative bg-[#703A31]'>
			<div className='text-center flex flex-col items-center justify-center'>
				<img src='/img/IniciaSesionTitulo.png' alt="Título" className='mb-8 w-3/4 mx-auto' /> {/* Imagen centrada */}

				<ul className='space-y-6 w-[18em]'> {/* Lista centrada con ancho fijo */}
					<li>
						<button 
							onClick={() => openPopup('github')}
							className='flex items-center gap-[10px] justify-start bg-[#703A31] text-white px-4 py-2 rounded hover:bg-[#6a2926] transition text-lg w-full text-left'>
							<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" className="fill-blanco">
								<path fillRule="evenodd" clipRule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z">
								</path>
							</svg>
							Inicia sesión con GitHub
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
							Inicia sesión con Discord
						</button>
					</li>
					<li>
						<button 
							onClick={() => openPopup('google')}
							className='flex items-center gap-[10px] justify-start bg-[#703A31] text-white px-4 py-2 rounded hover:bg-[#6a2926] transition text-lg w-full text-center'>
							<svg width="20" height="20" viewBox="0 0 84 63" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M6.01059 62.4773H19.258V30.305L0.33313 16.1113V56.8325C0.33313 59.9648 2.8782 62.4773 6.01059 62.4773Z" fill="white" />
								<path d="M64.7104 62.4773H77.9579C81.0903 62.4773 83.6353 59.9322 83.6353 56.7998V16.1113L64.7104 30.305" fill="white" />
								<path d="M64.7104 5.70299V30.3053L83.6353 16.1117V8.54172C83.6353 1.52646 75.6086 -2.48692 69.9964 1.72223" fill="white" />
								<path d="M19.2581 30.3035V5.70117L41.9679 22.7336L64.6778 5.70117V30.3035L41.9679 47.3359" fill="white" />
								<path d="M0.33313 8.54143V16.1114L19.258 30.305V5.7027L13.9721 1.72195C8.32726 -2.48721 0.33313 1.49354 0.33313 8.54143Z" fill="white" />
							</svg>
							Inicia sesión con Gmail
						</button>
					</li>
					<li>
						<Link to={'/login/credentials'} className='flex items-center justify-start bg-[#703A31] text-white px-4 py-2 rounded hover:bg-[#6a2926] transition text-base w-full text-center'>
							<svg width="30" height="30" viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="49" cy="49" r="49" fill="white" />
								<path fillRule="evenodd" clipRule="evenodd" d="M66.6435 67.6713H31.3784C29.4481 67.6713 28.1117 65.8152 28.7799 64.1076C32.1208 56.1637 39.9163 51.5606 48.9738 51.5606C58.0314 51.5606 65.8269 56.0894 69.1678 64.1076C69.9102 65.8152 68.5738 67.6713 66.6435 67.6713ZM38.0602 35.4499C38.0602 29.5105 42.9602 24.6848 49.0481 24.6848C55.0617 24.6848 60.036 29.5105 60.036 35.4499C60.036 41.3893 55.136 46.2151 49.0481 46.2151C42.9602 46.2151 38.0602 41.3893 38.0602 35.4499ZM75.7754 66.7061C73.7708 57.7227 67.5345 51.0409 59.3678 47.9969C63.7481 44.5818 66.2723 39.0137 65.3072 32.9258C64.1935 25.8727 58.2542 20.2303 51.0526 19.4136C41.1041 18.3 32.6405 25.8727 32.6405 35.4499C32.6405 40.4984 35.0163 45.0272 38.8026 47.9969C30.5617 51.0409 24.3996 57.6485 22.3951 66.7061C21.6526 69.9727 24.3996 73.0908 27.8148 73.0908H70.5042C73.7708 73.0166 76.5178 69.9727 75.7754 66.7061Z" fill="#703A31" />
							</svg>

							Inicia sesión con tu cuenta de Ruraq Maki
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}