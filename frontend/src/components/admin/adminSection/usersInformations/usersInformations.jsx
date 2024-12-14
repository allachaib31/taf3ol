import { faCaretDown, faCheck, faMagnifyingGlass, faSort, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { faRectangleXmark, faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AddUser, ChangeStatusUser } from '../modal';
import { useSocket } from '../../../../screens/admin/homeAdmin';
import { getMethode } from '../../../../utils/apiFetchs'
import { getFileRoute, getUsersRoute, searchUserRoute } from '../../../../utils/apiRoutes'
import Alert from '../../../alert'
import LoadingScreen from '../../../loadingScreen'

function UsersInformations() {
    const navigate = useNavigate();
    const socket = useSocket();
    const [loading, setLoading] = useState(false);
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
            setUsers(response.data)
        } catch (error) {
            console.error("Error searching:", error);
        } finally {
            setLoading(false);
        }

    };
    const handleAction = (id, userId, index) => {
        setChangeStatus({
            _id: userId,
            status: ""
        })
        setIndexUser(index)
        document.getElementById(id).showModal();
    }
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
        getMethode(`${getUsersRoute}?idDirection=${direction.id}&balance=${direction.balance}&moneySpent=${direction.moneySpent}&createdAt=${direction.createdAt}&lastLogin=${direction.lastLogin}&discount=${direction.discount}`).then((response) => {
            setUsers(response.data);
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
    }, [direction]);
    useEffect(() => {
        if (socket) {
            socket.on('receive-notification', (notification) => {
                if (notification.name == "add User") {
                    if (direction.id == 1) setUsers(prevUsers => [...prevUsers, notification.newUser]);
                    else setUsers(prevUsers => [notification.newUser, ...prevUsers]);
                } else if (notification.name == "change Status") {
                    setUsers(notification.updateListUsers)
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
                <div className="overflow-x-auto mt-[1rem]">
                    <table className="table bg-white xl:w-full w-[1900px]">
                        {/* head */}
                        <thead>
                            <tr className='text-[1rem]'>
                                {
                                    /*<th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>*/
                                }
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
                                <th className='cursor-pointer' onClick={() => {
                                    setDirection((prevDirection) => {
                                        return {
                                            ...prevDirection,
                                            moneySpent: prevDirection.moneySpent == 1 ? -1 : 1
                                        }
                                    });
                                }}>الأموال المنفقة <FontAwesomeIcon icon={direction.moneySpent == 1 ? faCaretDown : faSortUp} /></th>
                                <th>
                                    <details className='relative'>
                                        <summary>الحالات</summary>
                                        <ul className='absolute bg-white shadow-md w-[150px] flex flex-col'>
                                            <li className='hover:bg-[#F1F1F1] flex justify-between p-[0.5rem] cursor-pointer'>نشيط <FontAwesomeIcon icon={faCheck} /></li>
                                            <li className='hover:bg-[#F1F1F1] flex justify-between p-[0.5rem] cursor-pointer'>معلق <FontAwesomeIcon icon={faCheck} /></li>
                                            <li className='hover:bg-[#F1F1F1] flex justify-between p-[0.5rem] cursor-pointer'>غير مؤكد <FontAwesomeIcon icon={faCheck} /></li>
                                            <li className='hover:bg-[#F1F1F1] flex justify-between p-[0.5rem] cursor-pointer'>خبيث <FontAwesomeIcon icon={faCheck} /></li>
                                        </ul>
                                    </details>
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
                                        <tr key={user._id}>
                                            {/*<th>
                                                <label>
                                                    <input type="checkbox" className="checkbox" />
                                                </label>
                                            </th>*/}
                                            <th><Link className='underline' to="/admin/clientDetails">{user.id}</Link></th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src={user.image ? `${getFileRoute}${user.image}` : "https://img.daisyui.com/images/profile/demo/2@94.webp"}
                                                                alt="Avatar Tailwind CSS Component"
                                                                crossOrigin="anonymous" />
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
                                            <td>{user.balance}</td>
                                            <td>{user.moneySpent}</td>
                                            <td>{user.status}</td>
                                            <td>{formattedCreatedAt}</td>
                                            <td>{formattedLastLogin != "Invalid Date" ? formattedLastLogin : ""}</td>
                                            <th>
                                                <details className='relative input input-bordered'>
                                                    <summary className='pt-[0.8rem]'>الأفعال</summary>
                                                    <ul className='absolute right-0 top-[3rem] w-[9.5rem] z-30 bg-white shadow-md '>
                                                        <li className='px-[1rem] py-[0.5rem] hover:bg-[#f1f1f1] cursor-pointer'>
                                                            سجل تسجيلات الدخول
                                                        </li>
                                                        <li onClick={() => {
                                                            handleAction("changeStatus", user._id, index)
                                                        }} className='px-[1rem] py-[0.5rem] hover:bg-[#f1f1f1] cursor-pointer'>
                                                            تغيير حالة العضو
                                                        </li>
                                                    </ul>
                                                </details>
                                            </th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>
                </div>
            } />
            <dialog id="discountModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">إضافة تخفيض (المعرف: 2)</h3>
                    <hr />
                    <p className="py-2">تخفيض,%</p>
                    <input type="text" placeholder="تخفيض,%" className="input input-bordered w-full" />
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn ml-1">Close</button>
                            <button className='btn btn-primary'>حفظ التغييرات</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <AddUser setAlert={setAlert} setUsers={setUsers} direction={direction} />
            <ChangeStatusUser setAlert={setAlert} users={users} setUsers={setUsers} indexUser={indexUser} changeStatus={changeStatus} setChangeStatus={setChangeStatus} />
        </div>
    )
}

export default UsersInformations