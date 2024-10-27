import React, { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { faCaretDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AddService, AddTypeService, CreateCategoriesForService, DeleteCategory, DisableCategory } from './modal';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../screens/admin/homeAdmin';
import { getMethode } from '../../../utils/apiFetchs';
import { getCategoriesRoute, getTypeCategoriesRoute, searchServiceRoute } from '../../../utils/apiRoutes';
import LoadingScreen from '../../loadingScreen';

const sortableOptions = {
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    ghostClass: 'ghost',
};

function ServicesInformations() {
    const navigate = useNavigate();
    const socket = useSocket();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState(false);
    const [titleModalCategorie, setTitleModalCategorie] = useState("إضافة فئة");
    const [query, setQuery] = useState("");
    const [startTyping, setStartTyping] = useState(false);
    const [typeCategory, setTypeCategory] = useState("smmcpan.com");
    const [listTypeCategory, setListTypeCategory] = useState([]);
    const [alert, setAlert] = useState({
        display: false,
    });
    const searchQuery = async (searchTerm) => {
        setLoading(true);
        try {
            const response = await getMethode(`${searchServiceRoute}?query=${searchTerm}`);
            setCategories(response.data)
        } catch (error) {
            console.error("Error searching:", error);
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        // Debounce effect to delay search until user stops typing
        const delayDebounce = setTimeout(() => {
            if (startTyping) {
                searchQuery(query); // Function to fetch all users
            }
        }, 500); // Delay time in ms

        return () => clearTimeout(delayDebounce); // Clean up the timeout
    }, [query]);
    useEffect(() => {
        getMethode(`${getTypeCategoriesRoute}`).then((response) => {
            setListTypeCategory(response.data);
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
        setLoading(true);
        setAlert({
            display: false,
        });
        getMethode(`${getCategoriesRoute}?type=${typeCategory}`).then((response) => {
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
    }, [typeCategory])
    useEffect(() => {
        if (socket) {
            socket.on('receive-notification', (notification) => {
                if (notification.name == "add Service") {
                    setCategories(notification.newCategories);
                    //if (direction == "down") setAdmins(prevAdmins => [...prevAdmins, notification.newAdmin]);
                    //else setAdmins(prevAdmins => [notification.newAdmin, ...prevAdmins]);
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
            <div className='flex xl:flex-row flex-col gap-[1rem] justify-between'>
                <div className='flex gap-[1rem]'>
                    <button onClick={() => document.getElementById('addService').showModal()} className='btn btn-primary'> إضافة خدمة</button>
                    <button onClick={() => {
                        setTitleModalCategorie("إضافة فئة")
                        document.getElementById('CreateCategoriesForService').showModal()
                    }} className='btn btn-primary'> إضافة فئة</button>
                    <button onClick={() => document.getElementById('addTypeService').showModal()}  className='btn btn-primary'> اضافة نوع جديد</button>
                </div>
                <div className="sm:join space-y-2 sm:space-y-0">
                    <div>
                        <input className="input bg-black sm:w-auto w-full input-bordered join-item text-white" placeholder="يبحث" value={query}
                            onChange={(e) => {
                                setStartTyping(true);
                                setQuery(e.target.value)
                            }} />
                    </div>
                    <div className="indicator sm:w-auto w-full">
                        <button className="btn  join-item sm:w-auto w-full">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </div>
            </div>
            <select className="mt-[1rem] select select-bordered w-full font-bold text-[1rem]" onChange={(event) => {
                setTypeCategory(event.target.value);
            }}>
                <option value="smmcpan.com">smmcpan.com</option>
                <option value="numbersapp.online">numbersapp.online</option>
                <option value="Manuel">يدوي</option>
            </select>
            {/* Category Table */}
            <LoadingScreen loading={loading} component={
                <div className="overflow-x-auto  mt-[1rem]">
                    <table className="table w-[1840px] bg-white">
                        <thead>
                            <tr className='text-[1rem]'>
                                <th className='w-[10%] flex items-center gap-[1rem]'>
                                    <input type="checkbox" className="checkbox" /> المعرف
                                </th>
                                <th className='w-[22%]'>الخدمات</th>
                                <th className='w-[8%] py-[12px] px-[16px]'>الأنواع</th>
                                <th className='w-[8%] py-[12px] px-[16px]'>
                                مزود الخدمة
                                </th>
                                <th className='w-[8%] py-[12px] px-[16px]'>المعدل</th>
                                <th className='w-[8%] py-[12px] px-[16px]'>الكمية</th>
                                <th className='w-[8%] py-[12px] px-[16px]'>الحد الأدنى</th>
                                <th className='w-[8%] py-[12px] px-[16px]'>الحد الأقصى</th>
                                <th className='w-[8%] py-[12px] px-[16px]'>السعر</th>
                                <th className='w-[8%] py-[12px] px-[16px]'>التخفيض</th>
                                <th className='w-[8%] py-[12px] px-[16px]'>
                                    <details className='relative'>
                                        <summary>الحالة</summary>
                                        <div className='overflow-x-auto absolute bg-white shadow-md w-[100px] flex flex-col'>
                                            <ul className='flex text-black flex-col text-wrap'>
                                                <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>الكل</li>
                                                <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>معطل</li>
                                                <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>مفعل</li>
                                            </ul>
                                        </div>
                                    </details>
                                </th>
                                <th className='w-[8%] py-[12px] px-[16px]'></th>
                            </tr>
                        </thead>
                    </table>
                    {
                        categories &&
                        <ReactSortable
                            className='w-[1840px]'
                            list={categories}
                            setList={(currentCategories) => setCategories(currentCategories)}
                            {...sortableOptions}
                        >
                            {categories.map((category, catIndex) => (
                                <div key={category.id} className=" text-[1rem]">
                                    <div className="bg-[#F1F1F1] cursor-move py-[12px] px-[16px]">
                                        <div>
                                            <div className='flex items-center w-full gap-[1rem]'>
                                                <h1 className='text-2xl font-bold'>{category.nameAr}</h1>
                                                <details className='relative'>
                                                    <summary className='btn'>الأفعال <FontAwesomeIcon icon={faCaretDown} /></summary>
                                                    <ul className='z-[999] absolute bg-white shadow-md w-[150px] flex flex-col'>
                                                        <li className='hover:bg-[#F1F1F1] flex justify-between p-[0.5rem] cursor-pointer' onClick={() => {
                                                            setTitleModalCategorie("تعديل الفئة")
                                                            document.getElementById('CreateCategoriesForService').showModal()
                                                        }}>تعديل الفئة</li>
                                                        <li className='hover:bg-[#F1F1F1] flex justify-between p-[0.5rem] cursor-pointer' onClick={() => document.getElementById('disableCategory').showModal()}>تعطيل الفئة</li>
                                                        <li className='hover:bg-[#F1F1F1] flex justify-between p-[0.5rem] cursor-pointer' onClick={() => document.getElementById('deleteCategory').showModal()}>حذف الفئة</li>
                                                    </ul>
                                                </details>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        category.items &&
                                        <ReactSortable
                                            list={category.items}
                                            setList={(currentItems) => {
                                                const newCategories = [...categories];
                                                newCategories[catIndex] = { ...category, items: currentItems };
                                                setCategories(newCategories);
                                            }}
                                            group={`category-${category.id}`}
                                            {...sortableOptions}
                                        >
                                            {category.items.map(item => (
                                                <div className='flex' key={item.id}>
                                                    <div className="w-[7%] py-[12px] px-[16px]  whitespace-wrap flex items-center gap-[1rem]"><input type="checkbox" className="checkbox" /> <span title={item.service}>{item.service.substr(item.service.length - 4,4)}</span></div>
                                                    <div className="w-[26%] py-[12px] px-[16px]  whitespace-wrap flex items-center">{item.nameAr}</div>
                                                    <div className="w-[10%] py-[12px] px-[16px]  whitespace-wrap flex items-center">{item.type}</div>
                                                    <div className="w-[9%] py-[12px] px-[16px]  whitespace-wrap flex items-center">{item.provider}</div>
                                                    <div className="w-[10%] py-[12px] px-[16px]  whitespace-wrap flex items-center">{item.rate}</div>
                                                    <div className="w-[10%] py-[12px] px-[16px]  whitespace-wrap flex items-center">{item.quantity}</div>
                                                    <div className="w-[10%] py-[12px] px-[16px]  whitespace-wrap flex items-center">{item.min}</div>
                                                    <div className="w-[9%] py-[12px] px-[16px]  whitespace-wrap flex items-center">{item.max}</div>
                                                    <div className="w-[9%] py-[12px] px-[16px]  whitespace-wrap flex items-center">{item.price}</div>
                                                    <div className="w-[9%] py-[12px] px-[16px]  whitespace-wrap flex items-center">{item.discount}</div>
                                                    <div className="w-[7%] py-[12px] px-[16px]  whitespace-wrap flex items-center">{item.status}</div>
                                                    <div className="w-[8%] py-[12px] px-[16px]  whitespace-wrap flex items-center">
                                                        <details className='relative'>
                                                            <summary className='btn'>الأفعال <FontAwesomeIcon icon={faCaretDown} /></summary>
                                                            <ul className='z-[999] absolute left-[0.6rem] bg-white shadow-md w-[170px] flex flex-col'>
                                                                <li className='hover:bg-[#F1F1F1] flex justify-between p-[0.5rem] cursor-pointer' >تعديل الخدمات</li>
                                                                <li className='hover:bg-[#F1F1F1] flex justify-between p-[0.5rem] cursor-pointer' >تعديل الوصف</li>
                                                                <li className='hover:bg-[#F1F1F1] flex justify-between p-[0.5rem] cursor-pointer' >تعطيل الخدمة</li>
                                                                <li className='hover:bg-[#F1F1F1] flex justify-between p-[0.5rem] cursor-pointer' >حذف الأسعار المخصصة</li>
                                                                <li className='hover:bg-[#F1F1F1] flex justify-between p-[0.5rem] cursor-pointer' >نسخ</li>
                                                                <li className='hover:bg-[#F1F1F1] flex justify-between p-[0.5rem] cursor-pointer' >حذف الخدمة</li>
                                                            </ul>
                                                        </details>
                                                    </div>
                                                </div>
                                            ))}
                                        </ReactSortable>
                                    }
                                </div>
                            ))}
                        </ReactSortable>
                    }
                </div>
            } />
            <AddService categories={categories}  setCategories={setCategories} typeCategory={typeCategory}/>
            <CreateCategoriesForService titleModalCategorie={titleModalCategorie} categories={categories} setCategories={setCategories}/>
            <DisableCategory />
            <DeleteCategory />
            <AddTypeService />
        </div>
    );
}

export default ServicesInformations;
