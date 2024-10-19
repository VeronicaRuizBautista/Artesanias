import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function Footer() {
    const navigate = useNavigate();
    const location = useLocation()
    const [activeButton, setActiveButton] = useState(2); // Estado para el botón activo


    useEffect(() => {
        // Actualiza el botón activo según la ruta actual
        switch (location.pathname) {
            case '/workshops':
                setActiveButton(0);
                break;
            case '/discounts':
                setActiveButton(1);
                break;
            case '/':
                setActiveButton(2);
                break;
            case '/cart':
                setActiveButton(3);
                break;
            case '/profile':
                setActiveButton(4);
                break;
            default:
                setActiveButton(2); // ruta default
                break;
        }
    }, [location.pathname]); // Se ejecuta cada vez que cambia la ubicación

        const handleButtonClick = (index) => {
            setActiveButton(index);
            // Redirigir según el botón clicado
            switch (index) {
                case 0:
                    navigate('/workshops');
                    break;
                case 1:
                    navigate('/discounts');
                    break;
                case 2:
                    navigate('/');
                    break;
                case 3:
                    navigate('/cart');
                    break;
                case 4:
                    navigate('/profile');
                    break;
                default:
                    break;
            }
        }
        
    return (
        <footer className="fixed bottom-0 left-0 right-0 z-[10] bg-[var(--color-2E1108)] flex justify-around h-[70px] items-center">
            <button
                onClick={() => handleButtonClick(0)}
                className={`flex items-center justify-center w-[45px] h-[45px] bg-[var(--color-703A31)] text-white rounded-full transition-transform duration-200 transform 
                    ${activeButton === 0 ? 'scale-125' : ''} hover:bg-[var(--color-blanco)]`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" viewBox="0 0 24 24"><g fill="none" stroke="#ffa800" strokeWidth="1.5"><path d="m21.818 9.364l-1.694-5.929A.6.6 0 0 0 19.547 3H15.5l.475 5.704a.58.58 0 0 0 .278.45c.39.233 1.152.663 1.747.846c1.016.313 2.5.2 3.346.096a.57.57 0 0 0 .472-.732Z" /><path d="M14 10c.568-.175 1.288-.574 1.69-.812a.58.58 0 0 0 .28-.549L15.5 3h-7l-.47 5.639a.58.58 0 0 0 .28.55c.402.237 1.122.636 1.69.811c1.493.46 2.507.46 4 0Z" /><path d="m3.876 3.435l-1.694 5.93a.57.57 0 0 0 .472.73c.845.105 2.33.217 3.346-.095c.595-.183 1.358-.613 1.747-.845a.58.58 0 0 0 .278-.451L8.5 3H4.453a.6.6 0 0 0-.577.435Z" /><path d="M3 10v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9" /></g></svg>
            </button>

            <button
                onClick={() => handleButtonClick(1)}
                className={`flex items-center justify-center w-[45px] h-[45px] bg-[var(--color-703A31)] text-white rounded-full transition-transform duration-200 transform 
                    ${activeButton === 1 ? 'scale-125' : ''} hover:bg-[var(--color-blanco)]`}
            >
                <svg width="1.5em" viewBox="0 0 85 81" xmlns="http://www.w3.org/2000/svg"><path d="M83.2009 37.9637L74.9267 29.4167L76.5634 17.5965C76.7452 15.9599 75.7451 14.5051 74.1084 14.2323L62.3791 12.141L56.8327 1.68466C56.1053 0.229866 54.2868 -0.315683 52.832 0.411716L42.1029 5.59443L31.3737 0.320791C29.9189 -0.406607 28.1914 0.138942 27.3731 1.59374L21.8266 12.141L10.0973 14.2323C8.46068 14.5051 7.36959 16.0508 7.64236 17.5965L9.27901 29.4167L1.00485 37.9637C-0.0862511 39.1457 -0.0862511 40.9642 1.00485 42.1462L9.27901 50.6932L7.64236 62.5134C7.46051 64.15 8.46068 65.6048 10.0973 65.8776L21.8266 67.9689L27.464 78.5162C28.1914 79.971 30.0099 80.5165 31.4647 79.7891L42.1029 74.6064L52.832 79.88C53.2866 80.0619 53.7413 80.1528 54.105 80.1528C55.1961 80.1528 56.1962 79.6073 56.7418 78.5162L62.2882 67.9689L74.0175 65.8776C75.6541 65.6048 76.7452 64.0591 76.4725 62.5134L74.8358 50.6932L83.11 42.1462C84.3829 40.9642 84.3829 39.1457 83.2009 37.9637ZM69.5622 47.6017C68.9257 48.2382 68.6529 49.2384 68.7439 50.1476L70.1987 60.513L59.8332 62.3315C58.924 62.5134 58.1057 63.0589 57.742 63.8773L52.832 73.1516L43.3758 68.5144C42.9212 68.3326 42.4666 68.2417 42.012 68.2417C41.5573 68.2417 41.1027 68.3326 40.6481 68.5144L31.1919 73.1516L26.282 63.8773C25.8273 63.0589 25.0999 62.5134 24.1907 62.3315L13.8253 60.513L15.28 50.1476C15.371 49.2384 15.0982 48.3291 14.4617 47.6017L7.18774 40.055L14.4617 32.5082C15.0982 31.8717 15.371 30.8715 15.28 29.9623L13.8253 19.5969L24.1907 17.7784C25.0999 17.5965 25.9183 17.051 26.3729 16.2326L31.2828 6.9583L40.739 11.5955C41.5573 11.9592 42.5575 11.9592 43.3758 11.5955L52.832 6.9583L57.742 16.2326C58.1966 17.051 58.924 17.5965 59.8332 17.7784L70.1987 19.5969L68.7439 30.0532C68.6529 30.9625 68.9257 31.8717 69.5622 32.5991L76.8362 40.1459L69.5622 47.6017Z" fill="#FFA800"/><path d="M33.8286 38.1885C37.3292 38.1885 40.1933 35.3243 40.1933 31.8237C40.1933 28.3231 37.3292 25.459 33.8286 25.459C30.328 25.459 27.4639 28.3231 27.4639 31.8237C27.4639 35.3243 30.328 38.1885 33.8286 38.1885ZM33.8286 29.6756C35.022 29.6756 35.9767 30.6303 35.9767 31.8237C35.9767 33.0171 35.022 33.9718 33.8286 33.9718C32.6352 33.9718 31.6805 33.0171 31.6805 31.8237C31.6805 30.6303 32.6352 29.6756 33.8286 29.6756Z" fill="#FFA800"/><path d="M55.0483 27.8482C54.2591 27.0871 52.9176 27.0871 52.1284 27.8482L29.8741 49.3113C29.0849 50.0724 29.0849 51.3663 29.8741 52.1274C30.2687 52.508 30.8211 52.7363 31.3735 52.7363C31.9259 52.7363 32.4783 52.508 32.8729 52.1274L55.1272 30.6643C55.8375 29.9032 55.8375 28.6093 55.0483 27.8482Z" fill="#FFA800"/><path d="M50.1953 41.8262C46.6947 41.8262 43.8306 44.6903 43.8306 48.1909C43.8306 51.6915 46.6947 54.5557 50.1953 54.5557C53.6959 54.5557 56.56 51.6915 56.56 48.1909C56.56 44.6903 53.6959 41.8262 50.1953 41.8262ZM50.1953 50.339C49.0019 50.339 48.0472 49.3843 48.0472 48.1909C48.0472 46.9975 49.0019 46.0428 50.1953 46.0428C51.3887 46.0428 52.3434 46.9975 52.3434 48.1909C52.3434 49.3843 51.3887 50.339 50.1953 50.339Z" fill="#FFA800"/></svg>
            </button>

            <button
                onClick={() => handleButtonClick(2)}
                className={`flex items-center justify-center w-[45px] h-[45px] bg-[var(--color-703A31)] text-white rounded-full transition-transform duration-200 transform 
                    ${activeButton === 2 ? 'scale-125' : ''} hover:bg-[var(--color-blanco)]`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" viewBox="0 0 15 15"><path fill="#ffa800" d="m7.5.5l.325-.38a.5.5 0 0 0-.65 0zm-7 6l-.325-.38L0 6.27v.23zm5 8v.5a.5.5 0 0 0 .5-.5zm4 0H9a.5.5 0 0 0 .5.5zm5-8h.5v-.23l-.175-.15zM1.5 15h4v-1h-4zm13.325-8.88l-7-6l-.65.76l7 6zm-7.65-6l-7 6l.65.76l7-6zM6 14.5v-3H5v3zm3-3v3h1v-3zm.5 3.5h4v-1h-4zm5.5-1.5v-7h-1v7zm-15-7v7h1v-7zM7.5 10A1.5 1.5 0 0 1 9 11.5h1A2.5 2.5 0 0 0 7.5 9zm0-1A2.5 2.5 0 0 0 5 11.5h1A1.5 1.5 0 0 1 7.5 10zm6 6a1.5 1.5 0 0 0 1.5-1.5h-1a.5.5 0 0 1-.5.5zm-12-1a.5.5 0 0 1-.5-.5H0A1.5 1.5 0 0 0 1.5 15z"/></svg>
            </button>

            <button
                onClick={() => handleButtonClick(3)}
                className={`flex items-center justify-center w-[45px] h-[45px] bg-[var(--color-703A31)] text-white rounded-full transition-transform duration-200 transform 
                    ${activeButton === 3 ? 'scale-125' : ''} hover:bg-[var(--color-blanco)]`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" viewBox="0 0 24 24"><path fill="#ffa800" d="M9.375 8.26a.75.75 0 0 1 .865.615l.528 3.118a.75.75 0 0 1-1.48.25l-.527-3.118a.75.75 0 0 1 .614-.864m5.415.614a.75.75 0 1 1 1.478.25l-.528 3.118a.75.75 0 1 1-1.48-.25z"/><path fill="#ffa800" fillRule="evenodd" d="M2.249 2.292a.75.75 0 1 0-.498 1.416l.262.091c.667.235 1.106.39 1.429.549c.303.149.437.27.525.398c.09.132.16.314.2.677c.04.38.041.875.041 1.615V9.76c0 1.453.014 2.5.151 3.3c.146.854.438 1.466.985 2.042c.594.627 1.346.9 2.243 1.026c.858.122 1.948.122 3.293.122h5.406c.742 0 1.366 0 1.87-.062c.537-.065 1.025-.209 1.452-.556c.426-.348.665-.797.837-1.309c.163-.482.289-1.093.439-1.82l.508-2.469l.002-.005l.01-.052c.165-.825.303-1.519.338-2.077c.036-.586-.031-1.164-.413-1.66c-.235-.306-.565-.479-.866-.584a4.6 4.6 0 0 0-1.002-.21c-.687-.076-1.522-.076-2.34-.076H5.667l-.01-.108c-.054-.497-.17-.95-.453-1.362c-.284-.416-.662-.682-1.102-.899c-.412-.202-.936-.386-1.553-.603zm3.46 4.578h11.38c.856 0 1.61.001 2.205.067c.296.034.517.08.672.134a.6.6 0 0 1 .176.086c.062.082.128.23.102.651c-.027.444-.143 1.036-.321 1.926v.002l-.5 2.42c-.16.783-.27 1.303-.399 1.688c-.123.366-.239.523-.364.625s-.303.184-.685.23c-.404.05-.935.051-1.734.051h-5.303c-1.417 0-2.4-.002-3.14-.107c-.716-.101-1.093-.285-1.366-.573c-.32-.338-.493-.668-.595-1.263c-.11-.65-.129-1.558-.129-3.047zM7.5 21.75a2.25 2.25 0 1 1 0-4.5a2.25 2.25 0 0 1 0 4.5m-.75-2.25a.75.75 0 1 0 1.5 0a.75.75 0 0 0-1.5 0m9.75 2.25a2.25 2.25 0 1 1 0-4.5a2.25 2.25 0 0 1 0 4.5m-.75-2.25a.75.75 0 1 0 1.5 0a.75.75 0 0 0-1.5 0" clipRule="evenodd"/></svg>
            </button>

            <button
                onClick={() => handleButtonClick(4)}
                className={`flex items-center justify-center w-[45px] h-[45px] bg-[var(--color-703A31)] text-white rounded-full transition-transform duration-200 transform 
                    ${activeButton === 4 ? 'scale-125' : ''} hover:bg-[var(--color-blanco)]`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" viewBox="0 0 24 24"><path fill="#ffa800" d="M12 4a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7M6.5 7.5a5.5 5.5 0 1 1 11 0a5.5 5.5 0 0 1-11 0M3 19a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v3H3zm5-3a3 3 0 0 0-3 3v1h14v-1a3 3 0 0 0-3-3z"/></svg>
            </button>
        </footer>
    );
}