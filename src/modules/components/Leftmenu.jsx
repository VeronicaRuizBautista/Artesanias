import React, { useEffect, useState } from 'react';
import { useLoaderData, useLocation, useNavigate, Link } from 'react-router-dom';

export function LeftMenu({photo, nick}){
    return(
        <div className="leftmenu flex flex-col w-[70vw] h-[100%] bg-[var(--color-2E1108)] z-30 text-white p-5 gap-5 justify-around fixed left-0 top-0">
            <div className="profile flex items-center gap-5">

                <div className="rounded-full outline w-[100px] h-[100px] overflow-hidden">
                    <img className='w-full h-full object-cover' src={photo} alt={nick} />
                </div>
                <p>{nick}</p>
            </div>
            <div className="upper flex flex-col gap-5">

                <Link to='/crafts/favorites' className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-14 h-14 bg-[var(--color-703A31)] text-white rounded-full shadow-md">
                        <svg width="40" viewBox="0 0 100 87" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.18076 37.9073L48.6861 81.8096C49.8753 83.0096 51.8204 82.9915 52.987 81.7695L94.947 37.8187C95.6087 37.1256 95.9017 36.1713 95.6989 35.2348C94.3807 29.1502 88.6126 6.33225 76 5.00041C64.3954 3.77501 56.9412 20.8533 50.8571 21.1464C44.1775 21.4682 38.147 4.62413 26.8571 5.00041C13.6933 5.43915 6.23066 28.726 4.42978 35.1115C4.14683 36.1148 4.44704 37.1669 5.18076 37.9073Z" stroke="#FFB800" strokeWidth="8"/></svg>
                    </div>
                    <p>Lista de favoritos</p>

                </Link>

                <Link to='/purchases/success' className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-14 h-14 bg-[var(--color-703A31)] text-white rounded-full shadow-md">
                    <svg width="35" viewBox="0 0 90 91" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M72.2194 87H17.8193C9.17373 87 3.05468 78.7233 4.12057 68.9886L9.05119 33.4788C9.88021 25.9118 16.3546 20 23.5 20H67.5218C74.667 20 81.1416 25.9118 81.9703 33.4788L85.8787 68.9886C86.9448 78.7233 80.8652 87 72.18 87H72.2194Z" stroke="#FFB800" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/><path d="M35.0734 5.7027L31.8162 15.2027C30.9261 17.799 32.8554 20.5 35.6 20.5H55.1103C58.0637 20.5 59.9987 17.4091 58.7083 14.7524L54.094 5.25238C53.4248 3.87464 52.0276 3 50.496 3H38.8571C37.148 3 35.6277 4.08594 35.0734 5.7027Z" stroke="#FFB800" strokeWidth="6"/></svg>
                    </div>
                    <p>Compras</p>

                </Link>

                <Link to='/workshops/educational' className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-14 h-14 bg-[var(--color-703A31)] text-white rounded-full shadow-md">
                    <svg width="30" viewBox="0 0 77 89" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="69" height="81" rx="7" stroke="#FFB800" strokeWidth="8"/><rect x="18" y="18" width="40" height="5" fill="#FFB800"/><rect x="18" y="29" width="27" height="6" fill="#FFB800"/><rect x="18" y="43" width="34" height="6" fill="#FFB800"/><rect x="18" y="57" width="40" height="6" fill="#FFB800"/></svg>
                    </div>
                    <p>Talleres</p>

                </Link>

                <Link to='/coupon' className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-14 h-14 bg-[var(--color-703A31)] text-white rounded-full shadow-md">
                    <svg width="35" viewBox="0 0 87 74" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="27.7328" y="18.3456" width="12.6626" height="12.6626" rx="4" transform="rotate(0.734744 27.7328 18.3456)" stroke="#FFB800" strokeWidth="4"/><rect x="49.8715" y="40.4843" width="12.6626" height="12.6626" rx="4" transform="rotate(0.734744 49.8715 40.4843)" stroke="#FFB800" strokeWidth="4"/><path d="M56.0502 20.294L28.0098 50.0923L30.8156 53.0712L58.856 23.2729L56.0502 20.294ZM85.8658 24.5026V8.71586C85.8658 4.45525 82.4106 1 78.1499 1H8.71586C4.45525 1.00866 1 4.45525 1 8.71586V24.494C6.52494 25.8016 10.647 30.755 10.647 36.6783C10.647 42.6016 6.52494 47.555 1 48.8626V64.658C1 68.9186 4.45525 72.3739 8.71586 72.3739H78.1499C82.4106 72.3739 85.8658 68.9186 85.8658 64.658V48.8712C80.3409 47.5636 76.2188 42.6102 76.2188 36.6869C76.2188 30.7637 80.3409 25.8103 85.8658 24.5026ZM72.3652 36.6869C72.3652 43.329 76.3227 49.0444 82.0122 51.6164V64.658C82.0122 66.7883 80.2803 68.5116 78.1586 68.5116H8.71586C6.58556 68.5116 4.86226 66.7797 4.86226 64.658V51.6164C10.5431 49.0444 14.5093 43.329 14.5093 36.6869C14.5093 30.0449 10.5517 24.3294 4.86226 21.7575V8.71586C4.86226 6.58556 6.59421 4.86226 8.71586 4.86226H78.1499C80.2803 4.86226 82.0035 6.59422 82.0035 8.71586V21.7575C76.3227 24.3294 72.3652 30.0449 72.3652 36.6869Z" fill="#FFB800" stroke="#FFB800" strokeWidth="2"/></svg>
                    </div>
                    <p>Canjear Cupon</p>

                </Link>

                <div className="separator w-[7rem] flex gap-1 items-center">
                    <img src="/img/cubeshome.png"/>
                    <img src="/img/cubeshome.png"/>
                </div>

                <Link to={'/settings'} className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-14 h-14 bg-[var(--color-703A31)] text-white rounded-full shadow-md">
                    <svg width="40" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M89.8333 46.9167C89.8333 52.3464 82.6187 56.214 80.6847 60.9001C78.7507 65.5858 80.9078 73.6186 77.2634 77.2634C73.6186 80.9078 65.7345 78.6766 60.9001 80.6847C56.0653 82.6928 52.2719 89.8333 46.9167 89.8333C41.5615 89.8333 37.6193 82.6187 32.9334 80.6847C28.2475 78.7507 20.2146 80.9078 16.5701 77.2634C12.9255 73.6186 15.1569 65.7345 13.1486 60.9001C11.1404 56.0653 4 52.2719 4 46.9167C4 41.5615 11.2148 37.6193 13.1486 32.9334C15.0825 28.2475 12.9255 20.2146 16.5701 16.5701C20.2146 12.9255 28.0988 15.1569 32.9334 13.1486C37.768 11.1404 41.5615 4 46.9167 4C52.2719 4 56.214 11.2148 60.9001 13.1486C65.5858 15.0825 73.6186 12.9255 77.2634 16.5701C80.9078 20.2146 78.6766 28.0988 80.6847 32.9334C82.6928 37.768 89.8333 41.5615 89.8333 46.9167Z" stroke="#FFB800" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/><rect x="46.9941" y="29.0336" width="24.0801" height="24.0801" rx="7.5" transform="rotate(45 46.9941 29.0336)" stroke="#FFB800" strokeWidth="5"/></svg>
                    </div>
                    <p>Ajustes</p>

                </Link>

                <Link to='/opinions' className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-14 h-14 bg-[var(--color-703A31)] text-white rounded-full shadow-md">
                    <svg width="35" viewBox="0 0 85 91" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39.3995 66.2578L23.6665 86.1113C22.3935 87.7178 19.8155 86.5974 20.1214 84.5706L22.5776 68.2986C22.7837 66.9332 21.5721 65.751 20.1972 65.8798C18.1716 66.0694 15.4584 66.1403 13.5 65.5C9.39096 64.1565 5.43571 58.6457 4.31444 56.9794C4.10479 56.6679 4 56.3008 4 55.9253V13.8603C4 13.3111 4.22583 12.7861 4.62451 12.4084L12.9215 4.54809C13.2929 4.19615 13.7852 4 14.2969 4H68.7602C69.2376 4 69.6992 4.17078 70.0617 4.48149L79.3016 12.4014C79.7449 12.7813 80 13.336 80 13.9199V56.387C80 56.4623 80.0042 56.5356 80.0093 56.6107C80.0799 57.64 80.2662 65.5 69.5 65.5H40.9567C40.3459 65.5 39.7788 65.7791 39.3995 66.2578Z" stroke="#FFB800" strokeWidth="8"/></svg>
                    </div>
                    <p>Comentarios</p>

                </Link>

                <Link to="/faq" className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-14 h-14 bg-[var(--color-703A31)] text-white rounded-full shadow-md">
                    <svg width="35" viewBox="0 0 86 100" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="path-1-inside-1_139_6649" fill="white"><rect x="0.615234" y="29.0996" width="23.4469" height="32.4649" rx="6"/></mask><rect x="0.615234" y="29.0996" width="23.4469" height="32.4649" rx="6" stroke="#FFB800" strokeWidth="16" mask="url(#path-1-inside-1_139_6649)"/><mask id="path-2-inside-2_139_6649" fill="white"><rect x="61.9375" y="29.0996" width="23.4469" height="32.4649" rx="6"/></mask><rect x="61.9375" y="29.0996" width="23.4469" height="32.4649" rx="6" stroke="#FFB800" strokeWidth="16" mask="url(#path-2-inside-2_139_6649)"/><path d="M12.3392 31.8041C12.3392 31.8041 12.2292 20.1223 16.1855 14.4122C19.4912 9.64128 27.6722 6.09966 30.2787 5.06199C30.8163 4.84798 31.3861 4.75 31.9647 4.75H56.6586C57.2378 4.75 57.8079 4.84801 58.3455 5.06351C60.9258 6.0979 68.9482 9.61209 71.9578 14.4122C75.5955 20.2139 74.3618 31.8041 74.3618 31.8041" stroke="#FFB800" strokeWidth="8"/><path d="M73.6612 58.8574C73.6612 58.8574 72.6645 69.9931 68.3045 75.2235C63.1489 81.4082 49.3125 84.1079 49.3125 84.1079" stroke="#FFB800" strokeWidth="8"/><rect x="-5.65685" width="18.0001" height="18.0001" rx="5" transform="matrix(0.707107 0.707107 0.707107 -0.707107 33.309 88.9277)" stroke="#FFB800" strokeWidth="8"/></svg>
                    </div>
                    <p>Atención al cliente</p>

                </Link>

                <div className="credits flex flex-col">
                    <p>Aplicacion potenciada por:</p>
                    <div className="campusimg w-[100px] pt-5">
                        <img src="/img/campuslands.png" />
                    </div>
                </div>
            </div>
        </div>
    )
}