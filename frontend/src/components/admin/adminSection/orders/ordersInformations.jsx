import { faArrowUpRightFromSquare, faCaretDown, faCheck, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import RowsPerPage from '../rowsPerPage';

function OrdersInformations() {
    const [active, setActive] = useState("الكل");
    const [search, setSearch] = useState({
        typeSearch: "معرف طلب"
    })
    return (
        <div>
            <div className='flex xl:flex-row flex-col-reverse gap-[1rem] justify-between'>
                <div>
                    <ul className='carousel rounded-box flex items-center gap-[0.1rem] text-[1.1rem]'>
                        <li onClick={() => setActive("الكل")} className={`carousel-item cursor-pointer hover:bg-[#F1F1F1] ${active == "الكل" ? "bg-[#F1F1F1]" : ""} px-[1rem] py-[0.5rem] rounded-[14px]`}>الكل</li>
                        <li onClick={() => setActive("انتظار")} className={`carousel-item cursor-pointer hover:bg-[#F1F1F1] ${active == "انتظار" ? "bg-[#F1F1F1]" : ""} px-[1rem] py-[0.5rem] rounded-[14px]`}> انتظار</li>
                        <li onClick={() => setActive("قيد العمل")} className={`carousel-item cursor-pointer hover:bg-[#F1F1F1] ${active == "قيد العمل" ? "bg-[#F1F1F1]" : ""} px-[1rem] py-[0.5rem] rounded-[14px]`}>قيد العمل</li>
                        <li onClick={() => setActive("مقبول")} className={`carousel-item cursor-pointer hover:bg-[#F1F1F1] ${active == "مقبول" ? "bg-[#F1F1F1]" : ""} px-[1rem] py-[0.5rem] rounded-[14px]`}>مقبول</li>
                        <li onClick={() => setActive(" مرفوض")} className={`carousel-item cursor-pointer hover:bg-[#F1F1F1] ${active == " مرفوض" ? "bg-[#F1F1F1]" : ""} px-[1rem] py-[0.5rem] rounded-[14px]`}> مرفوض</li>
                        <li onClick={() => setActive("ملغي")} className={`carousel-item cursor-pointer hover:bg-[#F1F1F1] ${active == "ملغي" ? "bg-[#F1F1F1]" : ""} px-[1rem] py-[0.5rem] rounded-[14px]`}> ملغي</li>
                        <li onClick={() => setActive(" اعتراض")} className={`carousel-item cursor-pointer hover:bg-[#F1F1F1] ${active == " اعتراض" ? "bg-[#F1F1F1]" : ""} px-[1rem] py-[0.5rem] rounded-[14px]`}> اعتراض</li>
                    </ul>
                </div>
                <div className="sm:join space-y-2 sm:space-y-0">
                    <div>
                        <div>
                            <input className="input bg-black sm:w-auto w-full input-bordered join-item" placeholder={search.typeSearch} />
                        </div>
                    </div>
                    <div className="indicator sm:w-auto w-full">
                        <button className="btn join-item sm:w-auto w-full"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
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
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='text-[1rem]'>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>رقم الطلب</th>
                            <th>مقدم الخدمة</th>
                            <th>المستخدم</th>
                            <th>المنتج</th>
                            <th>السعر الاجمالي</th>
                            <th>الكلفة </th>
                            <th>الكمية</th>
                            <th>المنفذ</th>
                            <th>البيانات</th>
                            <th>رقم الطلب</th>
                            <th>التاريخ</th>
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
                                Zemlak, Daniel and Leannon
                                <br />
                                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                            </td>
                            <td>Purple</td>
                            <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
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
                                Carroll Group
                                <br />
                                <span className="badge badge-ghost badge-sm">Tax Accountant</span>
                            </td>
                            <td>Red</td>
                            <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
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
                                Rowe-Schoen
                                <br />
                                <span className="badge badge-ghost badge-sm">Office Assistant I</span>
                            </td>
                            <td>Crimson</td>
                            <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                        </tr>
                        {/* row 4 */}
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
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
                                Wyman-Ledner
                                <br />
                                <span className="badge badge-ghost badge-sm">Community Outreach Specialist</span>
                            </td>
                            <td>Indigo</td>
                            <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                        </tr>
                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <RowsPerPage />
        </div>
    )
}

export default OrdersInformations