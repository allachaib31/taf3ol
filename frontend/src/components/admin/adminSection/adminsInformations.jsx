import { faCaretDown, faMagnifyingGlass, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { AddAdmin, StopAccount, UpdateAdmin, UpdatePassword } from './modal/index'
import { useNavigate } from 'react-router-dom';
import { getMethode } from '../../../utils/apiFetchs';
import { getAdminsRoute, searchAdminRoute } from '../../../utils/apiRoutes';
import Alert from '../../alert';
import LoadingScreen from '../../loadingScreen';
import { useSocket } from '../../../screens/admin/homeAdmin';


function AdminsInformations() {
  const navigate = useNavigate();
  const socket = useSocket();
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState(false);
  const [updateAdmin, setUpdateAdmin] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [stopAccount, setStopAccount] = useState(false);
  const [indexAdmin, setIndexAdmin] = useState(false);
  const [direction, setDirection] = useState("down");
  const [query, setQuery] = useState("");
  const [startTyping, setStartTyping] = useState(false);

  const [alert, setAlert] = useState({
    display: false,
  });

  useEffect(() => {
    // Debounce effect to delay search until user stops typing
    const delayDebounce = setTimeout(() => {
      if (startTyping) {
        searchQuery(query); // Function to fetch all users
      } 
    }, 500); // Delay time in ms

    return () => clearTimeout(delayDebounce); // Clean up the timeout
  }, [query]);

  const searchQuery = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await getMethode(`${searchAdminRoute}?query=${searchTerm}`);
      setAdmins(response.data)
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setLoading(false);
    }

  };
  const handleAction = (id, admin, index) => {
    setUpdateAdmin({
      id: admin._id,
      name: admin.name,
      username: admin.username,
      email: admin.email,
    });
    setIndexAdmin(index);
    setUpdatePassword({
      id: admin._id,
      currentPassword: "",
      newPassword: ""
    });
    setStopAccount({
      id: admin._id,
      block: !admin.isBlocked
    });
    document.getElementById(id).showModal();
  }
  useEffect(() => {
    setLoading(true);
    setAlert({
      display: false,
    });
    getMethode(getAdminsRoute).then((response) => {
      setAdmins(response.data);
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
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on('receive-notification', (notification) => {
        if(notification.name == "add Admin") {
          if(direction == "down") setAdmins(prevAdmins => [...prevAdmins, notification.newAdmin]);
          else setAdmins(prevAdmins => [notification.newAdmin ,...prevAdmins]);
        } else if(notification.name == "update Admin" || notification.name == "stop Account") {
          setAdmins(notification.updateListAdmin)
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
         shadow-gray-400' onClick={() => document.getElementById('addAdmin').showModal()}>إضافة مسؤول</button>
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
                {/*<th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>*/}
                <th className='cursor-pointer' onClick={() => {
                  let arrayReverse = [...admins].reverse();
                  console.log(arrayReverse)
                  setAdmins(() => {
                    return arrayReverse
                  });
                  setDirection((prevDirection) => {
                    return prevDirection == "down" ? "up" : "down"
                  });
                }}>المعرف <FontAwesomeIcon icon={direction == "down" ? faCaretDown : faSortUp} /></th>
                <th>الاسم</th>
                <th>اسم المستخدم</th>
                <th>البريد الالكتروني</th>
                <th>تم إنشاؤه</th>
                <th>اخر تسجيل دخول</th>
                <th>تم إنشاؤه بواسطة</th>
              </tr>
            </thead>
            <tbody className='text-[1rem]'>
              {/* row 1 */}
              {
                admins && admins.map((admin, index) => {
                  const createdAt = new Date(admin.createdAt);
                  const lastLogin = new Date(admin.lastLogin)
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
                    <tr key={admin._id}>
                      {/*<th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>*/}
                      <th>{admin.id}</th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                alt="Avatar Tailwind CSS Component" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{admin.name}</div>
                          </div>
                        </div></td>
                      <td>{admin.username}</td>
                      <td>{admin.email}</td>
                      <td>{formattedCreatedAt}</td>
                      <td>{formattedLastLogin != "Invalid Date" ? formattedLastLogin : ""}</td>
                      <td>{admin.createdBy && admin.createdBy.name}</td>
                      <th>
                        <details className='relative input input-bordered'>
                          <summary className='pt-[0.8rem]'>الأفعال</summary>
                          <ul className='absolute right-0 top-[3rem] w-[9.5rem] z-30 bg-white shadow-md '>
                            <li onClick={() => {
                              handleAction("updateAdmin", admin, index)
                            }} className='px-[1rem] py-[0.5rem] hover:bg-[#f1f1f1] cursor-pointer'>تعديل مسؤول</li>
                            <li onClick={() => {
                              handleAction("updatePassword", admin, index) 
                            }} className='px-[1rem] py-[0.5rem] hover:bg-[#f1f1f1] cursor-pointer'>تعيين كلمة المرور</li>
                            <li onClick={() => {
                              handleAction("stopAccount", admin, index)
                            }} className='px-[1rem] py-[0.5rem] hover:bg-[#f1f1f1] cursor-pointer'>{admin.isBlocked ? "اعادة تنشيط المسؤول" : "تعليق مسؤول"}</li>
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
      <AddAdmin setAlert={setAlert} setAdmins={setAdmins} direction={direction} />
      <UpdateAdmin updateAdmin={updateAdmin} setUpdateAdmin={setUpdateAdmin} setAlert={setAlert} admins={admins} setAdmins={setAdmins} indexAdmin={indexAdmin} />
      <UpdatePassword setAlert={setAlert} updatePassword={updatePassword} setUpdatePassword={setUpdatePassword}/>
      <StopAccount setAlert={setAlert} stopAccount={stopAccount} setStopAccount={setStopAccount} indexAdmin={indexAdmin} admins={admins} setAdmins={setAdmins}/>

    </div>
  )
}

export default AdminsInformations