import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const fetchWorkshopsLoader = async () => {

    try {
        const response = await axios.get('http://localhost:3000/workshops', {
            headers: {
                'Cache-Control': 'max-age=3600',
                'Expires': new Date(Date.now() + 3600 * 1000).toUTCString()
            },
            withCredentials: true
        });
        //console.log(response)
        return response.data
    } catch (error) {
        console.error('Error fetching workshops:', error);
        return 404
    }

}

export default function CraftWorkshops() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const data = useLoaderData();
    const [workshops, setWorkshops] = useState(data.data == 404 ? null : data.data);


    useEffect(()=> {
        if (!data.user) navigate('/register')
        setUser(data.user.user[0])
        //        fetchWorkshops();
    }, [])

    const fetchWorkshops = async () => {
        /* try {
            const response = await axios.get('http://localhost:3000/workshops',{
                withCredentials: true,
                cache: "force-cache"
            });
            //console.log(response)
            setWorkshops(response.data);
        } catch (error) {
            console.error('Error fetching workshops:', error);
        } */
    };

    const handleWorkshopClick = (id) => {
        navigate(`/workshops/related/${id}`); // Redirige a una página con el ID del taller
    };


    return (
        <main className="py-[70px]">

            <svg className='absolute z-[-1] right-0' width="300px" viewBox="0 0 693 1381" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1375.94" y="690.242" width="969.008" height="969.008" transform="rotate(135 1375.94 690.242)" stroke="#703A31" strokeOpacity="0.51" strokeWidth="7"/>
            </svg>

            <svg className='absolute z-[-1] left-0 bottom-1 transform rotate-180' width="300px" viewBox="0 0 693 1381" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1375.94" y="690.242" width="969.008" height="969.008" transform="rotate(135 1375.94 690.242)" stroke="#703A31" strokeOpacity="0.51" strokeWidth="7"/>
            </svg>

            <Header nick={user?.nick} photo={user?.photo} />

            <div className="upper flex flex-col p-5 gap-2">
                <span className="text-lg font-bold text-[var(--color-9D1A1A)]">Talleres y tiendas artesanales</span>
                <small className="text-[var(--color-9D1A1A)] opacity-50">Tiendas de artesanías de todas partes de Santander</small>
            </div>

            <div className="overflow-y-scroll grid grid-cols-2 gap-4 p-5" style={{ maxHeight: "75vh" }}>
                {workshops && workshops.map((shop) => (
                    <div
                        key={shop._id}
                        className="bg-[var(--color-703A31)] rounded-lg overflow-hidden shadow-md h-[190px]"
                        onClick={() => handleWorkshopClick(shop._id)}
                        style={{ cursor: "ponter" }}
                    >
                        <div className="p-2">
                            <h3 className="text-white text-sm">{shop.nombre_taller}</h3>
                            <p className="text-gray-300">{shop.lugar.ciudad}</p>
                        </div>
                        <img
                            src={shop.imagen}
                            className="w-full h-40 object-cover"
                            style={{ borderRadius: '10px' }}
                        />
                    </div>
                ))}
            </div>

            <Footer />
        </main>
    );
}
