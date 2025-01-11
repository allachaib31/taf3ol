import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { handleFileChange, handleFileClick } from '../../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../../screens/admin/homeAdmin';
import { getMethode, postMethode, putMethode } from '../../../../../utils/apiFetchs';
import { addPaymentGatewayRoute, getCoinsRoute, getFileRoute, updatePaymentGatewayRoute } from '../../../../../utils/apiRoutes';
import Loading from '../../../../loading';
import Alert from '../../../../alert';

function BankModel({ paymentsGateway, setPaymentsGateway, inputs, setInputs, titleModel }) {
    const navigate = useNavigate();
    const socket = useSocket();
    const [coins, setCoins] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        display: false,
    });
    const fileInputRef = useRef(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert({
            display: false,
        });
        try {
            const form = new FormData();
            form.append("name", inputs.name);
            form.append("typePaymentGateway", inputs.typePaymentGateway);
            form.append("currencyType", inputs.currencyType);
            form.append("description", inputs.description);
            form.append("tax", inputs.tax);
            form.append("minimumValue", inputs.minimumValue);
            form.append("maximumValue", inputs.maximumValue);
            form.append("requirement", inputs.requirement);
            form.append("image", inputs.image);
            const response = await postMethode(addPaymentGatewayRoute, form);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            setPaymentsGateway((prevPaymentsGateway) => {
                return [...prevPaymentsGateway, response.data.paymentGateway]
            })
            socket.emit('broadcast-notification', {
                msg: response.data.notificationMsg,
                name: "add Payment gateway",
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
    useEffect(() => {
        getMethode(`${getCoinsRoute}`).then((response) => {
            setCoins(response.data.coins);
        }).catch((err) => {
            if (err.response.status == 401 || err.response.status == 403) {
                navigate("/admin/auth")
            }
        })
    }, []);
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert({
            display: false,
        });
        try {
            const form = new FormData();
            form.append("name", inputs.name);
            form.append("typePaymentGateway", inputs.typePaymentGateway);
            form.append("currencyType", inputs.currencyType);
            form.append("description", inputs.description);
            form.append("tax", inputs.tax);
            form.append("minimumValue", inputs.minimumValue);
            form.append("maximumValue", inputs.maximumValue);
            form.append("requirement", inputs.requirement);
            form.append("image", inputs.image);
            const response = await putMethode(`${updatePaymentGatewayRoute}?id=${inputs._id}`, form);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            setInputs((prev) => {
                return {
                    ...prev,
                    image: response.data.paymentGateway.image
                }
            });
            setPaymentsGateway((prev) =>
                prev.map((gateway) =>
                    gateway._id === inputs._id
                        ? { ...gateway, ...response.data.paymentGateway }
                        : gateway
                )
            );
            socket.emit('broadcast-notification', {
                msg: response.data.contentNotification,
                name: "update payment gateway",
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
    return (
        <dialog id="BankModel" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{titleModel}</h3>
                <hr />
                <div className='flex flex-col gap-[1rem] mt-[1rem]'>
                    {alert.display && <Alert msg={alert} />}
                    <label className="input input-bordered flex items-center gap-2">
                        اسم
                        <input type="text" className="grow" value={inputs.name} onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    name: event.target.value
                                }
                            })
                        }} />
                    </label>
                    <select className="select select-bordered w-full" onChange={(event) => {
                        setInputs((prevInputs) => {
                            return {
                                ...prevInputs,
                                currencyType: event.target.value
                            }
                        })
                    }} >
                        <option disabled selected>العملة</option>
                        <option value="حسب اختيار العميل" selected={inputs.currencyType == "حسب اختيار العميل"}>حسب اختيار العميل</option>
                        {
                            coins && coins.map((coin) => {
                                return (
                                    <option value={coin.name} selected={inputs.currencyType == coin.name}>{coin.name}</option>
                                )
                            })
                        }
                    </select>
                    <textarea className="textarea textarea-bordered" value={inputs.description} placeholder="وصف (طريقة التحويل ورقم الحساب)  " onChange={(event) => {
                        setInputs((prevInputs) => {
                            return {
                                ...prevInputs,
                                description: event.target.value
                            }
                        })
                    }} ></textarea>
                    <label className="input input-bordered flex items-center gap-2">
                        الضريبة
                        <input type="number" className="grow" value={inputs.tax} onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    tax: event.target.value
                                }
                            })
                        }} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        اقل قيمة
                        <input type="number" className="grow" value={inputs.minimumValue} onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    minimumValue: event.target.value
                                }
                            })
                        }} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        اكبر قيمة
                        <input type="number" className="grow" value={inputs.maximumValue} onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    maximumValue: event.target.value
                                }
                            })
                        }} />
                    </label>
                    <div className="form-control">
                        <label className="label w-fit gap-[1rem] cursor-pointer">
                            <input type="checkbox" className="toggle" value="image" checked={Array.isArray(inputs.requirement) && inputs.requirement.includes("image")} onChange={(event) => {
                                const isChecked = event.target.checked;
                                const value = event.target.value;

                                setInputs((prevInputs) => {
                                    const updatedRequirements = isChecked
                                        ? [...prevInputs.requirement, value]
                                        : prevInputs.requirement.filter((item) => item !== value);

                                    return {
                                        ...prevInputs,
                                        requirement: updatedRequirements,
                                    };
                                });
                            }} />
                            <span className="label-text text-xl">مطلوب ارسال صورة اشعار</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label w-fit gap-[1rem] cursor-pointer">
                            <input type="checkbox" className="toggle" value="serialNumber" checked={Array.isArray(inputs.requirement) && inputs.requirement.includes("serialNumber")} onChange={(event) => {
                                const isChecked = event.target.checked;
                                const value = event.target.value;

                                setInputs((prevInputs) => {
                                    const updatedRequirements = isChecked
                                        ? [...prevInputs.requirement, value]
                                        : prevInputs.requirement.filter((item) => item !== value);

                                    return {
                                        ...prevInputs,
                                        requirement: updatedRequirements,
                                    };
                                });
                            }} />
                            <span className="label-text text-xl">مطلوب رقم التسلسلي</span>
                        </label>
                    </div>
                    <button className='btn btn-secondary w-full' type="button" onClick={() => handleFileClick(fileInputRef)}>
                        <FontAwesomeIcon icon={faUpload} /> تحميل صورة
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={(event) => handleFileChange(event, setInputs)}
                        accept="image/png, image/gif, image/jpeg"
                    />
                </div>
                {titleModel == "تحديث بنك" && <img src={`${getFileRoute}${inputs.image}`} alt="" crossOrigin="anonymous" />}
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn ml-[0.5rem]">اغلاق</button>
                        {titleModel == "إضافة بنك" ?
                            <button disabled={loading} className='btn btn-primary' onClick={handleSubmit}>{loading ? <Loading /> : 'ارسال'}</button> :
                            <button disabled={loading} className='btn btn-primary' onClick={handleUpdate}>{loading ? <Loading /> : 'تحديث'}</button>
                        }                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default BankModel