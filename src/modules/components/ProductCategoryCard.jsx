import { Link } from "react-router-dom"


export const ProductCategoryCard = ({ name, price, owner, img, prdtId }) => {

    return (

        <Link to={`/product/${prdtId}`} className=" flex flex-col border rounded-lg w-[180px]">
            <img src={img} alt={name} className="w-full h-[120px] object-cover" />
            <div className='flex flex-col items-start justify-center bg-703A31 h-[80px] rounded-b-lg text-blanco p-[5px]'>
                <h3 className="text-sm font-semibold text-blanco">{name}</h3>
                <p className="text-xs">S/.{price}</p>
                <p className="text-xs ">{owner}</p>
            </div>
        </Link>

    )

}