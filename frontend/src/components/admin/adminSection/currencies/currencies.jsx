import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { CurrenciesModel, DeleteCurrencie } from '../modal'
import { useNavigate } from 'react-router-dom'
import { getMethode } from '../../../../utils/apiFetchs'
import { getCoinsRoute } from '../../../../utils/apiRoutes'
import LoadingScreen from '../../../loadingScreen'

function Currencies() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [coins, setCoins] = useState(false);
    const [idSelected, setIdSelected] = useState(false);
    const [titleCurrencieMode, setTitleCurrencieMode] = useState("عملة جديدة");
    const [inputs, setInputs] = useState({
        name: "",
        abbreviation: "",
        symbol: "",
        price: "",
        purchasePrice: "",
        isDollar: false,
        show: true
    });

    useEffect(() => {
        setLoading(true);
        getMethode(`${getCoinsRoute}`).then((response) => {
            setCoins(response.data.coins);
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
            <button className='btn btn-primary' onClick={() => {
                setTitleCurrencieMode("عملة جديدة");
                setInputs({
                    name: "",
                    abbreviation: "",
                    symbol: "",
                    price: "",
                    purchasePrice: "",
                    isDollar: false,
                    show: true
                })
                document.getElementById('currenciesModel').showModal()
            }
            }>عملة جديدة</button>
            <LoadingScreen loading={loading} component={
                <div className="overflow-x-auto mt-[1rem]">
                    <table className="table">
                        {/* head */}
                        <thead className='text-[1.1rem]'>
                            <tr>
                                <th>الاسم</th>
                                <th>الاختصار</th>
                                <th>الرمز</th>
                                <th>السعر</th>
                                <th>سعر الشراء</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='text-[1.1rem]'>
                            {
                                coins && coins.map((coin) => {
                                    return (
                                        <tr key={coin._id}>
                                            <th>{coin.name}</th>
                                            <td>{coin.abbreviation}</td>
                                            <td>{coin.symbol}</td>
                                            <td>{coin.price.toFixed(2)}</td>
                                            <td>{coin.purchasePrice.toFixed(2)}</td>
                                            {
                                                !coin.isDollar ? <>
                                                    <th><button className='btn btn-warning text-white' onClick={() => {
                                                        setInputs({
                                                            _id: coin._id,
                                                            name: coin.name,
                                                            abbreviation: coin.abbreviation,
                                                            symbol: coin.symbol,
                                                            price: coin.price,
                                                            purchasePrice: coin.purchasePrice,
                                                            isDollar: coin.isDollar,
                                                            show: coin.show
                                                        })
                                                        setTitleCurrencieMode("تحديث عملة");
                                                        document.getElementById('currenciesModel').showModal()
                                                    }
                                                    }><FontAwesomeIcon icon={faPen} /></button></th>
                                                    <th><button className='btn btn-error text-white' onClick={() => {
                                                        setIdSelected(coin._id);
                                                        document.getElementById('DeleteCurrencie').showModal()
                                                    }}><FontAwesomeIcon icon={faTrash} /></button></th>
                                                </> : ""
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            } />
            <CurrenciesModel setCoins={setCoins} titleCurrencieMode={titleCurrencieMode} inputs={inputs} setInputs={setInputs}/>
            <DeleteCurrencie idSelected={idSelected} setCoins={setCoins} />
        </div>
    )
}

export default Currencies