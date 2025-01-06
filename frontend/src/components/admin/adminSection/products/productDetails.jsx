import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../screens/admin/homeAdmin';
import { getProductDetailsRoute } from '../../../../utils/apiRoutes';
import LoadingScreen from '../../../loadingScreen';
import { getMethode } from '../../../../utils/apiFetchs';

function ProductDetails() {
  const navigate = useNavigate();
  const socket = useSocket();
  const location = useLocation();
  const [edit, setEdit] = useState(location.pathname == "/admin/productDetails" ? "general" : location.pathname == "/admin/productDetails/productDetailsRequired" ? "required" : "api");
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState(false);
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    setLoading(true);
    getMethode(`${getProductDetailsRoute}?id=${queryParams.get("id")}`).then((response) => {
      setProductDetails(response.data);
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
      <LoadingScreen loading={loading} component={productDetails && <>
        <h1 className='text-xl font-[900]'>{productDetails.nameAr}</h1>
        <div className='mt-[1rem] flex justify-center'>
          <Link to={`/admin/productDetails?id=${queryParams.get("id")}`} onClick={() => setEdit("general")} className={`badge rounded-none rounded-r-full p-[1rem] cursor-pointer hover:badge-ghost ${edit == "general" ? "badge-ghost" : ""} text-xl`}>عام</Link>
          <Link to={`/admin/productDetails/productDetailsRequired?id=${queryParams.get("id")}`} onClick={() => setEdit("required")} className={`badge rounded-none p-[1rem] cursor-pointer hover:badge-ghost ${edit == "required" ? "badge-ghost" : ""} text-xl`}>المتطلبات</Link>
          <Link to={`/admin/productDetails/productDetailsApi?id=${queryParams.get("id")}`} onClick={() => setEdit("api")} className={`badge rounded-none rounded-l-full p-[1rem] cursor-pointer hover:badge-ghost ${edit == "api" ? "badge-ghost" : ""} text-xl`}>ربط API</Link>
        </div>
        <Outlet context={{productDetails, setProductDetails}}/>
      </>
      } />
    </div>
  )
}

export default ProductDetails