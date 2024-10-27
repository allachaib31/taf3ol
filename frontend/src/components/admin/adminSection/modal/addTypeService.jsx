import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSocket } from '../../../../screens/admin/homeAdmin';
import Loading from "../../../loading";

function AddTypeService() {
    const navigate = useNavigate();
    const socket = useSocket();
    const [inputs, setInputs] = useState({
        nameAr: "",
        nameEn: "",
        image: "",
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
    const handleSubmit = async (e) => { }
    return (
        <dialog id="addTypeService" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-[0.5rem]">اضافة نوع جديد</h3>
                <hr />
                <form action="" className="flex flex-col gap-[1rem] mt-[1rem]">
                    <label className="input input-bordered flex items-center gap-2">
                        اسم النوع
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
                        اسم النوع (الإنجليزية)<input type="text" className="grow" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    nameEn: event.target.value
                                }
                            })
                        }} />
                    </label>
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
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn ml-[0.5rem]">اغلاق</button>
                            <button disabled={loading} className="btn btn-primary" onClick={handleSubmit}>{loading ? <Loading /> : 'ارسال'}</button>
                        </form>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

export default AddTypeService