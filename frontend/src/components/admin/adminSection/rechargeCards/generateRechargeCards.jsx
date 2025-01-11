import React, { useEffect, useState } from 'react'
import { getMethode, postMethode } from '../../../../utils/apiFetchs';
import { generateRechargeCardsRoute, getGroupCardsRoute } from '../../../../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../screens/admin/homeAdmin';
import Alert from '../../../alert';

function GenerateRechargeCards() {
    const navigate = useNavigate();
    const socket = useSocket();
    const [loading, setLoading] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [cardTitles, setCardTitles] = useState([]);
    const [inputs, setInputs] = useState({
        idCardGroup: "",
        titleCard: "",
        cardCredit: "",
        cardNumber: "",
        lettersNumber: "",
        typeText: ""
    });
    const [alert, setAlert] = useState({
        display: false,
    });

    let arr = Array.from({ length: 16 - 6 + 1 }, (_, i) => i + 6);

    const fetchCardTitles = async () => {
        setLoading(true);
        try {
            const response = await getMethode(`${getGroupCardsRoute}?query=`);
            setCardTitles(response.data.cardGroups);
        } catch (err) {
            if (err.response.status === 401 || err.response.status === 403) {
                return navigate("/admin/auth");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        setSubmit(true);
        setAlert({
            display: false,
        });

        try {
            const response = await postMethode(generateRechargeCardsRoute, inputs);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            socket.emit('broadcast-notification', {
                msg: response.data.notificationMsg,
                name: "Generate recharge card",
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
            setSubmit(false);
        }
    }

    useEffect(() => {
        fetchCardTitles();
    }, []);
    return (
        <div>
            <h1 className='text-3xl font-[900]'>توليد بطاقات شحن الموقع</h1>
            <div className='flex flex-col mt-[1rem] gap-[1rem]'>
            {alert.display && <Alert msg={alert} />}
                <select className="select select-bordered w-full" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    idCardGroup: event.target.value
                                }
                            })
                        }}>
                    <option disabled selected>مجموعة البطاقات</option>
                    {
                        cardTitles && cardTitles.map((card) => {
                            return (
                                <option value={card._id}>{card.name}</option>
                            )
                        })
                    }
                </select>
                <div>
                    <label className="input input-bordered w-full flex items-center gap-2">
                        عنوان البطاقات
                        <input type="text" className="grow" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    titleCard: event.target.value
                                }
                            })
                        }}/>
                    </label>
                </div>
                <div className='flex sm:flex-row flex-col gap-[1rem]'>
                    <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                        رصيد البطاقة
                        <input type="text" className="grow" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    cardCredit: event.target.value
                                }
                            })
                        }}/>
                    </label>
                    <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                        عدد البطاقات
                        <input type="text" className="grow" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    cardNumber: event.target.value
                                }
                            })
                        }}/>
                    </label>
                </div>
                <div>
                    <select className="select select-bordered w-full" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    lettersNumber: event.target.value
                                }
                            })
                        }}>
                        <option disabled selected>عدد الحروف</option>
                        {
                            arr.map((value) => {
                                return (
                                    <option>{value}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='text-[1.1rem] flex flex-col gap-[0.5rem]'>
                    <h1 className='text-xl'>نوعية النص</h1>
                    <div className='flex items-center gap-[0.5rem]'>
                        <input type="radio" name="radio-1" className="radio" value="string" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    typeText: event.target.value
                                }
                            })
                        }}/>
                        استخدام احرف وارقام 0-9 a-Z
                    </div>
                    <div className='flex items-center gap-[0.5rem]'>
                        <input type="radio" name="radio-1" className="radio" value="number" onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    typeText: event.target.value
                                }
                            })
                        }}/>

                        استخدام ارقام فقط 0-9
                    </div>
                </div>
                <button className='btn btn-primary' disabled={submit} onClick={handleSubmit}>توليد</button>
            </div>
        </div>
    )
}

export default GenerateRechargeCards