import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../../screens/admin/homeAdmin';
import Loading from '../../../../loading';
import Alert from '../../../../alert';
import { postMethode } from '../../../../../utils/apiFetchs';
import { addOrderRequirementsRoute } from '../../../../../utils/apiRoutes';

function AddProductRequirement({ productDetails, setOrderRequirements }) {
    const navigate = useNavigate();
    const socket = useSocket();
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        idProducts: productDetails._id,
        nameAr: "",
        nameEn: "",
        descriptionAr: "",
        descriptionEn: "",
        verification: "",
    });
    const [alert, setAlert] = useState({
        display: false,
    });

    const handleSubmit = async () => {
        setLoading(true);
        setAlert({
            display: false,
        });

        try {
            const response = await postMethode(addOrderRequirementsRoute, inputs);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            setOrderRequirements((prevRequirements) => {
                return [...prevRequirements, response.data.savedOrderRequirement]
            })
            socket.emit('broadcast-notification', {
                msg: response.data.contentNotification,
                name: "add Order requirement",
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
        <dialog id="addProductRequirement" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">اضافة مطلب جديد</h3>
                <hr />
                <div className='mt-[1rem] flex flex-col gap-[1rem]'>
                {alert.display && <Alert msg={alert} />}
                    <label className="input input-bordered flex items-center gap-2">
                        اسم AR
                        <input type="text" className="grow" onChange={(event) => {
                        setInputs((prevInputs) => {
                            return {
                                ...prevInputs,
                                nameAr: event.target.value
                            }
                        })
                    }}/>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        اسم EN
                        <input type="text" className="grow" onChange={(event) => {
                        setInputs((prevInputs) => {
                            return {
                                ...prevInputs,
                                nameEn: event.target.value
                            }
                        })
                    }}/>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        توضيح AR
                        <input type="text" className="grow" onChange={(event) => {
                        setInputs((prevInputs) => {
                            return {
                                ...prevInputs,
                                descriptionAr: event.target.value
                            }
                        })
                    }}/>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        توضيح EN
                        <input type="text" className="grow" onChange={(event) => {
                        setInputs((prevInputs) => {
                            return {
                                ...prevInputs,
                                descriptionEn: event.target.value
                            }
                        })
                    }}/>
                    </label>
                    <select className="select select-bordered w-full" onChange={(event) => {
                        setInputs((prevInputs) => {
                            return {
                                ...prevInputs,
                                verification: event.target.value
                            }
                        })
                    }}>
                        <option disabled selected>التحقق</option>
                        <option value="number">ارقام فقط</option>
                        <option value="string">احرف فقط</option>
                        <option value="text">ارقام و احرف فقط</option>
                        <option value="email">البريد الالكتروني</option>
                    </select>
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn ml-[0.5rem]">اغلاق</button>
                        <button className='btn btn-primary'disabled={loading} onClick={handleSubmit}>{loading ? <Loading /> : 'ارسال'}</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default AddProductRequirement