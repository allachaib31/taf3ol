import React from 'react'
import { faClipboard, faClipboardList, faCoins, faHeadset, faPaperclip, faStore, faTriangleExclamation, faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
function Support() {
  return (
    <div className="relative z-50 ">
      <div className='flex justify-center mb-[1rem]'>
        <Link to="/client/openTickets" className='btn btn-primary font-bold text-xl'>التذاكر المفتوحة</Link>
      </div>
      <div className='flex sm:flex-row flex-col gap-[4rem] sm:gap-[1rem] justify-center items-center'>
        <div className='relative w-60 h-40 pb-[1rem] px-[1rem] flex items-end border rounded-[14px] bg-primary'>
          <h1 className='text-3xl sm:text-[1.1rem] relative z-10 md:text-xl lg:text-3xl font-[900]'>اختر الفئة</h1>
          <h1 className='absolute left-2 bottom-[-90px] z-1 text-[#FEF66B] text-[200px] font-[900]'>1</h1>
        </div>
        <div className="flex items-center justify-center">
          <svg className='rotate-[-90deg] sm:rotate-0 w-[100px] lg:w-[200px]' height="10" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="5" x2="200" y2="5" stroke="black" strokeWidth="2" />
            <polygon points="0,5 10,10 10,0" fill="black" />
          </svg>
        </div>
        <div className='relative w-60 h-40 pb-[1rem] px-[1rem] flex items-end border rounded-[14px] '>
          <h1 className='text-3xl sm:text-[1.1rem] z-10 md:text-xl lg:text-3xl font-[900]'>اختر الموضوع</h1>
          <h1 className='absolute left-2 bottom-[-90px] z-1 text-[#F2F2F2] text-[200px] font-[900]'>2</h1>
        </div>
        <div className="flex items-center justify-center">
          <svg className='rotate-[-90deg] sm:rotate-0 w-[100px] lg:w-[200px]' height="10" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="5" x2="200" y2="5" stroke="black" strokeWidth="2" />
            <polygon points="0,5 10,10 10,0" fill="black" />
          </svg>
        </div>
        <div className='relative w-60 h-40 pb-[1rem] px-[1rem] flex items-end border rounded-[14px] '>
          <h1 className='text-3xl sm:text-[1.1rem] z-10 md:text-xl lg:text-3xl font-[900]'>إرسال التذكرة</h1>
          <h1 className='absolute left-2 bottom-[-90px] z-1 text-[#F2F2F2] text-[200px] font-[900]'>3</h1>
        </div>
      </div>
      <div>
        <h1 className='text-2xl sm:text-3xl font-bold my-[1.5rem]'>1 - اختر الفئة</h1>
        <div className='flex flex-wrap sm:gap-0 gap-y-[1rem] justify-around items-center'>
          <div className='flex flex-col items-center justify-center'>
            <div className='cursor-pointer hover:bg-primary border rounded-full px-[2.2rem] p-[2rem] mb-[1rem]'>
              <FontAwesomeIcon className='text-[2.5rem]' icon={faClipboardList} />
            </div>
            <h1 className='text-[1rem] sm:text-xl font-bold text-center'>الطلبات</h1>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='cursor-pointer hover:bg-primary border rounded-full p-[2rem] mb-[1rem]'>
              <FontAwesomeIcon className='text-[2.5rem]' icon={faWallet} />
            </div>
            <h1 className='text-[1rem] sm:text-xl font-bold text-center'>المدفوعات</h1>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='cursor-pointer hover:bg-primary border rounded-full p-[2rem] mb-[1rem]'>
              <FontAwesomeIcon className='text-[2.5rem]' icon={faHeadset} />
            </div>
            <h1 className='text-[1rem] sm:text-xl font-bold text-center'>الخدمات</h1>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='cursor-pointer hover:bg-primary border rounded-full p-[2rem] mb-[1rem]'>
              <FontAwesomeIcon className='text-[2.5rem]' icon={faCoins} />
            </div>
            <h1 className='text-[1rem] sm:text-xl font-bold text-center'>النقاط</h1>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='cursor-pointer hover:bg-primary border rounded-full p-[2rem] mb-[1rem]'>
              <FontAwesomeIcon className='text-[2.5rem]' icon={faStore} />
            </div>
            <h1 className='text-[1rem] sm:text-xl font-bold text-center'>متجر إلكتروني</h1>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='cursor-pointer hover:bg-primary border rounded-full px-[2.2rem] p-[2rem] mb-[1rem]'>
              <FontAwesomeIcon className='text-[2.5rem]' icon={faClipboard} />
            </div>
            <h1 className='text-[1rem] sm:text-xl font-bold text-center'>خدمة أخرى</h1>
          </div>
          <div className='pt-[2rem] flex flex-col items-center justify-center'>
            <div className='cursor-pointer hover:bg-primary border rounded-full p-[2rem] mb-[1rem]'>
              <FontAwesomeIcon className='text-[2.5rem]' icon={faTriangleExclamation} />
            </div>
            <h1 className='text-[1rem] sm:text-xl font-bold text-center'>مشكل بالموقع <br />
              أو التصميم</h1>
          </div>
        </div>
        <h1 className='text-2xl sm:text-3xl font-bold my-[1.5rem]'>2 - اختر الموضوع</h1>
        <div className='flex flex-wrap gap-[1rem] justify-around mt-[1.5rem]'>
          <button className='btn w-52 text-xl sm:text-3xl h-auto btn-outline px-[3rem] btn-primary hover:btn-secondary '><span className='text-black'>تعويض</span></button>
          <button className='btn w-52 text-xl sm:text-3xl h-auto btn-outline px-[3rem] btn-primary hover:btn-secondary text-black'><span className='text-black'>إلغاء</span></button>
          <button className='btn w-52 text-xl sm:text-3xl h-auto btn-outline px-[3rem] btn-primary hover:btn-secondary text-black'><span className='text-black'>تسريع</span></button>
          <button className='btn w-52 text-xl sm:text-3xl h-auto btn-outline px-[3rem] btn-primary hover:btn-secondary text-black'><span className='text-black'>شيء اخر</span></button>
        </div>
        <h1 className='text-2xl sm:text-3xl font-bold '>3 - رقم الطلب:</h1>
        <input type="text" className='input input-bordered w-full my-[0.5rem]' />
        <h1 className='text-2xl sm:text-3xl font-bold '>رسالة</h1>
        <textarea
          className="textarea textarea-bordered textarea-lg w-full my-[0.5rem]"></textarea>
        <div className='mt-[1.5rem]'>
          <label className="bg-transparent hover:bg-secondary text-black font-bold py-2 px-4 rounded cursor-pointer">
          <FontAwesomeIcon icon={faPaperclip} /> رفع الملفات
            <input type="file" className="sr-only" />
          </label>
        </div>
        <div className='flex justify-center mt-[1.5rem]'>
          <button className='btn btn-primary h-auto text-xl sm:text-3xl sm:btn-lg'>إرسال التذكرة</button>
        </div>

      </div>

    </div>
  )
}

export default Support