import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useState, useEffect } from "react";
import { PurchaseConfirmation } from "../components/PurchaseConfirmation";
import axios from "axios";

export const shoppingCartLoader = async () => {
    try {
        let productos = await axios.get(`http://localhost:3000/user/cart/details`, {
            headers: {
                'Cache-Control': 'max-age=3600',
                'Expires': new Date(Date.now() + 3600 * 1000).toUTCString()
            },
            withCredentials: true
        });

        if (productos.status === 404) {
            productos = [];
        }

        const descuentos = await axios.get('http://localhost:3000/cupon/product/h', {
            headers: {
                'Cache-Control': 'max-age=3600',
                'Expires': new Date(Date.now() + 3600 * 1000).toUTCString()
            },
            withCredentials: true
        });

        //console.log('Descuentops',descuentos, 'Productos',productos)

        return {
            productos: productos.data.data[0].productos,
            taller: productos.data.data.length > 0 ? productos.data.data[0].nombre_taller : null,
            descuentos: descuentos.data
        };
    } catch (error) {
        return 404;
    }
};

export default function ShoppingCart() {

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/user/cart/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
    
            if (res.ok) {
                console.log("Producto eliminado con éxito");
                
                setProductos(prevProductos => prevProductos.filter(producto => producto.productoInfo._id !== id));
            } else {
                console.log("Hubo un error al eliminar el producto");
            }
        } catch (error) {
            console.error("Hubo un error eliminando el producto", error);
        }
    };
    


    

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const data = useLoaderData();

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [productos, setProductos] = useState(!data.user ? null : data.data.productos);
    const [productosConDescuento, setProductosConDescuento] = useState(!data.user ? [] : data.data.descuentos);

    const [quantities, setQuantities] = useState([]);

    useEffect(() => {
        setQuantities(productos?.map(({ cantidad }) => cantidad));
    }, [productos]);

    const handleDecrement = (index) => {
        setQuantities(prev => {
            const newQuantities = [...prev];
            if (newQuantities[index] > 1) {
                newQuantities[index] -= 1;
            }
            return newQuantities;
        });
    };

    const handleIncrement = (index) => {
        setQuantities(prev => {
            const newQuantities = [...prev];
            newQuantities[index] = (newQuantities[index] || 0) + 1;
            return newQuantities;
        });
    };

    //useEffect(() => {console.log(quantities)}, [quantities])

    useEffect(() => {
        if (!data.user) navigate('/register');
        setUser(data.user.user[0]);
    }, []);

    const aplicarDescuento = (producto) => {
        const productoConDescuento = productosConDescuento.find(
            (descuento) => descuento.productoInfo._id === producto._id
        );
        if (productoConDescuento) {
            const descuento = productoConDescuento.descuento;
            const precioOriginal = producto.precio;
            return precioOriginal - (precioOriginal * descuento) / 100;
        }
        return producto.precio;
    };

    // Calcular subtotal y total
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const shippingCost = 10000;
    useEffect(() => {
        const newSubtotal = productos?.reduce((acc, item, index, arr) => acc + aplicarDescuento(item.productoInfo) * quantities[index], 0);
        setSubtotal(newSubtotal);
        setTotal(newSubtotal + shippingCost);
    }, [quantities, productos]); // Se ejecuta cada vez que 'quantities' o 'productos' cambian

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
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
                <span className="text-lg font-bold text-[var(--color-9D1A1A)]">Tu carrito de compras</span>
                <small className="text-[var(--color-9D1A1A)] opacity-50">Revisa aquí los productos que añadiste a tu carrito</small>
            </div>

            <div className="grid grid-cols-1 gap-4 p-3">
                {!productos ? <p className="text-red-500">No posee articulos en el carrito</p> : productos.map(({ cantidad, nombre_taller, productoInfo }, index) => (
                    <>
                        <div key={productoInfo._id} className="bg-[var(--color-703A31)] rounded-lg overflow-hidden shadow-md h-[150px] justify-around items-center flex">
                            <img src={productoInfo.img} className="w-[130px] h-[130px] object-cover" style={{ borderRadius: '10px' }} />
                            <div className="flex flex-col w-[170px] break-words">
                                <h3 className="text-white text-sm">{productoInfo.nombre}</h3>
                                <p className="text-gray-300 text-sm">COP {aplicarDescuento(productoInfo)}</p>
                                <p className="text-gray-300 text-sm">{productoInfo.dimensiones}</p>
                                <p className="text-gray-300 text-sm">{nombre_taller}</p>

                                <div className="addsubtract flex text-white justify-around bg-[var(--color-2E1108)] rounded-lg p-1">
                                    <button onClick={() => handleDecrement(index)} className="bg-[var(--color-2E1108)] px-2 rounded">-</button>
                                    <div>{quantities[index]}</div>
                                    <button onClick={() => handleIncrement(index)} className="bg-[var(--color-2E1108)] px-2 rounded">+</button>
                                </div>
                            </div>

                            <svg onClick={() => handleDelete(productoInfo._id)} xmlns="http://www.w3.org/2000/svg" width="2em" viewBox="0 0 256 256"><path fill="#fff" d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16M96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0m48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0"/></svg>

                        </div>

                    </>
                ))}
            </div>

            <div className="coupon flex justify-center items-center">
                <Link to={'/coupon'}>
                    <div className="bg-[var(--color-703A31)] w-[100%] h-10 flex items-center justify-center rounded-lg text-white">
                        Añadir cupón de descuento
                    </div>
                </Link>
            </div>

            <div className="subt mt-5 flex justify-center">
                <div className="bg-[var(--color-703A31)] shadow-lg rounded-lg p-4 w-[90%]">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-white">Subtotal</p>
                            <p className="text-white opacity-50">Gastos de envío</p>
                        </div>
                        <div>
                            <p className="text-white">COP {!productos ? 0 : subtotal}</p>
                            <p className="text-white opacity-50">COP {!productos ? 0 : shippingCost}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="subt mt-5 flex justify-center">
                <div className="bg-[var(--color-703A31)] shadow-lg rounded-lg p-4 w-[90%]">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-white">Total</p>
                        </div>
                        <div>
                            <p className="text-white">COP {!productos ? 0 : total}</p>
                        </div>
                    </div>
                </div>
            </div>

            {
                productos && <div className="flex justify-center">
                    <button onClick={handleOpenDialog} className="mt-5 flex items-center justify-center w-[150px] h-[50px] bg-[var(--color-2E1108)] text-white rounded-lg">
                        Realizar Compra
                    </button>
                    {isDialogOpen && (
                        <PurchaseConfirmation productos={JSON.stringify(productos)} quantities={quantities} total={total} onClose={handleCloseDialog} />
                    )}
                </div>
            }

            <Footer />
        </main>
    );
}