import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../screens/admin/homeAdmin';
import { getMethode, postMethode } from '../../../../utils/apiFetchs';
import { addProductRoute, getCategoriesRoute, getTypeServicesRoute } from '../../../../utils/apiRoutes';
import Editor from '../editor/editor';
import ReactCropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { ChooseProductsApi } from '../modal';
import Loading from '../../../loading';
import Alert from '../../../alert';
import { getApis } from '../../../../utils/constants';

function AddProducts() {
    const navigate = useNavigate();
    const socket = useSocket();
    const [loading, setLoading] = useState(false);
    const [apiList, setApiList] = useState(false);
    const [listeTypeService, setListTypeService] = useState([]);
    const [categories, setCategories] = useState(false);
    const [inputs, setInputs] = useState({
        idService: "",
        idCategorie: "",
        nameAr: "",
        nameEn: "",
        service: "",
        country: "",
        serverNumber: "",
        costPrice: "",
        forQuantity: "",
        descriptionAr: "",
        descriptionEn: "",
        image: "",
        quantityQuality: "بدون",
        minimumQuantity: "",
        maximumQuantity: "",
        availableQuantity: "",
        provider: [],
        show: true,
    });
    const [arDescription, setArDescription] = useState('');
    const [enDescription, setEnDescription] = useState('');
    const [idService, setIdService] = useState("");
    const [query, setQuery] = useState("");
    const [alert, setAlert] = useState({
        display: false,
    });
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setFile(selectedFile);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleCrop = () => {
        if (file) {
            const cropper = document.getElementById('cropper').cropper;
            const canvas = cropper.getCroppedCanvas();

            // Convert the canvas to a Blob (binary format)
            return new Promise((resolve, reject) => {
                canvas.toBlob((blob) => {
                    if (blob) {
                        const croppedFile = new File([blob], "cropped-image.png", { type: blob.type });
                        resolve(croppedFile);
                    } else {
                        reject(new Error("Failed to create Blob from canvas."));
                    }
                }, "image/png"); // You can specify the desired image format
            });
        }
        return "";
        //return Promise.reject(new Error("No file selected."));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setAlert({
            display: false,
        });
        try {
            const form = new FormData();
            form.append("idService", inputs.idService);
            form.append("idCategorie", inputs.idCategorie);
            form.append("nameAr", inputs.nameAr);
            form.append("nameEn", inputs.nameEn);
            form.append("service", inputs.service);
            form.append("country", inputs.country);
            form.append("serverNumber", inputs.serverNumber);
            form.append("costPrice", inputs.costPrice);
            form.append("forQuantity", inputs.forQuantity);
            form.append("descriptionAr", inputs.descriptionAr);
            form.append("descriptionEn", inputs.descriptionEn);
            form.append("image", await handleCrop());
            form.append("quantityQuality", inputs.quantityQuality);
            form.append("minimumQuantity", inputs.minimumQuantity);
            form.append("maximumQuantity", inputs.maximumQuantity);
            form.append("availableQuantity", inputs.availableQuantity);
            form.append("provider", JSON.stringify(inputs.provider));
            form.append("show", inputs.show);
            const response = await postMethode(addProductRoute, form);
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
            setLoading(false);
        }
    }
    useEffect(() => {
        getApis(setApiList);
    }, []);
    useEffect(() => {
        setLoading(true);
        getMethode(`${getCategoriesRoute}?type=${idService}&query=${query}`).then((response) => {
            setCategories(response.data);
        }).catch((err) => {
            if (err.response.status == 401 || err.response.status == 403) {
                navigate("/admin/auth")
            }
        }).finally(() => {
            setLoading(false);
        })
    }, [idService, query]);
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
        setInputs((prevInputs) => {
            return {
                ...prevInputs,
                descriptionAr: arDescription,
                descriptionEn: enDescription
            }
        })
    }, [arDescription, enDescription]);
    return (
        <div>
            <h1 className='text-3xl font-[900]'>منتج جديد</h1>
            <button className='btn btn-secondary' onClick={() => document.getElementById('chooseProductsApi').showModal()}>اضافة منتج من API</button>
            <div>
                {alert.display && <Alert msg={alert} />}
                <div className='flex sm:flex-row flex-col gap-[1rem] my-[1rem]'>
                    <select className="select select-bordered w-full font-bold text-[1rem]" onChange={(event) => {
                        setIdService(event.target.value)
                        setInputs((prevInputs) => {
                            return {
                                ...prevInputs,
                                idService: event.target.value
                            }
                        })
                    }}>
                        <option disabled selected>اختار نوع الخدمة</option>
                        {
                            listeTypeService && listeTypeService.map((item) => {
                                return <option value={item._id} key={item._id}>{item.nameAr}</option>
                            })
                        }
                    </select>

                    <select className="select select-bordered w-full font-bold text-[1rem]" onChange={(event) => {
                        setInputs((prevInputs) => {
                            return {
                                ...prevInputs,
                                idCategorie: event.target.value
                            }
                        })
                    }}>
                        <option selected disabled>اختار الفئة</option>
                        {
                            categories && categories.map((item, index) => {
                                return <option value={item._id} key={item._id}>{item.nameAr}</option>
                            })
                        }
                    </select>
                </div>
                <div className='flex sm:flex-row flex-col gap-[1rem] my-[1rem]'>
                    <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                        اسم المنتج AR
                        <input type="text" className="grow" value={inputs.nameAr} onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    nameAr: event.target.value
                                }
                            })
                        }} />
                    </label>
                    <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                        اسم المنتج EN
                        <input type="text" className="grow" value={inputs.nameEn} onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    nameEn: event.target.value
                                }
                            })
                        }} />
                    </label>
                </div>
                <div className='flex sm:flex-row flex-col gap-[1rem] my-[1rem]'>
                    <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                        من اجل كمية
                        <input type="number" className="grow" value={inputs.forQuantity} onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    forQuantity: event.target.value
                                }
                            })
                        }} />
                    </label>
                    <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                        سعر الكلفة
                        <input type="number" className="grow" value={inputs.costPrice} onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    costPrice: event.target.value
                                }
                            })
                        }} />
                    </label>
                </div>
                <div className='flex sm:flex-row flex-col gap-[1rem] my-[1rem]'>
                    <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                        خدمة
                        <input type="text" className="grow" value={inputs.service} onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    service: event.target.value
                                }
                            })
                        }} />
                    </label>
                    <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                        رقم الخادم
                        <input type="number" className="grow" value={inputs.serverNumber} onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
                                    serverNumber: event.target.value
                                }
                            })
                        }} />
                    </label>
                </div>
                <div className='flex sm:flex-row flex-col gap-[1rem] my-[1rem]'>
                    <label className="input input-bordered w-full flex items-center gap-2">
                        البلاد
                        <input type="text" className="grow" value={inputs.country} onChange={(event) => {
                            setInputs((prevInputs) => {
                                return {
                                    ...prevInputs,
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
                <div>
                    <label className="block text-[1.2rem] text-gray-700 font-bold mt-2">تحميل الصورة</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
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
                </div>
                <div className='mt-[1rem]'>
                    <h1 className='text-[1.2rem]'>نوعية الكمية </h1>
                    <div className='flex items-center gap-[1rem] sm:gap-[3rem]'>
                        <div className='flex flex-col gap-[1rem]'>
                            <div className='flex items-center gap-[0.5rem]'>
                                <input type="radio" name="quantityQuality" className="radio" checked={inputs.quantityQuality == "بدون"} onClick={(event) => {
                                    setInputs((prevInputs) => {
                                        return {
                                            ...prevInputs,
                                            quantityQuality: "بدون"
                                        }
                                    })
                                }} /> <span className='text-[1.1rem] font-bold'>بدون</span>
                            </div>
                            <div className='flex items-center gap-[0.5rem]'>
                                <input type="radio" name="quantityQuality" className="radio" checked={inputs.quantityQuality == "كمية"} onClick={(event) => {
                                    setInputs((prevInputs) => {
                                        return {
                                            ...prevInputs,
                                            quantityQuality: "كمية"
                                        }
                                    })
                                }} /> <span className='text-[1.1rem] font-bold'>كمية</span>
                            </div>
                            <div className='flex items-center gap-[0.5rem]'>
                                <input type="radio" name="quantityQuality" className="radio" checked={inputs.quantityQuality == "عداد"} onClick={(event) => {
                                    setInputs((prevInputs) => {
                                        return {
                                            ...prevInputs,
                                            quantityQuality: "عداد"
                                        }
                                    })
                                }} /> <span className='text-[1.1rem] font-bold'>عداد</span>
                            </div>
                        </div>
                        {
                            inputs.quantityQuality == "كمية" || inputs.quantityQuality == "عداد" ? <div className='w-full'>
                                <label className="input input-bordered w-full flex items-center gap-2">
                                    اقل كمية
                                    <input type="number" className="grow" value={inputs.minimumQuantity} onChange={(event) => {
                                        setInputs((prevInputs) => {
                                            return {
                                                ...prevInputs,
                                                minimumQuantity: event.target.value
                                            }
                                        })
                                    }} />
                                </label>
                                <label className="mt-[1rem] input input-bordered w-full flex items-center gap-2">
                                    اكبر كمية
                                    <input type="number" className="grow" value={inputs.maximumQuantity} onChange={(event) => {
                                        setInputs((prevInputs) => {
                                            return {
                                                ...prevInputs,
                                                maximumQuantity: event.target.value
                                            }
                                        })
                                    }} />
                                </label>
                            </div> : ""
                        }
                    </div>
                </div>
                <div className="flex items-center gap-[1rem] mt-[1rem]">
                    <input type="checkbox" className="toggle toggle-primary" checked={inputs.availableQuantity} onChange={() => setInputs((prevInputs) => {
                        return {
                            ...prevInputs,
                            availableQuantity: !prevInputs.availableQuantity
                        }
                    })} value={inputs.availableQuantity} />
                    <span className="text-xl">الكمية المتوفرة</span>
                </div>
                <div className="flex items-center gap-[1rem] mt-[1rem]">
                    <input type="checkbox" className="toggle toggle-primary" checked={inputs.show} onChange={() => setInputs((prevInputs) => {
                        return {
                            ...prevInputs,
                            show: !prevInputs.show
                        }
                    })} value={inputs.show} />
                    <span className="text-xl">عرض</span>
                </div>
                <div className='mt-[1rem]'>
                    <select className="select select-bordered w-full font-bold text-[1rem]" onChange={(event) => {
                        setInputs((prevInputs) => {
                            return {
                                ...prevInputs,
                                provider: {
                                    name: event.target.value,
                                    nameProduct: prevInputs.nameAr,
                                    isAvailable: true,
                                    isActive: true,
                                }
                            }
                        })
                    }}>
                        <option selected={inputs.provider == ""} disabled>اختر API</option>
                        <option value="stock">المخزن</option>
                        {
                            apiList && apiList.map((api) => {
                                return (
                                    <option value={api.name} selected={inputs.provider?.name == api.name}>{api.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <button className='btn btn-primary w-full mt-[1rem]' disabled={loading} onClick={handleSubmit}>{loading ? <Loading /> : 'ارسال'}</button>
            </div>
            <ChooseProductsApi inputs={inputs} setInputs={setInputs} />
        </div>
    )
}

export default AddProducts