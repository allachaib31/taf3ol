import React from 'react'
import headerBackground from "../../images/headerBackground.svg";
import logo from "../../images/Logo.svg";
import Footer from './footer';
import { Outlet } from 'react-router-dom';

function LandingPageAdmin() {
    return (
        <div>
            <div className="w-full m-0 p-0" style={{
                backgroundImage: `url(${headerBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: "64vh"
            }}>
                <div className="navbar text-white bg-transparent">
                    <div className="flex-1">
                        <a className="btn btn-ghost "><img className='sm:h-auto h-[50px]' src={logo} alt="" /></a>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                            <li className='btn btn-sm btn-primary'>تسجيل الدخول</li>
                        </ul>
                    </div>
                </div>
                <h1 className='sm:text-[72px] xs:text-[40px] text-[35px] px-[2rem] pt-[3rem] font-bold' style={{
                    backgroundImage: 'linear-gradient(to left, #F9F0A3, #FDF9DB)',
                    backgroundClip: 'text',
                    color: 'transparent',
                    display: 'inline-block',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    direction: 'rtl'
                }}>
                    <span>
                        لنمو أسرع
                    </span>
                    <br />
                    <span>
                        لتحقيق الهدف
                    </span>
                </h1>
                <p className='text-[#FBF4BA] px-[2rem] font-bold'>جميع خدمات السوشال ميديا  <br />في مكان واحد فقط. </p>
            </div>
            <Outlet />
            <Footer />
        </div>
    )
}

export default LandingPageAdmin