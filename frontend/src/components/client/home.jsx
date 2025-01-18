import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import largeLogo from "../../images/largeLogo.png";
import handMoneyImage from "../../images/handMoneyImage.png";
import boxImage from "../../images/boxImage.png";
import watchImage from "../../images/watchImage.png";
import servicesImage1 from "../../images/servicesImage1.png";
import instagramIcon from "../../images/instagramIcon.svg";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
function Home() {
    const { t } = useTranslation();
    const [indexCards, setIndexCards] = useState(0);
    const [fadeCards, setFadeCards] = useState(true);
    const [activeCards, setActiveCards] = useState([]);

    const cards = [
        { id: 1, title: "قسم شحن التطبيقات 1", description: "هذا نص تجريبي 1", img: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
        { id: 2, title: "قسم شحن التطبيقات 2", description: "هذا نص تجريبي 2", img: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
        { id: 3, title: "قسم شحن التطبيقات 3", description: "هذا نص تجريبي 3", img: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
        { id: 4, title: "قسم شحن التطبيقات 4", description: "هذا نص تجريبي 4", img: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
        { id: 5, title: "قسم شحن التطبيقات 5", description: "هذا نص تجريبي 5", img: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
        { id: 6, title: "قسم شحن التطبيقات 6", description: "هذا نص تجريبي 6", img: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
        { id: 7, title: "قسم شحن التطبيقات 7", description: "هذا نص تجريبي 6", img: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
    ];

    const goToNextCards = () => {
        setIndexCards((prevIndex) => (prevIndex + 4) % cards.length); // Move forward by 3 cards
    };

    const goToPreviousCards = () => {
        setIndexCards((prevIndex) => (prevIndex - 4 + cards.length) % cards.length); // Move backward by 3 cards
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setFadeCards(false); // Start fade-out
            setTimeout(() => {
                setIndexCards((prevIndex) => (prevIndex + 4) % cards.length); // Update index to show the next set
                setFadeCards(true); // Start fade-in
            }, 300); // Duration matches fade-out CSS
        }, 4000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [cards.length]);

    useEffect(() => {
        // Handle wrapping around to ensure the proper number of cards are displayed
        const updatedActiveCards = [];
        for (let i = 0; i < 4; i++) {
            updatedActiveCards.push(cards[(indexCards + i) % cards.length]);
        }
        setActiveCards(updatedActiveCards);
    }, [indexCards, cards]);


    return (
        <div className='my-[2rem]'>
            <div className='h-full lg:h-[60vh] container mx-auto sm:p-0 p-[1rem]'>
                <div data-aos="fade-up" className='h-full flex flex-wrap items-stretch justify-between mt-[4rem]'>
                    <div className='w-72 self-start relative bg-[#B198E9] text-white rounded-[14px] p-[1rem]'>
                        <h1 className='text-[4rem] font-[900]'>25158218+</h1>
                        <p className='text-[1.3rem]'>طلب مكتمل</p>
                        <img src={boxImage} alt="" className='absolute top-10 right-full translate-x-[50%]' />
                        <img
                            src={boxImage}
                            alt=""
                            className='absolute top-[120%] right-1/2 translate-x-[50%] rotate-y-180'
                            style={{
                                transform: 'scaleY(-1)',
                                opacity: 0.3, // Initial opacity
                                maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%)',
                                WebkitMaskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%)',
                            }}
                        />
                    </div>
                    <div className='w-72 bg-dark self-center relative text-white rounded-[14px] p-[1rem]'>
                        <h1 className='text-[1.3rem]'>الاسعار تبدا من</h1>
                        <p className='text-[2.5rem] font-[900]'>$0.0001/الف</p>
                        <img src={handMoneyImage} alt="" className='absolute bottom-[-1rem] right-[90%] translate-x-[50%]' />
                        <img
                            src={handMoneyImage}
                            alt=""
                            className='absolute top-[85%] right-[40%] translate-x-[50%] rotate-y-180'
                            style={{
                                transform: 'scaleY(-1)',
                                opacity: 0.3, // Initial opacity
                                maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%)',
                                WebkitMaskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%)',
                            }}
                        />
                    </div>
                    <div className='w-72 self-start relative bg-[#FEBD59] text-white rounded-[14px] p-[1rem]'>
                        <h1 className='text-[1.3rem] '>طلب جديد كل</h1>
                        <p className='text-[3rem] font-[900]'>ثانية</p>
                        <img src={watchImage} alt="" className='absolute top-10 right-full translate-x-[50%]' />
                        <img
                            src={watchImage}
                            alt=""
                            className='absolute top-[190%] right-[52%] translate-x-[50%] rotate-y-180'
                            style={{
                                transform: 'scaleY(-1)',
                                opacity: 0.3, // Initial opacity
                                maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%)',
                                WebkitMaskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%)',
                            }}
                        />
                    </div>
                </div>
            </div>
            <div
                data-aos="fade-up"
                className={`w-screen h-full xl:h-screen relative`}
                style={{

                }}>
                <img src={`${servicesImage1}`} alt="" className={`absolute z-[-2] w-screen h-full object-cover`} />
                <div className='z-[-1] absolute bg-[#131736] opacity-[65%] w-screen h-full'></div>
                <div className='py-[2rem]'>
                    <h1 className='text-white text-center text-[2rem] sm:text-[5rem] font-[900]'>اكتشف خدماتنا</h1>
                    <div className={`mt-[3rem] flex flex-wrap justify-center items-center gap-[0.5rem] sm:gap-[1rem] md:gap-[3rem] transition-opacity duration-300 ${fadeCards ? "opacity-100" : "opacity-0"}`}>
                        {activeCards.map((card) => (
                            <div
                                key={card.id}
                                className="card w-[10rem] xs:w-[12rem] sm:w-[16rem] md:w-[20rem] lg:w-96 relative cursor-pointer bg-white/10 backdrop-blur-sm text-white sm:pt-[1rem] sm:px-[1rem] shadow-lg"
                            >
                                <figure>
                                    <img src={card.img} alt={card.title} />
                                </figure>
                                <div className="card-body p-0 gap-0 xs:p-[0.5rem] xs:gap-[0.5rem]">
                                    <h2 className="card-title font-bold text-[0.8rem] xs:text-[1rem]">{card.title}</h2>
                                    <p className="font-bold text-[0.8rem] xs:text-[1rem]">{card.description}</p>
                                    <div className="card-actions">
                                        <button className="sm:text-[1.2rem] btn btn-sm btn-ghost btn-outline text-white h-auto sm:py-[0.5rem] sm:px-[3rem]">دخول</button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="flex gap-[1rem] justify-center mt-4">
                        <button
                            onClick={goToNextCards}
                            className="btn btn-ghost btn-outline text-white text-2xl px-4 py-2">
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                        <button
                            onClick={goToPreviousCards}
                            className="btn btn-ghost btn-outline text-white text-2xl px-4 py-2">
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                    </div>
                </div>
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