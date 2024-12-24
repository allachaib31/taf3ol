import React, { useState } from 'react'
import Loading from '../../../../loading'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../../screens/admin/homeAdmin';
import Alert from '../../../../alert';
import { deleteApiRoute } from '../../../../../utils/apiRoutes';
import { patchMethode } from '../../../../../utils/apiFetchs';

function DeleteApiModel({ apiList, setApiList, indexApi}) {
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
            const response = await patchMethode(`${deleteApiRoute}`, apiList[indexApi]);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            let newApiList = [...apiList];
            newApiList.splice(newApiList, 1);
            setApiList(newApiList);
            socket.emit('broadcast-notification', {
                msg: response.data.contentNotification,
                name: "delete Api",
                apiDeleted: response.data.api
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
        <dialog id="deleteApiModel" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">حذف API</h3>
                <hr />
                {alert.display && <Alert msg={alert} />}
                <p>هل انت متاكد انك تريد حذف API.</p>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn ml-[0.5rem]">اغلاق</button>
                        <button disabled={loading} className="btn btn-primary" onClick={handleSubmit}>{loading ? <Loading /> : "حذف"}</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default DeleteApiModel