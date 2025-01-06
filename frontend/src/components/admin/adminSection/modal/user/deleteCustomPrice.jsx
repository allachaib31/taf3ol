import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../../screens/admin/homeAdmin';
import { deleteMethode } from '../../../../../utils/apiFetchs';
import { deleteCustomPriceRoute } from '../../../../../utils/apiRoutes';
import Loading from '../../../../loading';
import Alert from '../../../../alert';

function DeleteCustomPrice({ setCustomPrices, idCustomPrice }) {
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
            const response = await deleteMethode(`${deleteCustomPriceRoute}?id=${idCustomPrice}`);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });

            // Update the custom prices list to remove the deleted item
            setCustomPrices((prevCustomPrices) =>
                prevCustomPrices.filter((item) => item._id !== idCustomPrice)
            );

            socket.emit('broadcast-notification', {
                msg: response.data.notificationMsg,
                name: "delete customPrice",
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
        <dialog id="DeleteCustomPrice" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">حذف سعر مخصص</h3>
                <hr />
                {alert.display && <Alert msg={alert} />}
                <p className='text-error font-bold text-xl'>
                    هل انت متاكد من انك تريد الحذف السعر المخصص
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
    );
}

export default DeleteCustomPrice;
