import { faCaretDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { AddAdmin } from './modal/index'

function AdminsInformations() {
  return (
    <div>
      <div className='flex sm:flex-row flex-col gap-[1rem] justify-between'>
        <button className='btn btn-primary shadow-sm
         shadow-gray-400' onClick={()=>document.getElementById('addAdmin').showModal()}>إضافة مسؤول</button>
        <div className="join">
          <div>
            <div>
              <input className="input bg-black text-white input-bordered join-item" placeholder="أبحث عن اعضاء" />
            </div>
          </div>
          <div className="indicator">
            <button className="btn join-item"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto mt-[1rem]">
        <table className="table bg-white xl:w-full w-[1900px]">
          {/* head */}
          <thead>
            <tr className='text-[1rem]'>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>المعرف <FontAwesomeIcon icon={faCaretDown} /></th>
              <th>الاسم</th>
              <th>اسم المستخدم</th>
              <th>البريد الالكتروني</th>
              <th>تم إنشاؤه</th>
              <th>اخر تسجيل دخول</th>
              <th>تم إنشاؤه بواسطة</th>
            </tr>
          </thead>
          <tbody className='text-[1rem]'>
            {/* row 1 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>1</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td>
                allachaib31
              </td>
              <td>allachaib54@gmail.com</td>
              <td>2024-07-12 22:36:02</td>
              <td>2024-08-21 08:07:20</td>
              <td>allachaib31</td>
              <th>
                <select className='input input-bordered'>
                  <option selected disabled>الأفعال</option>
                  <option value="">تعديل المشرف</option>
                  <option value="">تعيين كلمة المرور</option>
                  <option value="">سجل تسجيلات الدخول</option>
                  <option value="">تعليق المشرف</option>
                </select>
              </th>
            </tr>
            {/* row 2 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>2</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                        alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Brice Swyre</div>
                    <div className="text-sm opacity-50">China</div>
                  </div>
                </div>
              </td>
              <td>
                allachaib31
              </td>
              <td>allachaib54@gmail.com</td>
              <td>2024-07-12 22:36:02</td>
              <td>2024-08-21 08:07:20</td>
              <td>allachaib31</td>
              <th>
              <select className='input input-bordered'>
                  <option selected disabled>الأفعال</option>
                  <option value="">تعديل المشرف</option>
                  <option value="">تعيين كلمة المرور</option>
                  <option value="">سجل تسجيلات الدخول</option>
                  <option value="">تعليق المشرف</option>
                </select>              </th>
            </tr>
            {/* row 3 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>3</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                        alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Marjy Ferencz</div>
                    <div className="text-sm opacity-50">Russia</div>
                  </div>
                </div>
              </td>
              <td>
                allachaib31
              </td>
              <td>allachaib54@gmail.com</td>
              <td>2024-07-12 22:36:02</td>
              <td>2024-08-21 08:07:20</td>
              <td>allachaib31</td>
              <th>
                                <select className='input input-bordered'>
                  <option selected disabled>الأفعال</option>
                  <option value="">تعديل المشرف</option>
                  <option value="">تعيين كلمة المرور</option>
                  <option value="">سجل تسجيلات الدخول</option>
                  <option value="">تعليق المشرف</option>
                </select>
              </th>
            </tr>
            {/* row 4 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>4</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                        alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Yancy Tear</div>
                    <div className="text-sm opacity-50">Brazil</div>
                  </div>
                </div>
              </td>
              <td>
                allachaib31
              </td>
              <td>allachaib54@gmail.com</td>
              <td>2024-07-12 22:36:02</td>
              <td>2024-08-21 08:07:20</td>
              <td>allachaib31</td>
              <th>
                                <select className='input input-bordered'>
                  <option selected disabled>الأفعال</option>
                  <option value="">تعديل المشرف</option>
                  <option value="">تعيين كلمة المرور</option>
                  <option value="">سجل تسجيلات الدخول</option>
                  <option value="">تعليق المشرف</option>
                </select>
              </th>
            </tr>
          </tbody>

        </table>
      </div>
      <AddAdmin />
    </div>
  )
}

export default AdminsInformations