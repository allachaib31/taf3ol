import React from 'react'

function Orders() {
  return (
    <div className='relative z-50'>
      <div className='flex sm:flex-row flex-col gap-5 sm:gap-0 justify-between'>
        <select className="select select-bordered text-[1rem] font-bold bg-black text-white w-full sm:max-w-xs">
          <option selected disabled>اختيار حالة الطلب</option>
          <option value="">الكل</option>
          <option value="">قيد الانتظار</option>
          <option value="">قيد التنفيذ</option>
          <option value="">مكتمل</option>
          <option value="">مكتمل جزئيًا</option>
          <option value="">قيد المعالجة</option>
          <option value="">ملغى</option>
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
              <th>رقم الطلب</th>
              <th>تاريخ الطلب</th>
              <th>الرابط</th>
              <th>الكمية</th>
              <th>الثمن</th>
              <th>عدد البدا</th>
              <th>التقييم</th>
              <th>الخدمة</th>
              <th>العدد المتبقي</th>
              <th>حالة الطلب</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>4</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>5</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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

export default Orders