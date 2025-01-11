import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useSocket } from '../../../../screens/admin/homeAdmin';
import { postMethode } from '../../../../utils/apiFetchs';
import { addItemStockRoute } from '../../../../utils/apiRoutes';
import Alert from '../../../alert';
import Loading from '../../../loading';

function AddItemToStock() {
    const navigate = useNavigate();
    const socket = useSocket();
    const stockInfo = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        textLines: "",
        note: "",
    });
    const [alert, setAlert] = useState({
        display: false,
    });

    const handleSubmit = async () => {
        console.log(stockInfo)
        console.log(stockInfo._id)
        setLoading(true);
        setAlert({
            display: false,
        });
        try {
            const response = await postMethode(addItemStockRoute, {
                ...inputs,
                idStock: stockInfo._id
            });
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            socket.emit('broadcast-notification', {
                msg: response.data.notificationMsg,
                name: "add Item Stock",
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
        <div className='flex flex-col gap-[0.5rem]'>
            {alert.display && <Alert msg={alert} />}
            <label htmlFor="carts">* قم بترتيب البطاقات كل بطاقة ضمن سطر ولا تترك اسطر فارغة</label>
            <textarea name="carts" className="textarea textarea-bordered" onChange={(event) => {
                setInputs((prevInputs) => {
                    return {
                        ...prevInputs,
                        textLines: event.target.value
                    }
                })
            }}></textarea>
            <label className="input input-bordered flex items-center gap-2">
                ملاحظة
                <input type="text" className="grow" onChange={(event) => {
                setInputs((prevInputs) => {
                    return {
                        ...prevInputs,
                        note: event.target.value
                    }
                })
            }}/>
            </label>
            <button className='btn btn-primary' disabled={loading} onClick={handleSubmit}>{loading ? <Loading /> : 'ارسال'}</button>
        </div>
    )
}

export default AddItemToStock