import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { getMethode, putMethode } from '../../../../utils/apiFetchs';
import { getCategoriesRoute, getFileRoute, getTypeServicesRoute, updateProductGeneralRoute } from '../../../../utils/apiRoutes';
import Editor from '../editor/editor';
import { handleCrop, handleImageChange } from '../../../../utils/constants';
import ReactCropper from 'react-cropper';
import LoadingScreen from '../../../loadingScreen';
import Loading from '../../../loading';
import Alert from '../../../alert';

function ProductDetailsGeneral() {
    const navigate = useNavigate()
    const { productDetails, setProductDetails } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [idService, setIdService] = useState(productDetails.idService._id);
    const [idCategorie, setIdCategorie] = useState(productDetails.idCategorie._id);
    const [listeTypeService, setListTypeService] = useState([]);
    const [categories, setCategories] = useState(false);
    const [arDescription, setArDescription] = useState(productDetails.descriptionAr);
    const [enDescription, setEnDescription] = useState(productDetails.descriptionEn);
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [alert, setAlert] = useState({
        display: false,
    });

    const handleSubmit = async () => {
        setSubmit(true);
        setAlert({
            display: false,
        });
        try {
            const form = new FormData();
            form.append("_id", productDetails._id);
            form.append("idService", idService);
            form.append("idCategorie", idCategorie);
            form.append("nameAr", productDetails.nameAr);
            form.append("nameEn", productDetails.nameEn);
            form.append("service", productDetails.service);
            form.append("country", productDetails.country);
            form.append("serverNumber", productDetails.serverNumber);
            form.append("costPrice", productDetails.costPrice);
            form.append("forQuantity", productDetails.forQuantity);
            form.append("descriptionAr", arDescription);
            form.append("descriptionEn", enDescription);
            form.append("image", await handleCrop(file));
            form.append("availableQuantity", productDetails.availableQuantity);
            form.append("show", productDetails.show);
            const response = await putMethode(updateProductGeneralRoute, form);
            setProductDetails(response.data.product);
            setImage(null);
            setFile(null);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
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
        getMethode(`${getCategoriesRoute}?type=${idService}&query=`).then((response) => {
            if(idService.toString() != productDetails.idService._id.toString()) {
                setIdCategorie("");
            }
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
            {alert.display && <Alert msg={alert} />}
            <div className='flex sm:flex-row flex-col gap-[1rem] my-[1rem]'>
                <select className="select select-bordered w-full font-bold text-[1rem]" onChange={(event) => {
                    setIdService(event.target.value);
                }}>
                    <option disabled selected={productDetails.idService._id == ""}>اختار نوع الخدمة</option>
                    {
                        listeTypeService && listeTypeService.map((item) => {
                            return <option value={item._id} key={item._id} selected={productDetails.idService._id == item._id}>{item.nameAr}</option>
                        })
                    }
                </select>
                <LoadingScreen loading={loading} component={
                    <select className="select select-bordered w-full font-bold text-[1rem]" onChange={(event) => {
                        setIdCategorie(event.target.value);
                    }}>
                        <option disabled selected={idCategorie == ""}>اختار الفئة</option>
                        {
                            categories && categories.map((item, index) => {
                                return <option value={item._id} key={item._id} selected={idCategorie == item._id}>{item.nameAr}</option>
                            })
                        }
                    </select>
                } />
            </div>
            <div className='flex sm:flex-row flex-col gap-[1rem] my-[1rem]'>
                <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                    اسم المنتج AR
                    <input type="text" className="grow" value={productDetails.nameAr} onChange={(event) => {
                        setProductDetails((prevDetails) => {
                            return {
                                ...prevDetails,
                                nameAr: event.target.value
                            }
                        })
                    }} />
                </label>
                <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                    اسم المنتج EN
                    <input type="text" className="grow" value={productDetails.nameEn} onChange={(event) => {
                        setProductDetails((prevDetails) => {
                            return {
                                ...prevDetails,
                                nameEn: event.target.value
                            }
                        })
                    }} />
                </label>
            </div>
            <div className='flex sm:flex-row flex-col gap-[1rem] my-[1rem]'>
                <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                    من اجل كمية
                    <input type="number" className="grow" value={productDetails.forQuantity} onChange={(event) => {
                        setProductDetails((prevDetails) => {
                            return {
                                ...prevDetails,
                                forQuantity: event.target.value
                            }
                        })
                    }} />
                </label>
                <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                    سعر الكلفة
                    <input type="number" className="grow" value={productDetails.costPrice} onChange={(event) => {
                        setProductDetails((prevDetails) => {
                            return {
                                ...prevDetails,
                                costPrice: event.target.value
                            }
                        })
                    }} />
                </label>
            </div>
            <div className='flex sm:flex-row flex-col gap-[1rem] my-[1rem]'>
                <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                    خدمة
                    <input type="text" className="grow" value={productDetails.service} onChange={(event) => {
                        setProductDetails((prevDetails) => {
                            return {
                                ...prevDetails,
                                service: event.target.value
                            }
                        })
                    }} />
                </label>
                <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                    رقم الخادم
                    <input type="number" className="grow" value={productDetails.serverNumber} onChange={(event) => {
                        setProductDetails((prevDetails) => {
                            return {
                                ...prevDetails,
                                serverNumber: event.target.value
                            }
                        })
                    }} />
                </label>
            </div>
            <div className='flex sm:flex-row flex-col gap-[1rem] my-[1rem]'>
                <label className="input input-bordered w-full flex items-center gap-2">
                    البلاد
                    <input type="text" className="grow" value={productDetails.country} onChange={(event) => {
                        setProductDetails((prevDetails) => {
                            return {
                                ...prevDetails,
                                country: event.target.value
                            }
                        })
                    }} />
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
                <input type="checkbox" className="toggle toggle-primary" checked={productDetails.availableQuantity} value={productDetails.availableQuantity} onChange={(event) => {
                    setProductDetails((prevDetails) => {
                        return {
                            ...prevDetails,
                            availableQuantity: !productDetails.availableQuantity
                        }
                    })
                }} />
                <span className="text-xl">الكمية المتوفرة</span>
            </div>
            <div className="flex items-center gap-[1rem] mt-[1rem]">
                <input type="checkbox" className="toggle toggle-primary" checked={productDetails.show} value={productDetails.show} onChange={(event) => {
                    setProductDetails((prevDetails) => {
                        return {
                            ...prevDetails,
                            show: !productDetails.show
                        }
                    })
                }} />
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
                <button className='btn btn-primary w-full mt-[1rem]' disabled={submit} onClick={handleSubmit}>{submit ? <Loading /> : 'حفظ'}</button>
            </div>

        </div>
    )
}

export default ProductDetailsGeneral