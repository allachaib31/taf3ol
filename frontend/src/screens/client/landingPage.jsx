import React, { useEffect } from 'react'
import headerWave from "../../images/headerWave.svg";
import logo from "../../images/Logo.png";
import emoger from "../../images/emoger.png";
import Footer from './footer';
import { Link, Outlet } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next'

function LandingPageAdmin() {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);

        // Change the direction based on the language
        if (lng === 'ar') {
            document.getElementById("landingPage").dir = 'rtl';
            document.getElementById("landingPage").lang = 'ar';
        } else {
            document.getElementById("landingPage").dir = 'ltr';
            document.getElementById("landingPage").lang = 'en';
        }
    };
    useEffect(() => {
        // Set initial direction based on the current language
        //alert(i18n.language)
        if (i18n.language === 'ar') {
            document.getElementById("landingPage").dir = 'rtl';
        } else {
            document.getElementById("landingPage").dir = 'ltr';
        }
    }, [i18n.language]);

    return (
        <div id='landingPage' className='fontZain overflow-hidden min-h-screen'>
            <div data-aos="zoom-in" className="w-full m-0 p-0 sm:h-[80vh] h-[60vh]" style={{
                backgroundImage: `url(${headerWave})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
                <div className="navbar container mx-auto text-white bg-transparent">
                    <div className="flex-1">
                        <Link to="/" className="btn btn-ghost mb-[1rem]"><img className='w-[107px] sm:w-[168px] sm:h-auto h-[50px]' src={logo} alt="" /></Link>
                    </div>
                    <div className="flex-none">
                        <div className="menu menu-horizontal px-1">
                            <select onChange={(event) => {
                                changeLanguage(event.target.value)
                            }} className='bg-transparent text-[1rem] border-none '>
                                <option className='bg-black' value="ar" selected={i18n.language === 'ar'}>عربي</option>
                                <option className='bg-black' value="en" selected={i18n.language === 'en'}>english</option>
                            </select>
                            <Link to="/" className='btn btn-sm sm:btn-md py-[0.5rem] h-auto text-[1rem] btn-primary'>{t('login_button')}</Link>
                        </div>
                    </div>
                </div>
                <div className='relative container mx-auto'>
                    <img
                        src={emoger}
                        loading="lazy"
                        alt=""
                        className={`z-10 absolute overflow-hidden hidden sm:block rotate-[360deg] w-[700px] ${i18n.language === 'ar' ? 'md:right-[50%]' : 'md:left-[50%]'}`}
                    />
                    <h1 className={`text-center ${i18n.language === 'ar' ? 'sm:text-right' : 'sm:text-left'} z-50 relative sm:text-[72px] text-[30px] leading-[2.5rem] sm:leading-[4.5rem] pt-[3rem] text-white font-[900]`}>
                        {/* Split translation into multiple lines based on '\n' and render them */}
                        <Trans i18nKey="title_herosection"/>
                    </h1>
                    <p className={`text-white sm:px-0 px-[1rem] text-center ${i18n.language === 'ar' ? 'sm:text-right' : 'sm:text-left text-left'} sm:text-2xl mt-[1rem] z-50 relative font-bold`}>
                        {t('text_herosection')}
                    </p>
                    <div className={`mt-[2rem] flex justify-center sm:justify-start`}>
                        <Link to="/signUp" className='btn btn-primary font-bold sm:text-xl h-auto w-[10rem] sm:py-[1rem]'>
                            {t('sign_up_button')}
                        </Link>
                    </div>
                </div>
            </div>
            <Outlet />
            <Footer />
        </div>
    )
}

export default LandingPageAdmin