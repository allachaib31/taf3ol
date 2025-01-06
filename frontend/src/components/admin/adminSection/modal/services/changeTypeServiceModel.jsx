import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../../screens/admin/homeAdmin';
import Loading from '../../../../loading';
import { getMethode, putMethode } from '../../../../../utils/apiFetchs';
import { getCategoriesRoute, updateIdServiceProductsRoute } from '../../../../../utils/apiRoutes';
import Alert from '../../../../alert';
import LoadingScreen from '../../../../loadingScreen';

function ChangeTypeServiceModel({ listProductsSelected, listeTypeService, getProducts }) {
    const navigate = useNavigate();
    const socket = useSocket();
    const [idService, setIdService] = useState(false);
    const [categories, setCategories] = useState(false);
    const [idCategorie, setIdCategorie] = useState("");
    const [loadingCategorie, setLoadingCategorie] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [params, setParams] = useState("");
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
            const response = await putMethode(updateIdServiceProductsRoute, {
                productIds: listProductsSelected,
                idService,
                idCategorie
            });
            getProducts()
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            socket.emit('broadcast-notification', {
                msg: response.data.contentNotification,
                name: "update Id Service product",
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

    return (
        <dialog id="changeTypeServiceModel" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">تغيير نوع الخدمة</h3>
                <hr />
                {alert.display && <Alert msg={alert} />}
                <select className="select select-bordered w-full font-bold text-[1rem] mb-[1rem]" onChange={(event) => {
                    setParams(event.target.value)
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

export default ChangeTypeServiceModel