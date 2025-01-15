import React, { useEffect, useState } from 'react'
import { AddCustomPrice, DeleteCustomPrice } from '../modal'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../screens/admin/homeAdmin';
import { getCustomPriceRoute } from '../../../../utils/apiRoutes';
import { getMethode } from '../../../../utils/apiFetchs';
import LoadingScreen from '../../../loadingScreen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faPercent, faTrash } from '@fortawesome/free-solid-svg-icons';

function CustomPrices() {
    const navigate = useNavigate();
    const socket = useSocket();
    const [loading, setLoading] = useState(false);
    const [customPrices, setCustomPrices] = useState([]);
    const [idCustomPrice, setIdCustomPrice] = useState(false);

    useEffect(() => {
        setLoading(true);
        getMethode(`${getCustomPriceRoute}`).then((response) => {
            const customPrices = response.data;
            setCustomPrices(customPrices);
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
            <h1 className='text-3xl font-[900]'>الاسعار المخصصة</h1>
            <button className='mt-[1rem] btn btn-primary shadow-sm shadow-gray-400' onClick={() => document.getElementById('AddCustomPrice').showModal()}>اضافة سعر مخصص</button>
            <LoadingScreen loading={loading} component={
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='text-[1rem]'>
                            <tr>
                                <th>اسم العضو</th>
                                <th>الخدمة</th>
                                <th>الفئة</th>
                                <th>المنتج</th>
                                <th>الكلفة</th>
                                <th>السعر</th>
                            </tr>
                        </thead>
                        <tbody className='text-[1rem]'>
                            {
                                customPrices && customPrices.map((customPrice) => {
                                    return (
                                        <tr>
                                            <td>{customPrice.idUser.username}</td>
                                            <td>{customPrice.idService.nameAr}</td>
                                            <td>{customPrice.idCategorie.nameAr}</td>
                                            <td>{customPrice.idProduct.nameAr}</td>
                                            <td>{customPrice.idProduct.costPrice.toFixed(5)}</td>
                                            <td>{customPrice.value}<FontAwesomeIcon icon={customPrice.pricingType == "Increase" ? faMoneyBill : faPercent} /></td>
                                            <td><button className='btn btn-error text-white' onClick={() => {
                                                setIdCustomPrice(customPrice._id);
                                                document.getElementById('DeleteCustomPrice').showModal()
                                            }}><FontAwesomeIcon icon={faTrash} /></button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            } />
            <AddCustomPrice setCustomPrices={setCustomPrices}/>
            <DeleteCustomPrice setCustomPrices={setCustomPrices} idCustomPrice={idCustomPrice}/>
        </div>
    )
}

export default CustomPrices