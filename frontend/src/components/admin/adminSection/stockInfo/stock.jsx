import { faMagnifyingGlass, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import RowsPerPage from '../rowsPerPage'
import { AddStock } from '../modal'
import { Link, useNavigate } from 'react-router-dom'
import { useSocket } from '../../../../screens/admin/homeAdmin'
import { getMethode } from '../../../../utils/apiFetchs'
import { getProductsStockRoute } from '../../../../utils/apiRoutes'
import LoadingScreen from '../../../loadingScreen'
import Alert from '../../../alert'

function Stock() {
    const navigate = useNavigate();
    const socket = useSocket();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [alert, setAlert] = useState({
        display: false,
      });
    useEffect(() => {
        setLoading(true);
        getMethode(`${getProductsStockRoute}`).then((response) => {
            setProducts(response.data);
        }).catch((err) => {
            if (err.response.status == 500) {
                setAlert({
                    display: true,
                    status: false,
                    text: err.response.data.msg
                });
            }
            if (err.response.status == 401 || err.response.status == 403) {
                navigate("/admin/auth")
            }
        }).finally(() => {
            setLoading(false);
        })
    }, [])
    return (
        <div>
            <h1 className='text-3xl font-[900]'>المخزون</h1>
            <div className='flex sm:flex-row flex-col gap-[1rem] justify-end'>
                {/* <button className='btn btn-primary shadow-sm
         shadow-gray-400' onClick={() => document.getElementById('addStock').showModal()}>إضافة مجموعة</button>*/}
                <div className="join">
                    <div>
                        <div>
                            <input className="input bg-black text-white input-bordered join-item" placeholder="أبحث عن اعضاء"
                                // value={query}
                                onChange={(e) => {
                                    /* setStartTyping(true);
                                     setQuery(e.target.value)*/
                                }} />
                        </div>
                    </div>
                    <div className="indicator">
                        <button className="btn join-item"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    </div>
                </div>
            </div>
            {alert.display && <Alert msg={alert} />}
            <LoadingScreen loading={loading} component={
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='text-[1.1rem]'>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th>الاسم</th>
                                <th>مفعل</th>
                                <th>الكمية المتاحة</th>
                                <th>الكمية المباعة</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='text-[1.1rem]'>
                            {
                                products && products.map((product) => {
                                    return (
                                        <tr>
                                            <th>
                                                <label>
                                                    <input type="checkbox" className="checkbox" />
                                                </label>
                                            </th>
                                            <td>
                                            {product.nameAr}
                                            </td>
                                            <td>
                                                <label>
                                                    <input type="checkbox" className="checkbox" checked={product.show}/>
                                                </label>
                                            </td>
                                            <td>{product.availableQuantity.toString()}</td>
                                            <td>
                                                {product.quantitySold}
                                            </td>
                                            <th><Link to={"/admin/stocksInfo"} className='btn btn-success text-white'><FontAwesomeIcon icon={faPen} /></Link></th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            } />
            <div className='flex justify-between mt-[1rem]'>
                <button className='btn btn-error text-white'><FontAwesomeIcon icon={faTrash} /></button>
                <div className='w-full'>
                    <RowsPerPage />
                </div>
            </div>
            <AddStock />
        </div>
    )
}

export default Stock