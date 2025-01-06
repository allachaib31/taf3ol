import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { getMethode, patchMethode, postMethode } from '../../../../utils/apiFetchs';
import { activeLinkApiProductRoute, addLinkApiProductRoute, deleteLinkApiProductRoute, getCategorieServicesApiRoute, getServicesApiRoute } from '../../../../utils/apiRoutes';
import { getApis } from '../../../../utils/constants';
import Alert from '../../../alert';
import LoadingScreen from '../../../loadingScreen';
import Loading from '../../../loading';
import { useSocket } from '../../../../screens/admin/homeAdmin';

function ProductDetailsApi() {
  const navigate = useNavigate();
  const socket = useSocket();
  const { productDetails, setProductDetails } = useOutletContext();
  const [apiSelected, setApiSelected] = useState("");
  const [apiList, setApiList] = useState(false);
  const [categories, setCategories] = useState(false);
  const [categorieSelected, setCategorieSelected] = useState(false);
  const [servicesApi, setServicesApi] = useState(false);
  const [indexService, setIndexService] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingService, setLoadingService] = useState(false);
  const [alert, setAlert] = useState({
    display: false,
  });

  const handleSearch = (catSelected) => {
    setLoadingService(true);
    setAlert({
      display: false,
    });
    getMethode(`${getServicesApiRoute}?apiId=${apiSelected}&categorieName=${catSelected}`).then((response) => {
      setServicesApi(response.data)
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
      setLoadingService(false);
    })
  }

  const handleActiveLinkApiProduct = async (idProvider) => {
    setAlert({
      display: false,
    });
    try {
      const response = await patchMethode(activeLinkApiProductRoute, {
        idProduct: productDetails._id,
        idProvider: idProvider,
      });
      setProductDetails((prevProductDetails) => {
        return {
          ...prevProductDetails,
          provider: response.data.provider
        }
      })
      setAlert({
        display: true,
        status: true,
        text: response.data.msg
      });
      socket.emit('broadcast-notification', {
        msg: response.data.contentNotification,
        name: "active Api Link",
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
    } 
  }

  const handleDeleteLinkApiProduct = async (idProvider) => {
    setAlert({
      display: false,
    });
    try {
      const response = await patchMethode(deleteLinkApiProductRoute, {
        idProduct: productDetails._id,
        idProvider: idProvider,
      });
      setProductDetails((prevProductDetails) => {
        return {
          ...prevProductDetails,
          provider: response.data.provider
        }
      })
      setAlert({
        display: true,
        status: true,
        text: response.data.msg
      });
      socket.emit('broadcast-notification', {
        msg: response.data.contentNotification,
        name: "delete Api Link",
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
    } 
  }

  const handleSubmit = async () => {
    if (servicesApi.length == 0 || servicesApi == false) {
      window.alert('لم يتم على العثور على اي خدمة');
      return;
    }
    const service = servicesApi[indexService];

    setSubmit(true);
    setAlert({
      display: false,
    });
    try {
      const response = await postMethode(addLinkApiProductRoute, {
        idProduct: productDetails._id,
        idProvider: apiSelected,
        nameProduct: service.name || service.Title,
        costPrice: service.Price || service.price || service.rate,
        service: service.id || service.service || categorieSelected,
        country: service.CountryCode || "",
        serverNumber: service.ServerNumber || "",
        isAvailable: true,
      });
      setProductDetails((prevProductDetails) => {
        return {
          ...prevProductDetails,
          provider: response.data.provider
        }
      })
      setAlert({
        display: true,
        status: true,
        text: response.data.msg
      });
      socket.emit('broadcast-notification', {
        msg: response.data.contentNotification,
        name: "link Api",
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
    getApis(setApiList);
  }, []);
  useEffect(() => {
    if (apiSelected != "") {
      setLoading(true);
      setAlert({
        display: false,
      });
      getMethode(`${getCategorieServicesApiRoute}?apiId=${apiSelected}`).then((response) => {
        setCategories(response.data)
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
    }
  }, [apiSelected]);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className='text-[1rem]'>
            <tr>
              <th>المقدم</th>
              <th>التطبيق</th>
              <th>السعر</th>
              <th>متوفر</th>
              <th>خيارات</th>
            </tr>
          </thead>
          <tbody className='text-[1rem]'>
            {
              productDetails && productDetails.provider.map((providerData) => {
                return (
                  <tr>
                    <td>{providerData.name}</td>
                    <td>{providerData.nameProduct}</td>
                    <td>{providerData.costPrice}</td>
                    <td><td>
                      <div
                        className={`w-4 h-4 rounded-full ${providerData.isAvailable ? "bg-green-500" : "bg-red-500"
                          }`}
                      ></div>
                    </td>
                    </td>
                    <td className='flex gap-[0.5rem]'>
                      <button className='btn btn-secondary' disabled={providerData.isActive} onClick={() => handleActiveLinkApiProduct(providerData.idProvider)}>تفعيل</button>
                      <button className='btn btn-error' disabled={providerData.isActive} onClick={() => handleDeleteLinkApiProduct(providerData.idProvider)}>حذف</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <div className='mt-[1rem]'>
        <h3 className="font-bold text-lg">ربط API</h3>
        <div className='my-[0.1rem]'>
          {alert.display && <Alert msg={alert} />}
        </div>
        <div className='flex flex-col gap-[1rem]'>
          <select onChange={(event) => setApiSelected(event.target.value)} className="select select-bordered w-full font-bold text-[1rem]">
            <option selected disabled>اختر API</option>
            {
              apiList && apiList.map((api) => {
                return (
                  <option value={api._id}>{api.name}</option>
                )
              })
            }
          </select>
          <LoadingScreen loading={loading} component={
            <select onChange={(event) => {
              setCategorieSelected(event.target.value)
              handleSearch(event.target.value);
            }} className="select select-bordered w-full font-bold text-[1rem]">
              <option selected disabled>اختر الفئة</option>
              {
                categories && categories.map((categorie) => {
                  return <option value={categorie.Service}>{categorie.title}</option>
                })
              }
            </select>
          } />
          <LoadingScreen loading={loadingService} component={
            <select onChange={(event) => {
              setIndexService(event.target.value)
            }} className="select select-bordered w-full font-bold text-[1rem]">
              <option selected disabled>اختر الخدمة</option>
              {
                servicesApi && servicesApi.map((service, index) => {
                  return <option value={index}>{service.name || service.Title}</option>
                })
              }
            </select>
          } />
        </div>
        <button className='btn btn-primary mt-[1rem] w-full' disabled={submit} onClick={handleSubmit}>{submit ? <Loading /> : 'ربط'}</button>
      </div>
    </div>
  )
}

export default ProductDetailsApi