import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { patchMethode } from '../../../../../utils/apiFetchs';
import { updatePasswordAdminRoute } from '../../../../../utils/apiRoutes';
import Loading from '../../../../loading';
import { useSocket } from '../../../../../screens/admin/homeAdmin';
import Alert from '../../../../alert';

function UpdatePassword({ updatePassword, setUpdatePassword}) {
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
            const response = await patchMethode(updatePasswordAdminRoute, updatePassword);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            socket.emit('broadcast-notification', {
                msg: `${response.data.responsableName} قام بتغيير كلمة المرور الخاصه بي (${response.data.username})`,
                name: "update password",
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
        <dialog id="updatePassword" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-[0.5rem]">تعديل كلمة المرور</h3>
                <hr />
                <form className='flex flex-col gap-[1rem] mt-[1rem]'>
                {alert.display && <Alert msg={alert} />}
                    <label className="input input-bordered flex items-center gap-2">
                    كلمة المرور الحالية
                        <input type="text" className="grow" onChange={(event) => {
                            setUpdatePassword((prevData) => {
                                return {
                                    ...prevData,
                                    currentPassword: event.target.value
                                }
                            })
                        }} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                    كلمة المرور الجديدة
                        <input type="text" className="grow" onChange={(event) => {
                            setUpdatePassword((prevData) => {
                                return {
                                    ...prevData,
                                    newPassword: event.target.value
                                }
                            })
                        }} />
                    </label>
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

export default UpdatePassword