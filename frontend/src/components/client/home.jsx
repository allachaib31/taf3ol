import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import largeLogo from "../../images/largeLogo.png";
import whatDistinguishesUsImage from "../../images/whatDistinguishesUsImage.png";
import pourcentageImage from "../../images/pourcentageImage.svg";
import payMethodeImage from "../../images/payMethodeImage.svg";
import supportImage from "../../images/supportImage.svg";
import chartImage from "../../images/chartImage.svg";
import promotionImage from "../../images/promotionImage.svg";
import marketingImage from "../../images/marketingImage.svg";
import deliveryImage from "../../images/deliveryImage.svg";
import updateImage from "../../images/updateImage.svg";
import paymentImage from "../../images/payment.png";
import instagramIcon from "../../images/instagramIcon.svg";
import { useTranslation } from 'react-i18next';
function Home() {
    const { t, i18n} = useTranslation();
    return (
        <div className='my-[2rem]'>
            <div className='container mx-auto sm:p-0 p-[1rem]'>
                <form data-aos="fade-up" action="" className='bg-accent rounded-[14px] p-[1rem] sm:p-[2rem]'>
                    <p className='font-bold text-[1.5rem]'>{t('title_form_sign_up')}</p>
                    <div className='flex md:flex-row gap-[1rem] md:gap-[2rem] flex-col  py-[0.5rem]'>
                        <input type="text" placeholder={`${t('username_placeholder')}`} className='w-full md:w-1/3 shadow-lg text-[1.3rem] input bg-base-100 text-black' />
                        <input type="text" placeholder={`${t('password_placeholder')}`} className='w-full md:w-1/3 shadow-lg text-[1.3rem] input bg-base-100 text-black' />
                        <div className='flex md:hidden items-center gap-[0.5rem] font-bold'><input type="radio" name="radio-1" className="radio" /> {t('remember_input')}</div>
                        <button className='w-full md:w-[12rem] btn bg-black hover:bg-white hover:text-black text-white font-[900] text-[1.3rem]'>{t('login_button')}</button>
                    </div>
                    <div className='hidden md:flex items-center gap-[0.5rem] font-bold'><input type="radio" name="radio-1" className="radio" /> {t('remember_input')}</div>
                    <div className='flex sm:flex-row flex-col sm:gap-[1rem]'>
                        <p className='font-bold '>{t('sign_up_subtitle')}  <Link to="/signUp" className='underline'>{t('sign_up_button')}</Link></p>
                        <p className='font-bold '>{t('reset_password_text')} <a href="" className='underline'>{t('forget_password_button')}</a></p>
                    </div>
                </form>
                <div data-aos="fade-up" className='mt-[4rem]'>
                    <h1 className='text-[40px] sm:text-[72px] font-[900]'>{t('what_distinguishes_us_title')}</h1>
                    <div className='flex lg:flex-row flex-col-reverse gap-[2rem] items-center'>
                        <div className='flex flex-col gap-[1rem] lg:w-[60%]'>
                            <div className='flex sm:flex-row flex-col sm:gap-0 gap-[1rem]'>
                                <div className='flex items-center sm:w-1/2 gap-[1rem] font-bold xl:text-[1.3rem]'>
                                    <img src={pourcentageImage} alt="" /> {t('list_what_makes_us_different_item1')}
                                </div>
                                <div className='flex items-center sm:w-1/2 gap-[1rem] font-bold xl:text-[1.3rem]'>
                                    <img src={payMethodeImage} alt="" /> {t('list_what_makes_us_different_item2')}
                                </div>
                            </div>
                            <div className='flex sm:flex-row flex-col sm:gap-0 gap-[1rem]'>
                                <div className='flex items-center sm:w-1/2 gap-[1rem] font-bold xl:text-[1.3rem]'>
                                    <img src={supportImage} alt="" /> {t('list_what_makes_us_different_item3')}
                                </div>
                                <div className='flex items-center sm:w-1/2 gap-[1rem] font-bold xl:text-[1.3rem]'>
                                    <img src={chartImage} alt="" /> {t('list_what_makes_us_different_item4')}
                                </div>
                            </div>
                            <div className='flex sm:flex-row flex-col sm:gap-0 gap-[1rem]'>
                                <div className='flex items-center sm:w-1/2 gap-[1rem] font-bold xl:text-[1.3rem]'>
                                    <img src={promotionImage} alt="" /> {t('list_what_makes_us_different_item5')}
                                </div>
                                <div className='flex items-center sm:w-1/2 gap-[1rem] font-bold xl:text-[1.3rem]'>
                                    <img src={marketingImage} alt="" /> {t('list_what_makes_us_different_item6')}
                                </div>
                            </div>
                            <div className='flex sm:flex-row flex-col sm:gap-0 gap-[1rem]'>
                                <div className='flex items-center sm:w-1/2 gap-[1rem] font-bold xl:text-[1.3rem]'>
                                    <img src={deliveryImage} alt="" /> {t('list_what_makes_us_different_item7')}
                                </div>
                                <div className='flex items-center sm:w-1/2 gap-[1rem] font-bold xl:text-[1.3rem]'>
                                    <img src={updateImage} alt="" /> {t('list_what_makes_us_different_item8')}
                                </div>
                            </div>
                        </div>
                        <div className='lg:w-[40%]'>
                            <img src={whatDistinguishesUsImage} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div
                data-aos="fade-up"
                className="">
                <img loading="lazy" src={paymentImage} alt="" className='w-[100vw] lg:h-screen' />
            </div>
            <div className='container mx-auto mt-[3rem] sm:p-0 p-[1rem]'>
                <div className='flex items-center justify-center'>
                    <h1 className='text-[40px] mt-[1rem] md:mt-[2rem] md:text-[72px] font-[900]'>
                        {t('service_title')}
                    </h1>
                    <img src={largeLogo} className='md:w-auto md:h-auto w-[200px]' loading="lazy" alt="" />
                </div>
                <div className='mt-[1rem] rounded-[14px] flex md:flex-row flex-col md:gap-0 gap-[1rem] bg-accent px-[1rem] py-[2rem]'>
                    <div className='flex flex-wrap justify-center md:justify-start md:flex-col gap-[1rem] md:w-[20%] '>
                        <div className='btn md:w-[70%] sm:w-[30%] w-[40%]  font-[900] text-[1.2rem] text-white bg-[#5C51E5]'>{t('instagram_button')}</div>
                        <div className='btn md:w-[70%] sm:w-[30%] w-[40%] font-[900] text-[1.2rem] text-white bg-[#4267B2]'>{t('facebook_button')}</div>
                        <div className='btn md:w-[70%] sm:w-[30%] w-[40%] font-[900] text-[1.2rem] text-white bg-[#FF0000]'>{t('youtube_button')}</div>
                        <div className='btn md:w-[70%] sm:w-[30%] w-[40%] font-[900] text-[1.2rem] text-white bg-[#1DB954]'>{t('spotify_button')}</div>
                        <div className='btn md:w-[70%] sm:w-[30%] w-[40%] font-[900] text-[1.2rem] text-white bg-[#FF0050]'>{t('tiktok_button')}</div>
                        <div className='btn md:w-[70%] sm:w-[30%] w-[40%] font-[900] text-[1.2rem] text-white bg-[#2E2E2E]'>{t('twitter_button')}</div>
                        <div className='btn md:w-[70%] sm:w-[30%] w-[40%] font-[900] text-[1.2rem] text-white bg-[#C1BF07]'>{t('snapchat_button')}</div>
                    </div>
                    <div className='flex flex-col gap-[1rem] items-center md:w-[80%]'>
                        <img loading="lazy" src={instagramIcon} alt="" />
                        <h1 className='text-[25px] sm:text-[40px] font-bold'>{t('instagram_service_title')}</h1>
                        <p className='text-center font-bold'>{t('instagram_service_text')}</p>
                        <Link to="/signUp" className='btn bg-black hover:bg-white hover:text-black font-[900] text-[1.3rem] text-white'>{t('sign_up_button')}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home