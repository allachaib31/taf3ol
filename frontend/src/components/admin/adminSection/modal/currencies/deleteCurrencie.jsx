import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../../screens/admin/homeAdmin';
import Alert from '../../../../alert';
import Loading from '../../../../loading';
import { deleteCoinsRoute } from '../../../../../utils/apiRoutes';
import { deleteMethode } from '../../../../../utils/apiFetchs';

function DeleteCurrencie({ idSelected, setCoins }) {
    const navigate = useNavigate();
    const socket = useSocket();
    const [submit, setSubmit] = useState(false);
    const [alert, setAlert] = useState({
        display: false,
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);
        setAlert({
            display: false,
        });

        try {
            const response = await deleteMethode(`${deleteCoinsRoute}?id=${idSelected}`);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });

            // Update the custom prices list to remove the deleted item
            setCoins((prevCoin) =>
                prevCoin.filter((item) => item._id !== idSelected)
            );

            socket.emit('broadcast-notification', {
                msg: response.data.notificationMsg,
                name: "delete currencie",
            });
        } catch (err) {
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                return navigate("/admin/auth");
            }
            setAlert({
                display: true,
                status: false,
                text: err.response?.data?.msg || "خطأ غير متوقع",
            });
        } finally {
            setSubmit(false);
        }
    };
    return (
        <dialog id="DeleteCurrencie" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">حذف العملة </h3>
                <hr />
                {alert.display && <Alert msg={alert} />}
                <p className='text-error font-bold text-xl'>
                    هل انت متاكد من انك تريد الحذف العملة 
                </p>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn ml-[0.5rem]">اغلاق</button>
                        <button
                            className='btn btn-primary'
                            disabled={submit}
                            onClick={handleSubmit}
                        >
                            {submit ? <Loading /> : 'حذف'}
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default DeleteCurrencie