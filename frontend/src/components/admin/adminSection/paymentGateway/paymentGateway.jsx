import React, { useEffect, useState } from 'react'
import { BankModel, DeletePaymentGateway, PaymentGatewayModel } from '../modal';
import { useNavigate } from 'react-router-dom';
import { getMethode } from '../../../../utils/apiFetchs';
import { getPaymentGatewayRoute } from '../../../../utils/apiRoutes';
import LoadingScreen from '../../../loadingScreen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

function PaymentGateway() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paymentsGateway, setPaymentsGateway] = useState(false);
    const [idSelected, setIdSelected] = useState(false);
    const [inputsPaymentGetway, setInputsPaymentGetway] = useState({
        name: "",
        typePaymentGateway: "paymentGateway",
        link: "",
        token: "",
        image: ""
    });
    const [inputsBank, setInputsBank] = useState({
        name: "",
        typePaymentGateway: "bank",
        currencyType: "",
        description: "",
        tax: "",
        minimumValue: "",
        maximumValue: "",
        requirement: ["image", "serialNumber"],
        image: ""
    });
    const [titleModel, setTitleModel] = useState("");

    useEffect(() => {
        setLoading(true);
        getMethode(`${getPaymentGatewayRoute}`).then((response) => {
            setPaymentsGateway(response.data.paymentGateways);
        }).catch((err) => {
            if (err.response.status == 401 || err.response.status == 403) {
                navigate("/admin/auth")
            }
        }).finally(() => {
            setLoading(false);
        })
    }, []);
    return (
        <div>
            <h1 className='text-3xl font-[900]'>بوابة الدفع</h1>
            <div className='flex gap-[0.5rem] mt-[1rem]'>
                <button className='btn btn-primary' onClick={() => {
                        setTitleModel("إضافة بوابة الدفع");
                        setInputsPaymentGetway({
                            name: "",
                            typePaymentGateway: "paymentGateway",
                            link: "",
                            token: "",
                            image: ""
                        })
                        document.getElementById('PaymentGatewayModel').showModal();
                    }
                }>اضافة بوابة دفع</button>
                <button className='btn btn-primary' onClick={() => {
                        setTitleModel("إضافة بنك");
                        setInputsBank({
                            name: "",
                            typePaymentGateway: "bank",
                            currencyType: "",
                            description: "",
                            tax: "",
                            minimumValue: "",
                            maximumValue: "",
                            requirement: ["image", "serialNumber"],
                            image: ""
                        })
                        document.getElementById('BankModel').showModal();
                    }
                }>اضافة بنك </button>
            </div>
            <LoadingScreen loading={loading} component={
                <div className="overflow-x-auto mt-[1rem]">
                    <table className="table">
                        {/* head */}
                        <thead className='text-[1.1rem]'>
                            <tr>
                                <th>الاسم</th>
                                <th>النوع</th>
                                <th>تم إنشاؤه</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='text-[1.1rem]'>
                            {
                                paymentsGateway && paymentsGateway.map((payment) => {
                                    return (
                                        <tr key={payment._id}>
                                            <td>
                                                {payment.name}
                                            </td>
                                            <td>
                                                {payment.typePaymentGateway == "paymentGateway" ? "بوابة الدفع" : "بنك"}
                                            </td>
                                            <td>
                                                {payment.createdAt}
                                            </td>
                                            <td><button className='btn btn-warning text-white' onClick={() => {
                                                if(payment.typePaymentGateway == "paymentGateway") {
                                                    setTitleModel("تحديث بوابة الدفع");
                                                    setInputsPaymentGetway({
                                                        _id: payment._id,
                                                        name: payment.name,
                                                        typePaymentGateway: payment.typePaymentGateway,
                                                        link: payment.link,
                                                        token: payment.token,
                                                        image: payment.image
                                                    })
                                                    document.getElementById('PaymentGatewayModel').showModal();
                                                } else {
                                                    setTitleModel("تحديث بنك");
                                                    setInputsBank({
                                                        _id: payment._id,
                                                        name: payment.name,
                                                        typePaymentGateway: payment.typePaymentGateway,
                                                        currencyType: payment.currencyType,
                                                        description: payment.description,
                                                        tax: payment.tax,
                                                        minimumValue: payment.minimumValue,
                                                        maximumValue: payment.maximumValue,
                                                        requirement: payment.requirement,
                                                        image: payment.image
                                                    })
                                                    document.getElementById('BankModel').showModal();
                                                }
                                            }}><FontAwesomeIcon icon={faPen} /></button></td>
                                            <td><button className='btn btn-error text-white' onClick={() => {
                                                setIdSelected(payment._id)
                                                document.getElementById("deletePaymentGateway").showModal()
                                            }}><FontAwesomeIcon icon={faTrash} /></button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            } />
            <PaymentGatewayModel paymentsGateway={paymentsGateway} setPaymentsGateway={setPaymentsGateway} inputs={inputsPaymentGetway} setInputs={setInputsPaymentGetway} titleModel={titleModel}/>
            <BankModel paymentsGateway={paymentsGateway} setPaymentsGateway={setPaymentsGateway} inputs={inputsBank} setInputs={setInputsBank} titleModel={titleModel}/>
            <DeletePaymentGateway setPaymentsGateway={setPaymentsGateway} paymentsGateway={paymentsGateway} idSelected={idSelected} />
        </div>
    )
}

export default PaymentGateway;