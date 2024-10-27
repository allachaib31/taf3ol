import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../../screens/admin/homeAdmin";
import { postMethode } from "../../../../utils/apiFetchs";
import { addCategorieRoute } from "../../../../utils/apiRoutes";
import Loading from "../../../loading";
import Alert from "../../../alert";


function CreateCategoriesForService({ titleModalCategorie, categories, setCategories }) {
    const navigate = useNavigate();
    const socket = useSocket();
    const [inputs, setInputs] = useState({
        nameAr: "", nameEn: "",type: "" ,image: ""
    });
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
            form.append("type", inputs.type);
            form.append("image", inputs.image);
            const response = await postMethode(addCategorieRoute, form);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            console.log(response.data.categorie)
            let newCategories = [...categories, response.data.categorie];
            setCategories(newCategories);
            socket.emit('broadcast-notification', {
                msg: response.data.contentNotification,
                name: "add Service",
                newCategories
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
        <dialog id="CreateCategoriesForService" className="modal">
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
                        }} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        اسم الفئة (الإنجليزية)<input type="text" className="grow" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    nameEn: event.target.value
                                }
                            })
                        }} />
                    </label>
                    <select className="select select-bordered w-full font-bold text-[1rem]" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    type: event.target.value
                                }
                            })
                        }} >
                        <option disabled selected>اختر النوع</option>
                        <option value="Manuel">يدوي</option>
                        <option value="smmcpan.com">smmcpan.com</option>
                        <option value="numbersapp.online">numbersapp.online</option>
                    </select>
                    <button
                        className="btn btn-info max-w-sm"
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
                </form>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn ml-[0.5rem]">اغلاق</button>
                        <button disabled={loading} className="btn btn-primary" onClick={handleSubmit}>{loading ? <Loading /> : 'ارسال'}</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default CreateCategoriesForService