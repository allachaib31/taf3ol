import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { AddProductRequirement } from '../modal';
import { deleteOrderRequirementsRoute, getOrderRequirementsRoute, updateProductQuantityQualityRoute } from '../../../../utils/apiRoutes';
import { deleteMethode, getMethode, patchMethode } from '../../../../utils/apiFetchs';
import { useSocket } from '../../../../screens/admin/homeAdmin';
import Alert from '../../../alert';
import Loading from '../../../loading';

function ProductDetailsRequired() {
    const navigate = useNavigate();
    const socket = useSocket();
    const [loading, setLoading] = useState(false);
    const { productDetails, setProductDetails } = useOutletContext();
    const [orderRequirements, setOrderRequirements] = useState([]);
    const [alert, setAlert] = useState({
        display: false,
    });

    const handleSubmit = async () => {
        setLoading(true);
        setAlert({
            display: false,
        });
        try {
            const response = await patchMethode(updateProductQuantityQualityRoute, productDetails);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            setProductDetails(response.data.product);
            socket.emit('broadcast-notification', {
                msg: response.data.contentNotification,
                name: "change Quantity quality",
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
            setLoading(false);
        }
    }
    const handleDelete = async (id) => {
        setAlert({
            display: false,
        });
        try {
            const response = await deleteMethode(`${deleteOrderRequirementsRoute}${id}`);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            setOrderRequirements(prevOrderRequirements => prevOrderRequirements.filter(orderRequirement =>
                !(id == orderRequirement._id) // Adjust based on the structure of `listUserDeleted`
            ));
            socket.emit('broadcast-notification', {
                msg: response.data.contentNotification,
                name: "delete Order Requirements",
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

    useEffect(() => {
        getMethode(`${getOrderRequirementsRoute}${productDetails._id}`).then((response) => {
            setOrderRequirements(response.data.orderRequirement);
            console.log(response.data.orderRequirement)
        }).catch((err) => {
            if (err.response.status == 401 || err.response.status == 403) {
                navigate("/admin/auth")
            }
            setOrderRequirements([]);
        })
    }, [])
    return (
        <div>
            <div className='mt-[1rem]'>
                <h1 className='text-[1.2rem]'>نوعية الكمية </h1>
                <div className='flex items-center gap-[1rem] sm:gap-[3rem]'>
                    <div className='flex flex-col gap-[1rem]'>
                        <div className='flex items-center gap-[0.5rem]'>
                            <input type="radio" name="quantityQuality" className="radio" checked={productDetails.quantityQuality == "بدون"} onClick={(event) => {
                                setProductDetails((prevProductDetails) => {
                                    return {
                                        ...prevProductDetails,
                                        quantityQuality: "بدون"
                                    }
                                })
                            }} /> <span className='text-[1.1rem] font-bold'>بدون</span>
                        </div>
                        <div className='flex items-center gap-[0.5rem]'>
                            <input type="radio" name="quantityQuality" className="radio" checked={productDetails.quantityQuality == "كمية"} onClick={(event) => {
                                setProductDetails((prevProductDetails) => {
                                    return {
                                        ...prevProductDetails,
                                        quantityQuality: "كمية"
                                    }
                                })
                            }} /> <span className='text-[1.1rem] font-bold'>كمية</span>
                        </div>
                        <div className='flex items-center gap-[0.5rem]'>
                            <input type="radio" name="quantityQuality" className="radio" onClick={(event) => {
                                setProductDetails((prevProductDetails) => {
                                    return {
                                        ...prevProductDetails,
                                        quantityQuality: "عداد"
                                    }
                                })
                            }} /> <span className='text-[1.1rem] font-bold'>عداد</span>
                        </div>
                    </div>
                    {
                        productDetails.quantityQuality == "كمية" || productDetails.quantityQuality == "عداد" ? <div className='w-full'>
                            <label className="input input-bordered w-full flex items-center gap-2">
                                اقل كمية
                                <input type="number" className="grow" value={productDetails.minimumQuantity} onChange={(event) => {
                                    setProductDetails((prevProductDetails) => {
                                        return {
                                            ...prevProductDetails,
                                            minimumQuantity: event.target.value
                                        }
                                    })
                                }} />
                            </label>
                            <label className="mt-[1rem] input input-bordered w-full flex items-center gap-2">
                                اكبر كمية
                                <input type="number" className="grow" value={productDetails.maximumQuantity} onChange={(event) => {
                                    setProductDetails((prevProductDetails) => {
                                        return {
                                            ...prevProductDetails,
                                            maximumQuantity: event.target.value
                                        }
                                    })
                                }} />
                            </label>
                        </div> : ""
                    }
                </div>
                <div>
                    {alert.display && <Alert msg={alert} />}
                    {
                        orderRequirements && orderRequirements.map((requirement, index) => {
                            return (
                                <div className='flex flex-col gap-[0.5rem] mt-[1rem]'>
                                    <h1 className='text-xl font-bold'>المطلب {index + 1}</h1>
                                    <label className="input input-bordered flex items-center gap-2">
                                        اسم المطلب AR
                                        <input type="text" className="grow" value={requirement.nameAr} />
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2">
                                        اسم المطلب EN
                                        <input type="text" className="grow" value={requirement.nameEn} />
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2">
                                        توضيح AR
                                        <input type="text" className="grow" value={requirement.descriptionAr} />
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2">
                                        توضيح EN
                                        <input type="text" className="grow" value={requirement.descriptionEn} />
                                    </label>
                                    <select className="select select-bordered w-full">
                                        <option disabled>تحقق</option>
                                        <option value="number" selected={requirement.verification == "number"}>ارقام فقط</option>
                                        <option value="string" selected={requirement.verification == "string"}>احرف فقط</option>
                                        <option value="text" selected={requirement.verification == "text"}>ارقام و احرف فقط</option>
                                        <option value="email" selected={requirement.verification == "email"}>البريد الالكتروني</option>
                                    </select>
                                    <button className='btn btn-error w-fit text-white' onClick={() => handleDelete(requirement._id)}><FontAwesomeIcon icon={faTrash} /></button>
                                </div>
                            )
                        })
                    }
                </div>
                <button className='mt-[1rem] btn btn-secondary' onClick={() => document.getElementById('addProductRequirement').showModal()}><FontAwesomeIcon icon={faPlus} /></button>
                <button className='btn btn-primary w-full mt-[1rem]' disabled={loading} onClick={handleSubmit}>{loading ? <Loading /> : 'حفظ'}</button>
            </div>
            <AddProductRequirement productDetails={productDetails} setOrderRequirements={setOrderRequirements} />
        </div>
    )
}

export default ProductDetailsRequired