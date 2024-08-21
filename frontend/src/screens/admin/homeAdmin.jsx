import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faChartLine, faFileCirclePlus, faGear, faGears, faHandHoldingDollar, faHeadset, faMoneyCheckDollar, faMoon, faNewspaper, faRightFromBracket, faUser, faUserTie, faUsers } from "@fortawesome/free-solid-svg-icons";
import headerBackground from "../../images/headerBackground.svg";
import footer from "../../images/footer.svg";
import logo from "../../images/Logo.svg";
import { Outlet } from 'react-router-dom';
function HomeAdmin() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 776);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 776);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
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
    <div dir="rtl" lang="ar" className='fontCairo min-h-screen'>
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
      <div className={`bg-black h-full lg:h-[45vh] flex justify-center items-center w-full m-0 p-0 ${isLargeScreen ? 'bg-cover bg-center bg-no-repeat' : ''}`}
        style={{
          backgroundImage: isLargeScreen ? `url(${footer})` : 'none',
        }}>
        <footer className="footer justify-around bg-transparent text-white p-10">
          <aside>
            <img src={logo} alt="" />
            <p className='sm:block hidden text-[1.1rem]'>
              المنصة الارخص والاسرع لجميع خدمات التسويق الالكتروني <br /> وزيادة المتابعين التي تخدم العملاء من جميع انحاء العالم.
            </p>
            <p className='sm:hidden block text-[1rem]'>
              المنصة الارخص والاسرع لجميع خدمات التسويق الالكتروني  وزيادة المتابعين التي تخدم العملاء من جميع انحاء العالم.
            </p>
          </aside>
          <nav>
            <h6 className="footer-title text-[1.2rem]">روابط سريعة</h6>
            <a className="link link-hover text-[1rem]">كيفية الاستخدام</a>
            <a className="link link-hover text-[1rem]">الاسئلة الشائعة</a>
            <a className="link link-hover text-[1rem]">الشروط</a>
          </nav>
          <nav>
            <h6 className="footer-title text-[1.2rem]">روابط سريعة</h6>
            <p className="link link-hover text-[1rem]">Email: <span>info@gmail.com</span></p>
            <div className="grid grid-flow-col gap-4 mt-[1rem]">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current">
                  <path
                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current">
                  <path
                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current">
                  <path
                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            </div>
          </nav>
        </footer>
      </div>
      <footer className="footer footer-center bg-base-300 text-base-content p-4">
          <aside>
            <p className='font-bold text-[1rem]'>حقوق النشر © {new Date().getFullYear()} Tafa3ol - جميع الحقوق محفوظة صمم بإتقان من طرف KaizeNova</p>
          </aside>
        </footer>
    </div >
  )
}

export default HomeAdmin