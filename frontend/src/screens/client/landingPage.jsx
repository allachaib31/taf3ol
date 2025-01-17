import React, { useEffect, useState } from 'react'
import amazonIcon from "../../images/amazonIcon.png";
import netflixIcon from "../../images/netflixIcon.png";
import pubgIcon from "../../images/pubgIcon.png"
import logo from "../../images/Logo.png";
import heroSectionImage1 from "../../images/heroSectionImage1.png";
import heroSectionImage2 from "../../images/heroSectionImage2.png";
import heroSectionImage3 from "../../images/heroSectionImage3.png";
import Footer from './footer';
import { Link, Outlet } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next'
import Marquee from "react-fast-marquee";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';


function LandingPageAdmin() {
    const { t, i18n } = useTranslation();
    const [heroSectionImages, setHeroSectionImages] = useState([heroSectionImage1, heroSectionImage2, heroSectionImage3]);
    const [indexHeroSectionImages, setIndexHeroSectionImages] = useState(0);
    const [fadeHeroSection, setFadeHeroSection] = useState(true); // For handling fade transition
    const [emogerList, setListEmoger] = useState(['😂', '🥰', '😍', '❤️'])
    const [indexEmogerList, setIndexEmogerList] = useState(0);
    const [fadeEmoger, setFadeEmoger] = useState(true); // For handling fade transition
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
    useEffect(() => {
        // Rotate emojis
        const emojiInterval = setInterval(() => {
            setFadeEmoger(false); // Trigger fade-out
            setTimeout(() => {
                setIndexEmogerList((prevIndex) => (prevIndex + 1) % emogerList.length);
                setFadeEmoger(true); // Trigger fade-in
            }, 300); // Trigger fade-in

        }, 1000); // Change emoji every second

        return () => clearInterval(emojiInterval); // Cleanup interval on unmount
    }, [emogerList]);
    useEffect(() => {
        // Rotate emojis
        const heroSectionInterval = setInterval(() => {
            setFadeHeroSection(false); // Trigger fade-out
            setTimeout(() => {
                setIndexHeroSectionImages((prevIndex) => (prevIndex + 1) % heroSectionImages.length);
                setFadeHeroSection(true); // Trigger fade-in
            }, 300); // Trigger fade-in

        }, 2000); // Change emoji every second

        return () => clearInterval(heroSectionInterval); // Cleanup interval on unmount
    }, [heroSectionImages]);
    return (
        <div id='landingPage' data-theme={"myTheme"} className='fontZain overflow-hidden min-h-screen'>
            <div className='h-full lg:h-screen'>
                <div data-aos="zoom-out" className="w-full m-0 pt-[0.5rem] sm:pt-[2rem] h-full lg:h-[80vh] bg-neutral rounded-b-[4rem] sm:rounded-b-[7rem]">
                    <div className="rounded-full navbar px-[0.5rem] sm:px-[1rem] container mx-auto bg-black shadow-2xl">
                        <div className="flex-1">
                            <Link to="/" className="btn btn-ghost mb-[1rem]"><img className='w-[107px] sm:w-[134px] sm:h-auto h-[50px]' src={logo} alt="" /></Link>
                            <select onChange={(event) => {
                                changeLanguage(event.target.value)
                            }} className='bg-transparent text-[1rem] border-none text-primary'>
                                <option className='bg-black' value="ar" selected={i18n.language === 'ar'}>AR</option>
                                <option className='bg-black' value="en" selected={i18n.language === 'en'}>EN</option>
                            </select>
                        </div>
                        <div className="flex-none">
                            <div className="menu menu-horizontal px-1">
                                <Link
                                    to="/"
                                    className="btn rounded-[22px] sm:px-[2rem] py-[0.5rem] h-auto text-[1rem] btn-primary transition-shadow duration-300 hover:shadow-[0_0_20px_5px_#FDF001]"
                                >
                                    {t('login_button')}
                                </Link>

                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col-reverse lg:flex-row-reverse justify-between items-center container mx-auto'>
                        <div className="relative lg:block hidden">
                            <div className="absolute inset-0 bg-primary from-[#FDF001] via-[#EDE447] to-transparent blur-3xl rounded-full w-[500px] h-[500px]"></div>

                            {/* Image Inside the Circle */}
                            <div className="relative rounded-full w-[500px] h-[500px]  bg-transparent flex justify-center items-center">
                                <img
                                    src={heroSectionImages[indexHeroSectionImages]}
                                    loading="lazy"
                                    alt=""
                                    className={`w-[400px] h-[400px] transition-opacity ease-in-out duration-300 ${fadeHeroSection ? 'opacity-100' : 'opacity-0'
                                        }`}
                                />
                            </div>
                        </div>
                        <div className='w-full lg:w-1/2'>
                            <h1 className={`relative text-center ${i18n.language === 'ar' ? 'sm:text-right' : 'sm:text-left'} z-50 relative sm:text-[72px] text-[1.5rem] leading-[2rem] sm:leading-[4.5rem] pt-[3rem] font-[900]`}>
                                {/* Split translation into multiple lines based on '\n' and render them */}
                                <Trans i18nKey="title_herosection" />
                                <span
                                    className={`absolute top-[40%] sm:top-[30%] transition-opacity ease-in-out duration-300 ${fadeEmoger ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    {emogerList[indexEmogerList]}
                                </span>
                            </h1>
                            <p className={`sm:px-0 px-[1rem] text-center ${i18n.language === 'ar' ? 'sm:text-right' : 'sm:text-left text-left'} sm:text-2xl mt-[0.5rem] sm:mt-[1rem] z-50 relative font-bold`}>
                                {t('text_herosection')}
                            </p>
                            <div className={`mt-[0.5rem] sm:mt-[2rem] flex justify-center sm:justify-start`}>
                                <Link to="/signUp" className='btn btn-primary font-bold sm:text-xl h-auto w-[10rem] sm:py-[1rem]'>
                                    {t('sign_up_button')}
                                </Link>
                            </div>
                            <div dir="ltr" className='mt-[2rem] lg:block hidden'>
                                <Marquee direction="left" speed={150}>
                                    <div className='flex gap-[2rem] items-stretch h-[200px]'>
                                        <div className='self-start'>
                                            <img src={amazonIcon} alt="" />
                                        </div>
                                        <div className='text-[80px] self-end'>
                                            {emogerList[0]}
                                        </div>
                                        <div className='self-start'>
                                            <img src={netflixIcon} alt="" />
                                        </div>
                                        <div className='text-[80px] self-end'>
                                            {emogerList[1]}
                                        </div>
                                        <div>
                                            <img src={pubgIcon} alt="" />
                                        </div>
                                    </div>
                                </Marquee>
                            </div>
                        </div>
                    </div>
                    <form action="" className='bg-white container mx-auto sm:w-[70%] rounded-[14px] p-[1rem] sm:p-[2rem] border shadow-lg flex flex-col gap-[0.rem] sm:gap-[1rem] lg:mt-0 mt-[1rem]'>
                        <p className='text-center font-bold sm:text-[1.2rem] lg:text-[1.5rem]'><FontAwesomeIcon icon={faCircleExclamation} /> {t('title_form_sign_up')} <FontAwesomeIcon icon={faCircleExclamation} /></p>
                        <h1 className='text-[1.1rem] lg:text-3xl font-[900] text-center'>الدخول الى الحساب</h1>
                        <div className='flex md:flex-row gap-[0.5rem] sm:gap-[1rem] md:gap-[2rem] flex-col  py-[0.5rem]'>
                            <label className="md:w-1/2 input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                </svg>
                                <input type="text" className="grow" placeholder={`${t('username_placeholder')}`} />
                            </label>
                            <label className="md:w-1/2 input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        fillRule="evenodd"
                                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                        clipRule="evenodd" />
                                </svg>
                                <input type="text" className="grow" placeholder={`${t('password_placeholder')}`} />
                            </label>
                        </div>
                        <div className='flex sm:flex-row flex-col gap-[0.5rem] sm:gap-[1rem]'>
                            <button className='btn btn-primary font-bold md:text-[1.1rem] md:px-[2rem]'>{t('login_button')}</button>
                            <button className='btn btn-outline text-black hover:btn-primary font-bold md:text-[1.1rem] md:px-[2rem]'>{t('forget_password_button')}</button>
                        </div>
                    </form>
                </div>
            </div>

            <Outlet />
            <Footer />
        </div>
    )
}

export default LandingPageAdmin