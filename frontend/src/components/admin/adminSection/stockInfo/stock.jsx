import { faMagnifyingGlass, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import RowsPerPage from '../rowsPerPage'
import { AddStock, DeleteStock } from '../modal'
import { Link, useNavigate } from 'react-router-dom'
import { useSocket } from '../../../../screens/admin/homeAdmin'
import { getMethode } from '../../../../utils/apiFetchs'
import { getStockRoute } from '../../../../utils/apiRoutes'
import LoadingScreen from '../../../loadingScreen'
import Alert from '../../../alert'
import { handleSelectAll, handleSelectItem } from '../../../../utils/constants'

function Stock() {
    const navigate = useNavigate();
    const socket = useSocket();
    const [loading, setLoading] = useState(false);
    const [stocks, setStocks] = useState([]);
    const [listStockSelected, setListStockSelected] = useState([]);
    const [totalStocks, setTotalStocks] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [startTyping, setStartTyping] = useState(false);
    const [query, setQuery] = useState("");
    const [alert, setAlert] = useState({
        display: false,
    });

    const getStock = () => {
        setLoading(true);
        getMethode(`${getStockRoute}?query=${query}&page=${page}&limit=${limit}`).then((response) => {
            const { stocks, total, totalPages } = response.data;

            setStocks(stocks);
            setTotalStocks(total);
            setTotalPages(totalPages);
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
    }
    useEffect(() => {
        getStock();
    }, [page, limit])
    useEffect(() => {
        // Debounce effect to delay search until user stops typing
        const delayDebounce = setTimeout(() => {
            if (startTyping) {
                getStock(); // Function to fetch all users
            }
        }, 500); // Delay time in ms

        return () => clearTimeout(delayDebounce); // Clean up the timeout
    }, [query]);
    return (
        <div>
            <h1 className='text-3xl font-[900]'>المخزون</h1>
            <div className='flex sm:flex-row flex-col gap-[1rem] justify-between'>
                <button className='btn btn-primary shadow-sm
         shadow-gray-400' onClick={() => document.getElementById('addStock').showModal()}>ربط المنتج بالمخزن</button>
                <div className="join">
                    <div>
                        <div>
                            <input className="input bg-black text-white input-bordered join-item" placeholder="أبحث عن المنتج"
                                // value={query}
                                onChange={(e) => {
                                    setStartTyping(true);
                                    setQuery(e.target.value)
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
                                        <input type="checkbox" className="checkbox" onChange={(event) => {
                                            handleSelectAll(event, setListStockSelected, stocks)
                                        }} />
                                    </label>
                                </th>
                                <th>الاسم</th>
                                <th>الكلفة</th>
                                <th>الكمية المتاحة</th>
                                <th>الكمية المباعة</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='text-[1.1rem]'>
                            {
                                stocks && stocks.map((stock) => {
                                    return (
                                        <tr>
                                            <th>
                                                <label>
                                                    <input type="checkbox" className="checkbox" checked={listStockSelected.includes(stock._id)}
                                                        onChange={() => handleSelectItem(stock._id, setListStockSelected)} />
                                                </label>
                                            </th>
                                            <td>
                                                {stock.idProduct.nameAr}
                                            </td>
                                            <td>${stock.cost.toFixed(2)}</td>
                                            <td>{stock.quantityAvailable}</td>
                                            <td>
                                                {stock.quantitySold}
                                            </td>
                                            <th><Link to={"/admin/stocksInfo?id=" + stock._id} className='btn btn-warning text-white'><FontAwesomeIcon icon={faPen} /></Link></th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            } />
            <div className='flex justify-between mt-[1rem]'>
                <button className='btn btn-error text-white' onClick={() => {
                    if (listStockSelected.length > 0) document.getElementById('deleteStocks').showModal()
                }}><FontAwesomeIcon icon={faTrash} /></button>
                <div className='w-full'>
                    <RowsPerPage page={page} setPage={setPage} limit={limit} setLimit={setLimit} totalPages={totalPages} setTotalPages={setTotalPages} totalItem={totalStocks} />
                </div>
            </div>
            <AddStock setStocks={setStocks} />
            <DeleteStock listStockSelected={listStockSelected} stocks={stocks} setStocks={setStocks}/>
        </div>
    )
}

export default Stock