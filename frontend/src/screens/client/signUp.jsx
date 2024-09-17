import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../images/Logo.svg";
import signUpImage from "../../images/signUp.png";
import googleIcon from "../../images/googleIcon.png";
function SignUp() {
    return (
        <div dir="rtl" lang="ar" className='fontZain'>
            <header className="navbar h-[100px] text-white bg-black">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost "><img className='w-[214px] h-[68px]' src={logo} alt="" /></Link>
                </div>
                <div className="flex-none">
                    <div className="menu menu-horizontal px-1">
                        <Link to="/" className='btn text-[1rem] btn-primary'>تسجيل الدخول</Link>
                    </div>
                </div>
            </header>
            <div data-aos="zoom-in" className='flex justify-center mt-[0.5rem]'>
                <h1 id='titleSignUp' className='z-[2] text-[40px] sm:text-[70px] font-[900]'>تسجيل الحساب</h1>
            </div>
            <div data-aos="zoom-in" className='container mx-auto flex md:flex-row flex-col-reverse items-center md:items-start md:justify-between'>
                <div className='md:w-1/2 sm:px-0 px-[1rem]'>
                    <form action="" className='flex flex-col gap-[0.5rem]'>
                        <div className='flex flex-col gap-[0.5rem]'>
                            <label htmlFor="username" className='text-[1.1rem]'>اسم المستخدم</label>
                            <input type="text" className='input input-bordered w-full' placeholder='ادخل اسم المستخدم..' />
                        </div>
                        <div className='flex gap-[1rem] w-full'>
                            <div className='flex flex-col w-1/2 gap-[0.5rem]'>
                                <label htmlFor="firstName" className='text-[1.1rem]'>الاسم الأول</label>
                                <input type="text" className='input input-bordered w-full' placeholder='ادخل الاسم الأول..' />
                            </div>
                            <div className='flex flex-col w-1/2 gap-[0.5rem]'>
                                <label htmlFor="lastName" className='text-[1.1rem]'>الاسم الأخير</label>
                                <input type="text" className='input input-bordered w-full' placeholder='ادخل الاسم الأخير..' />
                            </div>
                        </div>
                        <div className='flex flex-col gap-[0.5rem]'>
                            <label htmlFor="email" className='text-[1.1rem]'>البريد الالكتروني</label>
                            <input type="email" className='input input-bordered w-full' placeholder='ادخل البريد الالكتروني..' />
                        </div>
                        <div className='flex flex-col gap-[0.5rem]'>
                            <label htmlFor="phoneNumber" className='text-[1.1rem]'>رقم الوتساب</label>
                            <input type="text" className='input input-bordered w-full' placeholder='ادخل رقم الوتساب..' />
                        </div>
                        <div className='flex flex-col gap-[0.5rem]'>
                            <label htmlFor="password" className='text-[1.1rem]'>كلمة المرور</label>
                            <input type="password" className='input input-bordered w-full' placeholder='ادخل كلمة المرور..' />
                        </div>
                        <button className='btn btn-primary text-[1.3rem] font-bold'>التالي</button>
                        <div className="divider"> أو</div>
                        <button className='btn btn-outline btn-primary hover:btn-secondary'><img src={googleIcon} alt="" /></button>
                        <p className='font-bold text-center text-[1.1rem] mt-[1rem]'> هل لديك حساب !<Link to="/" className='underline text-primary '> تسجيل الدخول</Link></p>
                    </form>
                </div>
                <div>
                    <img src={signUpImage} className='w-[435px] md:w-auto md:h-auto' alt="" />
                </div>
            </div>
        </div>
    )
}

export default SignUp