import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../screens/admin/homeAdmin';
import { getMethode, putMethode } from '../../../../utils/apiFetchs';
import { ReactSortable } from 'react-sortablejs';
import { getCategoriesRoute, getProductsRoute, getTypeServicesRoute, updateProductRankingRoute } from '../../../../utils/apiRoutes';
import LoadingScreen from '../../../loadingScreen';
import Alert from '../../../alert';
import Loading from '../../../loading';

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
  const [submit, setSubmit] = useState(false);
  const [loadingCategorie, setLoadingCategorie] = useState(false);
  const [listeTypeService, setListTypeService] = useState([]);
  const [categories, setCategories] = useState(false);
  const [idService, setIdService] = useState("");
  const [idCategorie, setIdCategorie] = useState("");
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [alert, setAlert] = useState({
    display: false,
  });
  const handleSubmit = async () => {
    setSubmit(true);
    setAlert({
        display: false,
    });
    try {
        const response = await putMethode(`${updateProductRankingRoute}`, products);
        setAlert({
            display: true,
            status: true,
            text: response.data.msg
        });
        setProducts(response.data.newProducts);
        socket.emit('broadcast-notification', {
            msg: response.data.contentNotification,
            name: "update ranking Products",
            products: response.data.newProducts
        });
    } catch (err) {
        if (err.response.status == 401 || err.response.status == 403) {
            return navigate("/admin/auth")
        }
        setAlert({
            display: true,
            status: false,
            text: err.response.data.msg
        });
    } finally {
        setSubmit(false);
    }
}
  useEffect(() => {
    setLoadingCategorie(true);
    getMethode(`${getCategoriesRoute}?type=${idService}&query=${query}`).then((response) => {
      setCategories(response.data);
    }).catch((err) => {
      if (err.response.status == 401 || err.response.status == 403) {
        navigate("/admin/auth")
      }
    }).finally(() => {
      setLoadingCategorie(false);
    })
  }, [idService, query]);
  useEffect(() => {
    getMethode(`${getTypeServicesRoute}`).then((response) => {
      setListTypeService(response.data);
    }).catch((err) => {
      if (err.response.status == 401 || err.response.status == 403) {
        navigate("/admin/auth")
      }
    })
  }, []);
  useEffect(() => {
    setLoading(true);
    getMethode(`${getProductsRoute}?idCategorie=${idCategorie}&idService=${idService}&page=1&limit=ALL`).then((response) => {
      setProducts(response.data.products);
    }).catch((err) => {
      if (err.response.status == 401 || err.response.status == 403) {
        navigate("/admin/auth")
      }
      setProducts([]);
    }).finally(() => {
      setLoading(false);
    })
  }, [idCategorie])
  /*useEffect(() => {
    if (socket) {
        socket.on('receive-notification', (notification) => {
            if (notification.name == "add Products") {
              if(idCategorie.toString() == notification.products[0].idCategorie.toString()){
                setProducts((prevProducts) => [...prevProducts,...notification.products]);
              }
            } else if (notification.name == "update ranking Products") {
              if(idCategorie.toString() == notification.products[0].idCategorie.toString()){
                setProducts(notification.products);
              }
            }

        });
        return () => {
            // Clean up event listeners when component unmounts
            socket.off('receive-notification');
        };
    }
}, [socket, idCategorie]);*/
  return (
    <div>
      <h1 className='text-3xl font-[900]'>ترتيب المنتجات</h1>
      <div className='flex sm:flex-row flex-col gap-[1rem] my-[1rem]'>
        <select className="select select-bordered w-full font-bold text-[1rem]" onChange={(event) => {
          setIdService(event.target.value)
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
          <option value="All">الكل</option>
          {
            categories && categories.map((item, index) => {
              return <option value={item._id} key={item._id}>{item.nameAr}</option>
            })
          }
        </select>} />
      </div>
      {alert.display && <Alert msg={alert} />}
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
      <button onClick={handleSubmit} disabled={submit} className='btn btn-primary w-full mt-[1rem]'>{submit ? <Loading /> : "حفظ"}</button>
    </div>
  )
}

export default ProductSort