import React from 'react'
import { AddApiModel } from '../modal'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Api() {
    return (
        <div>
            <h1 className="text-3xl font-[900]">API</h1>
            <button className='btn btn-primary mt-[1rem]' onClick={() => document.getElementById('addApi').showModal()}>اضافة API</button>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='text-[1rem]'>
                        <tr>
                            <th></th>
                            <th>الاسم</th>
                            <th>الرابط</th>
                            <th>المجموعة</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='text-[1rem]'>
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>KASIM</td>
                            <td>api.kasim</td>
                            <td>znet</td>
                            <td><button className='btn btn-warning text-white'><FontAwesomeIcon icon={faPen} /></button></td>
                            <td><button className='btn btn-error text-white'><FontAwesomeIcon icon={faTrash} /></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <AddApiModel />
        </div>
    )
}

export default Api