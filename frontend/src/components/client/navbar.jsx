import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    const [active, setActive] = useState(location.pathname);
    const [zIndex, setZIndex] = useState(0);
    return (
        <div className={`mt-[6.2rem] drawer h-screen  fixed top-0 xl:z-[0] z-[${zIndex}] xl:drawer-open`}>
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" onChange={(event) => {
                if(event.target.checked){
                    return setZIndex(999)
                }
                setZIndex(0)
            }}/>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu gap-[2rem]  bg-black text-white  min-h-full w-72 p-4">
                    {/* Sidebar content here */}
                    <li onClick={() => setActive("/client")} className={`font-bold text-[1.6rem] hover:text-primary ${active == "/client" || active == "/client/" ? "text-primary" : "text-white"}`}><Link className='focus:text-primary' to="/client">
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                            <path d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 7 6.99v10.182z" fill="#ffffff" />
                        </svg> الرئيسية</Link></li>
                    <li onClick={() => setActive("/client/newOrder")} className={`font-bold text-[1.6rem] hover:text-primary ${active == "/client/newOrder" || active == "/client/newOrder/" ? "text-primary" : "text-white"}`}><Link className='focus:text-primary' to="/client/newOrder"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffffff" d="M24 3l-.743 2h-1.929l-3.474 12h-13.239l-4.615-11h16.812l-.564 2h-13.24l2.937 7h10.428l3.432-12h4.195zm-15.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.9-7-1.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z"/></svg> طلب جديد</Link></li>
                    <li onClick={() => setActive("/client/orders")} className={`font-bold text-[1.6rem] hover:text-primary ${active == "/client/orders" || active == "/client/orders/" ? "text-primary" : "text-white"}`}><Link className='focus:text-primary' to="/client/orders"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffffff" d="M10 9v-1.098l1.047-4.902h1.905l1.048 4.9v1.098c0 1.067-.933 2.002-2 2.002s-2-.933-2-2zm5 0c0 1.067.934 2 2.001 2s1.999-.833 1.999-1.9v-1.098l-2.996-5.002h-1.943l.939 4.902v1.098zm-10 .068c0 1.067.933 1.932 2 1.932s2-.865 2-1.932v-1.097l.939-4.971h-1.943l-2.996 4.971v1.097zm-4 2.932h22v12h-22v-12zm2 8h18v-6h-18v6zm1-10.932v-1.097l2.887-4.971h-2.014l-4.873 4.971v1.098c0 1.066.933 1.931 2 1.931s2-.865 2-1.932zm15.127-6.068h-2.014l2.887 4.902v1.098c0 1.067.933 2 2 2s2-.865 2-1.932v-1.097l-4.873-4.971zm-.127-3h-14v2h14v-2z"/></svg> الطلبات</Link></li>
                    <li onClick={() => setActive("/client/addMoney")} className={`font-bold text-[1.6rem] hover:text-primary ${active == "/client/addMoney" || active == "/client/addMoney/" ? "text-primary" : "text-white"}`}><Link className='focus:text-primary' to="/client/addMoney"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffffff" d="M22 7h-19v11h-1v-12h20v1zm-2-2h-19v11h-1v-12h20v1zm-6 6c-1.656 0-3 1.344-3 3s1.344 3 3 3 3-1.344 3-3-1.344-3-3-3zm.15 4.484v.315h-.3v-.299c-.311-.005-.632-.079-.898-.217l.135-.493c.287.11.669.229.968.162.345-.078.415-.433.034-.604-.279-.129-1.133-.242-1.133-.973 0-.409.312-.775.895-.855v-.319h.301v.305c.217.006.461.043.732.126l-.108.493c-.23-.08-.485-.154-.733-.139-.446.026-.486.413-.174.575.514.242 1.182.42 1.182 1.063 0 .516-.404.791-.901.86zm-10.15-7.484v12h20v-12h-20zm18 10h-16v-8h16v8z"/></svg> إضافة رصيد</Link></li>
                    <li onClick={() => setActive("/client/support")} className={`font-bold text-[1.6rem] hover:text-primary ${active == "/client/support" || active == "/client/support/" ? "text-primary" : "text-white"}`}><Link className='focus:text-primary' to="/client/support"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffffff" d="M12.666 22.908l-2.787-5.379-1.634.8c-1.773.86-5.383-6.191-3.649-7.12l1.648-.812-2.764-5.397-1.667.823c-5.702 2.972 3.351 20.569 9.183 17.903.096-.043 1.664-.815 1.67-.818zm4.902-2.603l1.041 1.71c-1.019.674-2.147 1.197-3.351 1.537l-.934-1.824c1.175-.28 2.27-.768 3.244-1.423zm2.922-3.022l1.882.752c-.678 1.162-1.546 2.199-2.56 3.071l-1.057-1.736c.668-.612 1.253-1.315 1.735-2.087zm.699-1.336c.522-1.211.811-2.546.811-3.947 0-5.519-4.481-10-10-10-2.497 0-4.781.917-6.534 2.432l-.933-1.824c2.05-1.632 4.645-2.608 7.467-2.608 6.623 0 12 5.377 12 12 0 1.664-.34 3.249-.953 4.69l-1.858-.743zm-3.511-.947h-1.438v-1.55h-2.88v-.989l2.46-3.96h1.858v3.81h.78v1.139h-.78v1.55zm-5.07 0h-4.608v-.919l.84-.76c1.42-1.27 2.11-2 2.13-2.761 0-.53-.32-.95-1.07-.95-.56 0-1.05.28-1.39.54l-.43-1.089c.49-.37 1.25-.67 2.13-.67 1.469 0 2.278.859 2.278 2.039 0 1.091-.789 1.961-1.728 2.801l-.6.5v.02h2.448v1.249zm3.632-2.689v-1.44c0-.391.02-.791.05-1.211h-.04c-.21.42-.38.8-.6 1.211l-.87 1.42v.02h1.46z"/></svg> الدعم الفني</Link></li>
                    <li onClick={() => setActive("/client/services")} className={`font-bold text-[1.6rem] hover:text-primary ${active == "/client/services" || active == "/client/services/" ? "text-primary" : "text-white"}`}><Link className='focus:text-primary' to="/client/services"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path stroke-width="16" fill="#ffffff" d="M6.994 15.026v-1.833c-.004-1.295-.168-2.66 2.502-3.268 1.01-.229 2.395-.544 2.622-1.046.024-.051.095-.209-.106-.582-1.431-2.638-1.698-4.965-.754-6.552.65-1.092 1.834-1.719 3.248-1.719 1.403 0 2.579.618 3.228 1.694.943 1.568.684 3.902-.731 6.573-.198.376-.125.535-.101.587.231.502 1.571.808 2.647 1.053 2.77.631 2.416 2.236 2.451 3.279v3.958c0 .49-.201.977-.609 1.356-1.378 1.28-4.453 4.026-4.935 4.467-.749.687-1.518 1.006-2.421 1.006-.405 0-.832-.065-1.308-.2-2.773-.783-4.484-1.036-5.727-1.105v1.332h-5v-9h4.994zm-.994 1h-3v7h3v-7zm1 5.664c2.092.118 4.405.696 5.999 1.147.817.231 1.761.354 2.782-.581 1.279-1.172 2.722-2.413 4.929-4.463.824-.765-.178-1.783-1.022-1.113 0 0-2.961 2.299-3.689 2.843-.379.285-.695.519-1.148.519-.36 0-2.232-.467-3.104-.743-.575-.183-.371-.993.268-.858.447.093 1.594.35 2.201.52 1.017.281 1.276-.867.422-1.152-.562-.19-.537-.198-1.889-.665-1.301-.451-2.214-.753-3.585-.156-.639.278-1.432.616-2.164.814v3.888zm14.006-6.066v-2.422c.008-1.858-.269-1.972-1.679-2.294-1.49-.34-2.898-.66-3.334-1.611-.201-.438-.158-.933.126-1.472 1.244-2.349 1.513-4.334.757-5.59-.469-.779-1.31-1.209-2.37-1.209-1.068 0-1.916.437-2.389 1.23-.757 1.272-.482 3.248.774 5.565.291.537.338 1.032.138 1.471-.432.955-1.897 1.287-3.312 1.608-1.402.321-1.724.415-1.717 2.297v3.2l.765-.325c.642-.28 1.259-.417 1.887-.417 1.214 0 2.205.499 4.303 1.205.64.214 1.076.716 1.175 1.306 1.124-.863 2.92-2.257 2.937-2.27.357-.284.773-.434 1.2-.434.262 0 .513.058.739.162z"/></svg> الخدمات</Link></li>
                    <li onClick={() => setActive("/client/profitMoney")} className={`font-bold text-[1.6rem] hover:text-primary ${active == "/client/profitMoney" || active == "/client/profitMoney/" ? "text-primary" : "text-white"}`}><Link className='focus:text-primary' to="/client/profitMoney"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffffff" d="M10.553 3.123c.47-.079.953-.123 1.447-.123 4.971 0 9 4.029 9 9 0 1.742-.5 3.363-1.359 4.738.226-.877.359-1.791.359-2.738 0-5.537-4.116-10.119-9.447-10.877zm12.447 8.877c0 .947-.133 1.861-.359 2.738.859-1.375 1.359-2.996 1.359-4.738 0-4.971-4.029-9-9-9-.494 0-.977.044-1.447.123 5.331.758 9.447 5.34 9.447 10.877zm-14-5c3.859 0 7 3.14 7 7s-3.141 7-7 7-7-3.14-7-7 3.141-7 7-7zm0-2c-4.971 0-9 4.029-9 9s4.029 9 9 9 9-4.029 9-9-4.029-9-9-9zm3.416 10.736c0-1.787-1.86-2.285-3.286-2.955-.864-.449-.757-1.525.483-1.597.691-.042 1.396.162 2.036.387l.302-1.372c-.756-.23-1.43-.335-2.035-.352v-.847h-.832v.889c-1.621.223-2.488 1.24-2.488 2.375 0 2.032 2.373 2.342 3.148 2.703 1.061.474.863 1.458-.094 1.675-.83.188-1.893-.14-2.688-.45l-.378 1.37c.744.385 1.637.591 2.5.605v.833h.832v-.877c1.381-.194 2.503-.956 2.5-2.387z"/></svg> طرق الربح</Link></li>
                    <li onClick={() => setActive("/client/settings")} className={`font-bold text-[1.6rem] hover:text-primary ${active == "/client/settings" || active == "/client/settings/" ? "text-primary" : "text-white"}`}><Link className='focus:text-primary' to="/client/settings"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffffff"  d="M12 8.666c-1.838 0-3.333 1.496-3.333 3.334s1.495 3.333 3.333 3.333 3.333-1.495 3.333-3.333-1.495-3.334-3.333-3.334m0 7.667c-2.39 0-4.333-1.943-4.333-4.333s1.943-4.334 4.333-4.334 4.333 1.944 4.333 4.334c0 2.39-1.943 4.333-4.333 4.333m-1.193 6.667h2.386c.379-1.104.668-2.451 2.107-3.05 1.496-.617 2.666.196 3.635.672l1.686-1.688c-.508-1.047-1.266-2.199-.669-3.641.567-1.369 1.739-1.663 3.048-2.099v-2.388c-1.235-.421-2.471-.708-3.047-2.098-.572-1.38.057-2.395.669-3.643l-1.687-1.686c-1.117.547-2.221 1.257-3.642.668-1.374-.571-1.656-1.734-2.1-3.047h-2.386c-.424 1.231-.704 2.468-2.099 3.046-.365.153-.718.226-1.077.226-.843 0-1.539-.392-2.566-.893l-1.687 1.686c.574 1.175 1.251 2.237.669 3.643-.571 1.375-1.734 1.654-3.047 2.098v2.388c1.226.418 2.468.705 3.047 2.098.581 1.403-.075 2.432-.669 3.643l1.687 1.687c1.45-.725 2.355-1.204 3.642-.669 1.378.572 1.655 1.738 2.1 3.047m3.094 1h-3.803c-.681-1.918-.785-2.713-1.773-3.123-1.005-.419-1.731.132-3.466.952l-2.689-2.689c.873-1.837 1.367-2.465.953-3.465-.412-.991-1.192-1.087-3.123-1.773v-3.804c1.906-.678 2.712-.782 3.123-1.773.411-.991-.071-1.613-.953-3.466l2.689-2.688c1.741.828 2.466 1.365 3.465.953.992-.412 1.082-1.185 1.775-3.124h3.802c.682 1.918.788 2.714 1.774 3.123 1.001.416 1.709-.119 3.467-.952l2.687 2.688c-.878 1.847-1.361 2.477-.952 3.465.411.992 1.192 1.087 3.123 1.774v3.805c-1.906.677-2.713.782-3.124 1.773-.403.975.044 1.561.954 3.464l-2.688 2.689c-1.728-.82-2.467-1.37-3.456-.955-.988.41-1.08 1.146-1.785 3.126"/></svg> اعدادات الحساب</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar