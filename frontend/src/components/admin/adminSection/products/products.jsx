import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../screens/admin/homeAdmin';
import { getMethode } from '../../../../utils/apiFetchs';
import { getCategoriesRoute, getFileRoute, getProductsRoute, getTypeServicesRoute, host } from '../../../../utils/apiRoutes';
import LoadingScreen from '../../../loadingScreen';
import Alert from '../../../alert';

function Products() {
  const navigate = useNavigate();
  const socket = useSocket();
  const [loading, setLoading] = useState(false);
  const [loadingCategorie, setLoadingCategorie] = useState(false);
  const [listeTypeService, setListTypeService] = useState([]);
  const [categories, setCategories] = useState(false);
  const [params, setParams] = useState("");
  const [idCategorie, setIdCategorie] = useState("");
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [alert, setAlert] = useState({
    display: false,
  });

  useEffect(() => {
    setLoadingCategorie(true);
    getMethode(`${getCategoriesRoute}?type=${params}&query=${query}`).then((response) => {
      setCategories(response.data);
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
      setLoadingCategorie(false);
    })
  }, [params, query]);
  useEffect(() => {
    getMethode(`${getTypeServicesRoute}`).then((response) => {
      setListTypeService(response.data);
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
    })
  }, []);
  useEffect(() => {
    setLoading(true);
    getMethode(`${getProductsRoute}?idCategorie=${idCategorie}`).then((response) => {
      setProducts(response.data);
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
  }, [idCategorie])
  return (
    <div>
      <h1 className='text-3xl font-[900]'>المنتجات</h1>
      <div className='flex sm:flex-row flex-col gap-[1rem] my-[1rem]'>
        <select className="select select-bordered w-full font-bold text-[1rem]" onChange={(event) => {
          setParams(event.target.value)
        }}>
          <option disabled selected>اختار نوع الخدمة</option>
          {
            listeTypeService && listeTypeService.map((item) => {
              return <option value={item._id} key={item._id}>{item.nameAr}</option>
            })
          }
        </select>
        <LoadingScreen loading={loadingCategorie} component={<select className="select select-bordered w-full font-bold text-[1rem]" onChange={(event) => {
          setIdCategorie(event.target.value)
        }}>
          <option selected disabled>اختار الفئة</option>
          {
            categories && categories.map((item, index) => {
              return <option value={item._id} key={item._id}>{item.nameAr}</option>
            })
          }
        </select>} />
      </div>
      {alert.display && <Alert msg={alert} />}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className='text-[1rem]'>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>الاسم</th>
              <th>العملة</th>
              <th>تسعير لكمية</th>
              <th>الكلفة</th>
              <th>تفاصيل API</th>
              <th>الظهور</th>
              <th>متوفر</th>
              <th>السعر API</th>
              <th>السعر </th>
            </tr>
          </thead>
          <tbody className='text-[1rem]'>
            {
              products && products.map((product) => {
                return (
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={`${getFileRoute}${product.image}`}
                              crossOrigin="anonymous"/>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{product.nameAr}</div>
                        </div>
                      </div>
                    </td>
                    <td>USD</td>
                    <td>{product.forQuantity}</td>
                    <td>{product.price[0].costPrice}</td>
                    <td>{product.provider}</td>
                    <td><input type="checkbox" checked={product.show} className="checkbox" /></td>
                    <td><input type="checkbox" checked={product.availableQuantity} className="checkbox" /></td>
                    <td>{product.price[0].costPrice}/{product.forQuantity}</td>
                    <td>{product.price[0].sellingPrice}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Products