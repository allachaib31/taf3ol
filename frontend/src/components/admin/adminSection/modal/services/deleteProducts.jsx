import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../../screens/admin/homeAdmin';
import Alert from '../../../../alert';
import Loading from '../../../../loading';
import { deleteProductsRoute } from '../../../../../utils/apiRoutes';
import { patchMethode } from '../../../../../utils/apiFetchs';

function DeleteProducts({ listProductsSelected, getProducts }) {
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
            const response = await patchMethode(`${deleteProductsRoute}`, { productIds: listProductsSelected });

            /*// Update groupMoneyList by filtering out deleted groups
            const updatedProductsList = products.filter(
                (product) => !listProductsSelected.includes(product._id)
            );
            setProducts(updatedProductsList);*/
            getProducts()

            // Notify success
            setAlert({
                display: true,
                status: true,
                text: response.data.msg,
            });

            // Emit socket notification
            socket.emit('broadcast-notification', {
                msg: response.data.contentNotification,
                name: "delete Products",
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
        <dialog id="deleteProducts" className="modal">
            <div className="modal-box">
                <h1 className="font-bold text-lg">حذف المنتج</h1>
                <hr />
                {alert.display && <Alert msg={alert} />}
                <p className='font-bold text-error text-xl'>هل انت متاكد من انك تريد حذف المنتج؟</p>
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

export default DeleteProducts