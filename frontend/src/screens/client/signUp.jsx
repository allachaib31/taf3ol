import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../images/Logo.png";
import signUpImage from "../../images/signUp.png";
import googleIcon from "../../images/googleIcon.png";
import { useTranslation } from 'react-i18next';
function SignUp() {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);

        // Change the direction based on the language
        if (lng === 'ar') {
            document.getElementById("signUp").dir = 'rtl';
            document.getElementById("signUp").lang = 'ar';
        } else {
            document.getElementById("signUp").dir = 'ltr';
            document.getElementById("signUp").lang = 'en';
        }
    };
    useEffect(() => {
        // Set initial direction based on the current language
        //alert(i18n.language)
        if (i18n.language === 'ar') {
            document.getElementById("signUp").dir = 'rtl';
        } else {
            document.getElementById("signUp").dir = 'ltr';
        }
    }, [i18n.language]);
    return (
        <div id='signUp' className='fontZain'>
            <header className="navbar sm:h-[100px] text-white bg-black">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost sm:mb-[1.5rem]"><img className='w-[107px] sm:w-[168px] sm:h-auto h-[50px]' src={logo} alt="" /></Link>
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
            </header>
            <div data-aos="zoom-in" className='flex justify-center mt-[0.5rem]'>
                <h1 id='titleSignUp' className='z-[2] text-[40px] sm:text-[70px] font-[900]'>{t('sign_up_button')}</h1>
            </div>
            <div data-aos="zoom-in" className='container mx-auto flex md:flex-row flex-col-reverse items-center md:items-start md:justify-between'>
                <div className='md:w-1/2 sm:px-0 px-[1rem]'>
                    <form action="" className='flex flex-col gap-[0.5rem]'>
                        <div className='flex flex-col gap-[0.5rem]'>
                            <label htmlFor="username" className='text-[1.1rem]'>{t('username_placeholder')}</label>
                            <input type="text" className='input input-bordered w-full' placeholder={t('username_singUp_placeholder')} />
                        </div>
                        <div className='flex gap-[1rem] w-full'>
                            <div className='flex flex-col w-1/2 gap-[0.5rem]'>
                                <label htmlFor="firstName" className='text-[1.1rem]'>{t('first_name_label')}</label>
                                <input type="text" className='input input-bordered w-full' placeholder={t('first_name_placeholder')} />
                            </div>
                            <div className='flex flex-col w-1/2 gap-[0.5rem]'>
                                <label htmlFor="lastName" className='text-[1.1rem]'>{t('last_name_label')}</label>
                                <input type="text" className='input input-bordered w-full'  placeholder={t('last_name_placeholder')} />
                            </div>
                        </div>
                        <div className='flex flex-col gap-[0.5rem]'>
                            <label htmlFor="email" className='text-[1.1rem]'>{t('email_label')}</label>
                            <input type="email" className='input input-bordered w-full'  placeholder={t('email_placeholder')} />
                        </div>
                        <div className='flex flex-col gap-[0.5rem]'>
                            <label htmlFor="phoneNumber" className='text-[1.1rem]'>{t('whatsapp_label')}</label>
                            <input type="text" className='input input-bordered w-full'  placeholder={t('whatsapp_placeholder')} />
                        </div>
                        <div className='flex flex-col gap-[0.5rem]'>
                            <label htmlFor="password" className='text-[1.1rem]'>{t('password_placeholder')}</label>
                            <input type="password" className='input input-bordered w-full'  placeholder={t('password_singup_placeholder')} />
                        </div>
                        <button className='btn btn-primary text-[1.3rem] font-bold'>{t('sign_up_button')}</button>
                        <div className="divider">{i18n.language === 'ar' ? "أو" : "OR"} </div>
                        <button className='btn btn-outline btn-primary hover:btn-secondary'><img src={googleIcon} alt="" /></button>
                        <p className='font-bold text-center text-[1.1rem] mt-[1rem]'> {t('login_subtitle')}<Link to="/" className='underline text-primary '> {t('login_button')}</Link></p>
                    </form>
                </div>
                <div>
                    <img src={signUpImage} className='w-[435px] md:w-auto md:h-auto' alt="" />
                </div>
            </div>
        </div>
    )
}

export default SignUp