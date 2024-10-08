import React from 'react'
import logo from "../../images/Logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faDollarSign, faSortDown } from '@fortawesome/free-solid-svg-icons';

function Header({ changeLanguage, i18n, t }) {
    return (
        <header className='top-0 bg-black fixed w-full z-[999] h-[100px]'>
            <div className="navbar px-[0.5rem] sm:px-[2rem]">
                <div className="flex-1 gap-[1rem]">
                    <a className="w-[107px] sm:w-[168px] sm:h-auto h-[50px]"><img src={logo} alt="" /></a>
                    <select onChange={(event) => {
                        changeLanguage(event.target.value)
                    }} className='bg-transparent text-[1rem] border-none text-white'>
                        <option className='bg-black' value="ar" selected={i18n.language === 'ar'}>عربي</option>
                        <option className='bg-black' value="en" selected={i18n.language === 'en'}>english</option>
                    </select>
                </div>
                <div className="flex-none gap-[0.5rem]">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <FontAwesomeIcon icon={faDollarSign} className='btn btn-xs px-[0.7rem] py-[0.5rem] rounded-full btn-primary text-black' />
                                <span className={`top-[120%] ${i18n.language === 'ar' ? 'left-[40%]' : 'right-[40%]'} border-none text-white indicator-item`}>{t('currency_title')} <FontAwesomeIcon icon={faSortDown} /></span>
                            </div>
                        </div>
                        <ul className={`menu ${i18n.language === 'ar' ? 'left-[12px]' : 'right-[12px]'} dropdown-content bg-white text-black w-20 rounded-box shadow`}>
                            <ul >
                                <li>$ USD</li>
                            </ul>
                        </ul>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className=" bg-white h-auto flex gap-[1rem] p-1 items-center rounded-[16px] avatar">
                            <FontAwesomeIcon className='hidden xl:block' icon={faSortDown} />
                            <h1 className='hidden xl:block'>محمد</h1>
                            <div className="w-10 rounded-full bg-white">
                                <img
                                    className='w-10'
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li className='hover:bg-[#F1F1F1] cursor-pointer'>
                            {t('account_title')}
                            </li>
                            <li className='hover:bg-[#F1F1F1] cursor-pointer'>{t('logout_title')}</li>
                        </ul>
                    </div>
                    <div>
                        {/* Page content here */}
                        <label htmlFor="my-drawer-2" className="btn bg-transparent p-0 border-none drawer-button xl:hidden">
                            <svg
                                className="swap-off fill-current text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 512 512">
                                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                            </svg>
                        </label>
                    </div>
                    <div className="hidden xl:block dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <FontAwesomeIcon icon={faBell} className='btn btn-xs px-[0.5rem] py-[0.5rem] rounded-full btn-primary text-black' />
                                <span className="badge badge-sm bg-[#FD0D00] border-none text-white py-[0.6rem] indicator-item">8</span>
                            </div>
                        </div>
                        <ul className={`menu ${i18n.language === 'ar' ? 'left-[12px]' : 'right-[12px]'} dropdown-content bg-white text-black w-52 z-[50] rounded-box shadow`}>
                            <h1 className='my-[0.8rem]'>
                            {t('notifucation_title')}
                            </h1>
                            <hr />
                            <div className='flex flex-col h-52 gap-[0.3rem]  justify-center items-center'>
                                <FontAwesomeIcon icon={faBell} className='text-[1.5rem]' />
                                <h1 className='font-bold'>{t('notifucation_header')}</h1>
                                <h1>{t('notifucation_text')}</h1>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header