import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import largeLogo from "../../images/largeLogo.png";
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
            <div className='container mx-auto sm:p-0 p-[1rem]'>
                <div data-aos="fade-up" className='mt-[4rem]'>

                </div>
            </div>
            <div
                data-aos="fade-up"
                className={`w-screen h-screen relative`}
                style={{

                }}>
                <img src={`${servicesImage1}`} alt="" className={`absolute z-[-2] w-screen h-screen`} />
                <div className='z-[-1] absolute bg-[#131736] opacity-[65%] w-screen h-screen'></div>
                <div className='py-[2rem]'>
                    <h1 className='text-white text-center text-[5rem] font-[900]'>اكتشف خدماتنا</h1>
                    <div className={`mt-[3rem] flex justify-center items-center gap-[3rem] transition-opacity duration-300 ${fadeCards ? "opacity-100" : "opacity-0"}`}>
                        {activeCards.map((card) => (
                            <div
                                key={card.id}
                                className="card w-96 relative cursor-pointer bg-white/10 backdrop-blur-sm text-white pt-[1rem] px-[1rem] shadow-lg"
                            >
                                <figure>
                                    <img src={card.img} alt={card.title} />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title font-bold">{card.title}</h2>
                                    <p className="font-bold">{card.description}</p>
                                    <div className="card-actions">
                                        <button className="text-[1.2rem] btn btn-sm btn-ghost btn-outline text-white h-auto py-[0.5rem] px-[3rem]">دخول</button>
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