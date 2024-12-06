import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../screens/admin/homeAdmin';
import { deleteMethode } from '../../../../utils/apiFetchs';
import { deleteCategorieRoute } from '../../../../utils/apiRoutes';
import Alert from '../../../alert';
import Loading from '../../../loading';

function DeleteCategory({ categories, setCategories, idCategorie, indexCategorie }) {
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
            const response = await deleteMethode(`${deleteCategorieRoute}/${idCategorie}`);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            let newCategorie = [...categories];
            newCategorie.splice(indexCategorie, 1);
            setCategories(newCategorie);
            socket.emit('broadcast-notification', {
                msg: response.data.contentNotification,
                name: "delete categorie",
                newList: newCategorie
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
        <dialog id="deleteCategory" className="modal">
            <div className="modal-box">
                <h1 className="font-bold text-lg">حذف الفئة</h1>
                {alert.display && <Alert msg={alert} />}
                <p>في حال حذف هذه الفئة، سيتم حذف جميع الخدمات المرتبطة بها.</p>
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

export default DeleteCategory