import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../../../../loading';
import { patchMethode } from '../../../../../utils/apiFetchs';
import { addNegativeBalanceRoute } from '../../../../../utils/apiRoutes';
import Alert from '../../../../alert';
import { useSocket } from '../../../../../screens/admin/homeAdmin';

function AddNegativeBalance({idUser, financialMovements, setFinancialMovements, user, setUser}) {
    const navigate = useNavigate();
    const socket = useSocket();
    const [inputs, setInputs] = useState({
        idUser: idUser,
        amount: 0
    });
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
            const response = await patchMethode(addNegativeBalanceRoute, inputs);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            const newFinancialMovements = [...financialMovements, response.data.financialMovement];
            const newUser = {
                ...user,
                idExpenses: response.data.expenses
            }
            setFinancialMovements(newFinancialMovements);
            setUser(newUser);
            socket.emit('broadcast-notification', {
                msg: response.data.notificationMsg,
                name: "add Negative balance",
                newUser,
                newFinancialMovements: response.data.financialMovement
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
        <dialog id="AddNegativeBalance" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">اضافة رصيد سالب</h3>
                <hr />
                <div className='mt-[1rem]'>
                {alert.display && <Alert msg={alert} />}
                    <label className="input input-bordered flex items-center gap-2">
                        رصيد السالب
                        <input type="number" className="grow" placeholder="" max={0} onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    amount: event.target.value
                                }
                            })
                        }} />
                    </label>
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn ml-[0.5rem]">اغلاق</button>
                        <button disabled={loading} className='btn btn-primary' onClick={handleSubmit}>{loading ? <Loading /> : 'ارسال'}</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default AddNegativeBalance;