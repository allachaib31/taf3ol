import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { patchMethode } from '../../../../utils/apiFetchs';
import { blockAdminRoute } from '../../../../utils/apiRoutes';
import Loading from '../../../loading';
import { useSocket } from '../../../../screens/admin/homeAdmin';

function StopAccount({ setAlert, stopAccount, indexAdmin, admins, setAdmins }) {
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
            const response = await patchMethode(blockAdminRoute, stopAccount);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            let updateListAdmin = [...admins];
            updateListAdmin[indexAdmin].isBlocked = stopAccount.block;
            setAdmins(updateListAdmin);
            socket.emit('broadcast-notification', {
                msg: `${response.data.responsableName} قام بتغيير حالة المسؤول (${response.data.admin.username})`,
                name: "stop Account",
                updateListAdmin: updateListAdmin
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
        <dialog id="stopAccount" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-[0.5rem]">تحديث حالة المسؤول</h3>
                <hr />

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

export default StopAccount