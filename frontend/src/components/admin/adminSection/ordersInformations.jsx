import { faArrowUpRightFromSquare, faCaretDown, faCheck, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'

function OrdersInformations() {
    const [active, setActive] = useState("الكل");
    const [search, setSearch] = useState({
        typeSearch: "معرف طلب"
    })
    return (
        <div>
            <div className='flex xl:flex-row flex-col gap-[1rem] justify-between'>
                <div>
                    <ul className='carousel rounded-box flex items-center gap-[0.1rem] text-[1.1rem]'>
                        <li onClick={() => setActive("الكل")} className={`carousel-item cursor-pointer hover:bg-[#F1F1F1] ${active == "الكل" ? "bg-[#F1F1F1]" : ""} px-[1rem] py-[0.5rem] rounded-[14px]`}>الكل</li>
                        <li onClick={() => setActive("في انتظار")} className={`carousel-item cursor-pointer hover:bg-[#F1F1F1] ${active == "في انتظار" ? "bg-[#F1F1F1]" : ""} px-[1rem] py-[0.5rem] rounded-[14px]`}>في انتظار</li>
                        <li onClick={() => setActive("قيد الانتظار")} className={`carousel-item cursor-pointer hover:bg-[#F1F1F1] ${active == "قيد الانتظار" ? "bg-[#F1F1F1]" : ""} px-[1rem] py-[0.5rem] rounded-[14px]`}>قيد الانتظار</li>
                        <li onClick={() => setActive("في المعالجة")} className={`carousel-item cursor-pointer hover:bg-[#F1F1F1] ${active == "في المعالجة" ? "bg-[#F1F1F1]" : ""} px-[1rem] py-[0.5rem] rounded-[14px]`}>في المعالجة</li>
                        <li onClick={() => setActive("مكتمل")} className={`carousel-item cursor-pointer hover:bg-[#F1F1F1] ${active == "مكتمل" ? "bg-[#F1F1F1]" : ""} px-[1rem] py-[0.5rem] rounded-[14px]`}>مكتمل</li>
                        <li onClick={() => setActive("تم الغاء")} className={`carousel-item cursor-pointer hover:bg-[#F1F1F1] ${active == "تم الغاء" ? "bg-[#F1F1F1]" : ""} px-[1rem] py-[0.5rem] rounded-[14px]`}>تم الغاء</li>
                        <li onClick={() => setActive("يعالج")} className={`carousel-item cursor-pointer hover:bg-[#F1F1F1] ${active == "يعالج" ? "bg-[#F1F1F1]" : ""} px-[1rem] py-[0.5rem] rounded-[14px]`}>يعالج</li>
                        <li onClick={() => setActive("يفشل")} className={`carousel-item cursor-pointer hover:bg-[#F1F1F1] ${active == "يفشل" ? "bg-[#F1F1F1]" : ""} px-[1rem] py-[0.5rem] rounded-[14px]`}>يفشل</li>
                        <li onClick={() => setActive("خطأ")} className={`carousel-item cursor-pointer hover:bg-[#F1F1F1] ${active == "خطأ" ? "bg-[#F1F1F1]" : ""} px-[1rem] py-[0.5rem] rounded-[14px]`}>خطأ</li>
                    </ul>
                </div>
                <div className="sm:join space-y-2 sm:space-y-0">
                    <div>
                        <div>
                            <input className="input bg-black sm:w-auto w-full input-bordered join-item" placeholder={search.typeSearch} />
                        </div>
                    </div>
                    <select onChange={(event) => {
                        return setSearch((prev) => {
                            return {
                                ...prev,
                                typeSearch: event.target.value,
                            };
                        })
                    }} className="select bg-black text-white sm:w-auto w-full select-bordered join-item">
                        <option value="معرف طلب" selected>معرف الطلب</option>
                        <option value="الربط">الربط</option>
                        <option value="اسم المستخدم">اسم المستخدم</option>
                        <option value="معرف الخدمة">معرف الخدمة</option>
                        <option value="معرف خارجي">معرف خارجي</option>
                        <option value="مزود">مزود</option>
                        <option value="عنوان IP">عنوان IP</option>
                    </select>
                    <div className="indicator sm:w-auto w-full">
                        <button className="btn btn-primary join-item sm:w-auto w-full"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto mt-[1rem]">
                <table className="table bg-white xl:w-full w-[1900px]">
                    <thead className='text-[1rem]'>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>المعرف <FontAwesomeIcon icon={faCaretDown} /></th>
                            <th>المستخدم</th>
                            <th>تكلفة</th>
                            <th>الربط</th>
                            <th>بدء العد</th>
                            <th>الكمية</th>
                            <th className='w-[24%]'>
                                <details className='relative'>
                                    <summary>الخدمات</summary>
                                    <div className='overflow-x-auto absolute bg-white shadow-md w-[400px] flex flex-col'>
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
                                        <ul className='flex text-black flex-col w-[380px] h-[200px] text-wrap'>
                                            <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>🔴 YouTube Views [NEW - Recommended] [Country/Quality: REAL Arab Mix] [Start time: 0-12H] [Speed: Up to 1-5k/Day] [Refill: 60 Days]</li>
                                            <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>🔴 YouTube Views [NEW - Recommended] [Country/Quality: REAL Arab Mix] [Start time: 0-12H] [Speed: Up to 1-5k/Day] [Refill: 60 Days]</li>
                                            <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>🔴 YouTube Views [NEW - Recommended] [Country/Quality: REAL Arab Mix] [Start time: 0-12H] [Speed: Up to 1-5k/Day] [Refill: 60 Days]</li>
                                            <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>🔴 YouTube Views [NEW - Recommended] [Country/Quality: REAL Arab Mix] [Start time: 0-12H] [Speed: Up to 1-5k/Day] [Refill: 60 Days]</li>
                                            <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>🔴 YouTube Views [NEW - Recommended] [Country/Quality: REAL Arab Mix] [Start time: 0-12H] [Speed: Up to 1-5k/Day] [Refill: 60 Days]</li>
                                            <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>🔴 YouTube Views [NEW - Recommended] [Country/Quality: REAL Arab Mix] [Start time: 0-12H] [Speed: Up to 1-5k/Day] [Refill: 60 Days]</li>
                                            <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>🔴 YouTube Views [NEW - Recommended] [Country/Quality: REAL Arab Mix] [Start time: 0-12H] [Speed: Up to 1-5k/Day] [Refill: 60 Days]</li>
                                            <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>🔴 YouTube Views [NEW - Recommended] [Country/Quality: REAL Arab Mix] [Start time: 0-12H] [Speed: Up to 1-5k/Day] [Refill: 60 Days]</li>
                                            <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>🔴 YouTube Views [NEW - Recommended] [Country/Quality: REAL Arab Mix] [Start time: 0-12H] [Speed: Up to 1-5k/Day] [Refill: 60 Days]</li>
                                            <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>🔴 YouTube Views [NEW - Recommended] [Country/Quality: REAL Arab Mix] [Start time: 0-12H] [Speed: Up to 1-5k/Day] [Refill: 60 Days]</li>
                                            <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>🔴 YouTube Views [NEW - Recommended] [Country/Quality: REAL Arab Mix] [Start time: 0-12H] [Speed: Up to 1-5k/Day] [Refill: 60 Days]</li>
                                            <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>🔴 YouTube Views [NEW - Recommended] [Country/Quality: REAL Arab Mix] [Start time: 0-12H] [Speed: Up to 1-5k/Day] [Refill: 60 Days]</li>
                                            <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>🔴 YouTube Views [NEW - Recommended] [Country/Quality: REAL Arab Mix] [Start time: 0-12H] [Speed: Up to 1-5k/Day] [Refill: 60 Days]</li>
                                        </ul>
                                    </div>
                                </details>
                            </th>
                            <th>الحالة</th>
                            <th>المتبقي</th>
                            <th>تم إنشاؤه في</th>
                            <th>
                                <details className='relative'>
                                    <summary>الوضع</summary>
                                    <ul className='absolute bg-white shadow-md w-[100px] flex flex-col'>
                                        <li className='hover:bg-[#F1F1F1] flex justify-between p-[0.5rem] cursor-pointer'>الكل <FontAwesomeIcon icon={faCheck} /></li>
                                        <li className='hover:bg-[#F1F1F1] flex justify-between p-[0.5rem] cursor-pointer'>آلي <FontAwesomeIcon icon={faCheck} /></li>
                                        <li className='hover:bg-[#F1F1F1] flex justify-between p-[0.5rem] cursor-pointer'>غير يدوي <FontAwesomeIcon icon={faCheck} /></li>
                                    </ul>
                                </details>
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='text-[1rem]'>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>1</th>
                            <td>
                                allachaib31
                            </td>
                            <td>0</td>
                            <td>https://t.me/Crypto1Academy/922 <a href="https://t.me/Crypto1Academy/922"><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a></td>
                            <td>0</td>
                            <td>1500</td>
                            <td>🔴 YouTube Views [NEW - Recommended] [Country/Quality: REAL Arab Mix] [Start time: 0-12H] [Speed: Up to 1-5k/Day] [Refill: 60 Days]</td>
                            <td>تم الإلغاء</td>
                            <td>1500</td>
                            <td>2024-07-22
                                19:26:31</td>
                            <td>آلي</td>
                        </tr>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>1</th>
                            <td>
                                allachaib31
                            </td>
                            <td>0</td>
                            <td>https://t.me/Crypto1Academy/922 <a href="https://t.me/Crypto1Academy/922"><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a></td>
                            <td>0</td>
                            <td>1500</td>
                            <td>🔴 YouTube Views [NEW - Recommended] [Country/Quality: REAL Arab Mix] [Start time: 0-12H] [Speed: Up to 1-5k/Day] [Refill: 60 Days]</td>
                            <td>تم الإلغاء</td>
                            <td>1500</td>
                            <td>2024-07-22
                                19:26:31</td>
                            <td>آلي</td>
                        </tr>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>1</th>
                            <td>
                                allachaib31
                            </td>
                            <td>0</td>
                            <td>https://t.me/Crypto1Academy/922 <a href="https://t.me/Crypto1Academy/922"><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a></td>
                            <td>0</td>
                            <td>1500</td>
                            <td>🔴 YouTube Views [NEW - Recommended] [Country/Quality: REAL Arab Mix] [Start time: 0-12H] [Speed: Up to 1-5k/Day] [Refill: 60 Days]</td>
                            <td>تم الإلغاء</td>
                            <td>1500</td>
                            <td>2024-07-22
                                19:26:31</td>
                            <td>آلي</td>
                        </tr>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>1</th>
                            <td>
                                allachaib31
                            </td>
                            <td>0</td>
                            <td>https://t.me/Crypto1Academy/922 <a href="https://t.me/Crypto1Academy/922"><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a></td>
                            <td>0</td>
                            <td>1500</td>
                            <td>🔴 YouTube Views [NEW - Recommended] [Country/Quality: REAL Arab Mix] [Start time: 0-12H] [Speed: Up to 1-5k/Day] [Refill: 60 Days]</td>
                            <td>تم الإلغاء</td>
                            <td>1500</td>
                            <td>2024-07-22
                                19:26:31</td>
                            <td>آلي</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrdersInformations