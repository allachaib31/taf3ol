import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import {  DeleteService } from '../modal';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../screens/admin/homeAdmin';
import { getMethode, putMethode } from '../../../../utils/apiFetchs';
import { getTypeServicesRoute, updateTypeServiceRankingRoute } from '../../../../utils/apiRoutes';
import Loading from '../../../loading';
import LoadingScreen from '../../../loadingScreen';
import Alert from '../../../alert';
import TypeServiceModel from '../modal/services/typeServiceModel';

const sortableOptions = {
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    ghostClass: 'ghost',
};

function TypeServices() {
    const navigate = useNavigate();
    const socket = useSocket();
    const [loading, setLoading] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [idTypeService, setIdTypeService] = useState("");
    const [indexTypeService, setIndexTypeService] = useState(false);
    const [listTypeService, setListTypeService] = useState([]);
    const [titleModalTypeService, setTitleModalTypeService] = useState("اضافة نوع جديد");
    const [inputs, setInputs] = useState({
        nameAr: "",
        nameEn: "",
        typeProduct: "",
        show: true,
        image: "",
    });
    const [alert, setAlert] = useState({
        display: false,
    });
    const handleSubmit = async () => {
        setSubmit(true);
        setAlert({
            display: false,
        });
        try {
            const response = await putMethode(`${updateTypeServiceRankingRoute}`, listTypeService);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            setListTypeService(response.data.newTypeService);
            socket.emit('broadcast-notification', {
                msg: response.data.contentNotification,
                name: "update ranking Service",
                newList: response.data.newTypeService
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
        if (socket) {
            socket.on('receive-notification', (notification) => {
                if (notification.name == "add Type Service" || notification.name == "delete Service" || notification.name == "update ranking Service") {
                    setListTypeService(notification.newList)
                }

            });
            return () => {
                // Clean up event listeners when component unmounts
                socket.off('receive-notification');
            };
        }
    }, [socket]);
    return (
        <div>
            <h1 className='text-3xl font-[900]'>انواع الخدمات</h1>
            <div className='flex gap-[1rem] justify-between mb-[1rem]'>
                <div className='flex gap-[1rem]'>
                    <button onClick={() => {
                        setTitleModalTypeService("اضافة نوع جديد");
                        setInputs({
                            nameAr: "",
                            nameEn: "",
                            typeProduct: "",
                            show: true,
                            image: "",
                        })
                        document.getElementById('addTypeService').showModal();
                    }
                    } className='btn btn-primary'> اضافة نوع جديد</button>
                </div>
            </div>
            <div>
            {alert.display && <Alert msg={alert} />}
                <LoadingScreen loading={loading} component={
                    listTypeService &&
                    <ReactSortable
                        list={listTypeService}
                        setList={(currentCategories) => setListTypeService(currentCategories)}
                        {...sortableOptions}
                    >
                        {
                            listTypeService && listTypeService.map((item, index) => {
                                return <div className='text-xl p-[1rem] cursor-move bg-[#F1F1F1] flex items-center gap-[1rem] hover:bg-neutral' key={item._id}>
                                    <h1>{item.nameAr}</h1>
                                    <details className='relative'>
                                        <summary className='btn'>الأفعال <FontAwesomeIcon icon={faCaretDown} /></summary>
                                        <ul className='z-[999] absolute bg-white shadow-md w-[150px] flex flex-col'>
                                            <li className='hover:bg-[#F1F1F1] flex justify-between p-[0.5rem] cursor-pointer' onClick={() => {
                                                setInputs({
                                                    _id: item._id,
                                                    nameAr: item.nameAr,
                                                    nameEn: item.nameEn,
                                                    typeProduct: item.typeProduct,
                                                    show: item.show,
                                                    image: item.image,
                                                    index
                                                })
                                                setTitleModalTypeService("تعديل نوع");
                                                document.getElementById('addTypeService').showModal();
                                            }}>تعديل الفئة</li>
                                            <li className='hover:bg-[#F1F1F1] flex justify-between p-[0.5rem] cursor-pointer' onClick={() => {
                                                setIdTypeService(item._id);
                                                setIndexTypeService(index)
                                                document.getElementById('deleteService').showModal()
                                            }}>حذف الفئة</li>
                                        </ul>
                                    </details>
                                </div>
                            })
                        }
                    </ReactSortable>
                }/>
            </div>
            <button onClick={handleSubmit} disabled={submit} className='btn btn-primary w-full mt-[1rem]'>{submit ? <Loading /> : "حفظ"}</button>
            <TypeServiceModel listTypeService={listTypeService} setListTypeService={setListTypeService} titleModalTypeService={titleModalTypeService} inputs={inputs} setInputs={setInputs} />
            <DeleteService listTypeService={listTypeService} setListTypeService={setListTypeService} idTypeService={idTypeService} indexTypeService={indexTypeService} />
        </div>
    )
}

export default TypeServices