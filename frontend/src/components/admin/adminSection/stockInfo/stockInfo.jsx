import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

function StockInfo() {
    const location = useLocation();
    const [active, setActive] = useState(location.pathname);
    return (
        <div>
            <h1 className='text-3xl font-[900]'>كوكل بلاي</h1>
            <div className='flex justify-center gap-[2rem] flex-wrap mt-[1rem]'>
                <div className="card bg-base-100 w-full md:w-[22%] shadow-xl">
                    <div className="card-body">
                        <h2 className="text-3xl text-center font-bold">كل المخزون</h2>
                        <p className='text-center font-bold text-3xl'>0</p>
                    </div>
                </div>
                <div className="card bg-base-100 w-full md:w-[22%] shadow-xl">
                    <div className="card-body">
                        <h2 className="text-3xl text-center font-bold">متبقي</h2>
                        <p className='text-center font-bold text-3xl'>0</p>
                    </div>
                </div>
                <div className="card bg-base-100 w-full md:w-[22%] shadow-xl">
                    <div className="card-body">
                        <h2 className="text-3xl text-center font-bold">مباع</h2>
                        <p className='text-center font-bold text-3xl'>0</p>
                    </div>
                </div>
                <div className="card bg-base-100 w-full md:w-[22%] shadow-xl">
                    <div className="card-body">
                        <h2 className="text-3xl text-center font-bold">كلفة المتاح</h2>
                        <p className='text-center font-bold text-3xl'>0</p>
                    </div>
                </div>
            </div>
            <div className='my-[2rem] flex justify-center'>
                <div className='bg-[#f5f5f5] rounded-full border py-[0.5rem]'>
                    <Link onClick={() => setActive("/admin/stocksInfo")} to={"/admin/stocksInfo"} className={`px-[1rem] py-[0.5rem] text-[1.2rem] hover:bg-primary ${active == "/admin/stocksInfo" || active == "/admin/stocksInfo/" ?" bg-primary" : ""} rounded-r-full`}> اضافة عناصر </Link>
                    <Link onClick={() => setActive("/admin/stocksInfo/recordSold")} to={"/admin/stocksInfo/recordSold"} className={`px-[1rem] py-[0.5rem] text-[1.2rem] hover:bg-primary border ${active == "/admin/stocksInfo/recordSold" || active == "/admin/stocksInfo/recordSold/" ?" bg-primary" : ""}`}> سجل مباع </Link>
                    <Link onClick={() => setActive("/admin/stocksInfo/available")} to={"/admin/stocksInfo/available"} className={`px-[1rem] py-[0.5rem] text-[1.2rem] hover:bg-primary border ${active == "/admin/stocksInfo/available" || active == "/admin/stocksInfo/available/" ?" bg-primary" : ""}`}> متاح </Link>
                    <Link onClick={() => setActive("/admin/stocksInfo/damaged")} to={"/admin/stocksInfo/damaged"} className={`px-[1rem] py-[0.5rem] text-[1.2rem] hover:bg-primary border ${active == "/admin/stocksInfo/damaged" || active == "/admin/stocksInfo/damaged/" ?" bg-primary" : ""}`}> تالف </Link>
                    <Link onClick={() => setActive("/admin/stocksInfo/requiresReview")} to={"/admin/stocksInfo/requiresReview"} className={`px-[1rem] py-[0.5rem] text-[1.2rem] hover:bg-primary border rounded-l-full ${active == "/admin/stocksInfo/requiresReview" || active == "/admin/stocksInfo/requiresReview/" ?" bg-primary" : ""} `}> يتطلب مراجعة </Link>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default StockInfo