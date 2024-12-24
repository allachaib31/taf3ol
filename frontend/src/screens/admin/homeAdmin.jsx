import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode, faBell, faChartLine, faCommentDots, faCubes, faDollarSign, faFileCirclePlus, faGear, faGears, faHandHoldingDollar, faHeadset, faHouse, faMoneyCheckDollar, faMoon, faNewspaper, faRightFromBracket, faUser, faUserTie, faUsers, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import headerWave from "../../images/headerWave.svg";
import notificationAudio from "../../audio/notifucation.wav";
import logo from "../../images/Logo.png";
import { Link, Outlet, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import Footer from './footer';
import { getAdminsRoute, getFileRoute, getMessageRoute, getNotificationAdminRoute, host } from '../../utils/apiRoutes';
import { io } from 'socket.io-client';
import { getMethode } from '../../utils/apiFetchs';
import { randomColor } from '../../utils/constants';
const SocketContext = createContext(null);

function HomeAdmin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { accountInfo } = useOutletContext();

  const notificationsRef = useRef(null);
  const messagesRef = useRef(null);

  const [active, setActive] = useState(location.pathname);
  const [title, setTitle] = useState("");
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [listAdmin, setListAdmin] = useState([]);
  const [sendMessage, setSendMessage] = useState({
    toUserId: "",
    message: "",
  });
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [limitMessage, setLimitMessage] = useState(10);
  const [pageMessage, setPageMessage] = useState(1);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      socket.emit('send-message', sendMessage)
      setMessages([...messages, { text: input, isUser: true }]);
      setInput('');
      setSendMessage((prev) => {
        return {
          ...prev,
          message: ""
        }
      })
    }
  };

  const handleScrollNotification = () => {
    if (notificationsRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = notificationsRef.current;
      if (scrollHeight - scrollTop <= clientHeight + 10) {
        setPage((prevPage) => prevPage + 1); // Increase page number
      }
    }
  };

  const handleScrollMessage = () => {
    if (messagesRef.current) {
      const { scrollTop } = messagesRef.current;

      if (scrollTop <= 10) {
        setPageMessage((prevPage) => prevPage + 1); // Load more when at the top
      }
    }
  }
  const playNotificationSound = () => {
    const audio = new Audio(notificationAudio);
    audio.play().catch((error) => {
      console.error("Error attempting to play audio:", error);
    });
  };

  const getAdmins = () => {
    getMethode(getAdminsRoute).then((response) => {
      setListAdmin(response.data);
    }).catch((err) => {
      if (err.response.status == 401 || err.response.status == 403) {
        navigate("/admin/auth")
      }
    })
  }

  const loadNotifications = () => {
    getMethode(`${getNotificationAdminRoute}?limit=${limit}&page=${page}`).then((response) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        ...response.data.notifications,
      ]);
    }).catch((err) => {
      if (err.response.status === 401 || err.response.status === 403) {
        navigate("/admin/auth");
      }
    });
  };

  const getMessage = () => {
    getMethode(`${getMessageRoute}?userid2=${sendMessage.toUserId}&limit=${limitMessage}&page=${pageMessage}`).then((response) => {
      let array = []
      response.data.notifications.forEach((notification) => {
        array.push({ text: notification.content, isUser: notification.receiverId == sendMessage.toUserId });
      })
      setMessages((prev) => {
        return [...array.reverse(), ...prev]
      })
    }).catch((err) => {
      if (err.response.status === 401 || err.response.status === 403) {
        navigate("/admin/auth");
      }
    });
  }

  useEffect(() => {
    getAdmins();
  }, []);

  // Set up socket connection
  useEffect(() => {
    const newSocket = io(host, {
      extraHeaders: {
        Authorization: localStorage.getItem('token'), // Get the token from local storage
      },
    });

    setSocket(newSocket);

    return () => {
      // Cleanup the socket connection when the component unmounts
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  // Listen for socket connection only when socket is initialized
  useEffect(() => {
    if (socket) {
      const handleReceiveNotification = (notification) => {
        if (notification.name === "add Admin") {
          getAdmins();
        }
        setNotifications((prevNotifications) => [
          { content: notification.msg },
          ...prevNotifications
        ]);
        playNotificationSound();
      };

      const handleReceiveMessage = (notification) => {
        if (sendMessage.toUserId === notification.senderId._id) {
          setMessages((prev) => [
            ...prev,
            { text: notification.content, isUser: false }
          ]);
        }
        setNotifications((prevNotifications) => [
          notification,
          ...prevNotifications,
        ]);
        playNotificationSound();
      };

      socket.on('connect', () => {
        console.log('Connected to server');
      });

      socket.on('receive-notification', handleReceiveNotification);
      socket.on('receive-message', handleReceiveMessage);

      return () => {
        // Clean up event listeners when component unmounts or toUserId changes
        socket.off('receive-notification', handleReceiveNotification);
        socket.off('receive-message', handleReceiveMessage);
      };
    }
  }, [sendMessage.toUserId, socket]);


  useEffect(() => {
    loadNotifications();
  }, [page]);

  useEffect(() => {
    if (sendMessage.toUserId != "") {
      getMessage();
    }
  }, [sendMessage.toUserId, pageMessage]);

  useEffect(() => {
    if (messagesRef.current) {
      if (pageMessage == 1) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  // For Notifications Scroll
  useEffect(() => {
    if (notificationsRef.current) {
      notificationsRef.current.addEventListener('scroll', handleScrollNotification);
    }
    return () => {
      if (notificationsRef.current) {
        notificationsRef.current.removeEventListener('scroll', handleScrollNotification); // Correct removal
      }
    };
  }, [notificationsRef]);

  // For Messages Scroll
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.addEventListener('scroll', handleScrollMessage);
    }
    return () => {
      if (messagesRef.current) {
        messagesRef.current.removeEventListener('scroll', handleScrollMessage); // Correct removal
      }
    };
  }, [messagesRef, sendMessage.toUserId]);

  useEffect(() => {
    switch (active) {
      case ("/admin/home" || "/admin/home/"): setTitle("الرئيسية"); break;
      case ("/admin" || "/admin/"): setTitle("المشرفين"); break;
      case ("/admin/users" || "/admin/users/"): setTitle("المستخدمين"); break;
      case ("/admin/orders" || "/admin/orders/"): setTitle("الطلبات"); break;
      case ("/admin/services" || "/admin/services/"): setTitle("الخدمات"); break;
      case ("/admin/payments" || "/admin/payments/"): setTitle("المدفوعات"); break;
      case ("/admin/tickets" || "/admin/tickets/"): setTitle("التذاكر"); break;
      case ("/admin/reports" || "/admin/reports/"): setTitle("التقارير"); break;
      case ("/admin/settings" || "/admin/settings/"): setTitle("الإعدادات"); break;
      case ("/admin/account" || "/admin/account/"): setTitle("الحساب"); break;
    }
  }, [active]);



  return (
    <div>
      <div className="w-full m-0 p-0" style={{
        //backgroundImage: `url(${headerWave})`,
        //backgroundSize: 'cover',
        //backgroundPosition: 'center',
        //backgroundRepeat: 'no-repeat',
        //height: "64vh"
      }}>
        <div className="navbar bg-black text-white">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu text-black menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li onClick={() => setActive("/admin/home")} className={`hover:text-black hover:bg-primary ${active == "/admin/home" || active == "/admin/home/" ? "text-black bg-primary" : "text-black"}`}><Link className='focus:text-black' to="/admin/home"><FontAwesomeIcon icon={faHouse} /> الرئيسية</Link></li>
                <li onClick={() => setActive("/admin")} className={`hover:text-black hover:bg-primary ${active == "/admin" || active == "/admin/" ? "text-black bg-primary" : "text-black"}`}><Link className='focus:text-black' to="/admin"><FontAwesomeIcon icon={faUserTie} /> المشرفين</Link></li>
                <li>
                  <details>
                    <summary onClick={() => setActive("/admin/users")} className={`hover:text-black hover:bg-primary ${active == "/admin/users" || active == "/admin/users/" ? "text-black bg-primary" : "text-black"}`}><FontAwesomeIcon icon={faUsers} /> العملاء</summary>
                    <ul>
                      <li><Link to="/admin/users"> الكل</Link></li>
                      <li><Link to="/admin/transferMoney">عمليات الشحن</Link></li>
                      <li><Link to="/admin/groupMoney">المجموعات</Link></li>
                    </ul>
                  </details>
                </li>

                <li>
                  <details>
                    <summary onClick={() => setActive("/admin/services")} className={`hover:text-black hover:bg-primary ${active == "/admin/services" || active == "/admin/services/" ? "text-black bg-primary" : "text-black"}`}><FontAwesomeIcon icon={faHandHoldingDollar} /> الخدمات</summary>
                    <ul>
                      <li><Link to="/admin/typeServices">انواع الخدمات</Link></li>
                      <li><Link to="/admin/categoriesServices">الفئات</Link></li>
                      {/*<li><Link to="/admin/services"> الخدمات</Link></li>*/}
                    </ul>
                  </details>
                </li>
                <li>
                  <details>
                    <summary onClick={() => setActive("/admin/products")} className={`hover:text-black hover:bg-primary ${active == "/admin/products" || active == "/admin/products/" ? "text-black bg-primary" : "text-black"}`}><FontAwesomeIcon icon={faCubes} />المنتجات</summary>
                    <ul>
                      <li><Link to="/admin/addProductsApi">اضافة من API</Link></li>
                      <li><Link to="/admin/addProducts">اضافة منتج</Link></li>
                      <li><Link to="/admin/productSort">ترتيب المنتجات</Link></li>
                      <li><Link to="/admin/products">الكل</Link></li>
                    </ul>
                  </details>
                </li>
                <li onClick={() => setActive("/admin/stocks")} className={`hover:text-black hover:bg-primary ${active == "/admin/stocks" || active == "/admin/stocks/" ? "text-black bg-primary" : "text-black"}`}><Link to="/admin/stocks"><FontAwesomeIcon icon={faWarehouse} /> المخزون</Link> </li>

                <li onClick={() => setActive("/admin/article")} className={`hover:text-black hover:bg-primary ${active == "/admin/article" || active == "/admin/article/" ? "text-black bg-primary" : "text-black"}`}><Link to="/admin/article"><FontAwesomeIcon icon={faNewspaper} /> المقالات</Link> </li>



                <li onClick={() => setActive("/admin/orders")} className={`hover:text-black hover:bg-primary ${active == "/admin/orders" || active == "/admin/orders/" ? "text-black bg-primary" : "text-black"}`}><Link to="/admin/orders"><FontAwesomeIcon icon={faFileCirclePlus} /> الطلبات</Link> </li>
                <li onClick={() => setActive("/admin/payments")} className={`hover:text-black hover:bg-primary ${active == "/admin/payments" || active == "/admin/payments/" ? "text-black bg-primary" : "text-black"}`}><Link to="/admin/payments"><FontAwesomeIcon icon={faMoneyCheckDollar} /> المدفوعات </Link></li>

                <li>
                  <details>
                    <summary onClick={() => setActive("/admin/rechargeCards")} className={`hover:text-black hover:bg-primary ${active == "/admin/rechargeCards" || active == "/admin/rechargeCards/" ? "text-black bg-primary" : "text-black"}`}><FontAwesomeIcon icon={faBarcode} />بطاقات الشحن</summary>
                    <ul>
                      <li><Link to="/admin/allRechargeCards"> الكل</Link></li>
                      <li><Link to="/admin/cardTitles">عناوين البطاقات</Link></li>
                      <li><Link to="/admin/generateRechargeCards">توليد بطاقات</Link></li>
                    </ul>
                  </details>
                </li>
                <li onClick={() => setActive("/admin/currencies")} className={`hover:text-black hover:bg-primary ${active == "/admin/currencies" || active == "/admin/currencies/" ? "text-black bg-primary" : "text-black"}`}><Link to="/admin/currencies"><FontAwesomeIcon icon={faDollarSign} /> العملات</Link></li>

                <li onClick={() => setActive("/admin/tickets")} className={`hover:text-black hover:bg-primary ${active == "/admin/tickets" || active == "/admin/tickets/" ? "text-black bg-primary" : "text-black"}`}><Link to="/admin/tickets"><FontAwesomeIcon icon={faHeadset} /> تذاكر</Link></li>
                {/*<li onClick={() => setActive("/admin/reports")} className={`hover:text-black hover:bg-primary ${active == "/admin/reports" || active == "/admin/reports/" ? "text-black bg-primary" : "text-black"}`}><Link to="/admin/reports"><FontAwesomeIcon icon={faChartLine} /> التقارير</Link></li>*/}
                {/*<li className='hover:text-primary'><a><FontAwesomeIcon icon={faNewspaper} /> المظهر</a></li>*/}

                <li>
                  <details>
                    <summary onClick={() => setActive("/admin/settings")} className={`hover:text-black hover:bg-primary ${active == "/admin/settings" || active == "/admin/settings/" ? "text-black bg-primary" : "text-black"}`}><FontAwesomeIcon icon={faGears} /> الإعدادات</summary>
                    <ul>
                      <li><Link to="/admin/general"> عام</Link></li>
                      <li><Link to="/admin/api"> API</Link></li>
                      <li><Link to="/admin/advertisement">صورة الاعلانات</Link></li>
                      <li><Link to="/admin/registration">التسجيل</Link></li>
                      <li><Link to="/admin/notifications">ارسال اشعار</Link></li>
                      <li><Link to="/admin/popUpMessages">رسائل المنبثقة</Link></li>
                      <li><Link to="/admin/account">حساب</Link></li>

                    </ul>
                  </details>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-center">
            <a className="w-[107px] h-[60px]"><img src={logo} alt="" /></a>
          </div>
          <div className="navbar-end">
            <details className="dropdown">
              <summary className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div></summary>
              <ul
                ref={notificationsRef}
                className="overflow-y-auto h-72 menu left-[-23px] sm:left-[12px] dropdown-content bg-white text-black rounded-box z-[1] w-60 xs:w-80 p-2 shadow"
              >
                <div>
                  <h1 className='my-[0.8rem]'>إشعارات</h1>
                  <hr />
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => {
                      let msg = '';
                      if (notification.type == 'message') {
                        msg = `${notification.senderId.username} ارسل رسالة لك`
                      }
                      return (
                        <li className='cursor-pointer hover:bg-[#f1f1f1] py-[0.5rem] text-[1rem]' key={index}>
                          {msg == '' ? notification.content : msg}
                        </li>
                      )
                    })
                  ) : (
                    <div className='flex flex-col h-52 gap-[0.3rem] justify-center items-center'>
                      <FontAwesomeIcon icon={faBell} className='text-[1.5rem]' />
                      <h1 className='font-bold'>لا يوجد إشعارات حتى الآن</h1>
                      <h1>ستظهر الإشعارات الجديدة هنا.</h1>
                    </div>
                  )}
                </div>
              </ul>


            </details>
            <details className="dropdown">
              <summary className="btn btn-ghost btn-circle">
                {accountInfo.image ? (
                  <img
                    src={`${getFileRoute}${accountInfo.image}`}
                    crossOrigin="anonymous"
                    className="h-[3rem] w-[3rem] rounded-full"
                  />
                ) : (
                  <div
                    className={`h-[3rem] w-[3rem] rounded-full flex justify-center items-center text-white font-bold text-xl`}
                    style={{ backgroundColor: randomColor }}
                  >
                    {accountInfo.username?.[0]?.toUpperCase() || '?'}
                  </div>
                )}
              </summary>
              <ul className="menu bg-white text-black left-[6px] dropdown-content rounded-box z-[1] w-52 p-2 shadow">
                <li>
                  <Link onClick={() => setActive("/admin/account")} to="/admin/account">
                    <FontAwesomeIcon icon={faGear} /> حساب
                  </Link>
                </li>
                <li>
                  <div onClick={() => {
                    window.localStorage.removeItem("token");
                    navigate("/admin/auth")
                  }}>
                    <FontAwesomeIcon icon={faRightFromBracket} /> تسجيل الخروج
                  </div>
                </li>
              </ul>
            </details>
          </div>
        </div>
        {/* <div className='flex justify-center items-center h-[50%]'>
          <h1 className='text-white font-bold text-[3rem]'>{title}</h1>
        </div>*/}
      </div>


      <div className="relative z-[999]">
        <div
          className="fixed bottom-4 left-4 bg-primary p-[1.5rem] rounded-full cursor-pointer shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon icon={faCommentDots} className='text-3xl' />
        </div>

        {isOpen && (
          <div className="fixed z-[999] bottom-28 left-4 w-80 bg-white border rounded-lg shadow-lg p-4">
            <select onChange={(event) => {
              const selectedUserId = event.target.value; // Get the selected user ID
              setSendMessage({
                toUserId: selectedUserId,
                message: "",
              });
              setMessages([]);
              setPageMessage(1);
            }} className='input input-bordered w-full'>
              <option selected disabled>قم باختيار المسؤول</option>
              {
                listAdmin && listAdmin.map((admin) => {
                  return (
                    <option value={admin._id}>{admin.username} </option>
                  )
                })
              }
            </select>
            {
              sendMessage.toUserId &&
              <div ref={messagesRef} className="h-80 overflow-y-auto mb-2">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 p-2 rounded-lg ${msg.isUser ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black'
                      }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
            }
            {
              sendMessage.toUserId &&
              <form onSubmit={handleSendMessage} className="flex">
                <input
                  type="text"
                  className="flex-1 border rounded-lg p-2"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setSendMessage((prev) => {
                      return {
                        ...prev,
                        message: e.target.value,
                      }
                    })
                  }}
                  placeholder="اكتب رسالة..."
                />
                <button type="submit" className="bg-primary  rounded-lg p-2 ml-2">
                  ارسال
                </button>
              </form>
            }
          </div>
        )}
      </div>

      <SocketContext.Provider value={socket}>
        <div className='py-[2rem] sm:px-[2rem] px-[0.5rem]'>
          <Outlet />
        </div>
        {/*<Footer />*/}
      </SocketContext.Provider>
    </div >
  )
}

export default HomeAdmin;

export const useSocket = () => {
  return useContext(SocketContext);
};
