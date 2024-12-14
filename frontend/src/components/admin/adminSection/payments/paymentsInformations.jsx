import { faCircleCheck, faMagnifyingGlass, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import RowsPerPage from '../rowsPerPage';

function PaymentsInformations() {
  const [active, setActive] = useState("الكل");
  return (
    <div>
      <div className='flex sm:flex-row flex-col gap-[1rem] justify-between'>
        <div>
          <ul className='carousel rounded-box flex items-center gap-[0.1rem] text-[1.1rem]'>
            <li onClick={() => setActive("مقبول")} className={`carousel-item cursor-pointer hover:bg-[#F1F1F1] ${active == "مقبول" ? "bg-[#F1F1F1]" : ""} px-[1rem] py-[0.5rem] rounded-[14px]`}>مقبول</li>
            <li onClick={() => setActive(" مرفوض")} className={`carousel-item cursor-pointer hover:bg-[#F1F1F1] ${active == " مرفوض" ? "bg-[#F1F1F1]" : ""} px-[1rem] py-[0.5rem] rounded-[14px]`}> مرفوض</li>
            <li onClick={() => setActive("ملغي")} className={`carousel-item cursor-pointer hover:bg-[#F1F1F1] ${active == "ملغي" ? "bg-[#F1F1F1]" : ""} px-[1rem] py-[0.5rem] rounded-[14px]`}> ملغي</li>
          </ul>
        </div>
        <div className="join">
          <div>
            <div>
              <input className="input bg-black text-white input-bordered join-item" placeholder="يبحث" />
            </div>
          </div>
          <div className="indicator">
            <button className="btn join-item"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
          </div>
        </div>
      </div>
      <div className="flex sm:flex-row flex-col gap-[0.2rem] justify-around items-center mt-[1rem]">
        {/* Apply focus class directly or use a custom style */}
        <input
          type="date"
          placeholder="Type here"
          className="input input-bordered input-md sm:w-1/2 w-full" />
        <span className="mx-4 text-gray-500">الى</span>
        <input
          type="date"
          placeholder="Type here"
          className="input input-bordered input-md sm:w-1/2 w-full" />
        <button className='btn btn-primary w-full sm:w-auto'>فلترة</button>
      </div>
      <div className="overflow-x-auto w-full my-[1rem]">
        <table className="table bg-white xl:w-full w-[1900px]">
          {/* head */}
          <thead>
            <tr className='text-[1rem]'>
              <th>#</th>
              <th>اسم الزبون</th>
              <th>القيمة</th>
              <th>القيمة الصافية</th>
              <th>القيمة المرسلة</th>
              <th>طريقة الدفع</th>
              <th>الحالة</th>
              <th>خيارات</th>
              <th>التاريخ</th>
            </tr>
          </thead>
          <tbody className='text-[1rem]'>
            <tr className='hover:bg-base-200'>
              <th>#123</th>
              <td>mohammed</td>
              <td className='font-bold'>$ 400</td>
              <td className='font-bold'>$ 400.00</td>
              <td className='font-bold'>$ 400.00</td>
              <td>Paypal</td>
              <td><FontAwesomeIcon icon={faCircleCheck} className='text-success' /></td>
              <td></td>
              <td>2024-12-11 13:37:53</td>
            </tr>
          </tbody>
        </table>
      </div>
      <RowsPerPage />
    </div>
  )
}

export default PaymentsInformations