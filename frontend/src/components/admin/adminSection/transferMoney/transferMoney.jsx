import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import RowsPerPage from '../rowsPerPage';

function TransferMoney() {
    return (
        <div>
            <h1 className='text-3xl font-[900]'>عمليات الشحن</h1>
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
            <div className="mt-[1rem] w-full sm:w-auto stats bg-primary text-primary-content">
                <div className="stat sm:w-auto w-1/2">
                    <div className="stat-title">اجمالي الشحن</div>
                    <div className="stat-value">$89,400</div>
                </div>

                <div className="stat sm:w-auto w-1/2">
                    <div className="stat-title">اجمالي السحوبات</div>
                    <div className="stat-value">$89,400</div>
                </div>
            </div>
            <div className='mt-[1rem] flex gap-[1rem]'>
                <div className="badge badge-primary p-[1rem] cursor-pointer">الكل</div>
                <div className="badge badge-neutral p-[1rem] cursor-pointer">طلبات الشحن</div>
                <div className="badge badge-neutral p-[1rem] cursor-pointer">طلبات السحب</div>
            </div>
            <div className='mt-[1rem]'>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="بحث" />
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
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='text-[1rem]'>
                        <tr>
                            <th>#</th>
                            <th>اسم المستخدم</th>
                            <th>المبلغ</th>
                            <th>مدفوع</th>
                            <th>المبلغ قبل</th>
                            <th>المبلغ بعد</th>
                            <th>طريقة الدفع</th>
                            <th>التاريخ</th>
                            <th>ip المرسل</th>
                        </tr>
                    </thead>
                    <tbody className='text-[1rem]'>
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
    );
}

export default TransferMoney;
