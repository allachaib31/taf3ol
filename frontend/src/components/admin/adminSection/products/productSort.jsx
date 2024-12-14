import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../screens/admin/homeAdmin';
import { getMethode } from '../../../../utils/apiFetchs';
import { ReactSortable } from 'react-sortablejs';
import { getCategoriesRoute, getProductsRoute, getTypeServicesRoute } from '../../../../utils/apiRoutes';
import LoadingScreen from '../../../loadingScreen';

const sortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: 'ghost',
};

function ProductSort() {
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
      <LoadingScreen loading={loading} component={<div className='mt-[1rem]'>
        {
          products &&
          <ReactSortable
            list={products}
            setList={(currentProducts) => setProducts(currentProducts)}
            {...sortableOptions}
          >
            {
              products && products.map((item, index) => {
                return <div className='text-xl p-[1rem] cursor-move bg-[#F1F1F1] flex items-center gap-[1rem] hover:bg-neutral' key={item._id}>
                  <h1>{item.nameAr}</h1>
                </div>
              })
            }
          </ReactSortable>
        }
      </div>
      } />
      <button className='btn btn-primary w-full mt-[1rem]'>حفظ</button>
    </div>
  )
}

export default ProductSort