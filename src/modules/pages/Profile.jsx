import { useState, useEffect } from 'react';

// import DatePicker from 'react-datepicker';

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useLoaderData, useNavigate, Form } from 'react-router-dom';

export default function Profile() {

    const handleLogout = async() => {
        try {
            const res = await fetch("http://localhost:3000/logout", {
                method: 'PUT',
                credentials: 'include',
                
            })
        } catch(error) {
            console.log("Hubo un problema al cerrar sesion :", error)
        }
    }
    const [imageDataUrl, setImageDataUrl] = useState('');
    const navigate = useNavigate();
    const data = useLoaderData();
    
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState({ nick: false, email: false, phone: false}); 
    const [formData, setFormData] = useState({ nick: '',  email: '', phone: '', gender: '', birthday: ''});

    const [file, setFile] = useState(null); // Para almacenar el archivo de imagen
    const [isImageChanged, setIsImageChanged] = useState(false); // Estado para controlar cambios de imagen

    useEffect(() => {
        if (!data || !data.user) {
            navigate('/register');
        } else {
            setUser(data.user[0]);
            setFormData({
                nick: data.user[0].nick,
                email: data.user[0].email,
                phone: data.user[0].phone,
                gender: data.user[0].sex == "MASCULINO" ? "M" : "F",
                birthday: data.user[0].birth_day
            });
            setImageDataUrl(data.user[0].photo); // Cargar imagen inicial
        }
    }, [data, navigate]);

    const handleEdit = (field) => {
        setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        
        // Si es el campo de cumpleaños también va a actualizar el estado de selectedBirthday
        if (name === 'birthday') {
            setSelectedBirthday(value);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageDataUrl(reader.result);
                setFile(selectedFile); // Guardar el archivo seleccionado
                setIsImageChanged(true); // Indica que se ha cambiado la imagen
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('nick', formData.nick);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('sex', formData.gender === "M" ? "MASCULINO" : "FEMENINO");
        formDataToSend.append("birth_day", formData.birthday); // Enviar 'birth_day' desde formData.birthday
    
        if (file) {
            formDataToSend.append('file', file);
        }
    
        try {
            const response = await fetch('http://localhost:3000/user/edit', {
                method: 'PUT',
                body: formDataToSend,
                credentials: 'include',
            });
    
            const responseData = await response.json();
            if (responseData.imageDataUrl) {
                setImageDataUrl(responseData.imageDataUrl);
                setUser((prev) => ({ ...prev, photo: responseData.imageDataUrl }));
            }
    
            setIsEditing({ nick: false, email: false, phone: false, gender: false });
            setIsOkOpen(false);
            setIsBirthdayOpen(false)
            setIsImageChanged(false); // Resetear el estado de cambio de imagen
            navigate('/profile');
        } catch (error) {
            console.error('Error al enviar datos:', error);
        }
    };
    
    
    

    const [selectedCountry, setSelectedCountry] = useState('CO');

    const [selectedGender, setSelectedGender] = useState('M'); // Estado para el género
    const [isCountryOpen, setIsCountryOpen] = useState(false); // Estado para el menú de país
    const [isGenderOpen, setIsGenderOpen] = useState(false); // Estado para el menú de género

    const [isBirthdayOpen, setIsBirthdayOpen] = useState(false); // Estado para el selector de cumpleaños
    const [selectedBirthday, setSelectedBirthday] = useState(''); // Estado para la fecha de nacimiento seleccionada

    const [isOkOpen, setIsOkOpen] = useState(false)

    const handleGenderSelect = (gender) => {
        setSelectedGender(gender.code);
        setFormData(prev => ({
            ...prev,
            gender: gender.code // Guardar el código (M o F)
        })); 
        setIsOkOpen(true);
    };

    const countries = [
        { code: 'CO', name: 'Colombia', dialCode: '+57' },
        { code: 'US', name: 'Estados Unidos', dialCode: '+1' },
        { code: 'MX', name: 'México', dialCode: '+52' },
    ];

    const genders = [
        { code: 'M', name: 'MASCULINO' },
        { code: 'F', name: 'FEMENINO' },
    ];


    const toggleCountryDropdown = () => setIsCountryOpen(!isCountryOpen);
    
    const toggleGenderDropdown = () => setIsGenderOpen(!isGenderOpen);
    
    const toggleBirthdayDropdown = () => setIsBirthdayOpen(!isBirthdayOpen);

    return (
        <main className="py-[70px]">
            <svg className='absolute z-[-1] right-0' width="300px" viewBox="0 0 693 1381" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1375.94" y="690.242" width="969.008" height="969.008" transform="rotate(135 1375.94 690.242)" stroke="#703A31" strokeOpacity="0.51" strokeWidth="7"/>
            </svg>

            <svg className='absolute z-[-1] left-0 bottom-1 transform rotate-180' width="300px" viewBox="0 0 693 1381" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1375.94" y="690.242" width="969.008" height="969.008" transform="rotate(135 1375.94 690.242)" stroke="#703A31" strokeOpacity="0.51" strokeWidth="7"/>
            </svg>

            <Header nick={user?.nick} photo={user?.photo} />
            <div className="profile flex flex-col items-center gap-5 mt-5">
                <span className="text-lg font-bold text-[var(--color-9D1A1A)]">Foto de perfil</span>

                <div className="profileimg rounded-full outline w-[200px] h-[200px] overflow-hidden z-[1]">
                    {user ? (
                        <img className='w-full h-full object-cover' src={imageDataUrl} alt="Perfil" />
                    ) : (
                        <p>Cargando...</p>
                    )}
                </div>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileInput"
                />
                <label htmlFor="fileInput" className='flex absolute bg-[var(--color-703A31)] rounded-full w-[60px] h-[60px] justify-center items-center bottom-[560px] right-[100px] cursor-pointer z-[1]'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40px" viewBox="0 0 24 24"><path fill="#fff" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"/></svg>
                </label>

                {/* Mostrar "Guardar cambios" solo si se ha cambiado la imagen */}
                {isImageChanged && (
                    <button onClick={handleSubmit} className="bg-blue-500 text-white rounded-lg px-4 mt-4">
                        Guardar cambios
                    </button>
                )}
            </div>

            <Form onSubmit={handleSubmit} className="userdata flex flex-col justify-center items-center mt-10 gap-5">
                <div className="fila w-[100vw] flex items-center justify-around">
                    <div className="user">
                        <p className="text-[var(--color-9D1A1A)] text-xl">Usuario:</p>
                    </div>
                    <div className="relative flex bg-[var(--color-703A31)] text-white w-[60%] h-10 rounded-lg justify-center items-center">
                        {isEditing.nick ? (
                            <>
                                <input
                                    type='text'
                                    name='nick'
                                    value={formData.nick}
                                    onChange={handleChange}
                                    className="h-10 w-full bg-[var(--color-703A31)] text-white rounded-lg text-center"
                                />
                                <button type="submit" className=" bg-blue-500 text-white rounded-lg px-2">Ok</button>
                            </>
                        ) : (
                            <>
                                <p>{user ? formData.nick : 'Cargando...'}</p>
                            </>
                        )}
                    </div>
                    <svg onClick={() => handleEdit('nick')} xmlns="http://www.w3.org/2000/svg" width="2em" viewBox="0 0 32 32">
                        {/* Path que no necesitas leer */}
                        <path fill="#9d1a1a" d="M2 26h28v2H2zM25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15V24h6.4zm-5-5L24 7.6l-3 3L17.4 7zM6 22v-3.6l10-10l3.6 3.6l-10 10z"/>
                    </svg>
                </div>

                 <div className="fila w-[100vw] flex items-center justify-around">
                    <div className="correo">
                        <p className="text-[var(--color-9D1A1A)] text-xl">Correo:</p>
                    </div>
                    <div className="relative flex bg-[var(--color-703A31)] text-white w-[60%] h-10 rounded-lg justify-center items-center">
                        {isEditing.email ? (
                            <>
                            <input
                                type='email'
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="h-10 w-full bg-[var(--color-703A31)] text-white rounded-lg text-center"
                            />
                            <button type="submit" className=" bg-blue-500 text-white rounded-lg px-2">Ok</button>
                            </>
                        ) : (
                            <>
                                <p>{user ? user.email : 'Cargando...'}</p>
                            </>
                        )}
                    </div>
                        <svg onClick={() => handleEdit('email')} xmlns="http://www.w3.org/2000/svg" width="2em" viewBox="0 0 32 32">
                            <path fill="#9d1a1a" d="M2 26h28v2H2zM25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15V24h6.4zm-5-5L24 7.6l-3 3L17.4 7zM6 22v-3.6l10-10l3.6 3.6l-10 10z"/>
                        </svg>
                </div>

                <div className="fila w-[100vw] flex items-center justify-around">
                    <div className="phone">
                        <p className="text-[var(--color-9D1A1A)] text-xl">Celular:</p>
                    </div>
                    <div className="relative flex bg-[var(--color-703A31)] text-white w-[50%] h-10 rounded-lg justify-center items-center">
                        {isEditing.phone ? (
                            <>
                            {/* {console.log("editando phone")} */}
                                <input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="h-10 w-full bg-[var(--color-703A31)] text-white rounded-lg flex text-center"
                                />
                                <button type="submit" className=" bg-blue-500 text-white rounded-lg px-2">Ok</button>
                            </>
                            ) : (
                                <>
                                    {/* {console.log("phone no esta en edicion")} */}
                                    <p>{user ? user.phone : 'Cargando...'}</p>
                                </>
                            )}
                    </div>
                        <svg onClick={() => handleEdit('phone')} xmlns="http://www.w3.org/2000/svg" width="2em" viewBox="0 0 32 32">
                            <path fill="#9d1a1a" d="M2 26h28v2H2zM25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15V24h6.4zm-5-5L24 7.6l-3 3L17.4 7zM6 22v-3.6l10-10l3.6 3.6l-10 10z"/>
                        </svg>
                </div>

                <div className="fila w-[100vw] flex items-center justify-around">

                    <div className='genero flex'>

                        <div className="gender">
                            <p className="text-[var(--color-9D1A1A)] text-xl">Género:</p>
                        </div>

                        <div className="relative flex pl-3">

                            <div
                                className="gender bg-[var(--color-703A31)] w-[30px] flex items-center justify-center text-white rounded-lg"
                            >
                                {formData.gender}
                            </div>
                            
                            <svg className='ml-3' onClick={toggleGenderDropdown} xmlns="http://www.w3.org/2000/svg" width="2em" viewBox="0 0 32 32">
                                <path fill="#9d1a1a" d="M2 26h28v2H2zM25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15V24h6.4zm-5-5L24 7.6l-3 3L17.4 7zM6 22v-3.6l10-10l3.6 3.6l-10 10z"/>
                            </svg>

                            {isGenderOpen && (
                                <div className="absolute left-0 mt-10 bg-white shadow-md rounded-md w-[150px] z-10">
                                    {genders.map(gender => (
                                        <button
                                            type="button"
                                            key={gender.code}
                                            onClick={() => {
                                                setIsGenderOpen(false)
                                                handleGenderSelect(gender)
                                            }}
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                        >
                                            {gender.name}
                                        </button>
                                    ))}
                                </div>
                            )}

                            { isOkOpen && (
                                <button
                                    type="submit"
                                    className="ml-2 bg-blue-500 text-white rounded-lg px-2"
                                    onClick={() => {
                                        console.log('Género seleccionado:', selectedGender);
                                    }}
                                >
                                    Ok
                                </button>
                            )}
                        </div>

                        

                    </div>


                    <div className='nacimiento flex'>

                        <div className="birthday w-[90px]">
                            <p className="text-[var(--color-9D1A1A)] text-l">Fecha de Nacimiento:</p>
                        </div>

                        <div className="relative flex items-center">
                            <button
                                type="button"
                                onClick={toggleBirthdayDropdown}
                                className="birthday bg-[var(--color-703A31)] w-[100px] flex items-center justify-center text-white rounded-lg"
                            >
                                {formData.birthday}
                            </button>
                            {isBirthdayOpen && (
                                <div className="flex flex-col absolute top-[40px] left-[-50px] mt-1 bg-white shadow-md rounded-md w-[150px] z-10">
                                    <input
                                        type="date"
                                        name="birthday" 
                                        value={selectedBirthday}
                                        onChange={handleChange}
                                        className="p-2"
                                    />
                                    {selectedBirthday && (
                                        <button
                                            type='submit'
                                            onClick={() => {
                                                console.log("Fecha de nacimiento seleccionada", selectedBirthday)
                                            }}
                                            className="ml-2 bg-blue-500 text-white rounded-lg px-2"
                                        >
                                            OK
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                    </div>
                </div>



                <div className="fila w-[100vw] flex pl-5 gap-2 flex-col">
                    <div className="PaymentMethods">
                        <p className="text-[var(--color-9D1A1A)] text-xl">Metodos de pago</p>
                    </div>
                    <div className="cardplaceholder flex bg-[var(--color-703A31)] text-white w-[90%] h-10 rounded-lg p-2 items-center">
                        <p>Visa Mastercard</p>
                    </div>

                    <div className='flex items-center bg-[var(--color-703A31)] h-[40px] w-[90%] rounded-md p-2'>
                        <input
                            type="text"
                            placeholder="Añadir método de pago"
                            className="flex-1 bg-transparent border-none outline-none text-white"
                        />
                    </div>
                </div> 

                <div className='flex items-center'>
                    <button onClick={handleLogout} className='flex bg-[var(--color-703A31)] text-white h-10 rounded-lg p-2 items-center'>Log-Out</button>
                </div>
            </Form>
            <Footer />
        </main>
    );
}