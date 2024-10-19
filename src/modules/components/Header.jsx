import { useState, useRef, useEffect } from "react"
import { LeftMenu } from "./Leftmenu"
import { Link } from "react-router-dom"

export function Header({photo, nick}) {

    const [menuchange, setMenuChange] = useState(false)
    const [productData, setProductData] = useState([])
    const [workshopData, setWorkshopData] = useState([])
    const [filteredData, setFilteredData] = useState([...productData, ...workshopData])
    const [estado, setEstado] = useState(false)

    const menuRef = useRef(null)
    
    useEffect(()=> {

        fetch('http://localhost:3000/product', {credentials: "include", cache: "force-cache"})
            .then(res => res.json())
            .then(dat => {
                setProductData(dat)
                setFilteredData([...filteredData,dat])
            })
        fetch('http://localhost:3000/workshops', {credentials: "include", cache: "force-cache"})
            .then(res => res.json())
            .then(res => {
                setWorkshopData(res)
                setFilteredData([...filteredData,...res])
            })

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuChange(false)
                // console.log(menuRef.current)
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    const search = (e) => {
        let termino = e.target.value
        let newProducts = productData.filter(func => func.nombre.toUpperCase().includes(termino.toUpperCase()) ||
            func.categoria.toUpperCase().includes(termino.toUpperCase())
        )
        let newWorkshops = workshopData.filter(func => func.nombre_taller.toUpperCase().includes(termino.toUpperCase()) ||
        func.categoria.toUpperCase().includes(termino.toUpperCase())
    )
        return setFilteredData([...newProducts, ...newWorkshops])
    }

    return(
        <header className="bg-[var(--color-2E1108)] w-full flex justify-around h-[70px] items-center fixed top-0 z-10">
            
            <div
                ref={menuRef}
                className={`leftmenu flex flex-col w-[70vw] h-[100%] bg-[var(--color-2E1108)] z-20 fixed text-white p-5 gap-5 justify-around left-0 top-0 transition-transform duration-300 ease-in-out ${
                    menuchange ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <LeftMenu photo={photo} nick={nick} />
            </div>

            <svg onClick={()=> setMenuChange(!menuchange)} xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="#FFA800" className="transform: ;msFilter:;"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>

            <div className="relative flex items-center bg-[var(--color-703A31)] h-[40px] rounded-md p-2">
            <svg
                className="w-6 h-6 text-gray-500 mr-2"
                viewBox="0 0 62 75"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    x="1.26633"
                    y="34.3498"
                    width="34.5626"
                    height="34.5626"
                    rx="6"
                    transform="rotate(-75 1.26633 34.3498)"
                    stroke="#FFA800"
                    strokeWidth="4"
                />
                <path
                    d="M33.3945 40.7812L55.6657 72.6541"
                    stroke="#FFA800"
                    strokeWidth="4"
                    strokeLinecap="round"
                />
            </svg>
            <input
                type="text"
                placeholder="Buscar producto o tienda..."
                className="flex-1 bg-transparent border-none outline-none text-white"
                onFocus={() => setEstado(true)}
                onMouseLeave={() => setEstado(false)}
                onChange={search}
            />


        </div>
            {
                estado && filteredData.length && (
                    <div className=" overflow-y-scroll flex flex-col z-[10] top-[70px] absolute h-[80dvh] w-full bg-703A31 p-[10px] gap-[15px] rounded-xl rounded-tl-none rounded-tr-none">
                        {
                            filteredData && filteredData.map(({ _id, nombre, nombre_taller, categoria, img, imagen }) => (
                                <Link className={'bg-2E1108 p-4 rounded-2xl'}  key={_id} to={`${ img ? `/product/${_id}` : `/workshop/details/${_id}` }`}>
                                    <div className="flex gap-[10px] items-center" >
                                        <img className="w-[100px] h-[100px] object-cover rounded-xl" src={ img ? img : imagen } alt={ img ? nombre : nombre_taller } />
                                        <div>
                                            <p className="text-blanco"><strong>{ img ? nombre : nombre_taller }</strong></p>
                                            <p className="text-blanco bg-letrasGrises w-max p-[3px] rounded-full"><small>{categoria}</small></p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                )
            }
        </header>
    )
}