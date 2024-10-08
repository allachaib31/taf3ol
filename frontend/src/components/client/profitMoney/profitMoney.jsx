import React from 'react'
import { faClone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import affilationMarketingImage from "../../../images/affilationMarketing.png"
import { useOutletContext } from 'react-router-dom';
function ProfitMoney() {
  const { t, i18n } = useOutletContext();
  return (
    <div className='relative z-50'>
      <div className="join w-full">
        <div className="indicator">
          <button className="btn btn-primary join-item  w-[10rem]">{t('button_1_profitMoney')}</button>
        </div>
        <div className='w-full'>
          <div className='w-full'>
            <input className="input input-bordered join-item w-full" disabled value={"example.com/broken-link"} />
          </div>
        </div>
      </div>
      <div className='flex md:flex-row flex-col md:gap-0 gap-[1rem] justify-between mt-[2rem]'>
        <div className='bg-primary p-[1rem]'>
          <div className='flex'>
            <div className={`p-[1rem] w-1/2 md:w-auto border-b border-black ${i18n.language === "ar" ? "border-l" : "border-r"}`}>
              <h1 className='text-xl text-center'>{t('title_1_profitMoney')}</h1>
              <h1 className='text-xl text-center'>0.00%</h1>
            </div>
            <div className='p-[1rem] w-1/2 md:w-auto border-b border-black'>
              <h1 className='text-xl text-center'>{t('title_2_profitMoney')}</h1>
              <h1 className='text-xl text-center'>5%</h1>
            </div>
          </div>
          <div className='flex justify-center mt-[1rem]'>
            <button className='btn bg-transparent hover:bg-transparent hover:border-none border-none text-xl'><FontAwesomeIcon icon={faClone} /></button>
          </div>
        </div>
        <div className='w-full md:w-[60%] xxl:w-[70%]'>
          <div className='flex'>
            <div className='border w-[33.4%] p-[1rem] flex flex-col justify-center items-center'>
              <h1 className='text-[1rem] sm:text-xl text-center'>{t('title_3_profitMoney')}</h1>
              <h1 className='text-[1rem] sm:text-xl text-center'>0</h1>
            </div>
            <div className='border w-[33.4%] p-[1rem] flex flex-col justify-center items-center'>
              <h1 className='text-[1rem] sm:text-xl text-center'>{t('title_4_profitMoney')}</h1>
              <h1 className='text-[1rem] sm:text-xl text-center'>0</h1>
            </div>
            <div className='border w-[33.4%] p-[1rem] flex flex-col justify-center items-center'>
              <h1 className='text-[1rem] sm:text-xl text-center'>{t('title_5_profitMoney')}</h1>
              <h1 className='text-[1rem] sm:text-xl text-center'>0</h1>
            </div>
          </div>
          <div className='flex'>
            <div className='border w-[33.4%] p-[1rem] flex flex-col justify-center items-center'>
              <h1 className='text-[1rem] sm:text-xl text-center'>{t('title_6_profitMoney')}</h1>
              <h1 className='text-[1rem] sm:text-xl text-center'>0</h1>
            </div>
            <div className='border w-[33.4%] p-[1rem] flex flex-col justify-center items-center'> 
              <h1 className='text-[1rem] sm:text-xl text-center'>{t('title_7_profitMoney')}</h1>
              <h1 className='text-[1rem] sm:text-xl text-center'>0</h1>
            </div>
            <div className='border w-[33.4%] p-[1rem] flex flex-col justify-center items-center'>
              <h1 className='text-[1rem] sm:text-xl text-center'>{t('title_8_profitMoney')}</h1>
              <h1 className='text-[1rem] sm:text-xl text-center'>0</h1>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-[2rem] flex justify-center items-center'>
        <img src={affilationMarketingImage} alt="" />
      </div>
    </div>
  )
}

export default ProfitMoney