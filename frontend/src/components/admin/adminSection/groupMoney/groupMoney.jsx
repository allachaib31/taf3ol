import { faMoneyBill, faPen, faPercent, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { DeleteGroupMoney, GroupMoneyModel } from '../modal'
import { getMethode } from '../../../../utils/apiFetchs'
import { getGroupMoneyRoute, getTypeServicesRoute } from '../../../../utils/apiRoutes'
import { useNavigate } from 'react-router-dom'
import LoadingScreen from '../../../loadingScreen'
import { useSocket } from '../../../../screens/admin/homeAdmin'
import { handleSelectAll, handleSelectItem } from '../../../../utils/constants'

function GroupMoney() {
    const navigate = useNavigate();
    const socket = useSocket();
    const [listTypeService, setListTypeService] = useState([]);
    const [groupMoneyList, setGroupMoneyList] = useState([]);
    const [selectedIdService, setSelectedIdService] = useState("الكل");
    const [listGroupMoneySelected, setListGroupMoneySelected] = useState([]);
    const [titleModalGroupMoney, setTitleModalGroupMoney] = useState("مجموعة جديدة");
    const [inputs, setInputs] = useState({
        name: "",
        idService: "",
        pricingType: "Increase",
        value: "",
        negativeBalance: "",
        agentRatio: "",
        meritValue: "",
        image: "",
    });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        display: false,
    });


    useEffect(() => {
        setLoading(true);
        getMethode(`${getTypeServicesRoute}`).then((response) => {
            setListTypeService(response.data);
        }).catch((err) => {
            if (err.response.status == 500) {
                setAlert({
                    display: true,
                    status: false,
                    text: err.response.data.msg
                });
            }
            if (err.response.status == 401 || err.response.status == 403) {
                navigate("/admin/auth")
            }
        }).finally(() => {
            setLoading(false);
        })
    }, []);
    useEffect(() => {
        setLoading(true);
        getMethode(`${getGroupMoneyRoute}?idService=${selectedIdService}`).then((response) => {
            setGroupMoneyList(response.data);
        }).catch((err) => {
            if (err.response.status == 500) {
                setAlert({
                    display: true,
                    status: false,
                    text: err.response.data.msg
                });
            }
            if (err.response.status == 401 || err.response.status == 403) {
                navigate("/admin/auth")
            }
        }).finally(() => {
            setLoading(false);
        })
    }, [selectedIdService]);
    useEffect(() => {
        if (socket) {
            socket.on('receive-notification', (notification) => {
                if (notification.name == "add group money") {
                    if (selectedIdService == "الكل" || selectedIdService == notification.newGroupMoneyList.idService._id) {
                        let newGroupMoneyList = [...groupMoneyList, notification.newGroupMoneyList];
                        setGroupMoneyList(newGroupMoneyList);
                    }
                } else if (notification.name == "update group money") {
                    if (selectedIdService == "الكل" || selectedIdService == notification.newList[0].idService._id) {
                        setGroupMoneyList(notification.newGroupMoneyList);
                    }
                } else if (notification.name == "delete group money") {
                    if (selectedIdService == "الكل" || selectedIdService == notification.newList[0].idService._id) {
                        setGroupMoneyList(notification.newList)
                    }
                }
            });
            return () => {
                // Clean up event listeners when component unmounts
                socket.off('receive-notification');
            };
        }
    }, [socket, selectedIdService, groupMoneyList]);
    return (
        <div>
            <h1 className='text-3xl font-[900]'>المجموعات</h1>
            <button className='btn btn-primary mt-[1rem]' onClick={() => document.getElementById('groupMoneyModel').showModal()}>مجموعة جديدة</button><br />
            <select className="select select-bordered mt-[1rem] w-full" onChange={(event) => {
                setSelectedIdService(event.target.value)
            }}>
                <option disabled>اختر نوع الخدمة</option>
                <option value="الكل" selected>All</option>
                {
                    listTypeService && listTypeService.map((typeService) => {
                        return (
                            <option value={typeService._id}>{typeService.nameAr}</option>
                        )
                    })
                }
            </select>
            <LoadingScreen loading={loading} component={<div className="overflow-x-auto mb-[1rem]">
                <table className="table">
                    {/* head */}
                    <thead className='text-[1rem]'>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" onChange={(event) => {
                                        handleSelectAll(event, setListGroupMoneySelected, groupMoneyList)
                                    }} />
                                </label>
                            </th>
                            <th>الاسم</th>
                            <th>نوع الخدمة</th>
                            <th>نوع التسعير</th>
                            <th>القيمة</th>
                            <th>تم إنشاؤه بواسطة</th>
                            <th>خيارات</th>
                        </tr>
                    </thead>
                    <tbody className='text-[1rem]'>
                        {
                            groupMoneyList && groupMoneyList.map((item, index) => {
                                return (
                                    <tr>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" checked={listGroupMoneySelected.includes(item._id)}
                                                    onChange={() => handleSelectItem(item._id, setListGroupMoneySelected)} />
                                            </label>
                                        </th>
                                        <td>{item.name}</td>
                                        <td>{item.idService.nameAr}</td>
                                        <td>
                                            {item.pricingType}
                                        </td>
                                        <td>
                                            <label className="input w-[5rem] input-bordered flex items-center gap-2">
                                                <input type="text" className="grow w-[1rem]" disabled value={item.value} />
                                                <FontAwesomeIcon icon={item.pricingType == "Increase" ? faMoneyBill : faPercent} />
                                            </label>
                                        </td>
                                        <td>{item.createdBy.name}</td>
                                        <td>
                                            <button className="btn btn-warning " onClick={() => {
                                                setInputs({
                                                    _id: item._id,
                                                    name: item.name,
                                                    idService: item.idService._id,
                                                    pricingType: item.pricingType,
                                                    value: item.value,
                                                    negativeBalance: item.negativeBalance,
                                                    agentRatio: item.agentRatio,
                                                    meritValue: item.meritValue,
                                                    image: item.image,
                                                    index
                                                })
                                                setTitleModalGroupMoney("تعديل مجموعة");
                                                document.getElementById('groupMoneyModel').showModal();
                                            }}><FontAwesomeIcon icon={faPen} className='text-white text-[1rem]' /></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>} />
            <button className="btn btn-error text-white " onClick={() => {
                if(listGroupMoneySelected.length > 0) document.getElementById('deleteGroupMoney').showModal()
            }}><FontAwesomeIcon icon={faTrash} className='text-[1rem]' /></button>
            <GroupMoneyModel titleModalGroupMoney={titleModalGroupMoney} listTypeService={listTypeService} inputs={inputs} setInputs={setInputs} groupMoneyList={groupMoneyList} setGroupMoneyList={setGroupMoneyList} selectedIdService={selectedIdService} />
            <DeleteGroupMoney groupMoneyList={groupMoneyList} setGroupMoneyList={setGroupMoneyList} listGroupMoneySelected={listGroupMoneySelected} />
        </div>
    )
}

export default GroupMoney