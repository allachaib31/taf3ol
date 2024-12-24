import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../../../screens/admin/homeAdmin";
import { patchMethode, postMethode } from "../../../../../utils/apiFetchs";
import { addCategorieRoute, getFileRoute, updateCategorieRoute } from "../../../../../utils/apiRoutes";
import Loading from "../../../../loading";
import Alert from "../../../../alert";


function CategoriesForService({ titleModalCategorie, listeTypeService, categories, setCategories, params, inputs, setInputs }) {
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
            form.append("idService", inputs.idService);
            form.append("show", inputs.show)
            form.append("image", inputs.image);
            const response = await postMethode(addCategorieRoute, form);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            if(params == "الكل" || params == inputs.idService){
                let newCategories = [...categories, response.data.categorie];
                setCategories(newCategories);
            }

            socket.emit('broadcast-notification', {
                msg: response.data.contentNotification,
                name: "add category",
                newCategories: response.data.categorie
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
            form.append("idService", inputs.idService);
            form.append("show", inputs.show);
            form.append("image", inputs.image);
            const response = await patchMethode(updateCategorieRoute, form);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            setInputs((prev) => {
                return {
                    ...prev,
                    image: response.data.categorie.image
                }
            });
            let newList = [...categories];
            newList[inputs.index] = response.data.categorie;
            setCategories(newList)
            socket.emit('broadcast-notification', {
                msg: response.data.contentNotification,
                name: "update category",
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
        <dialog id="CategoriesForService" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-[0.5rem]">{titleModalCategorie}</h3>
                <hr />
                {alert.display && <Alert msg={alert} />}
                <form action="" className="flex flex-col gap-[1rem] mt-[1rem]">
                    <label className="input input-bordered flex items-center gap-2">
                        إسم الفئة
                        <input type="text" className="grow" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    nameAr: event.target.value
                                }
                            })
                        }}  value={inputs.nameAr} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        اسم الفئة (الإنجليزية)<input type="text" className="grow" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    nameEn: event.target.value
                                }
                            })
                        }}  value={inputs.nameEn} />
                    </label>
                    <select className="select select-bordered w-full font-bold text-[1rem]" onChange={(event) => {
                        setInputs((prevInputs) => {
                            return {
                                ...prevInputs,
                                idService: event.target.value
                            }
                        })
                    }} >
                        <option selected={inputs.idService == "" ? true : false} disabled>اختار نوع الخدمة</option>
                        {
                            listeTypeService && listeTypeService.map((item) => {
                                return <option value={item._id} key={item._id} selected={inputs.idService == item._id}>{item.nameAr}</option>
                            })
                        }
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
                        <FontAwesomeIcon icon={faUpload} /> تحميل أيقونة
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        accept="image/png, image/gif, image/jpeg"
                    />
                    {titleModalCategorie == "تعديل الفئة" &&  <img src={`${getFileRoute}${inputs.image}`} alt="" crossOrigin="anonymous"/>}
                </form>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn ml-[0.5rem]">اغلاق</button>
                        {titleModalCategorie == "إضافة فئة" && <button disabled={loading} className="btn btn-primary" onClick={handleSubmit}>{loading ? <Loading /> : 'ارسال'}</button>}
                        {titleModalCategorie == "تعديل الفئة" && <button disabled={loading} className="btn btn-primary" onClick={handleUpdate}>{loading ? <Loading /> : 'تحديث'}</button>}
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default CategoriesForService