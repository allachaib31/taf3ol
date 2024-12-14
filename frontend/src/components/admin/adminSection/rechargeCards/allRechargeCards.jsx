import { faCircleCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import RowsPerPage from "../rowsPerPage";

function AllRechargeCards() {
    return (
        <div>
            <h1 className="text-3xl font-[900]">بطاقات الشحن</h1>
            <div className="mt-[1rem]">
                <select className="select select-bordered w-full">
                    <option disabled selected>
                        اختر عنوان البطاقات
                    </option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="text-[1.1rem]">
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>الرقم</th>
                            <th>مفعل</th>
                            <th>السعر</th>
                            <th>تم الاستخدام</th>
                        </tr>
                    </thead>
                    <tbody className="text-[1.1rem]">
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <td>1234</td>
                            <td>
                                <label>
                                    <input
                                        type="checkbox"
                                        className="checkbox"

                                    />
                                </label>
                            </td>
                            <td>10$</td>
                            <td><FontAwesomeIcon icon={faCircleCheck} className="text-success"/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='flex justify-between mt-[1rem]'>
                <button className='btn btn-error text-white'><FontAwesomeIcon icon={faTrash} /></button>
                <div className='w-full'>
                    <RowsPerPage />
                </div>
            </div>
        </div>
    );
}

export default AllRechargeCards;
