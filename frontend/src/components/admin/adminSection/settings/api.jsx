import React, { useEffect, useState } from 'react'
import { ApiModel, DeleteApiModel } from '../modal'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../screens/admin/homeAdmin';
import { getMethode } from '../../../../utils/apiFetchs';
import { getApiRoute } from '../../../../utils/apiRoutes';
import LoadingScreen from '../../../loadingScreen';

function Api() {
    const navigate = useNavigate();
    const socket = useSocket();
    const [loading, setLoading] = useState(false);
    const [apiList, setApiList] = useState(false);
    const [titleModalApi, setTitleModalApi] = useState("اضافة API");
    const [indexApi, setIndexApi] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        link: "",
        token: "",
        groupesApi: "",
        idCoin: ""
    });
    const [alert, setAlert] = useState({
        display: false,
    });

    useEffect(() => {
        setLoading(true);
        setAlert({
            display: false,
        });
        getMethode(getApiRoute).then((response) => {
            setApiList(response.data);
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
        if (socket) {
            socket.on('receive-notification', (notification) => {
                if (notification.name == "add Api") {
                    setApiList((prevApiList) => {
                        return [...prevApiList, notification.newApi]
                    })
                }else if (notification.name == "update Api"){
                    let newList = [...apiList];
                    newList[notification.apiUpdated.index] = notification.apiUpdated;
                    setApiList(newList)
                } else if (notification.name == "delete Api") {
                    let newApiList = [...apiList];
                    for (let i = 0; i < newApiList.length; i++) {
                        if(newApiList[i]._id == notification.apiDeleted._id){
                            newApiList.splice(i, 1);
                            break;
                        }
                        setApiList(newApiList);
                    }

                }

            });
            return () => {
                // Clean up event listeners when component unmounts
                socket.off('receive-notification');
            };
        }
    }, [socket, apiList]);
    return (
        <div>
            <h1 className="text-3xl font-[900]">API</h1>
            <button className='btn btn-primary mt-[1rem]' onClick={() => document.getElementById('apiModel').showModal()}>اضافة API</button>

            <LoadingScreen loading={loading} component={
                <div id='table' className="overflow-x-auto">
                    <table className="table w-[1500px] lg:w-full">
                        {/* head */}
                        <thead className='text-[1rem]'>
                            <tr>
                                <th></th>
                                <th>الاسم</th>
                                <th>الرابط</th>
                                <th>المجموعة</th>
                                <th>العملة</th>
                                <th>الرمز المميز</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='text-[1rem]'>
                            {
                                apiList && apiList.map((api, index) => {
                                    return (
                                        <tr>
                                            <th>{api.id}</th>
                                            <td>{api.name}</td>
                                            <td>{api.link}</td>
                                            <td>{api.groupesApi}</td>
                                            <td>{api.idCoin.name}</td>
                                            <td>{api.token}</td>
                                            <td><button className='btn btn-warning text-white' onClick={() => {
                                                setInputs({
                                                    _id: api._id,
                                                    name: api.name,
                                                    link: api.link,
                                                    token: api.token,
                                                    groupesApi: api.groupesApi,
                                                    idCoin: api.idCoin,
                                                    index
                                                })
                                                setTitleModalApi("تعديل API");
                                                document.getElementById('apiModel').showModal();
                                            }}><FontAwesomeIcon icon={faPen} /></button></td>
                                            <td><button className='btn btn-error text-white' onClick={() => {
                                                setIndexApi(index);
                                                document.getElementById('deleteApiModel').showModal();
                                            }}><FontAwesomeIcon icon={faTrash} /></button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            } />
            <ApiModel apiList={apiList} setApiList={setApiList} titleModalApi={titleModalApi} inputs={inputs} setInputs={setInputs}/>
            <DeleteApiModel apiList={apiList} setApiList={setApiList} indexApi={indexApi}/>
        </div>
    )
}

export default Api