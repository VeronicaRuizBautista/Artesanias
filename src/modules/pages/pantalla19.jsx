
import React, { useEffect, useRef, useState } from 'react';
import { CategoryIcons } from '../components/CategoryIcons';
import styles from '../../css/pantalla19.module.css'
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Muesca } from '../components/Muesca';
import { CategoryHeaders } from '../components/CategoryHeaders';

const categories = [
  { name: "Textilería", icon: <svg width="40" viewBox="0 0 112 70" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.999997 5.0596L1 64.9404C1 67.1851 2.82396 69 5.06809 69L101.932 69C104.176 69 106 67.1851 106 64.9404L106 5.0596C106 2.81493 104.176 0.999996 101.932 0.999996L5.06808 1C2.82395 1 0.999997 2.81494 0.999997 5.0596ZM5.06809 65.4702C4.77053 65.4702 4.53404 65.2304 4.53404 64.9404L4.53404 5.0596C4.53404 4.76961 4.77053 4.5298 5.06808 4.5298L101.932 4.5298C102.229 4.5298 102.466 4.7696 102.466 5.0596L102.466 64.9404C102.466 65.2304 102.229 65.4702 101.932 65.4702L5.06809 65.4702Z" fill="white" stroke="white" strokeWidth="2" /><path fillRule="evenodd" clipRule="evenodd" d="M104 61.5C104 60.6716 104.358 60 104.8 60L111.2 60C111.642 60 112 60.6716 112 61.5C112 62.3284 111.642 63 111.2 63L104.8 63C104.358 63 104 62.3284 104 61.5Z" fill="white" /><path fillRule="evenodd" clipRule="evenodd" d="M104 47.5C104 47.2239 104.358 47 104.8 47L111.2 47C111.642 47 112 47.2239 112 47.5C112 47.7761 111.642 48 111.2 48L104.8 48C104.358 48 104 47.7761 104 47.5Z" fill="white" /><path fillRule="evenodd" clipRule="evenodd" d="M104 34.5C104 34.2239 104.358 34 104.8 34L111.2 34C111.642 34 112 34.2239 112 34.5C112 34.7761 111.642 35 111.2 35L104.8 35C104.358 35 104 34.7761 104 34.5Z" fill="white" /><path fillRule="evenodd" clipRule="evenodd" d="M104 21.5C104 21.2239 104.358 21 104.8 21L111.2 21C111.642 21 112 21.2239 112 21.5C112 21.7761 111.642 22 111.2 22L104.8 22C104.358 22 104 21.7761 104 21.5Z" fill="white" /><path fillRule="evenodd" clipRule="evenodd" d="M104 8C104 7.44772 104.358 7 104.8 7L111.2 7C111.642 7 112 7.44771 112 8C112 8.55228 111.642 9 111.2 9L104.8 9C104.358 9 104 8.55228 104 8Z" fill="white" /><path d="M4 58L4 52L104 52L104 58L4 58Z" fill="white" /><path d="M4 42L4 28L104 28L104 42L4 42Z" fill="white" /><path d="M4 18L4 11L104 11L104 18L4 18Z" fill="white" /></svg> },
  { name: "Cerámica", icon: <svg width="40" viewBox="0 0 101 95" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M24.0011 4.99387C20.9586 4.99387 18.8922 8.09181 20.0555 10.9091L28.5379 31.452C29.8141 34.5429 29.1074 38.0998 26.7472 40.4651L6.236 61.0202C4.56845 62.6913 4.56845 65.4007 6.236 67.0718L27.8707 88.7528C28.6715 89.5553 29.7576 90.0061 30.8901 90.0061H70.11C71.2424 90.0061 72.3285 89.5553 73.1293 88.7528L94.764 67.0718C96.4316 65.4007 96.4316 62.6913 94.764 61.0202L74.1583 40.3705C71.8613 38.0685 71.1249 34.6304 72.277 31.5865L80.1483 10.7906C81.208 7.99069 79.144 4.99387 76.1558 4.99387H24.0011ZM16.373 12.4362C14.1239 6.98936 18.1189 1 24.0011 1H76.1558C81.933 1 85.9235 6.79387 83.8746 12.2071L76.0033 33.0029C75.4074 34.5774 75.7883 36.3557 76.9764 37.5464L97.5821 58.1961C100.806 61.4269 100.806 66.6651 97.5821 69.8959L75.9474 91.5769C74.3992 93.1284 72.2994 94 70.11 94H30.8901C28.7006 94 26.6008 93.1284 25.0526 91.5769L3.41794 69.8959C0.194022 66.6651 0.194022 61.4269 3.41794 58.1961L23.9291 37.641C25.15 36.4176 25.5155 34.5778 24.8553 32.9791L16.373 12.4362Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" /><path d="M21 17.5C21 16.5899 21.6587 16 22.2963 16H79.7037C80.3413 16 81 16.5899 81 17.5C81 18.4101 80.3413 19 79.7037 19H22.2963C21.6587 19 21 18.4101 21 17.5Z" fill="white" stroke="white" strokeWidth="2" /><path d="M5 64.5C5 63.5824 5.65771 63 6.27879 63H95.7212C96.3423 63 97 63.5824 97 64.5C97 65.4176 96.3423 66 95.7212 66H6.27879C5.65771 66 5 65.4176 5 64.5Z" fill="white" stroke="white" strokeWidth="2" /></svg> },
  { name: "Orfebrería", icon: <svg width="40" viewBox="0 0 130 67" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.19239 24.3076L22.3076 11.1924C27.3844 6.11557 35.6156 6.11557 40.6924 11.1924L53.8076 24.3076C58.8844 29.3844 58.8844 37.6156 53.8076 42.6924L40.6924 55.8076C35.6156 60.8844 27.3844 60.8844 22.3076 55.8076L9.19239 42.6924C4.11557 37.6156 4.11557 29.3844 9.19239 24.3076Z" stroke="white" strokeWidth="6" /><path d="M39.25 25.75C43.5302 30.0302 43.5302 36.9698 39.25 41.25C34.9698 45.5302 28.0302 45.5302 23.75 41.25C19.4698 36.9698 19.4698 30.0302 23.75 25.75C28.0302 21.4698 34.9698 21.4698 39.25 25.75Z" stroke="white" strokeWidth="6" /><path d="M30 3L125.773 21.3807C126.743 21.5669 126.884 22.8975 125.975 23.2833L30 64" stroke="white" strokeWidth="5" /></svg> },
  { name: "Talla en piedra", icon: <svg width="40" viewBox="0 0 107 89" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.2748 58.0985L6.5713 80.5125C4.5031 82.5543 6.25612 86.0498 9.12944 85.6134L47.3505 79.8082C47.4996 79.7856 47.6502 79.7742 47.801 79.7742H78.131C79.5248 79.7742 80.735 78.8142 81.0523 77.457L85.5236 58.3284C85.8098 57.104 85.302 55.8309 84.2517 55.1396L48.3251 31.4941C47.8354 31.1718 47.262 31 46.6758 31H18.6819C16.2334 31 14.8161 33.7748 16.2514 35.7585L29.5977 54.2051C30.4657 55.4048 30.3285 57.0582 29.2748 58.0985Z" stroke="white" strokeWidth="6" /><path d="M97 8L74.5109 38.8774" stroke="white" strokeWidth="6" /><path d="M89 3L103.784 13.2682" stroke="white" strokeWidth="6" strokeLinecap="round" /><path d="M70.1279 37.512L73.593 36.8874C75.0917 36.6172 76.555 37.5127 76.9964 38.9702L78.1591 42.8091C78.9834 45.5305 75.912 47.7648 73.5766 46.1427L68.9487 42.9284C66.7535 41.4037 67.4975 37.9861 70.1279 37.512Z" stroke="white" strokeWidth="4" /></svg> },
  { name: "Talla en madera", icon: <svg width="30" viewBox="0 0 88 117" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M83.0078 10.9414L47.2846 59.9893" stroke="white" strokeWidth="6" /><path d="M70.3003 3L93.7841 19.3108" stroke="white" strokeWidth="6" strokeLinecap="round" /><path d="M36.1277 58.5782L47.3736 56.5511C48.8723 56.281 50.3356 57.1765 50.777 58.6339L54.5505 71.0928C55.3748 73.8142 52.3034 76.0485 49.968 74.4264L34.9485 63.9946C32.7533 62.4699 33.4974 59.0523 36.1277 58.5782Z" stroke="white" strokeWidth="4" /><rect x="3.5" y="14.5" width="51" height="99" rx="3.5" stroke="white" strokeWidth="7" /><path d="M3 46L13.7006 37.5115C17.0484 34.8558 19 30.8166 19 26.5434V13" stroke="white" strokeWidth="7" /><path d="M37 13V42.4125C37 46.9614 34.7899 51.2267 31.0736 53.85L24.1786 58.7171C23.2848 59.348 22.3202 59.8719 21.3045 60.2782L2 68" stroke="white" strokeWidth="7" /><path d="M3 115L9.81612 103.564C11.3077 101.062 13.5428 99.0871 16.21 97.9151L33.0822 90.5014C34.5478 89.8574 35.8921 88.9669 37.0566 87.8684L56 70" stroke="white" strokeWidth="7" /></svg> },
  { name: "Bordado", icon: <svg width="40" viewBox="0 0 107 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 76.5435V37.635C3 31.5263 9.57002 27.6715 14.9026 30.6514L54.0727 52.5406C57.0269 54.1915 58.6228 57.5227 58.0579 60.8594L53.0423 90.4894C52.206 95.4304 47.0847 98.3947 42.3836 96.659L8.22906 84.0483C5.08679 82.8881 3 79.8932 3 76.5435Z" stroke="white" strokeWidth="6" strokeLinecap="round" /><path d="M38 59L55 10" stroke="white" strokeWidth="6" strokeLinecap="round" /><path d="M32 11.2575C36.5 11.7536 48.38 26.4382 59.9 33.582C74.3 42.5118 77 -3.62544 92.3 3.81603C107.6 11.2575 95 17.2107 104 44" stroke="white" strokeWidth="6" strokeLinecap="round" /></svg> },
  { name: "Joyería", icon: <svg width="30" viewBox="0 0 81 119" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.36396 34.136L34.136 6.36396C37.6508 2.84924 43.3492 2.84924 46.864 6.36396L74.636 34.136C78.1508 37.6508 78.1508 43.3492 74.636 46.864L46.864 74.636C43.3492 78.1508 37.6508 78.1508 34.136 74.636L6.36396 46.864C2.84924 43.3492 2.84924 37.6508 6.36396 34.136Z" stroke="white" strokeWidth="6" /><path d="M29.7782 92.7218L32.7218 89.7782C37.0176 85.4824 43.9824 85.4824 48.2782 89.7782L51.2218 92.7218C55.5176 97.0176 55.5176 103.982 51.2218 108.278L48.2782 111.222C43.9824 115.518 37.0176 115.518 32.7218 111.222L29.7782 108.278C25.4824 103.982 25.4824 97.0176 29.7782 92.7218Z" stroke="white" strokeWidth="6" /><path d="M40 78L40 86" stroke="white" strokeWidth="6" /></svg> },
  { name: "Hojalatería", icon: <svg width="30" viewBox="0 0 103 97" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35.2363 11.0875L7.48542 3.26445C5.3851 2.67236 3.37545 4.44945 3.70608 6.60644L15.4472 83.2059C15.5998 84.2013 16.2416 85.0537 17.156 85.4755L35.0375 93.7241C35.4315 93.9059 35.8602 94 36.2941 94H71.0698C71.6113 94 72.1427 93.8535 72.6076 93.5759L86.0949 85.5244C86.8634 85.0657 87.3869 84.2877 87.5225 83.403L99.2606 6.82403C99.5994 4.61338 97.4873 2.82258 95.3618 3.51839L72.352 11.0511C72.0507 11.1497 71.7357 11.2 71.4186 11.2H36.0503C35.7751 11.2 35.5012 11.1621 35.2363 11.0875Z" stroke="white" strokeWidth="6" /><path d="M4 5L26.8531 30.6416C30.4582 34.6866 35.6188 37 41.0372 37H62.561C68.5521 37 74.1922 34.1743 77.7792 29.3756L96 5" stroke="white" strokeWidth="6" /></svg> },
  { name: "Estampado", icon: <svg width="30" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="86" height="86" rx="7" stroke="white" strokeWidth="6" /><path d="M41.9755 8.24094L43.0444 6.76094C44.3604 4.93875 46.4714 3.85938 48.7191 3.85938H82C85.866 3.85938 89 6.99338 89 10.8594V15.0131C89 17.6645 87.5019 20.0884 85.1305 21.2741L67.8417 29.9185C64.1287 31.775 59.76 29.075 59.76 24.9237C59.76 21.8396 57.2598 19.3394 54.1756 19.3394H47.6503C41.9399 19.3394 38.6321 12.8702 41.9755 8.24094Z" stroke="white" strokeWidth="6" /><path d="M10.994 71.3255L6.94308 74.6169C4.59142 76.5276 3.73608 79.7344 4.82381 82.5625L5.57417 84.5135C6.61392 87.2168 9.21119 89.0006 12.1076 89.0006H37.8455C43.113 89.0006 46.4932 83.4018 44.0399 78.7404L43.4564 77.6319C41.9278 74.7275 38.5866 73.2752 35.4202 74.1388L26.6319 76.5356C23.9122 77.2773 21.0547 75.9457 19.8733 73.3862C18.295 69.9665 13.9171 68.9505 10.994 71.3255Z" stroke="white" strokeWidth="6" /></svg> },
  { name: "Pintura tradicional", icon: <svg width="30" viewBox="0 0 91 92" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="83" height="84" rx="9" stroke="white" strokeWidth="7" /><path d="M8 87L45.0742 55.6223C51.2361 50.4072 60.52 51.4699 65.344 57.9426L87 87" stroke="white" strokeWidth="7" /><mask id="path-3-inside-1_126_4192" fill="white"><rect x="29.123" y="13.334" width="23.1467" height="23.1467" rx="7" transform="rotate(45 29.123 13.334)" /></mask><rect x="29.123" y="13.334" width="23.1467" height="23.1467" rx="7" transform="rotate(45 29.123 13.334)" stroke="white" strokeWidth="16" mask="url(#path-3-inside-1_126_4192)" /></svg> }
];

export const favProductsLoader = async () => {

  try {
    const response = await fetch('http://localhost:3000/user/favorites/products/details', {
      credentials: 'include' // Esto incluye las cookies
    });
    let res = await response.json()
    //console.log(res.data)
    //setProductos(res.data);
    //setData(res.data[0].favoritos)
    console.log(res.status);
    if (res.status == 404) return false
    return res.data
  } catch (error) {
    console.error('Error al obtener los productos', error);
    return false
  }

}

export default function Pantalla19() {
  const navigate = useNavigate();
  const data = useLoaderData()
  console.log(data);
  const [user, setUser] = useState(!data.user ? null : data.user.user)
  const [productos, setProductos] = useState(!data.data ? null : data.data);
  const [category, setCategory] = useState(null);
  const [dataFiltrada, setData] = useState(!data.data ? null : data.data[0].favoritos);
  const categoriesNav = useRef(null)


  useEffect(() => {

    if (!data) navigate('/register')
    //setUser([data.user])
    categoriesNav.current.firstChild.classList.add('border-b-4', 'border-b-2E1108')
    setCategory(categoriesNav.current.firstChild)

    //const fetchCupon = async () => {
      /* try {
        const response = await fetch('http://localhost:3000/user/favorites/products/details', {
        credentials: 'include' // Esto incluye las cookies
    });
        let res = await response.json()
        console.log(res.data)
        setProductos(res.data); 
        setData(res.data[0].favoritos)
        //filtrarProductos('Textilería')
      } catch (error) {
        setProductos()
        console.error('Error al obtener los productos', error);
      } */
    //};
    //fetchCupon()

  }, [])

  const handleCategory = (catClicked) => {
    category.classList.remove('border-b-4', 'border-b-2E1108')
    catClicked.classList.add('border-b-4', 'border-b-2E1108')
    setCategory(catClicked)
    const pElement = catClicked.querySelector('p');
    const textValue = pElement.textContent;
    filtrarProductos(textValue)
  }
  // Filtrar productos por categoría
  const filtrarProductos = (textValue) => {
    if (!productos) return
    const categoriaSeleccionada = textValue
    //console.log(productos)
    if (!categoriaSeleccionada) return productos[0]?.favoritos;
    const data = productos[0]?.favoritos.filter(favorito => favorito.categoria == categoriaSeleccionada)
    setData(data)
  };
  const deleteFavorito = async (id) => {
    //console.log('entra')
    await fetch(`http://localhost:3000/user/favorites/products/${id}`, {
      method: 'DELETE',
      credentials: 'include' // Esto incluye las cookies
    });
    console.log("Producto eliminado de favoritos");
    window.location.reload();
  };


  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <div className={styles.boxAtras}>
          <Muesca></Muesca>
        </div>
        <div className={styles.boxImg}>
          <CategoryHeaders title='artesanias favoritas' />
        </div>
      </header>
      <main className={styles.main}>
        <nav ref={categoriesNav} className={`${styles.categorias} flex gap-[30px] h-[100px] px-[20px] mt-5 overflow-x-auto border-b-2 border-b-2E1108 border-t-white`}>
          {
            categories.map((category, index) => (
              <CategoryIcons key={index} title={category.name} onClick={() => filtrarProductos()} icon={category.icon} changeCat={handleCategory} />
            ))
          }
        </nav>
        <section className={styles.productos}>
          {!productos ? <p>El usuario no presenta ningun producto en favoritos</p> : dataFiltrada && dataFiltrada.map((favorito) => (
            <div className={styles.producto} key={favorito._id}>
              <Link to={`/product/${favorito._id}`}>
                <div className={styles.box}>
                  <div className={styles.boxImg}>
                    <img src={favorito.img} alt={favorito.nombre} />
                  </div>
                  <div className={styles.info}>
                    <p className={styles.nombre}>{favorito.nombre}</p>
                    <p className={styles.precio}>S/.{favorito.precio}</p>
                    <p className={styles.taller}>{favorito.nombre_taller}</p>
                  </div>
                </div>
              </Link>
              <div className={styles.x} onClick={() => deleteFavorito(favorito._id)}>
                <i className="bx bx-x" style={{ color: '#ffa800' }}></i>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

