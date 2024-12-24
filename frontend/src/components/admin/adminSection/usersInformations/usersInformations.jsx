import { faBoxArchive, faCaretDown, faCheck, faMagnifyingGlass, faSort, faSortUp, faTrash, faUser } from '@fortawesome/free-solid-svg-icons'
import { faRectangleXmark, faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AddUser, ChangeStatusUser } from '../modal';
import { useSocket } from '../../../../screens/admin/homeAdmin';
import { getMethode, patchMethode } from '../../../../utils/apiFetchs'
import { deleteUsersRoute, getFileRoute, getUsersRoute, searchUserRoute } from '../../../../utils/apiRoutes'
import Alert from '../../../alert'
import LoadingScreen from '../../../loadingScreen'
import RowsPerPage from '../rowsPerPage'
import Loading from '../../../loading'
import { randomColor } from '../../../../utils/constants'

function UsersInformations() {
    const navigate = useNavigate();
    const socket = useSocket();
    const [loading, setLoading] = useState(false);
    const [loadingDeleted, setLoadingDeleted] = useState(false);
    const [users, setUsers] = useState(false);
    const [direction, setDirection] = useState({
        id: 1,
        balance: 1,
        moneySpent: 1,
        createdAt: 1,
        lastLogin: 1,
        discount: 1,
    });
    const [query, setQuery] = useState("");
    const [startTyping, setStartTyping] = useState(false);
    const [totalUsers, setTotalUsers] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [listUserDeleted, setListUserDeleted] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [alert, setAlert] = useState({
        display: false,
    });
    const [changeStatus, setChangeStatus] = useState({
        _id: "",
        status: "",
    });
    const [indexUser, setIndexUser] = useState(false);
    const searchQuery = async (searchTerm) => {
        setLoading(true);
        try {
            const response = await getMethode(`${searchUserRoute}?query=${searchTerm}`);
            const { users } = response.data;

            setUsers(users);
        } catch (error) {
            console.error("Error searching:", error);
        } finally {
            setLoading(false);
        }

    };
    const handleDeletedUser = async () => {
        setLoadingDeleted(true);
        setAlert({
            display: false,
        });
        try {
            const response = await patchMethode(deleteUsersRoute, listUserDeleted);
            setUsers(prevUsers => prevUsers.filter(user =>
                !listUserDeleted.includes(user._id) // Adjust based on the structure of `listUserDeleted`
            ));
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            socket.emit('broadcast-notification', {
                msg: response.data.notificationMsg,
                name: "delete Users",
                listUserDeleted: listUserDeleted
            });
        } catch (err) {
            if (err.response.status == 401 || err.response.status == 403) {
                return navigate("/admin/auth")
            }
            setAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
        } finally {
            setLoadingDeleted(false);
        }
    }
    const handleAction = (id, userId, index) => {
        setChangeStatus({
            _id: userId,
            status: ""
        })
        setIndexUser(index)
        document.getElementById(id).showModal();
    }
    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);

        if (newSelectAll) {
            // If checked, add all user IDs to listUserDeleted
            const allUserIds = users.map(user => user._id);
            setListUserDeleted(allUserIds);
        } else {
            // If unchecked, clear the list
            setListUserDeleted([]);
        }
    };

    const handleCheckboxChange = (userId) => {
        setListUserDeleted(prevList => {
            if (prevList.includes(userId)) {
                // Remove ID if already selected
                return prevList.filter(id => id !== userId);
            } else {
                // Add ID if not selected
                return [...prevList, userId];
            }
        });
    };

    useEffect(() => {
        // Debounce effect to delay search until user stops typing
        const delayDebounce = setTimeout(() => {
            if (startTyping) {
                searchQuery(query); // Function to fetch all users
            }
        }, 500); // Delay time in ms

        return () => clearTimeout(delayDebounce); // Clean up the timeout
    }, [query]);

    useEffect(() => {
        setLoading(true);
        setAlert({
            display: false,
        });
        getMethode(`${getUsersRoute}?page=${page}&limit=${limit}&idDirection=${direction.id}&balance=${direction.balance}&moneySpent=${direction.moneySpent}&createdAt=${direction.createdAt}&lastLogin=${direction.lastLogin}&discount=${direction.discount}`).then((response) => {
            const { users, total, totalPages } = response.data;

            setUsers(users);
            setTotalUsers(total);
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
    }, [direction, page, limit]);
    useEffect(() => {
        if (socket) {
            socket.on('receive-notification', (notification) => {
                if (notification.name == "add User") {
                    if (direction.id == 1) setUsers(prevUsers => [...prevUsers, notification.newUser]);
                    else setUsers(prevUsers => [notification.newUser, ...prevUsers]);
                } else if (notification.name == "change Status") {
                    setUsers(notification.updateListUsers)
                } else if (notification.name == "delete Users") {
                    setUsers(prevUsers => prevUsers.filter(user =>
                        !notification.listUserDeleted.includes(user._id) // Adjust based on the structure of `listUserDeleted`
                    ));
                }

            });
            return () => {
                // Clean up event listeners when component unmounts
                socket.off('receive-notification');
            };
        }
    }, [socket]);
    return (
        <div>
            <div className='flex sm:flex-row flex-col gap-[1rem] justify-between'>
                <button className='btn btn-primary shadow-sm
       shadow-gray-400' onClick={() => document.getElementById('addUser').showModal()}>أضف مستخدم</button>
                <div className="join">
                    <div>
                        <div>
                            <input className="input bg-black text-white input-bordered join-item" placeholder="أبحث عن اعضاء"
                                value={query}
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
            <div className='my-[0.1rem]'>
                {alert.display && <Alert msg={alert} />}
            </div>
            <LoadingScreen loading={loading} component={
                <div id='table' className="overflow-x-auto mt-[1rem]">
                    <table className="table bg-white xl:w-full w-[1900px]">
                        {/* head */}
                        <thead>
                            <tr className='text-[1rem]'>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox"
                                            checked={selectAll}
                                            onChange={handleSelectAll} />
                                    </label>
                                </th>
                                <th className='cursor-pointer' onClick={() => {
                                    //let arrayReverse = [...users].reverse();
                                    /*setUsers(() => {
                                        return arrayReverse
                                    });*/
                                    setDirection((prevDirection) => {
                                        return {
                                            ...prevDirection,
                                            id: prevDirection.id == 1 ? -1 : 1
                                        }
                                    });
                                }}>المعرف <FontAwesomeIcon icon={direction.id == 1 ? faCaretDown : faSortUp} /></th>
                                <th>الاسم</th>
                                <th>اسم المستخدم</th>
                                <th>البريد الالكتروني</th>
                                <th></th>
                                <th className='cursor-pointer' onClick={() => {
                                    setDirection((prevDirection) => {
                                        return {
                                            ...prevDirection,
                                            balance: prevDirection.balance == 1 ? -1 : 1
                                        }
                                    });
                                }}>الرصيد المالي <FontAwesomeIcon icon={direction.balance == 1 ? faCaretDown : faSortUp} /></th>
                                <th>
                                    غير مدفوع
                                </th>
                                <th className='cursor-pointer' onClick={() => {
                                    setDirection((prevDirection) => {
                                        return {
                                            ...prevDirection,
                                            moneySpent: prevDirection.moneySpent == 1 ? -1 : 1
                                        }
                                    });
                                }}>الأموال المنفقة <FontAwesomeIcon icon={direction.moneySpent == 1 ? faCaretDown : faSortUp} /></th>
                                <th>
                                    المستوى
                                </th>
                                <th>
                                    يتبع للوكيل
                                </th>
                                <th>
                                    الحالات
                                </th>
                                <th className='cursor-pointer' onClick={() => {
                                    setDirection((prevDirection) => {
                                        return {
                                            ...prevDirection,
                                            createdAt: prevDirection.createdAt == 1 ? -1 : 1
                                        }
                                    });
                                }}>تم إنشاؤه <FontAwesomeIcon icon={direction.createdAt == 1 ? faCaretDown : faSortUp} /></th>
                                <th className='cursor-pointer' onClick={() => {
                                    setDirection((prevDirection) => {
                                        return {
                                            ...prevDirection,
                                            lastLogin: prevDirection.lastLogin == 1 ? -1 : 1
                                        }
                                    });
                                }}>اخر تسجيل دخول <FontAwesomeIcon icon={direction.lastLogin == 1 ? faCaretDown : faSortUp} /></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='text-[1rem]'>
                            {/* row 1 */}
                            {
                                users && users.map((user, index) => {
                                    const createdAt = new Date(user.createdAt);
                                    const lastLogin = new Date(user.lastLogin)
                                    const confDate = {
                                        year: "numeric",
                                        month: "long", // Options: "numeric", "2-digit", "long", "short", "narrow"
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                        hour12: false // Use true for 12-hour time format
                                    }
                                    const formattedCreatedAt = createdAt.toLocaleString("en-US", confDate);
                                    const formattedLastLogin = lastLogin.toLocaleString("en-US", confDate);
                                    return (
                                        <tr key={user._id} className='hover:bg-base-200'>
                                            <th>
                                                <label>
                                                    <input type="checkbox" className="checkbox" checked={listUserDeleted.includes(user._id)}
                                                        onChange={() => handleCheckboxChange(user._id)} />
                                                </label>
                                            </th>
                                            <th><Link className='underline' to={`/admin/clientDetails?id=${user._id}`}>{user.id}</Link></th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            {user.image ? (
                                                                <img
                                                                    src={`${getFileRoute}${user.image}`}
                                                                    crossOrigin="anonymous"
                                                                />
                                                            ) : (
                                                                <div
                                                                    className={`h-12 flex justify-center items-center text-white font-bold text-xl`}
                                                                    style={{ backgroundColor: randomColor }}
                                                                >
                                                                    {user.username?.[0]?.toUpperCase() || '?'}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{user.lastName + " " + user.firstName}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {user.username}
                                            </td>
                                            <td>{user.email} <div className="tooltip" data-tip="بريد إلكتروني غير مؤكد. لن يتلقى المستخدم إشعارًا عبر البريد الإلكتروني">
                                                <FontAwesomeIcon icon={faRectangleXmark} />
                                            </div></td>
                                            <td>
                                                <div className="tooltip" data-tip="0543264321">
                                                    <a href={`https://api.whatsapp.com/send/?phone=${user.phoneNumber}&text&type=phone_number&app_absent=0`} target='_blank'><FontAwesomeIcon icon={faWhatsapp} /></a>
                                                </div>
                                            </td>
                                            <td>{user.idExpenses.balance}</td>
                                            <td>0</td>
                                            <td>{user.idExpenses.totalPurchases}</td>
                                            <td>VIP1</td>
                                            <td>ala</td>
                                            <td>{user.status}</td>
                                            <td>{formattedCreatedAt}</td>
                                            <td>{formattedLastLogin != "Invalid Date" ? formattedLastLogin : ""}</td>
                                            <th className='flex gap-[1rem]'>
                                                {/*<button className='btn btn-info text-white' title=' سجل تسجيلات الدخول'><FontAwesomeIcon icon={faBoxArchive} /></button>*/}
                                                <button className='btn btn-success text-white' title=' تغيير حالة العضو' onClick={() => {
                                                    handleAction("changeStatus", user._id, index)
                                                }} ><FontAwesomeIcon icon={faUser} /></button>
                                            </th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>
                </div>
            } />
            <div className='mt-[1rem] flex justify-between'>
                <button className='btn btn-error text-white' disabled={loadingDeleted} onClick={handleDeletedUser}>{loadingDeleted ? <Loading /> : <FontAwesomeIcon icon={faTrash} />}</button>
                <div className='w-full'>
                    <RowsPerPage page={page} setPage={setPage} limit={limit} setLimit={setLimit} totalPages={totalPages} setTotalPages={setTotalPages} totalItem={totalUsers} />
                </div>
            </div>
            <AddUser setUsers={setUsers} direction={direction} />
            <ChangeStatusUser users={users} setUsers={setUsers} indexUser={indexUser} changeStatus={changeStatus} setChangeStatus={setChangeStatus} />
        </div>
    )
}

export default UsersInformations