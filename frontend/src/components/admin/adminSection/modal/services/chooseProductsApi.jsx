import React, { useEffect, useState } from 'react'
import { getMethode } from '../../../../../utils/apiFetchs';
import { getCategorieServicesApiRoute, getServicesApiRoute } from '../../../../../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../../../../loadingScreen';
import Alert from '../../../../alert';
import { getApis } from '../../../../../utils/constants';

function ChooseProductsApi({ inputs, setInputs }) {
    const navigate = useNavigate();
    const [apiSelected, setApiSelected] = useState("");
    const [apiList, setApiList] = useState(false);
    const [categories, setCategories] = useState(false);
    const [categorieSelected, setCategorieSelected] = useState(false);
    const [servicesApi, setServicesApi] = useState(false);
    const [indexService, setIndexService] = useState(false);
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
    const handleService = () => {
        if (servicesApi.length == 0 || servicesApi == false) {
            window.alert('لم يتم على العثور على اي خدمة');
            return;
        }
        const service = servicesApi[indexService];
        setInputs((prev) => {
            return {
                ...prev,
                nameAr: service.name || service.Title,
                nameEn: service.name || service.Title,
                service: service.id || service.service || categorieSelected,
                country: service.CountryCode || "",
                serverNumber: service.ServerNumber || "",
                costPrice: service.Price || service.price || service.rate,
                forQuantity: (service.qty_values && service.qty_values.min) || (service.min) || 1,
                quantityQuality: ((service.min && service.max) || (service.qty_values) ? "كمية" : "بدون"),
                minimumQuantity: service.min || (service.qty_values && service.qty_values.min) || "",
                maximumQuantity: service.max || (service.qty_values && service.qty_values.max) || "",
                availableQuantity: true,
                provider: {
                        idProvider: apiSelected,
                        nameProduct: service.name || service.Title,
                        isAvailable: true,
                        isActive: true,
                        costPrice: service.Price || service.price || service.rate,
                        service: (service.id || service.service || categorieSelected).toString(),
                        country: service.CountryCode || "",
                        serverNumber: service.ServerNumber || "",
                }
            }
        })
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
        <dialog id="chooseProductsApi" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">اضافة منتج من API</h3>
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
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">اغلاق</button>
                        <button className='btn btn-primary mr-[0.5rem]' onClick={handleService}>جلب المعلومات</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default ChooseProductsApi