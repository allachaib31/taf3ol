import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../../../alert";
import Loading from "../../../../loading";
import {  postMethode, putMethode } from "../../../../../utils/apiFetchs";
import { addApiRoute, updateApiRoute } from "../../../../../utils/apiRoutes";
import { useSocket } from "../../../../../screens/admin/homeAdmin";

function ApiModel({ apiList, setApiList, titleModalApi, inputs, setInputs }) {
    const navigate = useNavigate();
    const socket = useSocket();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        display: false,
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert({
            display: false,
        });
        try {
            const response = await postMethode(addApiRoute, inputs);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            setApiList((prevApiList) => {
                return [...prevApiList, response.data.api]
            })
            socket.emit('broadcast-notification', {
                msg: response.data.contentNotification,
                name: "add Api",
                newApi: response.data.api
            });
        } catch (err) {
            if (err.response.status == 401 || err.response.status == 403) {
                return navigate("/admin/auth");
            }
            setAlert({
                display: true,
                status: false,
                text: err.response.data.msg,
            });
        } finally {
            setLoading(false);
        }
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert({
            display: false,
        });
        try {
            const response = await putMethode(updateApiRoute, inputs);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            let newList = [...apiList];
            newList[inputs.index] = response.data.api;
            setApiList(newList)
            socket.emit('broadcast-notification', {
                msg: response.data.contentNotification,
                name: "update Api",
                apiUpdated: {...response.data.api, index: inputs.index}
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
        <dialog id="apiModel" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{titleModalApi}</h3>
                <hr />
                <div className="mt-[1rem] flex flex-col gap-[1rem]">
                    {alert.display && <Alert msg={alert} />}
                    <label className="input input-bordered flex items-center gap-2">
                        الاسم
                        <input
                            type="text"
                            className="grow"
                            onChange={(event) => {
                                setInputs((prevInputs) => {
                                    return {
                                        ...prevInputs,
                                        name: event.target.value,
                                    };
                                });
                            }}
                            value={inputs.name}
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        الرابط
                        <input
                            type="text"
                            className="grow"
                            onChange={(event) => {
                                setInputs((prevInputs) => {
                                    return {
                                        ...prevInputs,
                                        link: event.target.value,
                                    };
                                });
                            }}
                            value={inputs.link}
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        الرمز المميز
                        <input
                            type="text"
                            className="grow"
                            onChange={(event) => {
                                setInputs((prevInputs) => {
                                    return {
                                        ...prevInputs,
                                        token: event.target.value,
                                    };
                                });
                            }}
                            value={inputs.token}
                        />
                    </label>
                    <select
                        className="select select-bordered w-full"
                        onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    groupesApi: event.target.value,
                                };
                            });
                        }}
                    >
                        <option disabled selected={inputs.groupesApi == "" ? true : false}>
                            اختر المجموعة الخاصة بي api
                        </option>
                        <option value="مواقع تكود ارقام مؤقته" selected={inputs.groupesApi == "مواقع تكود ارقام مؤقته"}>
                            مواقع تكود ارقام مؤقته
                        </option>
                        <option value="مواقع تكويد الارقام قابلة للتجديد" selected={inputs.groupesApi == "مواقع تكويد الارقام قابلة للتجديد"}>
                            مواقع تكويد الارقام قابلة للتجديد
                        </option>
                        <option value="مزودي خدمات السوشل ميديا" selected={inputs.groupesApi == "مزودي خدمات السوشل ميديا"}>
                            مزودي خدمات السوشل ميديا
                        </option>
                        <option value="مزودي بطاقات الهدايا" selected={inputs.groupesApi == "مزودي بطاقات الهدايا"}>مزودي بطاقات الهدايا</option>
                        <option value="برمجة خاصة" selected={inputs.groupesApi == "برمجة خاصة"}>برمجة خاصة</option>
                    </select>
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn ml-[0.5rem]">اغلاق</button>
                        {titleModalApi == "اضافة API" && <button disabled={loading} className="btn btn-primary" onClick={handleSubmit}>{loading ? <Loading /> : 'ارسال'}</button>}
                        {titleModalApi == "تعديل API" && <button disabled={loading} className="btn btn-primary" onClick={handleUpdate}>تحديث</button>}
                    </form>
                </div>
            </div>
        </dialog>
    );
}

export default ApiModel;
