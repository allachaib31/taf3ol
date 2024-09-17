import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { faCaretDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AddService, CreateCategoriesForService, DeleteCategory, DisableCategory } from './modal';

const sortableOptions = {
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    ghostClass: 'ghost',
};

function ServicesInformations() {
    const [categories, setCategories] = useState([
        {
            id: 1,
            name: 'Best Selling',
            items: [
                {
                    id: 1,
                    service: '🔴 YouTube Views [NEW - Recommended] [Start time: Within 1-24H] [Speed: Up to 1-3k/Day] [Refill: 30 Days]',
                    type: 'Default',
                    provider: 'smmcpan.com',
                    rate: '60 Days',
                    min: 100,
                    max: 5000,
                    status: 'Active',
                },
                {
                    id: 2,
                    service: '🔴 YouTube Views [NEW - Recommended] [Start time: Within 1-24H] [Speed: Up to 1-3k/Day] [Refill: 30 Days]',
                    type: 'Default',
                    provider: 'smmcpan.com',
                    rate: '60 Days',
                    min: 100,
                    max: 5000,
                    status: 'Active',
                },
            ],
        },
        {
            id: 2,
            name: 'Social Media Services',
            items: [
                {
                    id: 1,
                    service: '🔴 YouTube Views [NEW - Recommended] [Start time: Within 1-24H] [Speed: Up to 1-3k/Day] [Refill: 30 Days]',
                    type: 'Default',
                    provider: 'smmcpan.com',
                    rate: '60 Days',
                    min: 100,
                    max: 5000,
                    status: 'Active',
                },
                {
                    id: 2,
                    service: '🔴 YouTube Views [NEW - Recommended] [Start time: Within 1-24H] [Speed: Up to 1-3k/Day] [Refill: 30 Days]',
                    type: 'Default',
                    provider: 'smmcpan.com',
                    rate: '60 Days',
                    min: 100,
                    max: 5000,
                    status: 'Active',
                },
            ],
        },
    ]);
    const [titleModalCategorie, setTitleModalCategorie] = useState("إنشاء فئة");

    return (
        <div>
            <div className='flex xl:flex-row flex-col gap-[1rem] justify-between'>
                <div className='flex gap-[1rem]'>
                    <button onClick={() => document.getElementById('addService').showModal()} className='btn btn-primary'> إضافة خدمة</button>
                    <button onClick={() => {
                        setTitleModalCategorie("إنشاء فئة")
                        document.getElementById('CreateCategoriesForService').showModal()
                    }} className='btn btn-primary'> إنشاء فئة</button>
                    <button className='btn btn-primary'> خدمات الاستيراد</button>
                </div>
                <div className="sm:join space-y-2 sm:space-y-0">
                    <div>
                        <input className="input bg-black sm:w-auto w-full input-bordered join-item" placeholder="يبحث" />
                    </div>
                    <select className="select bg-black text-white sm:w-auto w-full select-bordered join-item">
                        <option value="الكل" selected>الكل</option>
                        <option value="اسم الخدمة">اسم الخدمة</option>
                        <option value="معرف الخدمة">معرف الخدمة</option>
                        <option value="معرف خارجي">معرف خارجي</option>
                        <option value="اسم الفئة">اسم الفئة</option>
                    </select>
                    <div className="indicator sm:w-auto w-full">
                        <button className="btn btn-primary join-item sm:w-auto w-full">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Category Table */}
            <div className="overflow-x-auto mt-[1rem]">
                <table className="table bg-white xl:w-screen w-[1900px]">
                    <thead>
                        <tr className='text-[1rem]'>
                            <th className='w-[6.25%] flex items-center gap-[1rem]'>
                                <input type="checkbox" className="checkbox" /> المعرف
                            </th>
                            <th className='w-[50%]'>الخدمات</th>
                            <th className='w-[7.25%] py-[12px] px-[16px]'>الأنواع</th>
                            <th className='w-[7.25%] py-[12px] px-[16px]'>
                                <details className='relative'>
                                    <summary>مزود الخدمة</summary>
                                    <div className='overflow-x-auto absolute bg-white shadow-md w-[200px] flex flex-col'>
                                        <label className="input input-bordered flex items-center gap-2">
                                            <input type="text" className="grow" placeholder="يبحث" />
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                className="h-4 w-4 opacity-70">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                                    clipRule="evenodd" />
                                            </svg>
                                        </label>
                                        <ul className='flex text-black flex-col text-wrap'>
                                            <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>يدوي (1)</li>
                                            <li className='hover:bg-[#F1F1F1] cursor-pointer p-[1rem]'>smmcpan.com (5000)</li>
                                        </ul>
                                    </div>
                                </details>
                            </th>
                            <th className='w-[7.25%] py-[12px] px-[16px]'>المعدل</th>
                            <th className='w-[7.25%] py-[12px] px-[16px]'>الحد الأدنى</th>
                            <th className='w-[7.25%] py-[12px] px-[16px]'>الحد الأقصى</th>
                            <th className='w-[7.25%] py-[12px] px-[16px]'>
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
                            <th className='w-[7.25%] py-[12px] px-[16px]'></th>
                        </tr>
                    </thead>
                </table>
                <ReactSortable
                    className='xl:w-screen w-[1900px]'
                    list={categories}
                    setList={(currentCategories) => setCategories(currentCategories)}
                    {...sortableOptions}
                >
                    {categories.map((category, catIndex) => (
                        <div key={category.id} className="xl:w-screen w-[1900px] text-[1rem]">
                            <div className="bg-[#F1F1F1] cursor-move py-[12px] px-[16px]">
                                <div>
                                    <div className='flex items-center w-full gap-[1rem]'>
                                        <h1 className='text-2xl font-bold'>{category.name}</h1>
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
                                        <div className="w-[7%] py-[12px] px-[16px]  whitespace-wrap flex items-center gap-[1rem]"><input type="checkbox" className="checkbox" /> {item.id}</div>
                                        <div className="w-[50%] py-[12px] px-[16px]  whitespace-wrap">{item.service}</div>
                                        <div className="w-[7%] py-[12px] px-[16px]  whitespace-wrap">{item.type}</div>
                                        <div className="w-[7%] py-[12px] px-[16px]  whitespace-wrap">{item.provider}</div>
                                        <div className="w-[7%] py-[12px] px-[16px]  whitespace-wrap">{item.rate}</div>
                                        <div className="w-[7%] py-[12px] px-[16px]  whitespace-wrap">{item.min}</div>
                                        <div className="w-[7%] py-[12px] px-[16px]  whitespace-wrap">{item.max}</div>
                                        <div className="w-[7%] py-[12px] px-[16px]  whitespace-wrap">{item.status}</div>
                                        <div className="w-[7%] py-[12px] px-[16px]  whitespace-wrap">
                                            <details className='relative'>
                                                <summary className='btn'>الأفعال <FontAwesomeIcon icon={faCaretDown} /></summary>
                                                <ul className='z-[999] absolute bg-white shadow-md w-[170px] flex flex-col'>
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
                        </div>
                    ))}
                </ReactSortable>
            </div>
            <AddService />
            <CreateCategoriesForService titleModalCategorie={titleModalCategorie} />
            <DisableCategory />
            <DeleteCategory />
        </div>
    );
}

export default ServicesInformations;
