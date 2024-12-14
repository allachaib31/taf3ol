import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import RowsPerPage from '../rowsPerPage'
import { CurrenciesModel } from '../modal'

function Currencies() {
    return (
        <div>
            <button className='btn btn-primary' onClick={()=>document.getElementById('currenciesModel').showModal()}>عملة جديدة</button>
            <div className="overflow-x-auto mt-[1rem]">
                <table className="table">
                    {/* head */}
                    <thead className='text-[1.1rem]'>
                        <tr>
                            <th>الاسم</th>
                            <th>الاختصار</th>
                            <th>الرمز</th>
                            <th>السعر</th>
                            <th>سعر الشراء</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='text-[1.1rem]'>
                        {/* row 1 */}
                        <tr>
                            <th>dollar</th>
                            <td>USD</td>
                            <td>$</td>
                            <td>1.00</td>
                            <td>1.00</td>
                            <th><button className='btn btn-warning text-white'><FontAwesomeIcon icon={faPen} /></button></th>
                        </tr>
                        <tr>
                            <th>TURK TL</th>
                            <td>TR</td>
                            <td>TR</td>
                            <td>34.80</td>
                            <td>34.90</td>
                            <th><button className='btn btn-warning text-white'><FontAwesomeIcon icon={faPen} /></button></th>
                            <th><button className='btn btn-error text-white'><FontAwesomeIcon icon={faTrash} /></button></th>
                        </tr>

                    </tbody>
                </table>
            </div>
            <RowsPerPage />
            <CurrenciesModel />
        </div>
    )
}

export default Currencies