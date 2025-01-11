import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../../screens/admin/homeAdmin';
import Loading from '../../../../loading';
import { deleteMethode } from '../../../../../utils/apiFetchs';
import { deleteGroupCardsRoute } from '../../../../../utils/apiRoutes';
import Alert from '../../../../alert';

function DeleteCardsTitleModel({ idCardGroupe, setCardTitles}) {
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
            const response = await deleteMethode(`${deleteGroupCardsRoute}?id=${idCardGroupe}`);

            // Update the custom prices list to remove the deleted item
            setCardTitles((prevCardTitle) =>
                prevCardTitle.filter((item) => item._id !== idCardGroupe)
            );


            // Notify success
            setAlert({
                display: true,
                status: true,
                text: response.data.msg,
            });

            // Emit socket notification
            socket.emit('broadcast-notification', {
                msg: response.data.contentNotification,
                name: "delete Card group",
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
    };
    return (
        <dialog id="deleteCardsTitleModel" className="modal">
            <div className="modal-box">
                <h1 className="font-bold text-lg">حذف مجموعة</h1>
                {alert.display && <Alert msg={alert} />}
                <p>في حال حذف هذه المجموعة، سيتم حذف جميع العناصر المرتبطة بها.</p>
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

export default DeleteCardsTitleModel