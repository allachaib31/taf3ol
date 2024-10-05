import React from 'react'
import logo from "../../../images/Logo.png";
function Services() {
  return (
    <div className='relative z-50'>
      <div className='flex sm:flex-row flex-col gap-5 sm:gap-0 justify-between'>
        <select className="select select-bordered text-[1rem] font-bold bg-black text-white w-full sm:max-w-xs">
          <option selected disabled>فلتر</option>
          <option value="">الكل</option>
          <option value="">المفضلة</option>
          <option value="">الأكثر مبيعًا</option>
        </select>
        <div className="join ">
          <div>
            <div>
              <input className="input input-bordered join-item" placeholder="البحث" />
            </div>
          </div>
          <div className="indicator">
            <button className="btn btn-primary join-item font-bold text-[1rem]">البحث</button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto mt-[2rem]">
        <table className="table table-zebra">
          {/* head */}
          <thead className='bg-primary text-black'>
            <tr>
              <th><input type="checkbox" className="checkbox" /></th>
              <th>الرقم </th>
              <th>الاسم</th>
              <th>السعر لكل 1000</th>
              <th>الحد الادنى</th>
              <th>الحد الاقصى</th>
              <th>السرعة التقريبية</th>
              <th>وصف الخدمة</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th><input type="checkbox" className="checkbox" /></th>
              <td>1</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><button onClick={() => document.getElementById('serviceDetail').showModal()} className='btn btn-primary'>تفاصيل</button></td>
            </tr>
            {/* row 2 */}
            <tr>
              <th><input type="checkbox" className="checkbox" /></th>
              <td>2</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><button onClick={() => document.getElementById('serviceDetail').showModal()} className='btn btn-primary'>تفاصيل</button></td>
            </tr>
            {/* row 3 */}
            <tr>
              <th><input type="checkbox" className="checkbox" /></th>
              <td>3</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><button onClick={() => document.getElementById('serviceDetail').showModal()} className='btn btn-primary'>تفاصيل</button></td>
            </tr>
            <tr>
              <th><input type="checkbox" className="checkbox" /></th>
              <td>4</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><button onClick={() => document.getElementById('serviceDetail').showModal()} className='btn btn-primary'>تفاصيل</button></td>
            </tr>
            <tr>
              <th><input type="checkbox" className="checkbox" /></th>
              <td>5</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><button onClick={() => document.getElementById('serviceDetail').showModal()} className='btn btn-primary'>تفاصيل</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <dialog id="serviceDetail" className="modal">
        <div className="modal-box max-w-[70rem] p-0">
          <div className='bg-black flex justify-center py-[1rem]'>
            <img src={logo} className='w-[107px] sm:w-[168px] sm:h-auto h-[50px]' alt="" />
          </div>
          <div className='p-[1rem]'>
            <p className='text-center'>مشاهدات فيديو انستقرام [خدمة جديدة - سيرفر #1] [تعمل على جميع انواع الفيديوهات]</p>
            <div className='mt-[1rem]'>
              <div className='flex flex-wrap gap-2 sm:gap-0 justify-center sm:justify-around'>
                <div>
                  <div className='w-32 sm:w-44 md:w-56 text-center bg-black text-primary p-[1rem] text-[0.8rem] sm:text-xl md:text-2xl font-bold mb-[1rem]'>
                    الوقت التقريبي
                  </div>
                  2 دقيقة
                </div>
                <div>
                  <div className='w-32 sm:w-44 md:w-56 text-center bg-black text-primary p-[1rem] text-[0.8rem] sm:text-xl md:text-2xl font-bold mb-[1rem]'>
                  السرعة
                  </div>
                  
                </div>
                <div>
                  <div className='w-32 sm:w-44 md:w-56 text-center bg-black text-primary p-[1rem] text-[0.8rem] sm:text-xl md:text-2xl font-bold mb-[1rem]'>
                  وقت البدا
                  </div>
                  
                </div>
              </div>
              <div className='mt-[1rem] flex flex-wrap gap-2 sm:gap-0 justify-center sm:justify-around'>
                <div>
                  <div className='w-32 sm:w-44 md:w-56 text-center bg-black text-primary p-[1rem] text-[0.8rem] sm:text-xl md:text-2xl font-bold mb-[1rem]'>
                  الضمان والتعويض
                  </div>
                  
                </div>
                <div>
                  <div className='w-32 sm:w-44 md:w-56 text-center bg-black text-primary p-[1rem] text-[0.8rem] sm:text-xl md:text-2xl font-bold mb-[1rem]'>
                  الجودة
                  </div>
                  
                </div>
                <div>
                  <div className='w-32 sm:w-44 md:w-56 text-center bg-black text-primary p-[1rem] text-[0.8rem] sm:text-xl md:text-2xl font-bold mb-[1rem]'>
                  وصف الخدمة
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="modal-action m-[1rem]">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">اغلاق</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Services