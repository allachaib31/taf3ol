import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMethode, postMethode } from '../../../../utils/apiFetchs';
import { addProductApiRoute, getCategorieServicesApiRoute, getCategoriesRoute, getServicesApiRoute, getTypeServicesRoute } from '../../../../utils/apiRoutes';
import Alert from '../../../alert';
import LoadingScreen from '../../../loadingScreen';
import Loading from '../../../loading';
import { useSocket } from '../../../../screens/admin/homeAdmin';
import { getApis } from '../../../../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function AddProductsApi() {
    const navigate = useNavigate();
    const socket = useSocket();
    const [listeTypeService, setListTypeService] = useState([]);
    const [apiList, setApiList] = useState(false);
    const [categories, setCategories] = useState(false);
    const [apiSelected, setApiSelected] = useState("");
    const [categoriesApi, setCategoriesApi] = useState(false);
    const [categorieSelected, setCategorieSelected] = useState(false);
    const [servicesApi, setServicesApi] = useState([]);
    const [originalServicesApi, setOriginalServicesApi] = useState([]);
    const [servicesSelected, setServicesSelected] = useState([]);
    const [idService, setIdService] = useState("");
    const [idCategorie, setIdCategorie] = useState("");
    const [query, setQuery] = useState("");
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingCategorie, setLoadingCategorie] = useState(false);
    const [loadingService, setLoadingService] = useState(false);
    const [alert, setAlert] = useState({
        display: false,
    });

    const handleSearch = (catSelected) => {
        setLoadingService(true);
        setAlert({ display: false });
        getMethode(`${getServicesApiRoute}?apiId=${apiSelected}&categorieName=${catSelected}`)
            .then((response) => {
                const servicesWithChecked = response.data.map((service) => ({
                    ...service,
                    checked: false, // Add a `checked` property to each service
                }));
                setServicesApi(servicesWithChecked);
                setOriginalServicesApi(servicesWithChecked);
            })
            .catch((err) => {
                if (err.response.status === 500) {
                    setAlert({
                        display: true,
                        status: false,
                        text: err.response.data.msg,
                    });
                }
                if (err.response.status === 401 || err.response.status === 403) {
                    navigate("/admin/auth");
                }
            })
            .finally(() => {
                setLoadingService(false);
            });
    };

    const toggleSelectAll = (isChecked) => {
        const updatedServices = servicesApi.map((service) => ({
            ...service,
            checked: isChecked, // Update the `checked` status of all services
        }));

    
        setServicesApi(updatedServices);
        setServicesSelected(isChecked ? updatedServices : []);

    };
    

    const handleCheckboxChange = (serviceId) => {
        const updatedServices = servicesApi.map((service, index) =>
            index === serviceId
                ? { ...service, checked: !service.checked }
                : service
        );
        setServicesApi(updatedServices);
        setServicesSelected(updatedServices.filter((service) => service.checked));
    };

    const handleSubmit = async () => {
        setSubmit(true);
        setAlert({
            display: false,
        });
        try {
            const response = await postMethode(addProductApiRoute, {
                liste: servicesSelected,
                idService,
                idCategorie,
                provider: apiSelected,
                categorieSelected
            });
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            socket.emit('broadcast-notification', {
                msg: response.data.contentNotification,
                name: "add Products",
                //idCategorie,
                //products: response.data.listeProducts
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
        if (apiSelected !== "") {
            setLoading(true);
            setAlert({ display: false });
            getMethode(`${getCategorieServicesApiRoute}?apiId=${apiSelected}`)
                .then((response) => {
                    setCategoriesApi(response.data);
                })
                .catch((err) => {
                    if (err.response.status === 500) {
                        setAlert({
                            display: true,
                            status: false,
                            text: err.response.data.msg,
                        });
                    }
                    if (err.response.status === 401 || err.response.status === 403) {
                        navigate("/admin/auth");
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [apiSelected]);

    useEffect(() => {
        if (idService !== "") {
            setLoadingCategorie(true);
            getMethode(`${getCategoriesRoute}?type=${idService}&query=`).then((response) => {
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
            });
        }
    }, [idService]);
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

    return (
        <div>
            <h1 className="text-3xl font-[900]">منتج جديد من API</h1>
            <div className="my-[0.1rem]">
                {alert.display && <Alert msg={alert} />}
            </div>

            <div className="flex flex-col gap-[1rem]">
                <select
                    onChange={(event) => setApiSelected(event.target.value)}
                    className="select select-bordered w-full font-bold text-[1rem]"
                >
                    <option selected disabled>اختر API</option>
                    {
                        apiList && apiList.map((api) => {
                            return (
                                <option value={api._id} key={api._id}>{api.name}</option>
                            )
                        })
                    }
                </select>
                <LoadingScreen
                    loading={loading}
                    component={
                        <select
                            onChange={(event) => {
                                setCategorieSelected(event.target.value)
                                handleSearch(event.target.value);
                            }}
                            className="select select-bordered w-full font-bold text-[1rem]"
                        >
                            <option selected disabled>اختر الفئة</option>
                            {categoriesApi && categoriesApi.map((categorie) => (
                                <option value={categorie.Service} key={categorie.Service}>
                                    {categorie.title}
                                </option>
                            ))}
                        </select>
                    }
                />
            </div>
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
                <LoadingScreen loading={loadingCategorie} component={
                    <select className="select select-bordered w-full font-bold text-[1rem]" onChange={(event) => {
                        setIdCategorie(event.target.value)
                    }}>
                        <option selected disabled>اختار الفئة</option>
                        {
                            categories && categories.map((item, index) => {
                                return <option value={item._id} key={item._id}>{item.nameAr}</option>
                            })
                        }
                    </select>
                } />
            </div>
            <div className="join">
                <div>
                    <div>
                        <input className="input bg-black text-white input-bordered join-item" placeholder="أبحث عن المنتجات"
                            value={query}
                            onChange={(e) => {
                                let newList = [];
                                for (let service of originalServicesApi ) {
                                    if((service.name || service.Title).toLowerCase().includes(query.toLowerCase())) {
                                        newList.push(service);
                                    }
                                }
                                setQuery(e.target.value);
                                setServicesApi(newList);
                                setServicesSelected([]);
                            }} />
                    </div>
                </div>
                <div className="indicator">
                    <button className="btn join-item"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </div>
            </div>
            <LoadingScreen
                loading={loadingService}
                component={
                    <div className="overflow-x-auto mt-[1rem]">
                        <table className="table">
                            {/* Head */}
                            <thead className="text-[1rem]">
                                <tr>
                                    <th>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                onChange={(e) => toggleSelectAll(e.target.checked)}
                                                checked={
                                                    servicesApi.length > 0 &&
                                                    servicesApi.every((service) => service.checked)
                                                }
                                            />
                                        </label>
                                    </th>
                                    <th>الاسم</th>
                                </tr>
                            </thead>
                            {/* Body */}
                            <tbody className="text-[1rem]">
                            {servicesApi.map((service, index) => {
                                    //if((service.name || service.Title).toLowerCase().includes(query.toLowerCase())) return (
                                        return (<tr key={index}>
                                            <th>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        className="checkbox"
                                                        checked={service.checked || false}
                                                        onChange={() => handleCheckboxChange(index)}
                                                    />
                                                </label>
                                            </th>
                                            <td>{service.name || service.Title}</td>
                                        </tr>)
                                    //)
                                })}
                            </tbody>
                        </table>
                    </div>
                }
            />
            <br />
            <button className='fixed z-[999] bottom-1 right-0 btn btn-primary mr-[0.5rem] w-[99%] mt-[1rem]' disabled={submit} onClick={handleSubmit}>{submit ? <Loading /> : 'ارسال'}</button>
        </div>
    );
}

export default AddProductsApi;
