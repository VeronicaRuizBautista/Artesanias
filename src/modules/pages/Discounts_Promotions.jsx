import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useState, useEffect } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";

const categories = [
    "Textilería",
    "Cerámica",
    "Orfebrería",
    "Talla en piedra",
    "Talla en madera",
    "Bordado",
    "Joyería",
    "Hojalatería",
    "Estampado",
    "Pintura tradicional",
];

export const discountsLoader = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/cupon/product/h`, {
            headers: {
                'Cache-Control': 'max-age=3600',
                'Expires': new Date(Date.now() + 3600 * 1000).toUTCString()
            },
            withCredentials: true
        });
        //console.log('asdasfasfasfa',response)
        return response.data // Almacena los productos en el estado}
    } catch (error) {
        console.error('Error al obtener los productos', error);
        return error
    }
}

export default function DiscountsPromotions() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const data = useLoaderData()
    const [productos, setProductos] = useState(data.user ? data.data : []);

    useEffect(()=> {

        if (!data.user) navigate('/register')
        setUser(data.user.user[0])

        // Función para hacer la solicitud a la API
        /* const fetchProductos = async () => {
            try {
            const response = await axios.get(`http://localhost:3000/cupon/product/h`, {
                withCredentials: true, cache: "force-cache"
            });
            setProductos(response.data); // Almacena los productos en el estado}
            } catch (error) {
            console.error('Error al obtener los productos', error);
            }
        };
      fetchProductos(); */

    },[])

    const handleButtonClick = (index, category) => {
        setActiveIndex(index);
        setSelectedCategory(category);
    };

    // Filtrar productos según la categoría seleccionada
    const filteredProductos = selectedCategory
        ? productos.filter(item => item.productoInfo.categoria === selectedCategory)
        : productos;
    return (
        <main className="py-[70px]">

            <svg className='absolute z-[-1] right-0 fixed' width="300px" viewBox="0 0 693 1381" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1375.94" y="690.242" width="969.008" height="969.008" transform="rotate(135 1375.94 690.242)" stroke="#703A31" strokeOpacity="0.51" strokeWidth="7"/>
            </svg>

            <svg className='absolute z-[-1] left-0 bottom-1 transform rotate-180' width="300px" viewBox="0 0 693 1381" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1375.94" y="690.242" width="969.008" height="969.008" transform="rotate(135 1375.94 690.242)" stroke="#703A31" strokeOpacity="0.51" strokeWidth="7"/>
            </svg>


            <Header nick={user?.nick} photo={user?.photo} />

            <div className="upper flex flex-col p-5 gap-2">
                <span className="text-lg font-bold text-[var(--color-9D1A1A)]">Descuentos y promociones</span>
                <small className="text-[var(--color-9D1A1A)] opacity-50">En cientos de artesanías</small>
            </div>

            <div className="overflow-x-auto flex h-10">
            {categories.map((category, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 text-white bg-[var(--color-703A31)] ${
                            activeIndex === index ? 'hover:bg-[var(--color-2E1108)]' : ''
                        } transition duration-200`}
                        onClick={() => handleButtonClick(index, category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4 p-5">
                {filteredProductos.map((item, index) => (
                    <Link to={`/product/${item.productoInfo._id}`} key={index}>

                        <div className="bg-[var(--color-703A31)] h-[280px] rounded-lg shadow-md flex flex-col relative">

                            <div className="absolute w-20 h-20 flex items-center justify-center top-[-30px] left-[-40px] z-5">
                            <svg viewBox="0 0 148 140" fill="none" xmlns="http://www.w3.org/2000/svg " className="absolute text-red-500 z-[1]">
                                <path fillRule="evenodd" clipRule="evenodd" d="M72.6916 9.93599C73.4869 10.3306 74.4216 10.3381 75.2232 9.95639L94.6103 0.724827C96.0103 0.0582127 97.6914 0.614332 98.4072 1.98081L108.335 20.9352C108.744 21.7162 109.494 22.2661 110.367 22.4252L131.374 26.253C132.897 26.5304 133.925 27.9533 133.699 29.4715L130.56 50.5976C130.431 51.4632 130.711 52.3394 131.318 52.9743L146.251 68.5808C147.32 69.6981 147.301 71.4551 146.207 72.5485L131.099 87.6529C130.473 88.2793 130.174 89.1581 130.291 90.0327L133.089 111.013C133.292 112.535 132.241 113.944 130.713 114.197L109.6 117.693C108.724 117.838 107.965 118.376 107.544 119.15L97.3117 137.942C96.5741 139.297 94.8842 139.826 93.4952 139.137L74.2431 129.586C73.4477 129.192 72.513 129.184 71.7114 129.566L52.3079 138.805C50.908 139.472 49.2268 138.916 48.5111 137.549L38.5832 118.595C38.1742 117.814 37.4241 117.264 36.5511 117.105L15.4967 113.268C13.9726 112.991 12.9446 111.566 13.1722 110.046L16.3338 88.9433C16.4637 88.0767 16.1842 87.199 15.5759 86.5633L0.835567 71.1577C-0.228864 70.0452 -0.214781 68.2975 0.867438 67.2023L15.8541 52.0362C16.4725 51.4104 16.7661 50.5373 16.6503 49.6687L13.8291 28.5174C13.626 26.9947 14.6768 25.5865 16.2052 25.3333L37.3546 21.8307C38.2302 21.6857 38.989 21.1479 39.4106 20.3736L49.6392 1.5879C50.3768 0.233124 52.0667 -0.295837 53.4557 0.393248L72.6916 9.93599Z" fill="#9D1A1A"/>
                            </svg>

                                <span className="text-white text-xl font-bold z-[1]">{item.descuento}%</span>
                            </div>

                            <img
                                src={item.productoInfo.img}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-2">
                                <h3 className="text-white text-sm">{item.productoInfo.nombre}</h3>
                                <p className="text-gray-300">COP {item.productoInfo.precio}</p>
                                <p className="text-gray-300 text-xs">{item.productoInfo.descripcion}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>


            <Footer />
        </main>
    );
}
