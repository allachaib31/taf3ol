import { faCaretDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../screens/admin/homeAdmin';
import { CreateCategoriesForService, DeleteCategory } from './modal';
import { getMethode } from '../../../utils/apiFetchs';
import { getCategoriesRoute, getTypeServicesRoute } from '../../../utils/apiRoutes';
import { ReactSortable } from 'react-sortablejs';
import LoadingScreen from '../../loadingScreen';

const sortableOptions = {
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    ghostClass: 'ghost',
};

function CategoriesServices() {
    const navigate = useNavigate();
    const socket = useSocket();
    const [inputs, setInputs] = useState({
        nameAr: "", nameEn: "", idService: "", show: true, image: ""
    });
    const [loading, setLoading] = useState(false);
    const [titleModalCategorie, setTitleModalCategorie] = useState("إضافة فئة");
    const [listeTypeService, setListTypeService] = useState([]);
    const [categories, setCategories] = useState(false);
    const [idCategorie, setIdCategorie] = useState(false);
    const [indexCategorie, setIndexCategorie] = useState(false);
    const [params, setParams] = useState("الكل");
    const [query, setQuery] = useState("");
    const [startTyping, setStartTyping] = useState(false);
    const [alert, setAlert] = useState({
        display: false,
    });
    useEffect(() => {
        setLoading(true);
        getMethode(`${getCategoriesRoute}?type=${params}&query=${query}`).then((response) => {
            setCategories(response.data);
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
    }, [params, query]);
    useEffect(() => {
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
        })
    }, []);
    useEffect(() => {
        if (socket) {
            socket.on('receive-notification', (notification) => {
                if (notification.name == "add category") {
                    if(params == "الكل" || params == notification.newCategories.idService){
                        let newCategories = [...categories, notification.newCategories];
                        setCategories(newCategories);
                    }
                } else if (notification.name == "update category") {
                    if(params == "الكل" || params == notification.newList[0].idService){
                        setCategories(notification.newList);
                    }
                }else if (notification.name == "delete categorie"){
                    setCategories(notification.newList)
                }
            });
            return () => {
                // Clean up event listeners when component unmounts
                socket.off('receive-notification');
            };
        }
    }, [socket, params, categories]);
    return (
        <div>
            <h1 className='text-3xl font-[900]'>الفئات</h1>
            <div className='flex gap-[1rem] justify-between mb-[1rem]'>
                <div className='flex gap-[1rem]'>
                    <button onClick={() => {
                        setTitleModalCategorie("إضافة فئة");
                        setInputs({
                            nameAr: "", nameEn: "", idService: "", show: true, image: ""
                        })
                        document.getElementById('CreateCategoriesForService').showModal()
                    }} className='btn btn-primary'> اضافة فئة جديد</button>
                </div>
                <div className="join space-y-0">
                    <div>
                        <input className="input bg-black sm:w-auto w-full input-bordered join-item text-white" placeholder="يبحث" value={query}
                            onChange={(e) => {
                                setStartTyping(true);
                                setQuery(e.target.value)
                            }} />
                    </div>
                    <div className="indicator ">
                        <button className="btn  join-item ">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <select className="select select-bordered w-full font-bold text-[1rem]" onChange={(event) => {
                    setParams(event.target.value)
                }} >
                    <option disabled>اختار نوع الخدمة</option>
                    <option selected value="الكل">الكل</option>
                    {
                        listeTypeService && listeTypeService.map((item) => {
                            return <option value={item._id} key={item._id}>{item.nameAr}</option>
                        })
                    }
                </select>
            </div>
            <LoadingScreen loading={loading} component={<div className='mt-[1rem]'>
                {
                    categories &&
                    <ReactSortable
                        list={categories}
                        setList={(currentCategories) => setCategories(currentCategories)}
                        {...sortableOptions}
                    >
                        {
                            categories && categories.map((item, index) => {
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
                                                    idService: item.idService,
                                                    show: item.show,
                                                    image: item.image,
                                                    index
                                                })
                                                setTitleModalCategorie("تعديل الفئة");
                                                document.getElementById('CreateCategoriesForService').showModal();
                                            }}>تعديل الفئة</li>
                                            <li className='hover:bg-[#F1F1F1] flex justify-between p-[0.5rem] cursor-pointer'  onClick={() => {
                                                setIdCategorie(item._id);
                                                setIndexCategorie(index)
                                                document.getElementById('deleteCategory').showModal()
                                            }}>حذف الفئة</li>
                                        </ul>
                                    </details>
                                </div>
                            })
                        }
                    </ReactSortable>
                }
            </div>} />
            <button className='btn btn-primary w-full mt-[1rem]'>حفظ</button>
            <CreateCategoriesForService titleModalCategorie={titleModalCategorie} listeTypeService={listeTypeService} categories={categories} setCategories={setCategories} params={params} inputs={inputs} setInputs={setInputs}/>
            <DeleteCategory categories={categories} setCategories={setCategories} idCategorie={idCategorie} indexCategorie={indexCategorie} />
        </div>
    )
}

export default CategoriesServices