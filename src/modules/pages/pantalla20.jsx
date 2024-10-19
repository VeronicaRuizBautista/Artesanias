import React, { useState, useEffect } from 'react';
import styles from '../../css/pantalla20.module.css'
import { useLoaderData, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { CategoryHeaders } from '../components/CategoryHeaders';
import { Muesca } from '../components/Muesca';

export const comprasDataLoader = async () => {

  try {
    const response = await axios.get(`http://localhost:3000/product/`, { withCredentials: true });

    const compra = await fetch('http://localhost:3000/user/purchases/details', {
      credentials: 'include' // Esto incluye las cookies
    });
    let res = await compra.json()
    return {productos: response.data, compras: res.data}
  } catch (error) {
    console.error('Error al obtener los productos', error);
    return false
  }

}

export default function Pantalla20() {
  const navigate = useNavigate();
  const data = useLoaderData();
  const [user, setUser] = useState(!data.user ? null : data.user.user);
  const [errorMessage, setErrorMessage] = useState('');
  // Estado para almacenar los productos
  const [productos, setProductos] = useState(!data.user ? [] : data.data.productos);
  const [compras, setCompras] = useState(!data.user ? [] : data.data.compras);
  const [taller, setTaller] = useState([]);
  console.log(compras)

  useEffect(() => {
    if (!data.user) navigate('/register')
    setUser(data.user[0])
    if (!data.data) setErrorMessage('No hay compras todavia')


    // Función para hacer la solicitud a la API
    // const fetchProductos = async () => {
      /* try {
        const response = await axios.get(`http://localhost:3000/product/`, {withCredentials: true});
        setProductos(response.data); // Almacena los productos en el estado}
      } catch (error) {
        console.error('Error al obtener los productos', error);
      } */
    //};
    //fetchProductos();

    /* const fecthCompras = async () => {
      try {
        const compra = await fetch('http://localhost:3000/user/purchases/details', {
          credentials: 'include' // Esto incluye las cookies
        });
        let res = await compra.json()
        console.log(res)
        setCompras(res.data[0].compras);
      } catch (error) {
        console.error('No ha ehcho compras', error);
        setErrorMessage('No hay compras todavia')
        return
      }
    };
    fecthCompras(); */


  }, [data, navigate]);

  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <div className={styles.boxAtras}>
          <Muesca></Muesca>
        </div>
        <div className={styles.boxImg}>
          <CategoryHeaders title='Compras realizadas' />
        </div>
      </header>
      <main className={styles.main}>
        <section className={styles.compras}>
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          {/* Renderiza las coompras obtenidos de la API */}
          {!errorMessage && compras.map((compra) => (
            <div key={compra.producto._id} className={styles.compra}>
              {console.log(compra)}
              <div className={styles.boxImg}>
                <img src={compra.producto.img} alt="compra" />
              </div>
              <div className={styles.info}>
                <p className={styles.titulo}>{compra.producto.nombre}</p>
                <p className={styles.precio}>{compra.producto.precio}</p>
                <p className={styles.taller}>Asoc. {compra.nombre_taller}</p>
                <div className={styles.boxButton}>
                  <button>
                    <a href="#">Ver seguimiento del producto</a>
                  </button>
                </div>
              </div>
              <Link to={`/chat/${compra.nombre_taller}`}>
                <div className={styles.boxChat}>
                  <svg width="45" height="43" viewBox="0 0 150 148" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M31.4882 18.5098C22.3585 18.5098 15 26.6185 15 36.679V92.3489C15 102.409 22.3585 110.518 31.4882 110.518H38.4786C39.8593 110.518 40.9786 111.752 40.9786 113.273V129.015L63.0723 111.056C63.5021 110.707 64.0222 110.518 64.5563 110.518H101.987C111.117 110.518 118.476 102.409 118.476 92.3489V55.6363C118.476 54.1148 119.595 52.8814 120.976 52.8814C122.356 52.8814 123.476 54.1148 123.476 55.6363V92.3489C123.476 105.452 113.878 116.028 101.987 116.028H65.3786L39.9627 136.687C39.2035 137.304 38.1938 137.398 37.3517 136.93C36.5096 136.461 35.9786 135.51 35.9786 134.47V116.028H31.4882C19.5971 116.028 10 105.452 10 92.3489V36.679C10 23.5755 19.5971 13 31.4882 13H81.6605C83.0412 13 84.1605 14.2334 84.1605 15.7549C84.1605 17.2764 83.0412 18.5098 81.6605 18.5098H31.4882Z" fill="#FFFFFF" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M122.611 8.12193L133.936 18.2224C138.752 22.5181 138.752 29.483 133.936 33.7787L122.611 43.8792C117.795 48.1749 109.986 48.1749 105.17 43.8792L93.8454 33.7787C89.0291 29.483 89.0291 22.5181 93.8454 18.2224L105.17 8.12193C109.986 3.82616 117.795 3.82616 122.611 8.12193ZM119.44 10.9504C116.375 8.21668 111.406 8.21668 108.341 10.9504L97.0166 21.0508C93.9516 23.7845 93.9516 28.2166 97.0166 30.9503L108.341 41.0507C111.406 43.7844 116.375 43.7844 119.44 41.0507L130.765 30.9503C133.83 28.2166 133.83 23.7845 130.765 21.0508L119.44 10.9504Z" fill="#FFFFFF" />
                  </svg>
                </div>
              </Link>
            </div>
          ))}
        </section>

        <h3>Sigue viendo más artesanías</h3>

        <section className={styles.verMas}>
          {/* Renderiza los productos obtenidos de la API */}
          {productos.map((producto) => (
            <div key={producto._id} className={styles.box}>
              <Link to={`/product/${producto._id}`}>
                <div className={styles.boxImg}>
                  <img src={producto.img} alt='' />
                </div>
                <div className={styles.info}>
                  <p className={styles.titulo}>{producto.nombre}</p>
                  <p className={styles.precio}>S/.{producto.precio}</p>
                  <p className={styles.taller}>{producto.nombre_taller}</p>
                </div>
              </Link>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};
