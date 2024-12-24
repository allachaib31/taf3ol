import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../../../screens/admin/homeAdmin";
import { addUserRoute } from "../../../../../utils/apiRoutes";
import { postMethode } from "../../../../../utils/apiFetchs";
import Loading from "../../../../loading";
import Alert from "../../../../alert";

function AddUser({ setUsers, direction}) {
    const navigate = useNavigate();
    const socket = useSocket();
    const [inputs, setInputs] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        image: ""
    })
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
            form.append("firstName", inputs.firstName);
            form.append("lastName", inputs.lastName);
            form.append("username", inputs.username);
            form.append("email", inputs.email);
            form.append("password", inputs.password);
            form.append("phoneNumber", inputs.phoneNumber)
            form.append("image", inputs.image);
            const response = await postMethode(addUserRoute, form);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            if(direction.id == 1) setUsers(prevUsers => [...prevUsers, response.data.user]);
            else setUsers(prevUsers => [response.data.user ,...prevUsers]);
            socket.emit('broadcast-notification', {
                msg: response.data.notificationMsg,
                name: "add User",
                newUser: response.data.user
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
        <dialog id="addUser" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-[0.5rem]">إضافة مستخدم</h3>
                <hr />
                <form action="" className="flex flex-col gap-[1rem] mt-[1rem]">
                {alert.display && <Alert msg={alert} />}
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
                        الاسم الأول <input type="text" className="grow" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    firstName: event.target.value
                                }
                            })
                        }} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        الاسم الأخير <input type="text" className="grow" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    lastName: event.target.value
                                }
                            })
                        }} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        بريد إلكتروني
                        <input type="text" className="grow" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    email: event.target.value
                                }
                            })
                        }} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        رقم الهاتف
                        <input type="text" className="grow" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    phoneNumber: event.target.value
                                }
                            })
                        }} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                    كلمة المرور
                        <input type="password" className="grow" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    password: event.target.value
                                }
                            })
                        }} />
                    </label>
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
    );
}

export default AddUser;
