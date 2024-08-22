import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faChartLine, faFileCirclePlus, faGear, faGears, faHandHoldingDollar, faHeadset, faMoneyCheckDollar, faMoon, faNewspaper, faRightFromBracket, faUser, faUserTie, faUsers } from "@fortawesome/free-solid-svg-icons";
import headerBackground from "../../images/headerBackground.svg";
import logo from "../../images/Logo.svg";
import { Outlet } from 'react-router-dom';
import Footer from './footer';
function HomeAdmin() {

  /*const [theme, setTheme] = useState(
    !window.localStorage.getItem("theme")
      ? "light"
      : window.localStorage.getItem("theme")
  );*/
  const [theme, setTheme] = useState("myTheme");
  /*useEffect(() => {
    try {
      const screen = document.getElementById("fullScreen");
      screen.setAttribute("data-theme", theme);
    } catch (error) { }
  }, [theme]);*/
  return (
    <div>
      <div className="w-full m-0 p-0" style={{
        backgroundImage: `url(${headerBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: "64vh"
      }}>
        <div className="navbar flex text-white justify-between items-center bg-transparent z-[999]">
          <div className="navbar-start xxl:hidden">
            <div className="dropdown ">
              <div tabIndex={0} role="button" className="btn btn-ghost xxl:hidden">
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
                    d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm w-[100vw] dropdown-content bg-white font-bold text-black z-[999] rounded-box mt-3 p-2 shadow">
                <li><a><FontAwesomeIcon icon={faUserTie} /> المشرفين</a></li>
                <li><a><FontAwesomeIcon icon={faUsers} /> المستخدمين</a></li>
                <li><a><FontAwesomeIcon icon={faFileCirclePlus} /> الطلبات</a> </li>
                <li><a><FontAwesomeIcon icon={faHandHoldingDollar} />الخدمات</a></li>
                <li><a><FontAwesomeIcon icon={faMoneyCheckDollar} /> الدفع </a></li>
                <li><a><FontAwesomeIcon icon={faHeadset} /> تذاكر</a></li>
                <li><a><FontAwesomeIcon icon={faChartLine} /> التقارير</a></li>
                <li><a><FontAwesomeIcon icon={faNewspaper} /> المظهر</a></li>
                <li><a><FontAwesomeIcon icon={faGears} /> الإعدادات</a></li>
              </ul>
            </div>
            <a className="btn btn-ghost text-xl"><img className='h-[50px]' src={logo} alt="" /></a>
          </div>
          <div>
            <a className="btn btn-ghost xxl:block hidden text-xl"><img src={logo} alt="" /></a>
          </div>
          <div className="navbar-center hidden xxl:flex">
            <ul className="menu font-bold text-[1.1rem] w-full menu-horizontal px-1">
              <li><a><FontAwesomeIcon icon={faUserTie} /> المشرفين</a></li>
              <li className='text-primary'><a><FontAwesomeIcon icon={faUsers} /> المستخدمين</a></li>
              <li><a><FontAwesomeIcon icon={faFileCirclePlus} /> الطلبات</a> </li>
              <li><a><FontAwesomeIcon icon={faHandHoldingDollar} />الخدمات</a></li>
              <li><a><FontAwesomeIcon icon={faMoneyCheckDollar} /> الدفع </a></li>
              <li><a><FontAwesomeIcon icon={faHeadset} /> تذاكر</a></li>
              <li><a><FontAwesomeIcon icon={faChartLine} /> التقارير</a></li>
              <li><a><FontAwesomeIcon icon={faNewspaper} /> المظهر</a></li>
              <li><a><FontAwesomeIcon icon={faGears} /> الإعدادات</a></li>
            </ul>
          </div>
          <div className="flex navbar-end w-auto">
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
              <ul className="menu left-[12px] dropdown-content bg-white text-black  rounded-box z-[1] w-52 p-2 shadow">
                <h1 className='my-[0.8rem]'>
                  إشعارات
                </h1>
                <hr />
                <div className='flex flex-col h-52 gap-[0.3rem]  justify-center items-center'>
                  <FontAwesomeIcon icon={faBell} className='text-[1.5rem]' />
                  <h1 className='font-bold'>لا يوجد إشعارات حتى الآن</h1>
                  <h1>ستظهر الإشعارات الجديدة هنا.</h1>
                </div>
                {
                  /**
                   *               <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
                   */
                }
              </ul>
            </details>
            <details className="dropdown">
              <summary className="btn btn-ghost btn-circle">
                <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
              </summary>
              <ul className="menu bg-white text-black left-[6px] dropdown-content rounded-box z-[1] w-52 p-2 shadow">
                {/*<li><div>
                <div>
                  <FontAwesomeIcon className='rotate-[200deg]' icon={faMoon} /> الوضع المظلم
                </div>
                <input type="checkbox" className="toggle" checked={theme == "light" ? false : true}
                  onChange={(e) => {
                    window.localStorage.setItem(
                      "theme",
                      theme == "forest" ? "light" : "forest"
                    );
                    setTheme((value) => (value == "forest" ? "light" : "forest"));
                  }} />
              </div></li>*/}
                <li>
                  <div>
                    <FontAwesomeIcon icon={faGear} /> حساب
                  </div>
                </li>
                <li>
                  <div>
                    <FontAwesomeIcon icon={faRightFromBracket} /> تسجيل الخروج
                  </div>
                </li>
              </ul>
            </details>
          </div>
        </div>
        <div className='flex justify-center items-center h-[50%]'>
          <h1 className='text-white font-bold text-[3rem]'>المستخدمين</h1>
        </div>
      </div>
      <div className='container mx-auto py-[2rem]'>
        <Outlet />
      </div>
      <Footer />
    </div >
  )
}

export default HomeAdmin