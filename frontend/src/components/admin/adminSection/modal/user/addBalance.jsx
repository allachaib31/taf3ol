import React, { useEffect, useState } from 'react'
import Alert from '../../../../alert';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../../loading';
import { getMethode, patchMethode } from '../../../../../utils/apiFetchs';
import { addBalanceRoute, getPaymentGatewayRoute } from '../../../../../utils/apiRoutes';
import { useSocket } from '../../../../../screens/admin/homeAdmin';

function AddBalance({ idUser, financialMovements, setFinancialMovements, user, setUser }) {
    const navigate = useNavigate();
    const socket = useSocket();
    const [inputs, setInputs] = useState({
        idUser: idUser,
        amount: 0,
        paymentId: "",
        comment: "",
    });
    const [loading, setLoading] = useState(false);
    const [paymentsGateway, setPaymentsGateway] = useState(false);
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
            const response = await patchMethode(addBalanceRoute, inputs);
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
                name: "add balance",
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
    useEffect(() => {
        getMethode(`${getPaymentGatewayRoute}`).then((response) => {
            setPaymentsGateway(response.data.paymentGateways);
        }).catch((err) => {
            if (err.response.status == 401 || err.response.status == 403) {
                navigate("/admin/auth")
            }
        })
    }, []);
    return (
        <dialog id="AddBalance" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">اضافة رصيد </h3>
                <hr />
                <div className='flex flex-col gap-[1rem] mt-[1rem]'>
                    {alert.display && <Alert msg={alert} />}
                    {/*<p className='text-error font-[900]'>تحذير هذه زيادة غير مرتبطة باي مدفوعات</p>*/}
                    <label className="input input-bordered flex items-center gap-2">
                        رصيد
                        <input type="number" className="grow" placeholder="" min={0} onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    amount: event.target.value
                                }
                            })
                        }} />
                    </label>
                    <select className="select select-bordered w-full" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    paymentId: event.target.value
                                }
                            })
                        }} >
                        <option disabled selected>اختر بوابة الدفع</option>
                        {
                            paymentsGateway && paymentsGateway.map((payment) => {
                                return (
                                    <option value={payment._id} key={payment._id}>{payment.name}</option>
                                )
                            })
                        }
                    </select>
                    <textarea className="textarea textarea-bordered w-full" placeholder="اكتب تعليق" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    comment: event.target.value
                                }
                            })
                        }} ></textarea>
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

export default AddBalance;