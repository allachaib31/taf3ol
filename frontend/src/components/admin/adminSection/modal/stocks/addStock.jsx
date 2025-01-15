import React, { useEffect, useState } from 'react'
import LoadingScreen from '../../../../loadingScreen'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../../screens/admin/homeAdmin';
import { getMethode, postMethode } from '../../../../../utils/apiFetchs';
import { addStockRoute, getCategoriesRoute, getProductsRoute, getTypeServicesRoute } from '../../../../../utils/apiRoutes';
import Loading from '../../../../loading';
import Alert from '../../../../alert';

function AddStock({ setStocks }) {
    const navigate = useNavigate();
    const socket = useSocket();
    const [loading, setLoading] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [loadingCategorie, setLoadingCategorie] = useState(false);
    const [idService, setIdService] = useState("");
    const [query, setQuery] = useState("");
    const [idCategorie, setIdCategorie] = useState("");
    const [listeTypeService, setListTypeService] = useState([]);
    const [categories, setCategories] = useState(false);
    const [products, setProducts] = useState([]);
    const [inputs, setInputs] = useState({
        idProduct: "",
        cost: ""
    });
    const [alert, setAlert] = useState({
        display: false,
    });

    const handleSubmit = async () => {
        setSubmit(true);
        setAlert({
            display: false,
        });
        try {
            const response = await postMethode(addStockRoute, inputs);
            setStocks((prevStock) => [...prevStock, response.data.newStock])
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            socket.emit('broadcast-notification', {
                msg: response.data.contentNotification,
                name: "add Stock",
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
        setLoading(true);
        getMethode(`${getProductsRoute}?idCategorie=${idCategorie}&idService=${idService}&page=1&limit=ALL&searchText=`).then((response) => {
            const { products } = response.data;
            setProducts(products);
        }).catch((err) => {
            if (err.response.status == 401 || err.response.status == 403) {
                navigate("/admin/auth")
            }
        }).finally(() => {
            setLoading(false);
        })
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
        getProducts();
    }, [idCategorie]);

    return (
        <dialog id="addStock" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">اضافه مخزن</h3>
                <hr />
                {alert.display && <Alert msg={alert} />}
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
                        {
                            categories && categories.map((item, index) => {
                                return <option value={item._id} key={item._id}>{item.nameAr}</option>
                            })
                        }
                    </select>} />
                </div>
                <div>
                    <LoadingScreen loading={loading} component={
                        <select className="select select-bordered w-full" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    idProduct: event.target.value
                                }
                            });
                        }}>
                            <option disabled selected>اختر المنتج</option>
                            {
                                products && products.map((product) => {
                                    return (
                                        <option value={product._id}>{product.nameAr}</option>
                                    )
                                })
                            }
                        </select>
                    } />
                </div>
                <div className='mt-[1rem]'>
                    <label className="input input-bordered flex items-center gap-2">
                    الكلفة
                        <input type="number" className="grow" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    cost: event.target.value
                                }
                            });
                        }}/>
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

export default AddStock