import React, { useEffect } from 'react'
import headerWave from "../../images/headerWave.svg";
import logo from "../../images/Logo.svg";
import emoger from "../../images/emoger.png";
import Footer from './footer';
import { Link, Outlet } from 'react-router-dom';

function LandingPageAdmin() {

    return (
        <div dir="rtl" lang="ar" className='fontZain min-h-screen'>
            <div data-aos="zoom-in" className="w-full m-0 p-0 sm:h-[80vh] h-[60vh]" style={{
                backgroundImage: `url(${headerWave})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
                <div className="navbar container mx-auto text-white bg-transparent">
                    <div className="flex-1">
                        <Link to="/" className="btn btn-ghost "><img className='sm:h-auto h-[50px]' src={logo} alt="" /></Link>
                    </div>
                    <div className="flex-none">
                        <div className="menu menu-horizontal px-1">
                            <Link to="/" className='btn text-[1rem] btn-primary'>تسجيل الدخول</Link>
                        </div>
                    </div>
                </div>
                <div className='relative container mx-auto'>
                    <img src={emoger} loading="lazy" alt="" className='z-10 absolute hidden sm:block rotate-[360deg] w-[700px] md:right-[50%]' />
                    <h1 className='text-center sm:text-right z-50 relative sm:text-[72px] text-[30px] leading-[4.5rem] pt-[3rem] text-white font-[900]' style={{
                        /*backgroundImage: 'linear-gradient(to left, #F9F0A3, #FDF9DB)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        display: 'inline-block',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        direction: 'rtl'*/
                    }}>
                            لنمو أسرع <br /> لتحقيق الهدف
                    </h1>
                    <p className='text-white sm:px-0 px-[1rem]  sm:text-right text-center sm:text-2xl mt-[1rem] z-50 relative font-bold'>جميع خدمات السوشال ميديا في مكان واحد فقط. </p>
                    <div className='mt-[2rem] flex justify-center sm:justify-start'>
                        <Link to="/signUp" className='btn btn-primary font-bold sm:text-xl h-auto w-[10rem] sm:py-[1rem]'>فتح حساب</Link>
                    </div>
                </div>
            </div>
            <Outlet />
            <Footer />
        </div>
    )
}

export default LandingPageAdmin