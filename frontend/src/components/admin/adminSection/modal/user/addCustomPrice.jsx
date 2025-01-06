import { faPercent } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../../screens/admin/homeAdmin';
import { getMethode, postMethode } from '../../../../../utils/apiFetchs';
import { addCustomPriceRoute, getCategoriesRoute, getProductsRoute, getTypeServicesRoute, getUsersRoute } from '../../../../../utils/apiRoutes';
import LoadingScreen from '../../../../loadingScreen';
import Loading from '../../../../loading';
import Alert from '../../../../alert';

function AddCustomPrice({ setCustomPrices }) {
    const navigate = useNavigate();
    const socket = useSocket();
    const [listeTypeService, setListTypeService] = useState([]);
    const [query, setQuery] = useState("");
    const [params, setParams] = useState("");
    const [submit, setSubmit] = useState(false);
    const [loadingCategorie, setLoadingCategorie] = useState(false);
    const [loadingProduct, setLoadingProduct] = useState(false);
    const [categories, setCategories] = useState(false);
    const [idCategorie, setIdCategorie] = useState("");
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState(false);
    const [inputs, setInputs] = useState({
        idUser: "",
        idService: "",
        idCategorie: "",
        idProduct: "",
        cost: "",
        value: ""
    });
    const [alert, setAlert] = useState({
        display: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);
        setAlert({
            display: false,
        });

        try {
            const response = await postMethode(addCustomPriceRoute, inputs);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            setCustomPrices((prevCustomPrices) => {
                return [
                    ...prevCustomPrices,
                    response.data.newCustomPrice
                ]
            })
            socket.emit('broadcast-notification', {
                msg: response.data.notificationMsg,
                name: "add customPrice",
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

    const getProducts = () => {
        setLoadingProduct(true);
        getMethode(`${getProductsRoute}?idCategorie=${idCategorie}&page=1&limit=ALL&searchText=`).then((response) => {
            const { products } = response.data;
            setProducts(products);
        }).catch((err) => {
            if (err.response.status == 401 || err.response.status == 403) {
                navigate("/admin/auth")
            }
        }).finally(() => {
            setLoadingProduct(false);
        })
    }
    useEffect(() => {
        getProducts();
    }, [idCategorie]);
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
        setLoadingCategorie(true);
        getMethode(`${getCategoriesRoute}?type=${params}&query=${query}`).then((response) => {
            setCategories(response.data);
        }).catch((err) => {
            if (err.response.status == 401 || err.response.status == 403) {
                navigate("/admin/auth")
            }
        }).finally(() => {
            setLoadingCategorie(false);
        })
    }, [params, query]);
    useEffect(() => {
        getMethode(`${getUsersRoute}?page=1&limit=ALL`).then((response) => {
            const { users } = response.data;

            setUsers(users);
        }).catch((err) => {
            if (err.response.status == 401 || err.response.status == 403) {
                navigate("/admin/auth")
            }
        })
    }, []);

    return (
        <dialog id="AddCustomPrice" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">اضافة سعر مخصص</h3>
                <hr />
                <div className='flex flex-col gap-[1rem] mt-[1rem]'>
                    {alert.display && <Alert msg={alert} />}
                    <select className="select select-bordered w-full" onChange={(event) => {
                        setInputs((prevInputs) => {
                            return {
                                ...prevInputs,
                                idUser: event.target.value
                            }
                        })
                    }}>
                        <option disabled selected>اختر المستخدم</option>
                        {
                            users && users.map((user) => {
                                return (
                                    <option value={user._id}>{user.username}</option>
                                )
                            })
                        }
                    </select>
                    <select className="select select-bordered w-full font-bold text-[1rem]" onChange={(event) => {
                        setParams(event.target.value);
                        setInputs((prevInputs) => {
                            return {
                                ...prevInputs,
                                idService: event.target.value
                            }
                        })
                    }}>
                        <option disabled selected>اختار نوع الخدمة</option>
                        {
                            listeTypeService && listeTypeService.map((item) => {
                                return <option value={item._id} key={item._id}>{item.nameAr}</option>
                            })
                        }
                    </select>
                    <LoadingScreen loading={loadingCategorie} component={<select className="select select-bordered w-full font-bold text-[1rem]" onChange={(event) => {
                        setIdCategorie(event.target.value);
                        setInputs((prevInputs) => {
                            return {
                                ...prevInputs,
                                idCategorie: event.target.value
                            }
                        })
                    }}>
                        <option selected disabled>اختار الفئة</option>
                        {
                            categories && categories.map((item, index) => {
                                return <option value={item._id} key={item._id}>{item.nameAr}</option>
                            })
                        }
                    </select>} />
                    <LoadingScreen loading={loadingProduct} component={<select className="select select-bordered w-full font-bold text-[1rem]" onChange={(event) => {
                        setInputs((prevInputs) => {
                            return {
                                ...prevInputs,
                                idProduct: products[event.target.value]._id,
                                cost: products[event.target.value].costPrice,
                            }
                        })
                    }}>
                        <option selected disabled>اختار المنتج</option>
                        {
                            products && products.map((item, index) => {
                                return <option value={index} key={item._id}>{item.nameAr}</option>
                            })
                        }
                    </select>} />
                    <label className="input input-bordered flex items-center gap-2">
                        الكلفة
                        <input type="number" className="grow" disabled value={inputs.cost} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        القيمة   <FontAwesomeIcon icon={faPercent} />
                        <input type="number" className="grow" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    value: event.target.value
                                }
                            })
                        }} />
                    </label>
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn ml-[0.5rem]">اغلاق</button>
                        <button className='btn btn-primary' disabled={submit} onClick={handleSubmit}>{submit ? <Loading /> : 'ارسال'}</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default AddCustomPrice