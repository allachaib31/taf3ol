import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { getStockInfoRoute } from '../../../../utils/apiRoutes';
import LoadingScreen from '../../../loadingScreen';
import { getMethode } from '../../../../utils/apiFetchs';

function StockInfo() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const [active, setActive] = useState(location.pathname);
    const [loading, setLoading] = useState(false);
    const [stockInfo, setStockInfo] = useState(false);

    useEffect(() => {
        setLoading(true);
        getMethode(`${getStockInfoRoute}?id=${id}`).then((response) => {
            setStockInfo(response.data.stock)
        }).catch((err) => {
            if (err.response.status == 401 || err.response.status == 403) {
                navigate("/admin/auth")
            }
        }).finally(() => {
            setLoading(false);
        })

    }, []);
    return (
        <div>
            <LoadingScreen loading={loading} component={
                stockInfo && 
                <>
                    <h1 className='text-3xl font-[900]'>{stockInfo.idProduct.nameAr}</h1>
                    <div className='flex justify-center gap-[2rem] flex-wrap mt-[1rem]'>
                        <div className="card bg-base-100 w-full md:w-[22%] shadow-xl">
                            <div className="card-body">
                                <h2 className="text-3xl text-center font-bold">كل المخزون</h2>
                                <p className='text-center font-bold text-3xl'>{stockInfo.quantityAvailable}</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 w-full md:w-[22%] shadow-xl">
                            <div className="card-body">
                                <h2 className="text-3xl text-center font-bold">متبقي</h2>
                                <p className='text-center font-bold text-3xl'>{stockInfo.quantityAvailable - stockInfo.quantitySold}</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 w-full md:w-[22%] shadow-xl">
                            <div className="card-body">
                                <h2 className="text-3xl text-center font-bold">مباع</h2>
                                <p className='text-center font-bold text-3xl'>{stockInfo.quantitySold}</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 w-full md:w-[22%] shadow-xl">
                            <div className="card-body">
                                <h2 className="text-3xl text-center font-bold">كلفة المتاح</h2>
                                <p className='text-center font-bold text-3xl'>{stockInfo.cost.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className='my-[2rem] flex justify-center'>
                        <div className='bg-[#f5f5f5] rounded-full border py-[0.5rem]'>
                            <Link onClick={() => setActive("/admin/stocksInfo")} to={`/admin/stocksInfo?id=${stockInfo._id}`} className={`px-[1rem] py-[0.5rem] text-[1.2rem] hover:bg-primary ${active == "/admin/stocksInfo" || active == "/admin/stocksInfo/" ? " bg-primary" : ""} rounded-r-full`}> اضافة عناصر </Link>
                            <Link onClick={() => setActive("/admin/stocksInfo/recordSold")} to={`/admin/stocksInfo/recordSold?id=${stockInfo._id}`} className={`px-[1rem] py-[0.5rem] text-[1.2rem] hover:bg-primary border ${active == "/admin/stocksInfo/recordSold" || active == "/admin/stocksInfo/recordSold/" ? " bg-primary" : ""}`}> سجل مباع </Link>
                            <Link onClick={() => setActive("/admin/stocksInfo/available")} to={`/admin/stocksInfo/available?id=${stockInfo._id}`} className={`px-[1rem] py-[0.5rem] text-[1.2rem] hover:bg-primary border ${active == "/admin/stocksInfo/available" || active == "/admin/stocksInfo/available/" ? " bg-primary" : ""}`}> متاح </Link>
                            <Link onClick={() => setActive("/admin/stocksInfo/damaged")} to={`/admin/stocksInfo/damaged?id=${stockInfo._id}`} className={`px-[1rem] py-[0.5rem] text-[1.2rem] hover:bg-primary border ${active == "/admin/stocksInfo/damaged" || active == "/admin/stocksInfo/damaged/" ? " bg-primary" : ""}`}> تالف </Link>
                            <Link onClick={() => setActive("/admin/stocksInfo/requiresReview")} to={`/admin/stocksInfo/requiresReview?id=${stockInfo._id}`} className={`px-[1rem] py-[0.5rem] text-[1.2rem] hover:bg-primary border rounded-l-full ${active == "/admin/stocksInfo/requiresReview" || active == "/admin/stocksInfo/requiresReview/" ? " bg-primary" : ""} `}> يتطلب مراجعة </Link>
                        </div>
                    </div>
                    <Outlet context={{stockInfo, setStockInfo}}/>
                </>
            } />

        </div>
    )
}

export default StockInfo