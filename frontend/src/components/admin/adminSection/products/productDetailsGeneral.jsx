import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { getMethode } from '../../../../utils/apiFetchs';
import { getCategoriesRoute, getFileRoute, getTypeServicesRoute } from '../../../../utils/apiRoutes';
import Editor from '../editor/editor';
import { handleImageChange } from '../../../../utils/constants';
import ReactCropper from 'react-cropper';

function ProductDetailsGeneral() {
    const navigate = useNavigate()
    const { productDetails } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [idService, setIdService] = useState(productDetails.idService._id);
    const [listeTypeService, setListTypeService] = useState([]);
    const [categories, setCategories] = useState(false);
    const [arDescription, setArDescription] = useState(productDetails.descriptionAr);
    const [enDescription, setEnDescription] = useState(productDetails.descriptionEn);
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [alert, setAlert] = useState({
        display: false,
    });

    useEffect(() => {
        setLoading(true);
        getMethode(`${getCategoriesRoute}?type=${idService}&query=`).then((response) => {
            setCategories(response.data);
        }).catch((err) => {
            if (err.response.status == 401 || err.response.status == 403) {
                navigate("/admin/auth")
            }
        }).finally(() => {
            setLoading(false);
        })
    }, [idService]);
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
    return (
        <div>
            <div className='flex sm:flex-row flex-col gap-[1rem] my-[1rem]'>
                <select className="select select-bordered w-full font-bold text-[1rem]" onChange={(event) => {
                    setIdService(event.target.value)
                }}>
                    <option disabled selected={productDetails.idService._id == ""}>اختار نوع الخدمة</option>
                    {
                        listeTypeService && listeTypeService.map((item) => {
                            return <option value={item._id} key={item._id} selected={productDetails.idService._id == item._id}>{item.nameAr}</option>
                        })
                    }
                </select>

                <select className="select select-bordered w-full font-bold text-[1rem]" >
                    <option disabled selected={productDetails.idCategorie._id == ""}>اختار الفئة</option>
                    {
                        categories && categories.map((item, index) => {
                            return <option value={item._id} key={item._id} selected={productDetails.idCategorie._id == item._id}>{item.nameAr}</option>
                        })
                    }
                </select>
            </div>
            <div className='flex sm:flex-row flex-col gap-[1rem] my-[1rem]'>
                <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                    اسم المنتج AR
                    <input type="text" className="grow" value={productDetails.nameAr} />
                </label>
                <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                    اسم المنتج EN
                    <input type="text" className="grow" value={productDetails.nameEn} />
                </label>
            </div>
            <div className='flex sm:flex-row flex-col gap-[1rem] my-[1rem]'>
                <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                    من اجل كمية
                    <input type="number" className="grow" value={productDetails.forQuantity} />
                </label>
                <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                    سعر الكلفة
                    <input type="number" className="grow" value={productDetails.costPrice} />
                </label>
            </div>
            <div className='flex sm:flex-row flex-col gap-[1rem] my-[1rem]'>
                <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                    خدمة
                    <input type="text" className="grow" value={productDetails.service} />
                </label>
                <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                    رقم الخادم
                    <input type="number" className="grow" value={productDetails.serverNumber} />
                </label>
            </div>
            <div className='flex sm:flex-row flex-col gap-[1rem] my-[1rem]'>
                <label className="input input-bordered w-full flex items-center gap-2">
                    البلاد
                    <input type="text" className="grow" value={productDetails.country} />
                </label>
            </div>
            <div className='mt-[1rem]'>
                <p className='text-[1.2rem]'>وصف المنتج AR</p>
                <Editor content={arDescription} setContent={setArDescription} />
            </div>
            <div className='mt-[1rem]'>
                <p className='text-[1.2rem]'>وصف المنتج EN</p>
                <Editor content={enDescription} setContent={setEnDescription} />
            </div>
            <div className="flex items-center gap-[1rem] mt-[1rem]">
                <input type="checkbox" className="toggle toggle-primary" checked={productDetails.availableQuantity} value={productDetails.availableQuantity} />
                <span className="text-xl">الكمية المتوفرة</span>
            </div>
            <div className="flex items-center gap-[1rem] mt-[1rem]">
                <input type="checkbox" className="toggle toggle-primary" checked={productDetails.show} value={productDetails.show} />
                <span className="text-xl">عرض</span>
            </div>
            <div>
                <label className="block text-[1.2rem] text-gray-700 font-bold mt-2">تحميل الصورة</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleImageChange(event, setImage, setFile)}
                    className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className='flex items-center justify-around gap-[1rem]'>
                    {image && (
                        <div className="mt-4">
                            <ReactCropper
                                id="cropper"
                                className='w-[741px] h-[943px]'
                                src={image}
                                aspectRatio={1}
                                guides={false}
                            />
                        </div>
                    )}
                </div>
                <div className='mt-[1rem] flex justify-center items-center'>
                {
                    productDetails.image && <img src={`${getFileRoute}${productDetails.image}`} className='w-52 h-52' crossOrigin="anonymous" />
                }
                </div>
                <button className='btn btn-primary w-full mt-[1rem]'>حفظ</button>
            </div>
        </div>
    )
}

export default ProductDetailsGeneral