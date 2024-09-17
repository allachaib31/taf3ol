import { faMagnifyingGlass, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function PaymentsInformations() {
  return (
    <div>
      <div className='flex sm:flex-row flex-col gap-[1rem] justify-between'>
        <button className='btn btn-primary shadow-sm
       shadow-gray-400' onClick={() => document.getElementById('addUser').showModal()}>إضافة المدفوعات</button>
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
      <div className="overflow-x-auto w-full mt-[1rem]">
        <table className="table bg-white xl:w-full w-[1900px]">
          {/* head */}
          <thead>
            <tr className='text-[1rem]'>
              <th>المعرف <FontAwesomeIcon icon={faSortDown} /></th>
              <th>المستخدم</th>
              <th>رصيد المالي</th>
              <th>المبلغ</th>
              <th>
                <details className='relative'>
                  <summary>طرق الدفع</summary>
                  <div className='overflow-x-auto absolute bg-white shadow-md w-[200px] flex flex-col'>
                    <label className="input input-bordered flex items-center gap-2">
                      <input type="text" className="grow" placeholder="يبحث" />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                          fillRule="evenodd"
                          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                          clipRule="evenodd" />
                      </svg>
                    </label>

                    <ul className='flex text-black flex-col w-[200px] text-wrap'>
                      <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>بايير (4)</li>
                    </ul>
                  </div>
                </details>
              </th>
              <th>
                <details className='relative'>
                  <summary>الحالة</summary>
                  <ul className='absolute flex bg-white shadow-md text-black flex-col w-[200px] text-wrap'>
                    <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>الكل (4)</li>
                    <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>في انتظار (0)</li>
                    <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>مكتمل (0)</li>
                    <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>قيد الانتظار (0)</li>
                    <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>فشل (0)</li>
                    <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>منتهي الصلاحية (0)</li>
                    <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>يمسك (0)</li>
                    <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>غير مدفوع الأجر (0)</li>
                  </ul>
                </details>
              </th>
              <th>
                <details className='relative'>
                  <summary>خطر الاحتيال</summary>
                  <ul className='absolute flex bg-white shadow-md text-black flex-col w-[200px] text-wrap'>
                    <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>الكل (4)</li>
                    <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>لا أحد (0)</li>
                    <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>مجهول (0)</li>
                    <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>عالي (0)</li>
                    <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>شديد الأهمية (0)</li>
                  </ul>
                </details>
              </th>
              <th>مذكرة</th>
              <th>تم إنشاؤه</th>
              <th>تم التحديث</th>
              <th>الوضع</th>
              <th></th>
            </tr>
          </thead>
          <tbody className='text-[1rem]'>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>rehawi.7833</td>
              <td>0.00</td>
              <td>10.00</td>
              <td>payeer</td>
              <td>مكتمل</td>
              <td></td>
              <td></td>
              <td>2024-07-12 22:59:02</td>
              <td>2024-07-12 22:59:02</td>
              <td>Manual</td>
              <td>
                <details className='relative'>
                  <summary className='btn'><FontAwesomeIcon icon={faSortDown} /></summary>
                  <ul className='absolute bg-white shadow-md w-32'>
                    <li className='p-[1rem] hover:bg-[#F1F1F1] cursor-pointer'>تعديل</li>
                  </ul>
                </details>
              </td>
            </tr>
            <tr>
              <th>1</th>
              <td>rehawi.7833</td>
              <td>0.00</td>
              <td>10.00</td>
              <td>payeer</td>
              <td>مكتمل</td>
              <td></td>
              <td></td>
              <td>2024-07-12 22:59:02</td>
              <td>2024-07-12 22:59:02</td>
              <td>Manual</td>
              <td><button className='btn'><FontAwesomeIcon icon={faSortDown} /></button></td>
            </tr>
            <tr>
              <th>1</th>
              <td>rehawi.7833</td>
              <td>0.00</td>
              <td>10.00</td>
              <td>payeer</td>
              <td>مكتمل</td>
              <td></td>
              <td></td>
              <td>2024-07-12 22:59:02</td>
              <td>2024-07-12 22:59:02</td>
              <td>Manual</td>
              <td><button className='btn'><FontAwesomeIcon icon={faSortDown} /></button></td>
            </tr>
            <tr>
              <th>1</th>
              <td>rehawi.7833</td>
              <td>0.00</td>
              <td>10.00</td>
              <td>payeer</td>
              <td>مكتمل</td>
              <td></td>
              <td></td>
              <td>2024-07-12 22:59:02</td>
              <td>2024-07-12 22:59:02</td>
              <td>Manual</td>
              <td><button className='btn'><FontAwesomeIcon icon={faSortDown} /></button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PaymentsInformations