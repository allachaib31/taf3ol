import React, { useState } from 'react';
import ethereumIcon from "../../../images/ethereumIcon.png";
import stripeIcon from "../../../images/stripeIcon.png"
import dashIcon from "../../../images/dashIcon.png";
import usdtIcon from "../../../images/usdtIcon.png";
import paytmIcon from "../../../images/paytmIcon.png";
import bankIcon from "../../../images/bankIcon.png";
import btcIcon from "../../../images/btcIcon.png";
import applePayIcon from "../../../images/applePayIcon.png";
import googlePayIcon from "../../../images/googlePayIcon.png";
import paypalIcon from "../../../images/paypalIcon.png";
import skrillIcon from "../../../images/skrillIcon.png";
import carteCreditIcon from "../../../images/carteCreditIcon.png";
function AddMoney() {
  const [activeTab, setActiveTab] = useState('addMoney');
  return (
    <div className="relative z-50 ">
      <div className="flex sm:flex-row flex-col sm:gap-0 gap-[1rem] sm:mb-0 mb-[1rem]">
        <button
          className={`py-2 px-4 text-lg font-bold sm:rounded-t-[10px] ${activeTab === 'addMoney' ? 'bg-primary text-black border' : 'bg-black text-white'
            }`}
          onClick={() => setActiveTab('addMoney')}
        >
          إضافة رصيد
        </button>
        <button
          className={`py-2 px-4 text-lg font-bold sm:rounded-t-[10px] ${activeTab === 'payBook' ? 'bg-primary text-black border' : 'bg-black text-white'
            }`}
          onClick={() => setActiveTab('payBook')}
        >
          سجل المدفوعات
        </button>
      </div>
      <div className="border-2 p-[1rem]">
        {
          activeTab == "addMoney" && (
            <div className="grid grid-cols-1">
              <div className='flex flex-col gap-[1rem]'>
                <h1>طريقة الدفع</h1>
                <select className='select select-bordered'>
                  <option selected disabled>اختر طريقة الدفع</option>
                </select>
                <h1>التعليمات</h1>
                <div className='bg-[#f1f1f1] py-[2rem] rounded-[14px]'>
                  <h1 className='text-center'>يرجى التواصل معنا على صفحة :<span className='underline'>الدعم الفني</span>, لتفعيل الدفع عبر البطاقات </h1>
                </div>
              </div>

            </div>
          )
        }
        {
          activeTab == "payBook" && (
            <div className="grid grid-cols-1">
              <div className="overflow-x-auto mt-[2rem]">
                <table className="table table-zebra">
                  <thead className='bg-primary text-black'>
                    <tr>
                      <th><input type="checkbox" className="checkbox" /></th>
                      <th>رقم </th>
                      <th>تاريخ إضافة رصيد</th>
                      <th>الرصيد</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th><input type="checkbox" className="checkbox" /></th>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th><input type="checkbox" className="checkbox" /></th>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th><input type="checkbox" className="checkbox" /></th>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th><input type="checkbox" className="checkbox" /></th>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          )
        }
      </div>
      <div className='container mx-auto'>
        <h1 className='font-bold text-3xl my-[1.3rem]'>طرق الدفع</h1>
        <div className='flex justify-center items-center flex-wrap gap-[1.5rem] xl:gap-x-[7rem] gap-y-[2rem]'>
          <div className='border rounded-full flex justify-center items-center p-[1.3rem]'>
            <img src={ethereumIcon} alt="" className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]' />
          </div>
          <div className='border rounded-full flex justify-center items-center p-[1.3rem]'>
            <img src={stripeIcon} alt="" className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]' />
          </div>
          <div className='border rounded-full flex justify-center items-center p-[1.3rem]'>
            <img src={dashIcon} alt="" className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]' />
          </div>
          <div className='border rounded-full flex justify-center items-center p-[1.3rem]'>
            <img src={usdtIcon} alt="" className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]' />
          </div>
          <div className='border rounded-full flex justify-center items-center p-[1.3rem]'>
            <img src={paytmIcon} alt="" className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]' />
          </div>
          <div className='border rounded-full flex justify-center items-center p-[1.3rem]'>
            <img src={bankIcon} alt="" className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]' />
          </div>
          <div className='border rounded-full flex justify-center items-center p-[1.3rem]'>
            <img src={btcIcon} alt="" className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]' />
          </div>
          <div className='border rounded-full flex justify-center items-center p-[1.3rem]'>
            <img src={applePayIcon} alt="" className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]' />
          </div>
          <div className='border rounded-full flex justify-center items-center p-[1.3rem]'>
            <img src={googlePayIcon} alt="" className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]' />
          </div>
          <div className='border rounded-full flex justify-center items-center p-[1.3rem]'>
            <img src={paypalIcon} alt="" className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]' />
          </div>
          <div className='border rounded-full flex justify-center items-center p-[1.3rem]'>
            <img src={skrillIcon} alt="" className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]' />
          </div>
          <div className='border rounded-full flex justify-center items-center p-[1.3rem]'>
            <img src={carteCreditIcon} alt="" className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px]' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddMoney