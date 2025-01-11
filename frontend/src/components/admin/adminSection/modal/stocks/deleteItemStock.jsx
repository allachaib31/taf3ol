import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../../screens/admin/homeAdmin';
import { patchMethode } from '../../../../../utils/apiFetchs';
import Loading from '../../../../loading';
import { deleteItemStockRoute } from '../../../../../utils/apiRoutes';
import Alert from '../../../../alert';

function DeleteItemStock({ listAvailableItemsSelected, availableItems, setAvailableItems }) {
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
            const response = await patchMethode(`${deleteItemStockRoute}`, { stocksId: listAvailableItemsSelected });

            const updatedItemStockList = availableItems.filter(
                (stock) => !listAvailableItemsSelected.includes(stock._id)
            );
            setAvailableItems(updatedItemStockList);

            // Notify success
            setAlert({
                display: true,
                status: true,
                text: response.data.msg,
            });

            // Emit socket notification
            socket.emit('broadcast-notification', {
                msg: response.data.contentNotification,
                name: "delete Stock item",
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
        <dialog id="deleteItemStocks" className="modal">
            <div className="modal-box">
                <h1 className="font-bold text-lg">حذف المخزن</h1>
                <hr />
                {alert.display && <Alert msg={alert} />}
                <p className='text-error font-bold text-xl'>هل تريد حذف العناصر من المخزن؟ </p>
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

export default DeleteItemStock