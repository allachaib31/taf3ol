import { faCircleCheck, faEllipsisVertical, faMagnifyingGlass, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function ClientDetails() {
    return (
        <div>
            <div className='flex justify-between'>
                <div className='flex items-center gap-[1rem]'>
                    <div className="avatar">
                        <div className="ring-success ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <div>
                        <h1 className='font-bold text-[1.5rem]'>Keram Keram</h1>
                        <h2 className='text-[0.8rem]'>Keram2355</h2>
                        <p className='text-[0.8rem]'>
                            keram20510@gmail.com <FontAwesomeIcon icon={faCircleCheck} className='text-success' /> | +905370523618 | 2024-07-01 21:12:31
                        </p>
                    </div>
                </div>
                <details className="dropdown">
                    <summary className="btn m-1"><FontAwesomeIcon icon={faEllipsisVertical} /></summary>
                    <ul className="menu dropdown-content left-[0%] bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a>بيانات الزبون</a></li>
                        <li><a>كلمة المرور</a></li>
                        <li><a>تصفير الحساب</a></li>
                        <li><a>تسجيل الخروج</a></li>
                    </ul>
                </details>
            </div>
            <div className='flex items-center justify-between bg-primary mt-[1rem] rounded-[1rem] p-[1rem]'>
                <div>
                    <h1 className='text-2xl font-bold'>الرصيد</h1>
                    <h1 className='text-3xl font-[900]'>USD 1,659.042</h1>
                </div>
                <div className='flex flex-col gap-[0.3rem]'>
                    <button className='btn btn-circle bg-dark hover:bg-primary border-black hover:text-dark text-white'><FontAwesomeIcon icon={faPlus} /></button>
                    <button className='btn btn-circle bg-dark hover:bg-primary border-black hover:text-dark text-white'><FontAwesomeIcon icon={faMinus} /></button>
                </div>
            </div>
            <div className='flex justify-center gap-[0.5rem] flex-wrap mt-[1rem]'>
                <div className="card bg-base-100 w-full md:w-[33%] shadow-xl">
                    <div className="card-body">
                        <h2 className="text-3xl text-center font-bold">428,793.028<sup>$</sup></h2>
                        <p className='text-center'>اجمالي المشتريات</p>
                    </div>
                </div>
                <div className="card bg-base-100 w-full md:w-[33%] shadow-xl">
                    <div className="card-body">
                        <h2 className="text-3xl text-center font-bold">428,793.028<sup>$</sup></h2>
                        <p className='text-center'>اجمالي المشتريات</p>
                    </div>
                </div>
                <div className="card bg-base-100 w-full md:w-[33%] shadow-xl">
                    <div className="card-body">
                        <h2 className="text-3xl text-center font-bold">428,793.028<sup>$</sup></h2>
                        <p className='text-center'>اجمالي المشتريات</p>
                    </div>
                </div>
                <div className="card bg-base-100 w-full md:w-[33%] shadow-xl">
                    <div className="card-body">
                        <h2 className="text-3xl text-center font-bold">428,793.028<sup>$</sup></h2>
                        <p className='text-center'>اجمالي المشتريات</p>
                    </div>
                </div>
                <div className="card bg-base-100 w-full md:w-[33%] shadow-xl">
                    <div className="card-body">
                        <h2 className="text-3xl text-center font-bold">428,793.028<sup>$</sup></h2>
                        <p className='text-center'>اجمالي المشتريات</p>
                    </div>
                </div>
                <div className="card bg-base-100 w-full md:w-[33%] shadow-xl">
                    <div className="card-body">
                        <h2 className="text-3xl text-center font-bold">428,793.028<sup>$</sup></h2>
                        <p className='text-center'>اجمالي المشتريات</p>
                    </div>
                </div>
                <div className="card bg-base-100 w-full md:w-[33%] shadow-xl">
                    <div className="card-body">
                        <h2 className="text-3xl text-center font-bold">428,793.028<sup>$</sup></h2>
                        <p className='text-center'>اجمالي المشتريات</p>
                    </div>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-3xl'>حركة الحساب</h1>
                <div className="flex sm:flex-row flex-col gap-[0.2rem] justify-around items-center">
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
                <div className='mt-[1rem] flex flex-wrap gap-[1rem]'>
                    <span className="badge p-[1rem] cursor-pointer hover:badge-ghost badge-ghost text-xl">الكل</span>
                    <span className="badge p-[1rem] cursor-pointer hover:badge-ghost text-xl">مشتريات</span>
                    <span className="badge p-[1rem] cursor-pointer hover:badge-ghost text-xl">مسترجع طلبات</span>
                    <span className="badge p-[1rem] cursor-pointer hover:badge-ghost text-xl">عمليات شحن</span>
                    <span className="badge p-[1rem] cursor-pointer hover:badge-ghost text-xl">دين فدعي</span>
                    <span className="badge p-[1rem] cursor-pointer hover:badge-ghost text-xl"> شحن زبائن</span>
                    <span className="badge p-[1rem] cursor-pointer hover:badge-ghost text-xl">ارباح</span>
                </div>
                <div className="join mt-[1rem]">
                    <div>
                        <div>
                            <input className="input bg-black text-white input-bordered join-item" placeholder="بحث" />
                        </div>
                    </div>
                    <div className="indicator">
                        <button className="btn join-item"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    </div>
                </div>
                <div className="overflow-x-auto mt-[1rem]">
                    <table className="table">
                        {/* head */}
                        <thead className='text-[1rem]'>
                            <tr>
                                <th>نوع الحركة</th>
                                <th>القيمة </th>
                                <th>الرصيد قبل</th>
                                <th>الرصيد بعد</th>
                                <th>الرد</th>
                                <th>حالة الطلب</th>
                                <th>رقم الطلب</th>
                                <th>IP Address</th>
                                <th>التاريخ</th>
                            </tr>
                        </thead>
                        <tbody className='text-[1rem]'>
                            {/* row 1 */}
                            <tr className="hover:bg-base-200 cursor-pointer">
                                <th>Itunes 100 TL</th>
                                <td>-105.645 TR	</td>
                                <td>-2,122.338	</td>
                                <td>-2,227.983	</td>
                                <td></td>
                                <td><div className="badge badge-success text-white">مقبول</div></td>
                                <td><div className="badge badge-[#F1F1F1] p-[1rem]"><Link to="/admin/order/get">49263</Link></div></td>
                                <td>85.99.3.113</td>
                                <td>2024-12-05 20:30:54</td>
                            </tr>
                            <tr className="hover:bg-base-200 cursor-pointer">
                                <th>Itunes 100 TL</th>
                                <td>-105.645 TR	</td>
                                <td>-2,122.338	</td>
                                <td>-2,227.983	</td>
                                <td></td>
                                <td><div className="badge badge-success text-white">مقبول</div></td>
                                <td><div className="badge badge-[#F1F1F1] p-[1rem]"><Link to="/admin/order/get">49263</Link></div></td>
                                <td>85.99.3.113</td>
                                <td>2024-12-05 20:30:54</td>
                            </tr>
                            <tr className="hover:bg-base-200 cursor-pointer">
                                <th>Itunes 100 TL</th>
                                <td>-105.645 TR	</td>
                                <td>-2,122.338	</td>
                                <td>-2,227.983	</td>
                                <td></td>
                                <td><div className="badge badge-success text-white">مقبول</div></td>
                                <td><div className="badge badge-[#F1F1F1] p-[1rem]"><Link to="/admin/order/get">49263</Link></div></td>
                                <td>85.99.3.113</td>
                                <td>2024-12-05 20:30:54</td>
                            </tr>
                            <tr className="hover:bg-base-200 cursor-pointer">
                                <th>Itunes 100 TL</th>
                                <td>-105.645 TR	</td>
                                <td>-2,122.338	</td>
                                <td>-2,227.983	</td>
                                <td></td>
                                <td><div className="badge badge-success text-white">مقبول</div></td>
                                <td><div className="badge badge-[#F1F1F1] p-[1rem]"><Link to="/admin/order/get">49263</Link></div></td>
                                <td>85.99.3.113</td>
                                <td>2024-12-05 20:30:54</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ClientDetails