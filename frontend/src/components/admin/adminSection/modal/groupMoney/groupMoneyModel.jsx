import { faMoneyBill, faPercent, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../../screens/admin/homeAdmin';
import { addGroupMoneyRoute, getFileRoute, updateGroupMoneyRoute } from '../../../../../utils/apiRoutes';
import { patchMethode, postMethode } from '../../../../../utils/apiFetchs';
import Loading from '../../../../loading';
import Alert from '../../../../alert';

function GroupMoneyModel({ titleModalGroupMoney, listTypeService, inputs, setInputs, groupMoneyList, setGroupMoneyList, selectedIdService }) {
    const navigate = useNavigate();
    const socket = useSocket();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        display: false,
    });
    const fileInputRef = useRef(null);
    const handleFileClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setInputs((prevInput) => {
                return {
                    ...prevInput,
                    image: file
                }
            })
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert({
            display: false,
        });
        try {
            const form = new FormData();
            form.append("name", inputs.name);
            form.append("idService", inputs.idService);
            form.append("pricingType", inputs.pricingType);
            form.append("value", inputs.value);
            form.append("negativeBalance", inputs.negativeBalance);
            form.append("agentRatio", inputs.agentRatio);
            form.append("meritValue", inputs.meritValue);
            form.append("image", inputs.image);
            const response = await postMethode(addGroupMoneyRoute, form);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            if (selectedIdService == "الكل" || selectedIdService == inputs.idService) {
                let newGroupMoneyList = [...groupMoneyList, response.data.groupMoney];
                setGroupMoneyList(newGroupMoneyList);
            }
            socket.emit('broadcast-notification', {
                msg: response.data.contentNotification,
                name: "add group money",
                newGroupMoneyList: response.data.groupMoney
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
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert({
            display: false,
        });
        try {
            const form = new FormData();
            form.append("_id", inputs._id);
            form.append("name", inputs.name);
            form.append("idService", inputs.idService);
            form.append("pricingType", inputs.pricingType);
            form.append("value", inputs.value);
            form.append("negativeBalance", inputs.negativeBalance);
            form.append("agentRatio", inputs.agentRatio);
            form.append("meritValue", inputs.meritValue);
            form.append("image", inputs.image);
            const response = await patchMethode(updateGroupMoneyRoute, form);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            setInputs((prev) => {
                return {
                    ...prev,
                    image: response.data.groupMoney.image
                }
            });
            let newGroupMoneyList = [...groupMoneyList];
            newGroupMoneyList[inputs.index] = response.data.groupMoney;
            setGroupMoneyList(newGroupMoneyList);
            socket.emit('broadcast-notification', {
                msg: response.data.contentNotification,
                name: "update group money",
                newGroupMoneyList
            });
        }catch (err) {
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
        <dialog id="groupMoneyModel" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{titleModalGroupMoney}</h3>
                {alert.display && <Alert msg={alert} />}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">نوع الخدمة</span>
                    </div>
                    <select className="select select-bordered" onChange={(event) => {
                        return setInputs((prevInput) => {
                            return {
                                ...prevInput,
                                idService: event.target.value
                            }
                        })
                    }}>
                        <option selected={inputs.idService == "" ? true : false} disabled>اختر نوع الخدمة</option>
                        {
                            listTypeService && listTypeService.map((typeService) => {
                                return (
                                    <option value={typeService._id} selected={inputs.idService == typeService._id}>{typeService.nameAr}</option>
                                )
                            })
                        }
                    </select>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">الاسم</span>
                    </div>
                    <input type="text" placeholder='اكتب هنا' className="input input-bordered w-full" onChange={(event) => {
                        return setInputs((prevInput) => {
                            return {
                                ...prevInput,
                                name: event.target.value
                            }
                        })
                    }} value={inputs.name} />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">نواع التسعيرة</span>
                    </div>
                    <select className="select select-bordered" onChange={(event) => {
                        return setInputs((prevInput) => {
                            return {
                                ...prevInput,
                                pricingType: event.target.value
                            }
                        })
                    }}>
                        <option value="Increase" selected={inputs.pricingType == "Increase"}>Increase</option>
                        <option value="Percent" selected={inputs.pricingType == "Percent"}>Percent</option>
                    </select>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">القيمة</span>
                    </div>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder='اكتب هنا' onChange={(event) => {
                            return setInputs((prevInput) => {
                                return {
                                    ...prevInput,
                                    value: event.target.value
                                }
                            })
                        }} value={inputs.value}/>
                        <FontAwesomeIcon icon={inputs.pricingType == "Increase" ? faMoneyBill : faPercent} />
                    </label>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">في حالة رصيد السالب</span>
                    </div>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder='اكتب هنا' onChange={(event) => {
                            return setInputs((prevInput) => {
                                return {
                                    ...prevInput,
                                    negativeBalance: event.target.value
                                }
                            })
                        }} value={inputs.negativeBalance}/>
                        <FontAwesomeIcon icon={inputs.pricingType == "Increase" ? faMoneyBill : faPercent} />
                    </label>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">نسبة الوكيل</span>
                    </div>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder='اكتب هنا' onChange={(event) => {
                            return setInputs((prevInput) => {
                                return {
                                    ...prevInput,
                                    agentRatio: event.target.value
                                }
                            })
                        }} value={inputs.agentRatio}/>
                        <FontAwesomeIcon icon={faPercent} />
                    </label>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">قيمة الاستحقاق</span>
                    </div>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder='اكتب هنا' onChange={(event) => {
                            return setInputs((prevInput) => {
                                return {
                                    ...prevInput,
                                    meritValue: event.target.value
                                }
                            })
                        }} value={inputs.meritValue}/>
                        <FontAwesomeIcon icon={faMoneyBill} />
                    </label>
                </label>
                <button
                    className="mt-[1rem] btn btn-secondary w-full"
                    type="button"
                    onClick={handleFileClick}
                >
                    <FontAwesomeIcon icon={faUpload} /> تحميل صورة
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept="image/png, image/gif, image/jpeg"
                />
                {titleModalGroupMoney == "تعديل مجموعة" &&  <img src={`${getFileRoute}${inputs.image}`} alt="" crossOrigin="anonymous"/>}
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn ml-[0.5rem]">اغلاق</button>
                        {titleModalGroupMoney == "مجموعة جديدة" && <button disabled={loading} className="btn btn-primary" onClick={handleSubmit}>{loading ? <Loading /> : 'ارسال'}</button>}
                        {titleModalGroupMoney == "تعديل مجموعة" && <button disabled={loading} className="btn btn-primary" onClick={handleUpdate}>{loading ? <Loading /> : 'تحديث'}</button>}
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default GroupMoneyModel