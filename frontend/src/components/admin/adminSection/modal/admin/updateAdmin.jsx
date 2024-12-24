import React, { useState } from 'react'
import Loading from '../../../../loading';
import { putMethode } from '../../../../../utils/apiFetchs';
import { updateAdminRoute } from '../../../../../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../../screens/admin/homeAdmin';
import Alert from '../../../../alert';

function UpdateAdmin({updateAdmin, setUpdateAdmin, admins,setAdmins, indexAdmin}) {
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
            const response = await putMethode(updateAdminRoute, updateAdmin);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            let updateListAdmin = [...admins];
            updateListAdmin[indexAdmin].name = response.data.admin.name;
            updateListAdmin[indexAdmin].username = response.data.admin.username;
            updateListAdmin[indexAdmin].email = response.data.admin.email;
            setAdmins(updateListAdmin);
            socket.emit('broadcast-notification', {
                msg: `${response.data.responsableName} قام بتحديث معلومات المسؤول (${updateListAdmin[indexAdmin].name})`,
                name: "update Admin",
                updateListAdmin: updateListAdmin
            });
        } catch (err) {
            console.log(err)
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
        <dialog id="updateAdmin" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-[0.5rem]">تعديل مسؤول</h3>
                <hr />
                <form className='flex flex-col gap-[1rem] mt-[1rem]'>
                {alert.display && <Alert msg={alert} />}
                    <label className="input input-bordered flex items-center gap-2">
                        الاسم
                        <input type="text" className="grow" onChange={(event) => {
                            setUpdateAdmin((prevAdmin) => {
                                return {
                                    ...prevAdmin,
                                    name: event.target.value
                                }
                            })
                        }} value={updateAdmin.name}/>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        اسم المستخدم
                        <input type="text" className="grow" onChange={(event) => {
                            setUpdateAdmin((prevAdmin) => {
                                return {
                                    ...prevAdmin,
                                    username: event.target.value
                                }
                            })
                        }} value={updateAdmin.username}/>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        بريد إلكتروني
                        <input type="email" className="grow" onChange={(event) => {
                            setUpdateAdmin((prevAdmin) => {
                                return {
                                    ...prevAdmin,
                                    email: event.target.value
                                }
                            })
                        }} value={updateAdmin.email}/>
                    </label>
                </form>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn ml-[0.5rem]">اغلاق</button>
                        <button disabled={loading} className='btn btn-primary' onClick={handleSubmit}>{loading ? <Loading /> : 'تعديل'}</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default UpdateAdmin