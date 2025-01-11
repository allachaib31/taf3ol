import React, { useState } from 'react'
import Alert from '../../../../alert'
import Loading from '../../../../loading'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../../screens/admin/homeAdmin';
import { deleteMethode } from '../../../../../utils/apiFetchs';
import { deletePaymentGatewayRoute } from '../../../../../utils/apiRoutes';

function DeletePaymentGateway({ setPaymentsGateway, paymentsGateway, idSelected }) {
    const navigate = useNavigate();
    const socket = useSocket();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        display: false,
        status: false,
        text: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert({ display: false });

        try {
            const response = await deleteMethode(`${deletePaymentGatewayRoute}?id=${idSelected}`);

            const updatedPaymentGateway = paymentsGateway.filter(
                (payment) => (idSelected != payment._id)
            );
            setPaymentsGateway(updatedPaymentGateway);

            // Notify success
            setAlert({
                display: true,
                status: true,
                text: response.data.msg,
            });

            // Emit socket notification
            socket.emit('broadcast-notification', {
                msg: response.data.contentNotification,
                name: "delete payment gateway",
            });
        } catch (err) {
            if (err.response?.status === 401 || err.response?.status === 403) {
                navigate('/admin/auth');
            } else {
                setAlert({
                    display: true,
                    status: false,
                    text: err.response?.data?.msg || 'An error occurred',
                });
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <dialog id="deletePaymentGateway" className="modal">
            <div className="modal-box">
                <h1 className="font-bold text-lg">حذف بوابة الدفع</h1>
                {alert.display && <Alert msg={alert} />}
                <p>هل انت متاكد من انك تريد حذف بوابة الدفع؟</p>
                <div className="modal-action">
                    <form method="dialog">
                        {/* Closing modal */}
                        <button className="btn ml-[0.5rem]">اغلاق</button>
                        {/* Submit button */}
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? <Loading /> : "حذف"}
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default DeletePaymentGateway