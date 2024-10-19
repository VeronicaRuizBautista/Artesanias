import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Muesca } from "../components/Muesca";
import { CategoryHeaders } from "../components/CategoryHeaders";
import { ProductCategoryCard } from "../components/ProductCategoryCard";
import { useState, useEffect } from "react";
import axios from "axios";

export const tallerProductsLoader = async ({id}) =>  {

    try {
        console.log(id)
      const response = await axios.get(`http://localhost:3000/workshops/${id}/products/?`, {
        withCredentials: true,
      });
      console.log(response.data)
      return response.data // Guardar los datos del taller
    } catch (error) {
      console.error("Error fetching workshop data", error);
      return false
    }

}

export default function WorkshopPreview() {
    const { id } = useParams();
    const data = useLoaderData();
    const [tallerData, setTallerData] = useState(data.data ? data.data : null);  // Inicializar como null
    const navigate = useNavigate();
    const [user, setUser] = useState(data.user.user);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        // Redirigir si no hay datos de usuario
        if (!data.user || !data.data) {
          navigate('/register');
        } else {
            console.log(data)
          //setUser(data.user.user);
          //setTallerData(data.data.productosDetalles)  // Cargar los datos del taller
        }
      }, [id, data, navigate]);
    
    // Manejar el cambio en el input del buscador
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Función para realizar la búsqueda en la API
    const handleSearch = async () => {
        try {
          const search = searchTerm.trim() ? searchTerm : '';  // Si no hay búsqueda, enviar cadena vacía
          const response = await axios.get(`http://localhost:3000/workshops/${id}/products/${search}`);
          setResults(response.data.productosDetalles);  // Guardar los productos obtenidos
        } catch (error) {
          console.error('Error al realizar la búsqueda', error);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          handleSearch();  // Ejecutar la búsqueda si la tecla presionada es "Enter"
        }
    };
    
    // Función para obtener los datos del taller
    /* const fetchTallerData = async () => {
        try {
            console.log(id)
          const response = await axios.get(`http://localhost:3000/workshops/${id}/products/?`, {
            withCredentials: true,
          });
          setTallerData(response.data);  // Guardar los datos del taller
        } catch (error) {
          console.error("Error fetching workshop data", error);
          navigate('/404'); // Redirigir si ocurre un error o no se encuentra el taller
        }
    }; */

    const filteredProducts = tallerData
        ? tallerData.productosDetalles.filter(product =>
            product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [];

    if (!tallerData) return <p>Cargando...</p>;  // Renderizar algo mientras se cargan los datos

    return (
        <>
            <Muesca />
            <div className="fixed z-[10] flex items-center justify-center top-0 left-0 right-0 m-auto w-[200px] h-[35px] bg-703A31 text-center text-blanco font-semibold">
                {tallerData.nombre_taller}
            </div>

            <section className="w-full h-[300px] bg-2E1108">
                <div className="h-[80%] object-cover">
                    <img className="w-full h-full" src={tallerData.imagen} alt={tallerData.nombre_taller} />
                </div>
                <div className="flex justify-center items-center relative text-center text-blanco underline h-[20%]">
                    <Link to={`/workshop/info/${id}`}>Conoce la historia detrás de este taller artesanal y conoce como producen sus textiles</Link>
                </div>
            </section>

            <section className="flex items-center my-[15px] relative">
                <CategoryHeaders title={'Artesanias'} />
                <Link to={`/chat/${tallerData.nombre_taller}`} className="absolute right-2">
                    <svg width="45" height="43" viewBox="0 0 150 148" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M31.4882 18.5098C22.3585 18.5098 15 26.6185 15 36.679V92.3489C15 102.409 22.3585 110.518 31.4882 110.518H38.4786C39.8593 110.518 40.9786 111.752 40.9786 113.273V129.015L63.0723 111.056C63.5021 110.707 64.0222 110.518 64.5563 110.518H101.987C111.117 110.518 118.476 102.409 118.476 92.3489V55.6363C118.476 54.1148 119.595 52.8814 120.976 52.8814C122.356 52.8814 123.476 54.1148 123.476 55.6363V92.3489C123.476 105.452 113.878 116.028 101.987 116.028H65.3786L39.9627 136.687C39.2035 137.304 38.1938 137.398 37.3517 136.93C36.5096 136.461 35.9786 135.51 35.9786 134.47V116.028H31.4882C19.5971 116.028 10 105.452 10 92.3489V36.679C10 23.5755 19.5971 13 31.4882 13H81.6605C83.0412 13 84.1605 14.2334 84.1605 15.7549C84.1605 17.2764 83.0412 18.5098 81.6605 18.5098H31.4882Z" fill="#FFA800" />
                    </svg>
                </Link>
            </section>

            <section className='sticky px-[20px] top-[-1px] flex w-full items-center mb-[15px] justify-center gap-2'>
                <div className="flex w-full items-center bg-703A31 h-[40px] rounded-md p-2">
                    <input
                        type="text"
                        placeholder="Buscar producto o tienda..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent border-none outline-none text-white"
                    />
                </div>
            </section>

            <section className="overflow-y-scroll h-[45dvh] grid grid-cols-2 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-[40px]">
                {filteredProducts?.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        
                            <ProductCategoryCard
                            key={index}
                            name={product.nombre}
                            price={product.precio}
                            img={product.img}
                            prdtId={product._id}
                        />
                        
                        
                    ))
                ) : (
                    <p>No se encontraron productos.</p>
                )}
            </section>
        </>
    );
};



