import React from 'react'
import { Link } from 'react-router-dom'

function OpenTickets() {
    return (
        <div className="relative z-50">
            <div className='flex justify-end'>
                <Link to="/client/support" className='btn btn-primary text-2xl h-auto px-[2rem]'>الرجوع</Link>
            </div>
            <div className="overflow-x-auto mt-[2rem]">
                <table className="table table-zebra">
                    {/* head */}
                    <thead className='bg-primary text-black'>
                        <tr>
                            <th><input type="checkbox" className="checkbox" /></th>
                            <th>رقم الطلب</th>
                            <th>تاريخ الطلب</th>
                            <th>الموضوع</th>
                            <th>اختر الفئة</th>
                            <th>رسالة</th>
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
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th><input type="checkbox" className="checkbox" /></th>
                            <td>2</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th><input type="checkbox" className="checkbox" /></th>
                            <td>3</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th><input type="checkbox" className="checkbox" /></th>
                            <td>4</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th><input type="checkbox" className="checkbox" /></th>
                            <td>5</td>
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

export default OpenTickets