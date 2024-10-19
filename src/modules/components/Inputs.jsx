

export const Input = ({title=false, desc=false, type='text', name, min=false, max=false, pattern=false}) => {

    return (

        <div className='flex flex-col gap-[10px]' >

            {
                title && <label htmlFor={name}><big><strong>{title}</strong></big></label>
            }
            {
                desc && <small className='text-gray-400 leading-none text-[13px]'>{desc}</small>
            }
            <input required id={name} type={type} pattern={pattern ? pattern : undefined} name={name} minLength={min ? min : undefined} maxLength={max ? max : undefined} className='rounded-md mt-[5px] p-1 w-[95%] outline-none bg-703A31 text-white' />

        </div>

    )

}