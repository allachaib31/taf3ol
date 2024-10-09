import React, { useState } from 'react'
import { faClipboard, faClipboardList, faCoins, faHeadset, faPaperclip, faStore, faTriangleExclamation, faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useOutletContext } from 'react-router-dom'
import FirstCategory from './firstCategory'
import SecondCategory from './secondCategory'
import ThirdStep from './thirdStep'
function Support() {
  const { t, i18n } = useOutletContext();
  const [aciveButton, setActiveButton] = useState(-1);
  const [subject, setSubject] = useState(-1);
  return (
    <div className="relative z-50 ">
      <div className='flex justify-center mb-[1rem]'>
        <Link to="/client/openTickets" className='btn btn-primary font-bold text-xl'>{t('button_1_support')}</Link>
      </div>
      <div className='flex sm:flex-row flex-col gap-[4rem] sm:gap-[1rem] justify-center items-center'>
        <div className={`relative w-60 h-40 pb-[1rem] px-[1rem] flex items-end border rounded-[14px] ${aciveButton == -1 ? "bg-primary" : "bg-white"}`}>
          <h1 className='text-3xl sm:text-[1.1rem] relative z-10 md:text-xl lg:text-3xl font-[900]'>{t('card_1_support')}</h1>
          <h1 className={`absolute left-2 bottom-[-90px] z-1 ${aciveButton == -1 ? "text-[#FEF66B]" : "text-[#F2F2F2]"}  text-[200px] font-[900]`}>1</h1>
        </div>
        <div className="flex items-center justify-center">
          <svg className='rotate-[-90deg] sm:rotate-0 w-[100px] lg:w-[200px]' height="10" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="5" x2="200" y2="5" stroke="black" strokeWidth="2" />
            <polygon points="0,5 10,10 10,0" fill="black" />
          </svg>
        </div>
        <div className={`relative w-60 h-40 pb-[1rem] px-[1rem] flex items-end border rounded-[14px] ${(aciveButton == 1 || aciveButton == 2) && subject == -1 ? "bg-primary" : "bg-white"}`}>
          <h1 className='text-3xl sm:text-[1.1rem] z-10 md:text-xl lg:text-3xl font-[900]'>{t('card_2_support')}</h1>
          <h1 className={`absolute left-2 bottom-[-90px] z-1 ${(aciveButton == 1 || aciveButton == 2) && subject == -1 ? "text-[#FEF66B]" : "text-[#F2F2F2]"}  text-[200px] font-[900]`}>2</h1>
        </div>
        <div className="flex items-center justify-center">
          <svg className='rotate-[-90deg] sm:rotate-0 w-[100px] lg:w-[200px]' height="10" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="5" x2="200" y2="5" stroke="black" strokeWidth="2" />
            <polygon points="0,5 10,10 10,0" fill="black" />
          </svg>
        </div>
        <div className={`relative w-60 h-40 pb-[1rem] px-[1rem] flex items-end border rounded-[14px] ${(aciveButton > 2) || (subject != -1) ? "bg-primary" : "bg-white"}`}>
          <h1 className='text-3xl sm:text-[1.1rem] z-10 md:text-xl lg:text-3xl font-[900]'>{t('card_3_support')}</h1>
          <h1 className={`absolute left-2 bottom-[-90px] z-1 ${(aciveButton > 2) || (subject != -1) ? "text-[#FEF66B]" : "text-[#F2F2F2]"}  text-[200px] font-[900]`}>3</h1>
        </div>
      </div>
      <div>
        <h1 className='text-2xl sm:text-3xl font-bold my-[1.5rem]'>{t('title_1_support')}</h1>
        <div className='flex flex-wrap sm:gap-0 gap-y-[1rem] justify-around items-center'>
          <div className='flex flex-col items-center justify-center'>
            <div onClick={() => {
              setActiveButton(1);
              setSubject(-1);
            }} className={`w-[117px] h-[110px] text-center cursor-pointer hover:bg-primary ${aciveButton == 1 ? "bg-primary" : "bg-white"} border rounded-full px-[2.2rem] p-[2rem] mb-[1rem]`}>
              <FontAwesomeIcon className='text-[2.5rem]' icon={faClipboardList} />
            </div>
            <h1 className='text-[1rem] sm:text-xl font-bold text-center'>{t('title_category_1_support')}</h1>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div onClick={() => {
              setActiveButton(2);
              setSubject(-1);
            }} className={`w-[117px] h-[110px] text-center cursor-pointer hover:bg-primary ${aciveButton == 2 ? "bg-primary" : "bg-white"} border rounded-full px-[2.2rem] p-[2rem] mb-[1rem]`}>
              <FontAwesomeIcon className='text-[2.5rem]' icon={faWallet} />
            </div>
            <h1 className='text-[1rem] sm:text-xl font-bold text-center'>{t('title_category_2_support')}</h1>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div onClick={() => {
              setActiveButton(3);
              setSubject(-1);
            }} className={`w-[117px] h-[110px] text-center cursor-pointer hover:bg-primary ${aciveButton == 3 ? "bg-primary" : "bg-white"} border rounded-full px-[2.2rem] p-[2rem] mb-[1rem]`}>
              <FontAwesomeIcon className='text-[2.5rem]' icon={faHeadset} />
            </div>
            <h1 className='text-[1rem] sm:text-xl font-bold text-center'>{t('title_category_3_support')}</h1>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div onClick={() => {
              setActiveButton(4);
              setSubject(-1);
            }} className={`w-[117px] h-[110px] text-center cursor-pointer hover:bg-primary ${aciveButton == 4 ? "bg-primary" : "bg-white"} border rounded-full px-[2.2rem] p-[2rem] mb-[1rem]`}>
              <FontAwesomeIcon className='text-[2.5rem]' icon={faCoins} />
            </div>
            <h1 className='text-[1rem] sm:text-xl font-bold text-center'>{t('title_category_4_support')}</h1>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div onClick={() => {
              setActiveButton(5);
              setSubject(-1);
            }} className={`w-[117px] h-[110px] text-center cursor-pointer hover:bg-primary ${aciveButton == 5 ? "bg-primary" : "bg-white"} border rounded-full px-[2.2rem] p-[2rem] mb-[1rem]`}>
              <FontAwesomeIcon className='text-[2.5rem]' icon={faStore} />
            </div>
            <h1 className='text-[1rem] sm:text-xl font-bold text-center'>{t('title_category_5_support')}</h1>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div onClick={() => {
              setActiveButton(6);
              setSubject(-1);
            }} className={`w-[117px] h-[110px] text-center cursor-pointer hover:bg-primary ${aciveButton == 6 ? "bg-primary" : "bg-white"} border rounded-full px-[2.2rem] p-[2rem] mb-[1rem]`}>
              <FontAwesomeIcon className='text-[2.5rem]' icon={faClipboard} />
            </div>
            <h1 className='text-[1rem] sm:text-xl font-bold text-center'>{t('title_category_6_support')}</h1>
          </div>
          <div className='pt-[2rem] flex flex-col items-center justify-center'>
            <div onClick={() => {
              setActiveButton(7);
              setSubject(-1);
            }} className={`w-[117px] h-[110px] text-center cursor-pointer hover:bg-primary ${aciveButton == 7 ? "bg-primary" : "bg-white"} border rounded-full px-[2.2rem] p-[2rem] mb-[1rem]`}>
              <FontAwesomeIcon className='text-[2.5rem]' icon={faTriangleExclamation} />
            </div>
            <h1 className='text-[1rem] sm:text-xl font-bold text-center' dangerouslySetInnerHTML={{ __html: t('title_category_7_support') }}></h1>
          </div>
        </div>
        {
          aciveButton == 1 && <FirstCategory subject={subject} setSubject={setSubject} />
        }
        {
          aciveButton == 2 && <SecondCategory subject={subject} setSubject={setSubject} />
        }
        {
          subject != -1 && <ThirdStep />
        }
        {
          aciveButton > 2 && <ThirdStep />
        }
        {/*<SecondCategory />
        <ThirdStep />*/}
        <div className='flex justify-center mt-[1.5rem]'>
          <button disabled className='btn btn-primary h-auto text-xl sm:text-3xl sm:btn-lg'>{t("button_2_support")}</button>
        </div>

      </div>

    </div>
  )
}

export default Support