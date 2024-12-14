import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import RowsPerPage from '../rowsPerPage'

function AvailableInStock() {
  return (
    <div>
    <div className='flex sm:flex-row flex-col gap-[1rem] justify-end'>
      <div className="join">
        <div>
          <div>
            <input className="input bg-black text-white input-bordered join-item" placeholder="أبحث عن اعضاء"
              // value={query}
              onChange={(e) => {
                /* setStartTyping(true);
                 setQuery(e.target.value)*/
              }} />
          </div>
        </div>
        <div className="indicator">
          <button className="btn join-item"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </div>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead className='text-[1.1rem]'>
          <tr>
            <th></th>
            <th>البيانات</th>
            <th>متبقي للبيع</th>
            <th>تاريخ الانشاء</th>
            <th>خيارات</th>
            <th>ملاحظة </th>
            <th>كلفة</th>
          </tr>
        </thead>
        <tbody className='text-[1.1rem]'>
          {/* row 1 */}
          <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
          </tr>
          {/* row 2 */}
          <tr>
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>
          {/* row 3 */}
          <tr>
            <th>3</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Red</td>
          </tr>
        </tbody>
      </table>
    </div>
    <RowsPerPage />
  </div>
  )
}

export default AvailableInStock