import React, { useState, useEffect, useRef } from 'react';
import  styles from '../../css/pantalla22.module.css'
import { useLoaderData, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Muesca } from '../components/Muesca';
import { CategoryHeaders } from '../components/CategoryHeaders';

export default function Pantalla22() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null)
  const data = useLoaderData()
  const [cupones, setCupones] = useState(null)
  const [errorMessage, setErrorMessage] = useState('');
  const cuponInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cupon = cuponInputRef.current.value; // Captura el valor del input
    validarCupon(cupon); // Llama a la función validarCupon con el valor ingresado
  };
  const validarCupon = async (code) => {
    try {
      const cuponCode = await axios.get(`http://localhost:3000/cupon/find/${code}`, {withCredentials: true}); 
      const id = cuponCode.data._id
      console.log(id)
      const agregarCupon = await fetch(`http://localhost:3000/user/coupons/${id}`, {
        method: 'POST',
        credentials: 'include' // Esto incluye las cookies
    });

      //console.log(agregarCupon)
      window.location.reload();
    } catch (error) {
      setErrorMessage('El codigo de cupon ingresado no es valido');
      return;
    }
  }
  const addCarrito = async (idProducto) => {
      try{
        const addCarrito= await fetch(`http://localhost:3000/user/cart/${idProducto}`, {
          method: 'POST',
          credentials: 'include' // Esto incluye las cookies
      });
      console.log("Producto añadido a carrito", addCarrito);
      } catch (error) {
        setErrorMessage('El producto ya esta en el carrito')
        //console.error('El producto ya esta en el carrito', error)
      }
      window.location.href = "/cart";
  };

  useEffect(()=> {
    const fetchCupon = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/coupons/details`, {withCredentials: true}); 
        console.log(response)
        setCupones(response.data.data)
      } catch (error) {
        //console.error('Error al obtener los cupones', error);
      }
    };

    fetchCupon();
      if (!data) navigate('/register')
      setUser([data.user])

  },[data, navigate])
  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <div className={styles.boxAtras}>
          <Muesca></Muesca>
        </div>
        <div className={styles.boxImg}>
        <CategoryHeaders title ='Canjear cupón'/>
        </div>
      </header>

      <main className={styles.main}>
        <article className={styles.canjear}>
          <h4>¿Cuentas con algún cupón de descuento? <br /> Canjealo aquí</h4>
          <div className={styles.boxCanjear}>
            <i className='bx bxs-discount' style={{ color: '#ffffff' }}></i>
            <form id="canjear-codigo" className={styles.form} onSubmit={handleSubmit}>
              <input
                className={styles.input1}
                type="text"
                placeholder="Ingresa tu cupón"
                ref={cuponInputRef} // Usamos useRef para capturar el valor del input
              />
              <input
                className={styles.validar}
                type="submit"
                data-action="validar-cupon"
                value="Validar"
              />
            </form>
          </div>
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </article>

        <section className={styles.sectionCupones}>
          <article>
            <h4>Cupones Vigentes</h4>
            <p>Usar antes de la fecha de vencimiento</p>
          </article>
          {cupones && cupones.length > 0 ? (
            cupones.map((cupon) => (
              <div key={cupon._id} className={styles.box}>
                <div className={styles.boxImg}>
                  <img src={cupon.img} alt={cupon.nombre_taller} />
                </div>
                <div className={styles.info}>
                  <div className={styles.texto}>
                    <p>
                      <span className={styles.porcentaje}>{cupon.cupones.descuento}%</span> de descuento en cartucheras del taller <br />
                      <span className={styles.taller}>{cupon.nombre_taller}</span>
                    </p>
                  </div>
                  <p className={styles.fechaVencimiento}>
                    Fecha de vencimiento <span className={styles.fecha}>{cupon.cupones.fechaVencimiento}</span>
                  </p>
                  <button onClick={() => addCarrito(cupon.id)}>Usar cupón</button>
                </div>
              </div>
            ))
          ) : (
            <p>No tienes cupones disponibles.</p>
          )}
        </section>
      </main>
    </div>
  );
};
