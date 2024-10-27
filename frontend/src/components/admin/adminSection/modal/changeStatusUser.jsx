import React, { useState } from 'react'
import Loading from '../../../loading'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../screens/admin/homeAdmin';
import { changeStatusUserRoute } from '../../../../utils/apiRoutes';
import { patchMethode } from '../../../../utils/apiFetchs';

function ChangeStatusUser({setAlert, users,setUsers, indexUser, changeStatus, setChangeStatus}) {
    const navigate = useNavigate();
    const socket = useSocket();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert({
            display: false,
        });
        try {
            const response = await patchMethode(changeStatusUserRoute, changeStatus);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            let updateListUsers = [...users];
            updateListUsers[indexUser].status = changeStatus.status;
            setUsers(updateListUsers);
            socket.emit('broadcast-notification', {
                msg: `${response.data.responsableName} قام بتحديث حالة العضو (${response.data.user.username})`,
                name: "change Status",
                updateListUsers: updateListUsers
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
        <dialog id="changeStatus" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-[0.5rem]">تحديث حالة العضو</h3>
                <hr />
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">نشيط</span>
                        <input type="radio" name="status" className="radio checked:bg-success" onChange={() => {
                            setChangeStatus((prev) => {
                                return {
                                    ...prev, status: "نشيط"
                                }
                            })
                        }}/>
                    </label>
                    <label className="label cursor-pointer">
                        <span className="label-text">معلق</span>
                        <input type="radio" name="status" className="radio checked:bg-blue-500" onChange={() => {
                            setChangeStatus((prev) => {
                                return {
                                    ...prev, status: "معلق"
                                }
                            })
                        }}/>
                    </label>
                    <label className="label cursor-pointer">
                        <span className="label-text">غير مؤكد</span>
                        <input type="radio" name="status" className="radio checked:bg-warning" onChange={() => {
                            setChangeStatus((prev) => {
                                return {
                                    ...prev, status: "غير مؤكد"
                                }
                            })
                        }}/>
                    </label>
                    <label className="label cursor-pointer">
                        <span className="label-text">خبيث</span>
                        <input type="radio" name="status" className="radio checked:bg-error" onChange={() => {
                            setChangeStatus((prev) => {
                                return {
                                    ...prev, status: "خبيث"
                                }
                            })
                        }}/>
                    </label>
                </div>
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

export default ChangeStatusUser