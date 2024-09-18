import React, { useState } from 'react'
import { Link } from 'react-router-dom'
/*import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTiktok, faTwitter, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';*/
import largeLogo from "../../images/largeLogo.png";
/*import paymentProtectionIcon from "../../images/paymentProtectionIcon.png";
import supportIcon from "../../images/supportIcon.png";
import dashboardIcon from "../../images/dashboardIcon.png";
import discountIcon from "../../images/discountIcon.png";
import marketingIcon from "../../images/marketingIcon.png";
import moneyBagIcon from "../../images/moneyBagIcon.png"
import btcIcon from "../../images/btcIcon.png";
import applePayIcon from "../../images/applePayIcon.png"
import googlePayIcon from "../../images/googlePayIcon.png";
import paypalIcon from "../../images/paypalIcon.png";
import skrillIcon from "../../images/skrillIcon.png";
import carteCreditIcon from "../../images/carteCreditIcon.png";
import ethereumIcon from "../../images/ethereumIcon.png";
import stripeIcon from "../../images/stripeIcon.png";
import dashIcon from "../../images/dashIcon.png";
import usdtIcon from "../../images/usdtIcon.png";
import paytmIcon from "../../images/paytmIcon.png";
import bankIcon from "../../images/bankIcon.png";*/
import facebookImage from "../../images/facebook.png";
/*import twitterImage from "../../images/twitter.png";
import youtubeImage from "../../images/youtube.png";
import tiktokImage from "../../images/tiktok.png";
import instagramImage from "../../images/instagram.png";
import whatsappImage from "../../images/whatsapp.png";
import clockIcon from "../../images/clockIcon.png";
import chartIcon from "../../images/chartIcon.png";*/
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
    //const [activeImage, setActiveImage] = useState(facebookImage);
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
                        <p className='font-bold '>{t('reset_password_text')} <a href="" className='underline'>اعادة تعيين</a></p>
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
                <img loading="lazy" src={paymentImage} alt="" className='w-[100vw]' />
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
        /*
            <div className='my-[2rem]'>
                <div className='container mx-auto '>
                    <form data-aos="fade-up" action="" className='rounded-[14px] p-[1rem] sm:p-[2rem]'>
                        <h1 className='text-xl sm:text-right text-center sm:text-3xl font-bold'>يمكنك الاستفادة من خدماتنا</h1>
                        <h1 className='text-xl sm:text-right text-center sm:text-3xl font-bold'>عن طريق تسجيل الدخول إلى حسابك معنا!</h1>
                        <div className='flex md:flex-row gap-[1rem] flex-col py-[1.5rem]'>
                            <div className='md:w-[60%]  flex md:flex-row gap-[1rem] flex-col '>
                                <input type="text" placeholder='إسم المستخدم' className='w-full md:w-1/2 shadow-lg input input-bordered bg-base-100 text-black' />
                                <input type="text" placeholder='كلمة السر' className='w-full md:w-1/2 shadow-lg input input-bordered bg-base-100 text-black' />
                            </div>
                            <button className='w-full md:w-[12rem] btn btn-primary text-[1.1rem] sm:text-xl font-bold'>تسجيل الدخول</button>
                        </div>
                        <div className='flex items-center gap-[0.5rem] font-bold'><input type="radio" name="radio-1" className="radio" /> تذكرني</div>
                        <div className='flex sm:flex-row flex-col sm:gap-[1rem]'>
                            <p className='font-bold text-[1.1rem] mt-[1rem]'>سجل الان؟ <a href="" className='underline text-primary '>ليس لديك حساب</a></p>
                            <p className='font-bold text-[1.1rem] mt-[1rem]'>هل نسيت كلمة المرور؟ <a href="" className='underline text-primary '>اعادة تعيين</a></p>
                        </div>
                    </form>
                </div>
                <div data-aos="fade-up" className='flex sm:flex-row flex-col items-center sm:items-start sm:gap-0 gap-[2rem] sm:justify-around container mx-auto my-[4rem] sm:px-0 px-[1rem] '>
                    <div className='flex flex-col'>
                        <div className='bg-black flex justify-center items-center rounded-full w-[150px] py-[3rem]'>
                            <img src={moneyBagIcon} alt="" />
                        </div>
                        <h1 className='text-center font-bold text-[30px]'>$0.0001/الف</h1>
                        <h1 className='text-center'>الاسعار تبدا من</h1>
                    </div>
                    <div className='flex flex-col'>
                        <div className='bg-black flex justify-center items-center rounded-full w-[150px] py-[3rem]'>
                            <img src={clockIcon} alt="" />
                        </div>
                        <h1 className='text-center font-bold text-[30px]'>ثانية</h1>
                        <h1 className='text-center'>طلب جديد كل</h1>
                    </div>
                    <div className='flex flex-col'>
                        <div className='bg-black flex justify-center items-center rounded-full w-[150px] py-[3rem]'>
                            <img src={chartIcon} alt="" />
                        </div>
                        <h1 className='text-center font-bold text-[30px]'>25158218</h1>
                        <h1 className='text-center'>طلب مكتمل</h1>
                    </div>
                </div>
                <div data-aos="fade-up" className='container mx-auto my-[4rem] sm:px-0 px-[1rem] '>
                    <h1 className='text-[40px] sm:text-[72px] font-[900]'>ما يميزنا ؟</h1>
                    <div className='flex flex-wrap justify-between gap-[1rem]'>
                        <div className='bg-secondary w-full sm:w-[45%] md:w-[30%] xl:w-1/4 rounded-[20px] flex items-center gap-[1rem] p-[1rem]'>
                            <div className='bg-primary rounded-full p-[1rem]'>
                                <img loading="lazy" src={moneyBagIcon} alt="" />
                            </div>
                            <h1 className='text-xl font-bold  whitespace-wrap'>ارخص وافضل الخدمات</h1>
                        </div>
                        <div className='bg-secondary w-full sm:w-[45%] md:w-[30%] xl:w-1/4 rounded-[20px] flex items-center gap-[1rem] p-[1rem]'>
                            <div className='bg-primary rounded-full p-[1rem]'>
                                <img loading="lazy" src={paymentProtectionIcon} alt="" />
                            </div>
                            <h1 className='text-xl font-bold  whitespace-wrap'>طرق دفع آمنة</h1>
                        </div>
                        <div className='bg-secondary w-full sm:w-[45%] md:w-[30%] xl:w-1/4 rounded-[20px] flex items-center gap-[1rem] p-[1rem]'>
                            <div className='bg-primary rounded-full p-[1rem]'>
                                <img loading="lazy" src={supportIcon} alt="" />
                            </div>
                            <h1 className='text-xl font-bold  whitespace-wrap'>دعم فني متواصل 24/7</h1>
                        </div>
                        <div className='bg-secondary w-full sm:w-[45%] md:w-[30%] xl:w-1/4 rounded-[20px] flex items-center gap-[1rem] p-[1rem]'>
                            <div className='bg-primary rounded-full p-[1rem]'>
                                <img loading="lazy" src={dashboardIcon} alt="" />
                            </div>
                            <h1 className='text-xl font-bold  whitespace-wrap'>لوحة تحكم سهلة و سلسة</h1>
                        </div>
                        <div className='bg-secondary w-full sm:w-[45%] md:w-[30%] xl:w-1/4 rounded-[20px] flex items-center gap-[1rem] p-[1rem]'>
                            <div className='bg-primary rounded-full p-[1rem]'>
                                <img loading="lazy" src={discountIcon} alt="" />
                            </div>
                            <h1 className='text-xl font-bold  whitespace-wrap'>خصم خاص لكبار التجار</h1>
                        </div>
                        <div className='bg-secondary w-full sm:w-[45%] md:w-[30%] xl:w-1/4 rounded-[20px] flex items-center gap-[1rem] p-[1rem]'>
                            <div className='bg-primary rounded-full p-[1rem]'>
                                <img loading="lazy" src={marketingIcon} alt="" />
                            </div>
                            <h1 className='text-xl font-bold  whitespace-wrap'>نظام تسويق بالعمولة</h1>
                        </div>
                    </div>
                </div>
                <div data-aos="fade-up" className='container mx-auto'>
                    <h1 className='text-center font-[900] text-[2rem] sm:text-[4rem]'>طرق الدفع الآمنة</h1>
                    <div className='mb-[1rem] flex gap-[2rem] sm:gap-[4rem] flex-wrap justify-center md:justify-between'>
                        <div className='w-[120px] sm:w-[30%] md:w-[20%] lg:w-[15.66%] xl:w-[11.66%] h-[120px] sm:h-[160px] border-primary border sm:p-[1.5rem] rounded-full flex items-center justify-center'>
                            <img src={btcIcon} className='w-[60px] h-[60px] sm:w-[110px] sm:h-[111px]' alt="" />
                        </div>
                        <div className='w-[120px] sm:w-[30%] md:w-[20%] lg:w-[15.66%] xl:w-[11.66%] h-[120px] sm:h-[160px] border-primary border sm:p-[1.5rem] rounded-full flex items-center justify-center'>
                            <img src={applePayIcon} className='w-[60px] h-[60px] sm:w-[110px] sm:h-[111px]' alt="" />
                        </div>
                        <div className='w-[120px] sm:w-[30%] md:w-[20%] lg:w-[15.66%] xl:w-[11.66%] h-[120px] sm:h-[160px] border-primary border sm:p-[1.5rem] rounded-full flex items-center justify-center'>
                            <img src={googlePayIcon} className='w-[60px] h-[60px] sm:w-[110px] sm:h-[111px]' alt="" />
                        </div>
                        <div className='w-[120px] sm:w-[30%] md:w-[20%] lg:w-[15.66%] xl:w-[11.66%] h-[120px] sm:h-[160px] border-primary border sm:p-[1.5rem] rounded-full flex items-center justify-center'>
                            <img src={paypalIcon} className='w-[60px] h-[60px] sm:w-[110px] sm:h-[111px]' alt="" />
                        </div>
                        <div className='w-[120px] sm:w-[30%] md:w-[20%] lg:w-[15.66%] xl:w-[11.66%] h-[120px] sm:h-[160px] border-primary border sm:p-[1.5rem] rounded-full flex items-center justify-center'>
                            <img src={skrillIcon} className='w-[60px] h-[60px] sm:w-[110px] sm:h-[111px]' alt="" />
                        </div>
                        <div className='w-[120px] sm:w-[30%] md:w-[20%] lg:w-[15.66%] xl:w-[11.66%] h-[120px] sm:h-[160px] border-primary border sm:p-[1.5rem] rounded-full flex items-center justify-center'>
                            <img src={carteCreditIcon} className='w-[60px] h-[60px] sm:w-[110px] sm:h-[111px]' alt="" />
                        </div>
                        <div className='w-[120px] sm:w-[30%] md:w-[20%] lg:w-[15.66%] xl:w-[11.66%] h-[120px] sm:h-[160px] border-primary border sm:p-[1.5rem] rounded-full flex items-center justify-center'>
                            <img src={ethereumIcon} className='w-[60px] h-[60px] sm:w-[110px] sm:h-[111px]' alt="" />
                        </div>
                        <div className='w-[120px] sm:w-[30%] md:w-[20%] lg:w-[15.66%] xl:w-[11.66%] h-[120px] sm:h-[160px] border-primary border sm:p-[1.5rem] rounded-full flex items-center justify-center'>
                            <img src={stripeIcon} className='w-[60px] h-[60px] sm:w-[110px] sm:h-[111px]' alt="" />
                        </div>
                        <div className='w-[120px] sm:w-[30%] md:w-[20%] lg:w-[15.66%] xl:w-[11.66%] h-[120px] sm:h-[160px] border-primary border sm:p-[1.5rem] rounded-full flex items-center justify-center'>
                            <img src={dashIcon} className='w-[60px] h-[60px] sm:w-[110px] sm:h-[111px]' alt="" />
                        </div>
                        <div className='w-[120px] sm:w-[30%] md:w-[20%] lg:w-[15.66%] xl:w-[11.66%] h-[120px] sm:h-[160px] border-primary border sm:p-[1.5rem] rounded-full flex items-center justify-center'>
                            <img src={usdtIcon} className='w-[60px] h-[60px] sm:w-[110px] sm:h-[111px]' alt="" />
                        </div>
                        <div className='w-[120px] sm:w-[30%] md:w-[20%] lg:w-[15.66%] xl:w-[11.66%] h-[120px] sm:h-[160px] border-primary border sm:p-[1.5rem] rounded-full flex items-center justify-center'>
                            <img src={paytmIcon} className='w-[60px] h-[60px] sm:w-[110px] sm:h-[111px]' alt="" />
                        </div>
                        <div className='w-[120px] sm:w-[30%] md:w-[20%] lg:w-[15.66%] xl:w-[11.66%] h-[120px] sm:h-[160px] border-primary border sm:p-[1.5rem] rounded-full flex items-center justify-center'>
                            <img src={bankIcon} className='w-[60px] h-[60px] sm:w-[110px] sm:h-[111px]' alt="" />
                        </div>
                    </div>
                </div>
                <div data-aos="fade-up" className='container mx-auto mt-[3rem]'>
                    <h1 className='text-center font-[900] text-[2rem] sm:text-[4rem]'>ماذا يقول العملاء عنا؟</h1>
                    <div className="carousel h-[250px] w-full gap-[2rem]">
                        <div className="carousel-item w-96 h-[200px]">
                            <div className="card bg-base-100 w-96 border shadow-md">
                                <div className="card-body relative justify-center items-center">
                                    <FontAwesomeIcon icon={faQuoteRight} className='absolute text-primary text-3xl font-[900] top-[16%] right-[10%] z-[1]'/>
                                    <h1 className="text-center z-[999]">استخدمت موقع تفاعل لشراء متابعين لحسابي على إنستغرام. الخدمة كانت سريعة جدًا...</h1>
                                    <div className="rating">
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" disabled />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" defaultChecked disabled />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" defaultChecked disabled />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" defaultChecked disabled />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" defaultChecked disabled />
                                    </div>
                                    <h1 className="font-[900]">محمد من الجزائر</h1>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item w-96 h-[200px]">
                            <div className="card bg-base-100 w-96 border shadow-md">
                                <div className="card-body relative justify-center items-center">
                                    <FontAwesomeIcon icon={faQuoteRight} className='absolute text-primary text-3xl font-[900] top-[16%] right-[10%] z-[1]'/>
                                    <h1 className="text-center z-[999]">استخدمت موقع تفاعل لشراء متابعين لحسابي على إنستغرام. الخدمة كانت سريعة جدًا...</h1>
                                    <div className="rating">
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" disabled />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" defaultChecked disabled />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" defaultChecked disabled />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" defaultChecked disabled />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" defaultChecked disabled />
                                    </div>
                                    <h1 className="font-[900]">محمد من الجزائر</h1>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item w-96 h-[200px]">
                            <div className="card bg-base-100 w-96 border shadow-md">
                                <div className="card-body relative justify-center items-center">
                                    <FontAwesomeIcon icon={faQuoteRight} className='absolute text-primary text-3xl font-[900] top-[16%] right-[10%] z-[1]'/>
                                    <h1 className="text-center z-[999]">استخدمت موقع تفاعل لشراء متابعين لحسابي على إنستغرام. الخدمة كانت سريعة جدًا...</h1>
                                    <div className="rating">
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" disabled />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" defaultChecked disabled />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" defaultChecked disabled />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" defaultChecked disabled />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" defaultChecked disabled />
                                    </div>
                                    <h1 className="font-[900]">محمد من الجزائر</h1>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item w-96 h-[200px]">
                            <div className="card bg-base-100 w-96 border shadow-md">
                                <div className="card-body relative justify-center items-center">
                                    <FontAwesomeIcon icon={faQuoteRight} className='absolute text-primary text-3xl font-[900] top-[16%] right-[10%] z-[1]'/>
                                    <h1 className="text-center z-[999]">استخدمت موقع تفاعل لشراء متابعين لحسابي على إنستغرام. الخدمة كانت سريعة جدًا...</h1>
                                    <div className="rating">
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" disabled />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" defaultChecked disabled />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" defaultChecked disabled />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" defaultChecked disabled />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" defaultChecked disabled />
                                    </div>
                                    <h1 className="font-[900]">محمد من الجزائر</h1>
                                </div>
                            </div>
                        </div>
                    </div>
    
                </div>
                <div data-aos="fade-up" className='container mx-auto mt-[3rem]'>
                    <div className='flex items-center justify-center'>
                        <h1 className='text-[40px] mt-[1rem] md:mt-[2rem] md:text-[72px] font-[900]'>
                            خدمات
                        </h1>
                        <img src={largeLogo} className='md:w-auto md:h-auto w-[200px]' loading="lazy" alt="" />
                    </div>
                    <div className='text-center flex flex-col justify-center items-center gap-[1.5rem] mt-[1rem]'>
                        <h1 className='text-primary font-[900] text-[30px] sm:text-[50px]'>تفاعل يصنع الفارق</h1>
                        <h2 className='font-[900] text-[20px]'>حلول ذكية لتعزيز وجودك على وسائل التواصل الاجتماعي</h2>
                    </div>
                    <div className='mt-[3rem] flex flex-wrap justify-center gap-[1rem] xl:gap-[3rem]'>
                        <div onClick={() => setActiveImage(facebookImage)} className={`w-[100px] sm:w-[163px] py-[2rem] px-[2rem] lg:py-[2rem] lg:px-[3rem] rounded-2xl flex items-center justify-center cursor-pointer hover:bg-[#08133A] ${activeImage == facebookImage ? "bg-[#08133A]" : "bg-primary"} text-white text-[30px] sm:text-[40px] md:text-[60px] font-bold`}>
                            <FontAwesomeIcon icon={faFacebookF} />
                        </div>
                        <div onClick={() => setActiveImage(twitterImage)} className={`w-[100px] sm:w-[163px] py-[2rem] px-[2rem] lg:py-[2rem] lg:px-[3rem] rounded-2xl flex items-center justify-center cursor-pointer hover:bg-[#08133A] ${activeImage == twitterImage ? "bg-[#08133A]" : "bg-primary"} text-white text-[30px] sm:text-[40px] md:text-[60px] font-bold`}>
                            <FontAwesomeIcon icon={faTwitter} />
                        </div>
                        <div onClick={() => setActiveImage(youtubeImage)} className={`w-[100px] sm:w-[163px] py-[2rem] px-[2rem] lg:py-[2rem] lg:px-[3rem] rounded-2xl flex items-center justify-center cursor-pointer hover:bg-[#08133A] ${activeImage == youtubeImage ? "bg-[#08133A]" : "bg-primary"} text-white text-[30px] sm:text-[40px] md:text-[60px] font-bold`}>
                            <FontAwesomeIcon icon={faYoutube} />
                        </div>
                        <div onClick={() => setActiveImage(tiktokImage)} className={`w-[100px] sm:w-[163px] py-[2rem] px-[2rem] lg:py-[2rem] lg:px-[3rem] rounded-2xl flex items-center justify-center cursor-pointer hover:bg-[#08133A] ${activeImage == tiktokImage ? "bg-[#08133A]" : "bg-primary"} text-white text-[30px] sm:text-[40px] md:text-[60px] font-bold`}>
                            <FontAwesomeIcon icon={faTiktok} />
                        </div>
                        <div onClick={() => setActiveImage(instagramImage)} className={`w-[100px] sm:w-[163px] py-[2rem] px-[2rem] lg:py-[2rem] lg:px-[3rem] rounded-2xl flex items-center justify-center cursor-pointer hover:bg-[#08133A] ${activeImage == instagramImage ? "bg-[#08133A]" : "bg-primary"} text-white text-[30px] sm:text-[40px] md:text-[60px] font-bold`}>
                            <FontAwesomeIcon icon={faInstagram} />
                        </div>
                        <div onClick={() => setActiveImage(whatsappImage)} className={`w-[100px] sm:w-[163px] py-[2rem] px-[2rem] lg:py-[2rem] lg:px-[3rem] rounded-2xl flex items-center justify-center cursor-pointer hover:bg-[#08133A] ${activeImage == whatsappImage ? "bg-[#08133A]" : "bg-primary"} text-white text-[30px] sm:text-[40px] md:text-[60px] font-bold`}>
                            <FontAwesomeIcon icon={faWhatsapp} />
                        </div>
                    </div>
                    <div className='mt-[1rem] flex justify-center items-center h-[50vh]' style={{
                        backgroundImage: `url(${activeImage})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}>
                        <p className='text-center font-bold text-[1rem] sm:text-[20px] xl:text-[25px]'>منصة Tafa3ol هي الخيار الأمثل لجميع احتياجاتك في التفاعلعلى وسائل التواصل الاجتماعي. مع تزايد أهمية منصات
                            المختلفة، أصبحت الحاجة إلى تحسين تواجدك الرقمي ضرورة لتحقيق النجاح.
                            مع Tafa3ol، يمكنك البدء في تعزيز حساباتك عبر خطوات بسيطة وفعالة.</p>
                    </div>
                </div>
            </div>*/
    )
}

export default Home