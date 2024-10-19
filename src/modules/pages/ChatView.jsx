import { Muesca } from "../components/Muesca"
import { MessageBox } from "../components/MessageBox"
import { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"

// import 

export default function Chat() {
    
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const data = useLoaderData()
    const {name} = useParams()

    const [messages, setMessages] = useState([]);
    const inputRef = useRef(null);
    const socket = useRef(null);

    useEffect(() => {

        if (!data) return navigate('/register')
    
        const currentUser = data.user[0];
        setUser(currentUser);
        

        // Obtener los mensajes al cargar el componente
        const fetchMessages = async () => {
            try {
                const res = await fetch(`http://localhost:3000/chat/${currentUser._id}`, {
                    method: "GET",
                    credentials: "include"
                });
                if (!res.ok) {
                    const errorText = await res.text();
                    console.error('Error:', errorText);
                    throw new Error('Error al obtener los mensajes, res no ok');
                }
                const messagesData = await res.json();
                console.log(messagesData);
                setMessages(messagesData.map(msg => ({
                    texto: msg.text,
                    transmitter: msg.sender,
                    timestamp: msg.timestamp
                })));
            } catch (error) {
                console.error('Error al obtener los mensajes:', error);
            }
        };
               
    
        fetchMessages();

        socket.current = io('http://localhost:3000');

        // Registrar el usuario al conectarse
        socket.current.emit('registerUser', currentUser._id); // Emitir el ID del usuario

        socket.current.on("connect", () => {
            console.log("Conectado al servidor Socket.io");
        });

        socket.current.on("disconnect", () => {
            console.log("Desconectado del servidor Socket.io");
        });

        // Escuchar mensajes del servidor
        socket.current.on("recievedMessage", (msg) => {
            setMessages(prevMessages => [...prevMessages, msg]);
        });

        // Limpieza al desmontar el componente
        return () => {
            socket.current.disconnect();
        };
    }, []);

    const handleMessageSend = (e) => {
        if (e.key !== 'Enter' && e.key !== undefined) return;
        let mensaje = inputRef.current.value.trim();
        if (mensaje === '') return;
    
        const timestamp = new Date().toISOString(); // Genera el timestamp actual
    
        // Emitir el mensaje al servidor
        socket.current.emit('sendMessage', { 
            texto: mensaje, 
            transmitter: "cliente", 
            clientid: user._id, 
            timestamp // Incluye el timestamp en el mensaje enviado
        });
    
        // Agregar el mensaje del cliente con el timestamp
        setMessages(prevMessages => [...prevMessages, { texto: mensaje, transmitter: 'cliente', timestamp }]);
        inputRef.current.value = '';
    };
    
    

    return (

        <>

            <div className='h-[100vh] flex flex-col relative overflow-x-hidden'>
                <Muesca color='2E1108' />
                <header className="flex gap-[10px] justify-center items-center w-full h-[100px] bg-703A31 text-blanco font-semibold fixed z-10">
                    <svg width="35" height="35" viewBox="0 0 112 122" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M19.8746 16.1991C11.8554 16.1991 5.39186 23.3707 5.39186 32.2684V81.5043C5.39186 90.4019 11.8554 97.5736 19.8746 97.5736H26.0148C27.2276 97.5736 28.2108 98.6645 28.2108 100.01V113.933L47.6172 98.0494C47.9948 97.7403 48.4516 97.5736 48.9207 97.5736H81.7992C89.8184 97.5736 96.282 90.4019 96.282 81.5043V49.0347C96.282 47.6891 97.2652 46.5982 98.478 46.5982C99.6907 46.5982 100.674 47.6891 100.674 49.0347V81.5043C100.674 93.0932 92.2439 102.447 81.7992 102.447H49.643L27.3184 120.718C26.6515 121.264 25.7646 121.347 25.025 120.932C24.2853 120.518 23.8189 119.677 23.8189 118.757V102.447H19.8746C9.42979 102.447 1 93.0932 1 81.5043V32.2684C1 20.6794 9.4298 11.3262 19.8746 11.3262H63.9446C65.1573 11.3262 66.1405 12.417 66.1405 13.7627C66.1405 15.1083 65.1573 16.1991 63.9446 16.1991H19.8746Z" fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round" /><path d="M105.524 15.3446L96.6558 6.476C92.6886 2.50888 86.2567 2.50888 82.2896 6.476L73.421 15.3446C69.4538 19.3117 69.4538 25.7437 73.421 29.7108L82.2896 38.5794C86.2567 42.5465 92.6886 42.5465 96.6558 38.5794L105.524 29.7108C109.491 25.7437 109.491 19.3117 105.524 15.3446ZM85.4801 9.66658C87.6851 7.46157 91.2602 7.46157 93.4652 9.66658L102.334 18.5352C104.539 20.7402 104.539 24.3152 102.334 26.5202L93.4652 35.3888C91.2602 37.5938 87.6851 37.5938 85.4801 35.3888L76.6115 26.5202C74.4065 24.3152 74.4065 20.7402 76.6115 18.5352L85.4801 9.66658Z" fill="white" stroke="white" /></svg>
                    <p> Chat con {name} </p>
                </header>

                <main className="relative px-[20px] py-[30px] flex flex-col flex-grow items-start gap-[30px] pt-[110px]">
                    {
                        messages.map((msg, i) => <MessageBox transmitter={msg.transmitter} key={i} texto={msg.texto} timestamp={msg.timestamp}/> )
                    }
                </main>
                
                <footer className='flex justify-center sticky bottom-5 '>
                    <div className="sticky bottom-0 w-[90%]">
                        <input onKeyDown={handleMessageSend} ref={inputRef} type="text" className="w-full  py-3 pl-4 pr-20 bg-703A31 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm text-blanco font-bold" placeholder={`Mandar mensaje a ${name}`} />
                        <button onClick={handleMessageSend} className="absolute right-3 top-0 bottom-0 flex items-center">
                            <svg width="20" height="20" viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.4199 34.7562C8.97454 33.1438 9.04436 26.8326 13.5243 25.319L75.9286 4.23395C79.8499 2.90904 83.591 6.65008 82.2661 10.5714L61.181 72.9757C59.6674 77.4556 53.3562 77.5255 51.7438 73.0801L42.3402 47.1552C41.8349 45.7622 40.7378 44.6651 39.3448 44.1598L13.4199 34.7562Z" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /><path d="M80.4177 6.67969L41.543 44.9567" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                    </div>
                </footer>

            </div>

        </>

    )

}