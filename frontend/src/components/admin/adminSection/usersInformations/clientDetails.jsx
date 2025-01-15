import { faCircleCheck, faCircleXmark, faMagnifyingGlass, faMinus, faPlus, faScaleBalanced } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getFileRoute, getFinancialUserRoute, getUserDataRoute } from '../../../../utils/apiRoutes';
import { getMethode } from '../../../../utils/apiFetchs';
import LoadingScreen from '../../../loadingScreen';
import { AddBalance, AddNegativeBalance, ReduceBalance } from '../modal';
import RowsPerPage from '../rowsPerPage';
import { useSocket } from '../../../../screens/admin/homeAdmin';
import { randomColor } from '../../../../utils/constants';

function ClientDetails() {
    const navigate = useNavigate();
    const socket = useSocket();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [loadingFinancialMovement, setLoadingFinancialMovement] = useState(false);
    const [startTyping, setStartTyping] = useState(false);
    const [user, setUser] = useState(false);
    const [financialMovements, setFinancialMovements] = useState([]);
    const [typeFinancial, setTypeFinancial] = useState("All");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [searchText, setSearchText] = useState("");
    const [totalFinancialMovements, setTotalFinancialMovements] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    // Parse query parameters
    const queryParams = new URLSearchParams(location.search);
    const handleSearch = async () => {
        setLoadingFinancialMovement(true);
        try {
            const response = await getMethode(`${getFinancialUserRoute}?startDate=${startDate}&endDate=${endDate}&typeFinancial=${typeFinancial}&searchText=${searchText}&idUser=${queryParams.get("id")}&page=${page}&limit=${limit}`);
            const { financialMovements, total, totalPages } = response.data;

            setFinancialMovements(financialMovements);
            setTotalFinancialMovements(total);
            setTotalPages(totalPages);
        } catch (error) {
            console.error("Error searching:", error);
        } finally {
            setLoadingFinancialMovement(false);
        }
    }
    useEffect(() => {
        // Debounce effect to delay search until user stops typing
        const delayDebounce = setTimeout(() => {
            if (startTyping) {
                handleSearch(); // Function to fetch all users
            }
        }, 500); // Delay time in ms

        return () => clearTimeout(delayDebounce); // Clean up the timeout
    }, [searchText]);
    useEffect(() => {
        handleSearch();
    }, [typeFinancial, page, limit])
    useEffect(() => {
        setLoading(true);
        getMethode(`${getUserDataRoute}?id=${queryParams.get("id")}&page=${page}&limit=${limit}`).then((response) => {
            const { user, financialMovements, total, totalPages } = response.data;
            setUser(user);
            setFinancialMovements(financialMovements);
            setTotalFinancialMovements(total);
            setTotalPages(totalPages);
        }).catch((err) => {
            if (err.response.status == 401 || err.response.status == 403) {
                navigate("/admin/auth")
            }
        }).finally(() => {
            setLoading(false);
        })
    }, []);
    useEffect(() => {
        if (socket) {
            socket.on('receive-notification', (notification) => {
                if (notification.name == "add Negative balance" || notification.name == "add balance" || notification.name == "reduce balance" ) {
                    if (queryParams.get("id") == notification.newUser._id.toString()) {
                        setUser(notification.newUser);
                        const newFinancialMovements = [...financialMovements, notification.newFinancialMovements];
                        setFinancialMovements(newFinancialMovements);
                    }
                }

            });
            return () => {
                // Clean up event listeners when component unmounts
                socket.off('receive-notification');
            };
        }
    }, [socket, financialMovements, user]);
    return (
        <div>
            <LoadingScreen loading={loading} component={user &&
                <>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-[1rem]'>
                            {user.image ? (
                                <div className="avatar">
                                    <div className={`${user.status == "نشيط" ? "ring-success": "ring-error"} ring-offset-base-100 w-24 rounded-full ring ring-offset-2`}>
                                        <img src={`${getFileRoute}${user.image}`} crossOrigin="anonymous" />
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className={`${user.status == "نشيط" ? "ring-success": "ring-error"}  rounded-full ring ring-offset-2 w-24 h-24 flex justify-center items-center text-white font-bold text-xl`}
                                    style={{ backgroundColor: randomColor }}
                                >
                                    {user.username?.[0]?.toUpperCase() || '?'}
                                </div>
                            )}
                            <div>
                                <h1 className='font-bold text-[1.5rem]'>{user.firstName + " " + user.lastName}</h1>
                                <h2 className='text-[0.8rem] sm:text-[1rem]'>{user.username}</h2>
                                <p className='text-[0.8rem] sm:text-[1rem]'>
                                    {user.email} {user.status == "نشيط" ? <FontAwesomeIcon icon={faCircleCheck} className='text-success' /> : <FontAwesomeIcon icon={faCircleXmark} className='text-error' />} | {user.phoneNumber} | {user.createdAt}
                                </p>
                            </div>
                        </div>
                        {
                            /**
                             *                       <details className="dropdown">
                            <summary className="btn m-1"><FontAwesomeIcon icon={faEllipsisVertical} /></summary>
                            <ul className="menu dropdown-content left-[0%] bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a>بيانات الزبون</a></li>
                                <li><a>تصفير الحساب</a></li>
                            </ul>
                        </details>
                             */
                        }
                    </div>
                    <div className='flex items-center justify-between bg-primary mt-[1rem] rounded-[1rem] p-[1rem]'>
                        <div>
                            <h1 className='text-2xl font-bold'>الرصيد</h1>
                            <h1 className='text-3xl font-[900]'>USD {user.idExpenses.balance.toFixed(2)}</h1>
                        </div>
                        <div className='flex flex-col gap-[0.3rem]'>
                            <button className='btn btn-circle bg-dark hover:bg-primary border-black hover:text-dark text-white' title='اضافة رصيد ' onClick={() => document.getElementById('AddBalance').showModal()}><FontAwesomeIcon icon={faPlus} /></button>
                            <button className='btn btn-circle bg-dark hover:bg-primary border-black hover:text-dark text-white' title='سحب رصيد' onClick={() => document.getElementById('ReduceBalance').showModal()}><FontAwesomeIcon icon={faMinus} /></button>
                            <button className='btn btn-circle bg-dark hover:bg-primary border-black hover:text-dark text-white' title='اضافة رصيد سالب' onClick={() => document.getElementById('AddNegativeBalance').showModal()}><FontAwesomeIcon icon={faScaleBalanced} /></button>
                        </div>
                    </div>
                    <div className='flex justify-center gap-[0.5rem] flex-wrap mt-[1rem]'>
                        <div className="card bg-base-100 w-full lg:w-[33%] shadow-xl">
                            <div className="card-body">
                                <h2 className="text-3xl text-center font-bold">{user.idExpenses.totalPurchases.toFixed(2)}<sup>$</sup></h2>
                                <p className='text-center'>اجمالي المشتريات</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 w-full lg:w-[33%] shadow-xl">
                            <div className="card-body">
                                <h2 className="text-3xl text-center font-bold">{user.idExpenses.totalShipping.toFixed(2)}<sup>$</sup></h2>
                                <p className='text-center'>اجمالي شحن</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 w-full lg:w-[33%] shadow-xl">
                            <div className="card-body">
                                <h2 className="text-3xl text-center font-bold">{user.idExpenses.debitBalance.toFixed(2)}<sup>$</sup></h2>
                                <p className='text-center'>رصيد مدين</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 w-full lg:w-[33%] shadow-xl">
                            <div className="card-body">
                                <h2 className="text-3xl text-center font-bold">{user.idExpenses.sentToAgent.toFixed(2)}<sup>$</sup></h2>
                                <p className='text-center'>مرسل للوكلاء</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 w-full lg:w-[33%] shadow-xl">
                            <div className="card-body">
                                <h2 className="text-3xl text-center font-bold">{user.idExpenses.undrawnProfits.toFixed(2)}<sup>$</sup></h2>
                                <p className='text-center'>ارباح غير مسحوبة</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 w-full lg:w-[33%] shadow-xl">
                            <div className="card-body">
                                <h2 className="text-3xl text-center font-bold">0.00<sup>$</sup></h2>
                                <p className='text-center'>فرق الحساب</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-[1rem]'>
                        <h1 className='font-bold text-3xl'>حركة الحساب</h1>
                        <div className="flex sm:flex-row flex-col gap-[0.2rem] justify-around items-center">
                            {/* Apply focus class directly or use a custom style */}
                            <input
                                type="date"
                                placeholder="Type here"
                                className="input input-bordered input-md sm:w-1/2 w-full"
                                value={startDate.toISOString().split("T")[0]}
                                onChange={(event) => {
                                    setStartDate(new Date(event.target.value))
                                }} />
                            <span className="mx-4 text-gray-500">الى</span>
                            <input
                                type="date"
                                placeholder="Type here"
                                className="input input-bordered input-md sm:w-1/2 w-full"
                                value={endDate.toISOString().split("T")[0]}
                                onChange={(event) => {
                                    setEndDate(new Date(event.target.value))
                                }} />
                            <button className='btn btn-primary w-full sm:w-auto' onClick={handleSearch}>فلترة</button>
                        </div>
                        <div className='mt-[1rem] flex flex-wrap gap-[1rem]'>
                            <span onClick={() => setTypeFinancial("All")} className={`badge p-[1rem] cursor-pointer hover:badge-ghost ${typeFinancial == "All" ? "badge-ghost" : ""} text-xl`}>الكل</span>
                            <span onClick={() => setTypeFinancial("Purchases")} className={`badge p-[1rem] cursor-pointer hover:badge-ghost ${typeFinancial == "Purchases" ? "badge-ghost" : ""} text-xl`}>مشتريات</span>
                            <span onClick={() => setTypeFinancial("Retrieve requests")} className={`badge p-[1rem] cursor-pointer hover:badge-ghost ${typeFinancial == "Retrieve requests" ? "badge-ghost" : ""} text-xl`}>مسترجع طلبات</span>
                            <span onClick={() => setTypeFinancial("Shipping operations")} className={`badge p-[1rem] cursor-pointer hover:badge-ghost ${typeFinancial == "Shipping operations" ? "badge-ghost" : ""} text-xl`}>عمليات شحن</span>
                            <span onClick={() => setTypeFinancial("Money debt")} className={`badge p-[1rem] cursor-pointer hover:badge-ghost ${typeFinancial == "Money debt" ? "badge-ghost" : ""} text-xl`}>دين فدعي</span>
                            <span onClick={() => setTypeFinancial("Shipping customers")} className={`badge p-[1rem] cursor-pointer hover:badge-ghost ${typeFinancial == "Shipping customers" ? "badge-ghost" : ""} text-xl`}> شحن زبائن</span>
                            <span onClick={() => setTypeFinancial("Earnings")} className={`badge p-[1rem] cursor-pointer hover:badge-ghost ${typeFinancial == "Earnings" ? "badge-ghost" : ""} text-xl`}>ارباح</span>
                        </div>
                        <div className="join mt-[1rem]">
                            <div>
                                <div>
                                    <input className="input bg-black text-white input-bordered join-item" placeholder="بحث"
                                        value={searchText}
                                        onChange={(e) => {
                                            setStartTyping(true);
                                            setSearchText(e.target.value)
                                        }} />
                                </div>
                            </div>
                            <div className="indicator">
                                <button className="btn join-item"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                            </div>
                        </div>
                        <div className="overflow-x-auto mt-[1rem]">
                            <LoadingScreen loading={loadingFinancialMovement} component={
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
                                            <th>التاريخ</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-[1rem]'>

                                        {
                                            financialMovements && financialMovements.map((financialMovement) => {
                                                return (
                                                    <tr className="hover:bg-base-200 cursor-pointer">
                                                        <td>{financialMovement.typeMovement}</td>
                                                        <td>{financialMovement.value}</td>
                                                        <td>{financialMovement.balanceBefore}</td>
                                                        <td>{financialMovement.balanceAfter}</td>
                                                        <td>{financialMovement.reply}</td>
                                                        <td><div className={`badge ${financialMovement.orderStatus ? "badge-success" : financialMovement.orderStatus == "In progress" ? "badge-warning" : "badge-error"} text-white`}>{financialMovement.orderStatus}</div></td>
                                                        <td><div className="badge badge-[#F1F1F1] p-[1rem]">{financialMovement.type == "Money debt" ? financialMovement.id : <Link to={`/admin/order/get?id=${financialMovement.id}`}>{financialMovement.id}</Link>}</div></td>
                                                        <td>{financialMovement.createdAt}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            } />
                        </div>
                    </div>
                </>
            } />
            <RowsPerPage page={page} setPage={setPage} limit={limit} setLimit={setLimit} totalPages={totalPages} setTotalPages={setTotalPages} totalItem={totalFinancialMovements} />
            <AddNegativeBalance idUser={queryParams.get("id")} financialMovements={financialMovements} setFinancialMovements={setFinancialMovements} user={user} setUser={setUser} />
            <AddBalance idUser={queryParams.get("id")} financialMovements={financialMovements} setFinancialMovements={setFinancialMovements} user={user} setUser={setUser} />
            <ReduceBalance idUser={queryParams.get("id")} financialMovements={financialMovements} setFinancialMovements={setFinancialMovements} user={user} setUser={setUser} />
        </div>
    )
}

export default ClientDetails