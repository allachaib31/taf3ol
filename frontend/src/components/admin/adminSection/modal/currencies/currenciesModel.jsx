import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../../screens/admin/homeAdmin';
import { postMethode, putMethode } from '../../../../../utils/apiFetchs';
import { addCoinsRoute, updateCoinsRoute } from '../../../../../utils/apiRoutes';
import Loading from '../../../../loading';
import Alert from '../../../../alert';

function CurrenciesModel({ setCoins, titleCurrencieMode, inputs, setInputs }) {
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
            const response = await postMethode(addCoinsRoute, inputs);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            setCoins((prevCoins) => {
                return [
                    ...prevCoins,
                    response.data.newCoin
                ]
            });
            socket.emit('broadcast-notification', {
                msg: response.data.notificationMsg,
                name: "add new Coins",
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
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert({
            display: false,
        });
        try {
            const response = await putMethode(updateCoinsRoute, inputs);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            setCoins((prevCoins) =>
                prevCoins.map((item) =>
                    item._id.toString() === response.data.updatedCoin._id.toString()
                        ? response.data.updatedCoin // Replace the matched coin
                        : item // Keep the rest unchanged
                )
            );

            socket.emit('broadcast-notification', {
                msg: response.data.notificationMsg,
                name: "update Coin",
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
        <dialog id="currenciesModel" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{titleCurrencieMode}</h3>
                <hr />
                <div className='flex flex-col gap-[1rem] mt-[1rem]'>
                    {alert.display && <Alert msg={alert} />}
                    <label className="input input-bordered flex items-center gap-2">
                        اسم العملة
                        <input type="text" className="grow" placeholder="Dollar" value={inputs.name} onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    name: event.target.value
                                }
                            })
                        }} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        اختصار
                        <input type="text" className="grow" placeholder="USD" value={inputs.abbreviation} onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    abbreviation: event.target.value
                                }
                            })
                        }} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        رمز
                        <input type="text" className="grow" placeholder="$" value={inputs.symbol} onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    symbol: event.target.value
                                }
                            })
                        }} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        سعر
                        <input type="text" className="grow" placeholder="1.00" value={inputs.price} onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    price: event.target.value
                                }
                            })
                        }} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        سعر الشراء
                        <input type="text" className="grow" placeholder="1.00" value={inputs.purchasePrice} onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    purchasePrice: event.target.value
                                }
                            })
                        }} />
                    </label>
                    <div className="form-control">
                        <label className="label w-fit gap-[1rem] cursor-pointer">
                            <span className="label-text">عرض</span>
                            <input type="checkbox" className="toggle" checked={inputs.show} onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    show: !inputs.show
                                }
                            })
                        }} />
                        </label>
                    </div>
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn ml-[0.5rem]">اغلاق</button>
                        {titleCurrencieMode == "عملة جديدة" ?
                            <button disabled={loading} className='btn btn-primary' onClick={handleSubmit}>{loading ? <Loading /> : 'ارسال'}</button> :
                            <button disabled={loading} className='btn btn-primary' onClick={handleUpdate}>{loading ? <Loading /> : 'تحديث'}</button>}
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default CurrenciesModel