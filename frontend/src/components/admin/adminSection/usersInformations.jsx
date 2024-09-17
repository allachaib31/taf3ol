import { faCaretDown, faCheck, faMagnifyingGlass, faSort } from '@fortawesome/free-solid-svg-icons'
import { faRectangleXmark, faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import { AddUser } from './modal'

function UsersInformations() {
    return (
        <div>
            <div className='flex sm:flex-row flex-col gap-[1rem] justify-between'>
                <button className='btn btn-primary shadow-sm
       shadow-gray-400' onClick={() => document.getElementById('addUser').showModal()}>أضف مستخدم</button>
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
                            <th></th>
                            <th>الرصيد المالي <FontAwesomeIcon icon={faSort} /></th>
                            <th>الأموال المنفقة <FontAwesomeIcon icon={faSort} /></th>
                            <th>
                                <details className='relative'>
                                    <summary>الحالات</summary>
                                    <ul className='absolute bg-white shadow-md w-[150px] flex flex-col'>
                                        <li className='hover:bg-[#F1F1F1] flex justify-between p-[0.5rem] cursor-pointer'>نشيط <FontAwesomeIcon icon={faCheck} /></li>
                                        <li className='hover:bg-[#F1F1F1] flex justify-between p-[0.5rem] cursor-pointer'>معلق <FontAwesomeIcon icon={faCheck} /></li>
                                        <li className='hover:bg-[#F1F1F1] flex justify-between p-[0.5rem] cursor-pointer'>غير مؤكد <FontAwesomeIcon icon={faCheck} /></li>
                                        <li className='hover:bg-[#F1F1F1] flex justify-between p-[0.5rem] cursor-pointer'>خبيث <FontAwesomeIcon icon={faCheck} /></li>
                                    </ul>
                                </details>
                            </th>
                            <th>تم إنشاؤه <FontAwesomeIcon icon={faSort} /></th>
                            <th>اخر تسجيل دخول <FontAwesomeIcon icon={faSort} /></th>
                            <th>تخفيض <FontAwesomeIcon icon={faSort} /></th>
                            <th>تم إنشاؤه بواسطة</th>
                            <th></th>
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
                            <td>allachaib54@gmail.com <div className="tooltip" data-tip="بريد إلكتروني غير مؤكد. لن يتلقى المستخدم إشعارًا عبر البريد الإلكتروني">
                                <FontAwesomeIcon icon={faRectangleXmark} />
                            </div></td>
                            <td>
                                <div className="tooltip" data-tip="0543264321">
                                    <a href='https://api.whatsapp.com/send/?phone=0543264321&text&type=phone_number&app_absent=0' target='_blank'><FontAwesomeIcon icon={faWhatsapp} /></a>
                                </div>
                            </td>
                            <td>100</td>
                            <td>50</td>
                            <td>نشيط</td>
                            <td>2024-07-12 22:36:02</td>
                            <td>2024-08-21 08:07:20</td>
                            <td>
                                <button className='btn w-[121.86px]' onClick={() => document.getElementById('discountModal').showModal()}>تخفيض <span className='bg-primary text-black p-[0.5rem] rounded-full'>10%</span></button>
                            </td>
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
                            <td>allachaib54@gmail.com <div className="tooltip" data-tip="بريد إلكتروني مؤكد. سوف يتلقى المستخدم إشعارًا عبر البريد الإلكتروني">
                                <FontAwesomeIcon icon={faSquareCheck} />
                            </div></td>
                            <td>
                                <div className="tooltip" data-tip="0543264321">
                                    <a href='https://api.whatsapp.com/send/?phone=0543264321&text&type=phone_number&app_absent=0' target='_blank'><FontAwesomeIcon icon={faWhatsapp} /></a>
                                </div>
                            </td>
                            <td>100</td>
                            <td>50</td>
                            <td>نشيط</td>
                            <td>2024-07-12 22:36:02</td>
                            <td>2024-08-21 08:07:20</td>
                            <td>
                                <button className='btn w-[121.86px]' onClick={() => document.getElementById('discountModal').showModal()}>إضافة تخفيض</button>
                            </td>
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
                            <td>
                                <div className="tooltip" data-tip="0543264321">
                                    <a href='https://api.whatsapp.com/send/?phone=0543264321&text&type=phone_number&app_absent=0' target='_blank'><FontAwesomeIcon icon={faWhatsapp} /></a>
                                </div>
                            </td>
                            <td>100</td>
                            <td>50</td>
                            <td>نشيط</td>
                            <td>2024-07-12 22:36:02</td>
                            <td>2024-08-21 08:07:20</td>
                            <td>
                                <button className='btn w-[121.86px]' onClick={() => document.getElementById('discountModal').showModal()}>إضافة تخفيض</button>
                            </td>
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
                            <td>
                                <div className="tooltip" data-tip="0543264321">
                                    <a href='https://api.whatsapp.com/send/?phone=0543264321&text&type=phone_number&app_absent=0' target='_blank'><FontAwesomeIcon icon={faWhatsapp} /></a>
                                </div>
                            </td>
                            <td>100</td>
                            <td>50</td>
                            <td>نشيط</td>
                            <td>2024-07-12 22:36:02</td>
                            <td>2024-08-21 08:07:20</td>
                            <td>
                                <button className='btn w-[121.86px]' onClick={() => document.getElementById('discountModal').showModal()}>إضافة تخفيض</button>
                            </td>
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
            <dialog id="discountModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">إضافة تخفيض (المعرف: 2)</h3>
                    <hr />
                    <p className="py-2">تخفيض,%</p>
                    <input type="text" placeholder="تخفيض,%" className="input input-bordered w-full" />
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn ml-1">Close</button>
                            <button className='btn btn-primary'>حفظ التغييرات</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <AddUser />
        </div>
    )
}

export default UsersInformations