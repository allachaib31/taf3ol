import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef, useState } from 'react'
import Loading from '../../../loading';
import { addAdminRoute } from '../../../../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';
import { postMethode } from '../../../../utils/apiFetchs';
import { useSocket } from '../../../../screens/admin/homeAdmin';

function AddAdmin({ setAlert, setAdmins, direction}) {
    const navigate = useNavigate();
    const socket = useSocket();
    const [inputs, setInputs] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        image: ""
    })
    const [loading, setLoading] = useState(false);
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
            form.append("username", inputs.username);
            form.append("email", inputs.email);
            form.append("password", inputs.password);
            form.append("image", inputs.image);
            const response = await postMethode(addAdminRoute, form);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            if(direction == "down") setAdmins(prevAdmins => [...prevAdmins, response.data.newAdmin]);
            else setAdmins(prevAdmins => [response.data.newAdmin ,...prevAdmins]);
            socket.emit('broadcast-notification', {
                msg: `${response.data.newAdmin.createdBy.username} قام باضافة مسؤول جديد (${inputs.username})`,
                name: "add Admin",
                newAdmin: response.data.newAdmin
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
        <dialog id="addAdmin" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-[0.5rem]">إضافة مسؤول</h3>
                <hr />
                <form className='flex flex-col gap-[1rem] mt-[1rem]'>
                    <label className="input input-bordered flex items-center gap-2">
                        الاسم
                        <input type="text" className="grow" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    name: event.target.value
                                }
                            })
                        }} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        اسم المستخدم
                        <input type="text" className="grow" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    username: event.target.value
                                }
                            })
                        }} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        بريد إلكتروني
                        <input type="email" className="grow" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    email: event.target.value
                                }
                            })
                        }} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        كلمة السر
                        <input type="password" className="grow" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    password: event.target.value
                                }
                            })
                        }} />
                    </label>
                    <button className='btn btn-info max-w-sm' type="button" onClick={handleFileClick}>
                        <FontAwesomeIcon icon={faUpload} /> تحميل صورة
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        accept="image/png, image/gif, image/jpeg"
                    />
                </form>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn ml-[0.5rem]">اغلاق</button>
                        <button disabled={loading} className='btn btn-primary' onClick={handleSubmit}>{loading ? <Loading /> : 'ارسال'}</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default AddAdmin