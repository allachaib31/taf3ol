import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSocket } from '../../../../../screens/admin/homeAdmin';
import Loading from "../../../../loading";
import { patchMethode, postMethode } from "../../../../../utils/apiFetchs";
import { addTypeServiceRoute, getFileRoute, updateTypeServiceRoute } from "../../../../../utils/apiRoutes";
import Alert from "../../../../alert";

function TypeServiceModel({ listTypeService, setListTypeService, titleModalTypeService, inputs, setInputs }) {
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
            form.append("nameAr", inputs.nameAr);
            form.append("nameEn", inputs.nameEn);
            form.append("typeProduct", inputs.typeProduct);
            form.append("show", inputs.show);
            form.append("image", inputs.image);
            const response = await postMethode(addTypeServiceRoute, form);
            const newList = [...listTypeService, response.data.typeService]
            setListTypeService(newList)
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            socket.emit('broadcast-notification', {
                msg: response.data.contentNotification,
                name: "add Type Service",
                newList
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
            form.append("nameAr", inputs.nameAr);
            form.append("nameEn", inputs.nameEn);
            form.append("typeProduct", inputs.typeProduct);
            form.append("show", inputs.show);
            form.append("image", inputs.image);
            const response = await patchMethode(updateTypeServiceRoute, form);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            setInputs((prev) => {
                return {
                    ...prev,
                    image: response.data.typeService.image
                }
            });
            let newList = [...listTypeService];
            newList[inputs.index] = response.data.typeService;
            setListTypeService(newList)
            socket.emit('broadcast-notification', {
                msg: response.data.contentNotification,
                name: "add Type Service",
                newList
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
        <dialog id="addTypeService" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-[0.5rem]">{titleModalTypeService}</h3>
                <hr />
                <form action="" className="flex flex-col gap-[1rem] mt-[1rem]">
                    {alert.display && <Alert msg={alert} />}
                    <label className="input input-bordered flex items-center gap-2">
                        اسم النوع
                        <input type="text" className="grow" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    nameAr: event.target.value
                                }
                            })
                        }} value={inputs.nameAr} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        اسم النوع (الإنجليزية)<input type="text" className="grow" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    nameEn: event.target.value
                                }
                            })
                        }} value={inputs.nameEn} />
                    </label>
                    <select onChange={(event) => setInputs((prevInput) => {
                        return {
                            ...prevInput,
                            typeProduct: event.target.value
                        }
                    })} className="select select-bordered w-full">
                        <option disabled selected={inputs.typeProduct == "" ? true : false}>نوع المنتج</option>
                        <option value="الأساسيات الرقمية" selected={inputs.typeProduct == "الأساسيات الرقمية"}>الأساسيات الرقمية</option>
                        <option value="المعززات الاجتماعية" selected={inputs.typeProduct == "المعززات الاجتماعية"}>المعززات الاجتماعية</option>
                        <option value="رقم ايسيم" selected={inputs.typeProduct == "رقم ايسيم"}>رقم ايسيم</option>
                        <option value="مولد رقم الهاتف" selected={inputs.typeProduct == "مولد رقم الهاتف"}>مولد رقم الهاتف</option>
                    </select>
                    <div className="flex items-center gap-[1rem]">
                        <span className="text-xl">عرض</span> <input type="checkbox" className="toggle toggle-primary" checked={inputs.show} onChange={() => setInputs((prev) => {
                            return {
                                ...prev,
                                show: !prev.show
                            }
                        })} value={inputs.show}/>
                    </div>
                    <button
                        className="btn btn-secondary w-full"
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
                    {titleModalTypeService == "تعديل نوع" &&  <img src={`${getFileRoute}${inputs.image}`} alt="" crossOrigin="anonymous"/>}
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn ml-[0.5rem]">اغلاق</button>
                            {titleModalTypeService == "اضافة نوع جديد" && <button disabled={loading} className="btn btn-primary" onClick={handleSubmit}>{loading ? <Loading /> : 'ارسال'}</button>}
                            {titleModalTypeService == "تعديل نوع" && <button disabled={loading} className="btn btn-primary" onClick={handleUpdate}>تحديث</button>}
                        </form>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

export default TypeServiceModel