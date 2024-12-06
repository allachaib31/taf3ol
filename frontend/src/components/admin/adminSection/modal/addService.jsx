import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../screens/admin/homeAdmin';
import { getMethode, postMethode } from '../../../../utils/apiFetchs';
import { addServiceRoute, getCategorieServicesApiRoute } from '../../../../utils/apiRoutes';
import Loading from '../../../loading';
import Alert from '../../../alert';
import { countries } from '../../../../utils/constants';

function AddService({ categories, setCategories, typeCategory }) {
    const navigate = useNavigate();
    const socket = useSocket();
    const [loading, setLoading] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [titleButton, setTitleButton] = useState("اضافة خدمة مباشرة من api");
    const [categorieSelected, setCategorieSelected] = useState("");
    const [services, setServices] = useState(false);
    const [alert, setAlert] = useState({
        display: false,
    });
    const [addService, setAddService] = useState({
        category: "",
        service: "",
        nameAr: "",
        nameEn: "",
        country: "",
        type: "Default",
        rate: "",
        quantity: "",
        min: "",
        max: "",
        price: 0,
        discount: 0,
        dripfeed: false,
        refill: false,
        cancel: false
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);
        setAlert({
            display: false,
        });
        try {
            const response = await postMethode(addServiceRoute, addService);
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            let newCategories = [...categories];
            for (let i = 0; i < newCategories.length; i++) {
                if (newCategories[i].nameAr == response.data.findCategory.nameAr) {
                    newCategories[i].items = response.data.findCategory.items;
                    break;
                }

            }
            setCategories(newCategories);
            socket.emit('broadcast-notification', {
                msg: response.data.contentNotification,
                name: "add Service",
                newCategories
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
        if (categorieSelected != "") {
            setLoading(true);
            setAlert({
                display: false,
            });
            getMethode(`${getCategorieServicesApiRoute}?name=${categorieSelected}&type=${typeCategory}`).then((response) => {
                setServices(response.data)
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
        }
    }, [categorieSelected]);
    return (
        <dialog id="addService" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">إضافة خدمة</h3>
                <hr />
                <button onClick={() => {
                    setAddService((prev) => {
                        return {
                            ...prev,
                            service: "",
                            nameAr: "",
                            nameEn: "",
                            type: "Default",
                            country: "",
                            rate: "",
                            quantity: "",
                            min: "",
                            max: "",
                            price: 0,
                            discount: 0,
                            dripfeed: false,
                            refill: false,
                            cancel: false
                        }
                    })
                    setTitleButton((prevTitle) => prevTitle == "اضافة خدمة مباشرة من api" ? "اضافة خدمة يدويا" : "اضافة خدمة مباشرة من api")
                }} className='btn btn-info mt-[0.1rem]'>{titleButton}</button>
                {alert.display && <Alert msg={alert} />}
                {
                    titleButton == "اضافة خدمة مباشرة من api" ?
                        <form action="" className="flex flex-col gap-[1rem] mt-[1rem]">
                            <select onChange={(event) => {
                                setCategorieSelected(event.target.value);
                                setAddService((prev) => {
                                    return {
                                        ...prev,
                                        category: event.target.value
                                    }
                                })
                            }
                            } className="font-bold text-[1rem] text-[#5b5b5b] select select-bordered w-full">
                                <option disabled selected>اختر الفئة</option>
                                {
                                    categories && categories.map((categorie) => {
                                        return (
                                            <option value={categorie.nameAr}>{categorie.nameAr}</option>
                                        )
                                    })
                                }
                            </select>
                            <label className="input input-bordered flex items-center gap-2">
                                اسم الخدمة
                                <input type="text" className="grow" onChange={(event) => {
                                    setAddService((prev) => {
                                        return {
                                            ...prev,
                                            nameAr: event.target.value
                                        }
                                    })
                                }} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                اسم الخدمة (الإنجليزية)<input type="text" className="grow" onChange={(event) => {
                                    setAddService((prev) => {
                                        return {
                                            ...prev,
                                            nameEn: event.target.value
                                        }
                                    })
                                }} />
                            </label>
                            <select className="font-bold text-[1rem] text-[#5b5b5b] select select-bordered w-full" onChange={(event) => {
                                setAddService((prev) => {
                                    return {
                                        ...prev,
                                        country: event.target.value
                                    }
                                })
                            }}>
                                <option disabled selected>اختر الدولة</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country}>{country}</option>
                                ))}
                            </select>
                            {/*<select className="font-bold text-[1rem] text-[#5b5b5b] select select-bordered w-full" onChange={(event) => {
                                    setAddService((prev) => {
                                        return {
                                            ...prev,
                                            nameAr: event.target.value
                                        }
                                    })
                                }}>
                                <option disabled selected>اختر الوضع</option>
                                <option value="Auto">آلي</option>
                                <option value="Manuel">يدوي</option>
                            </select>*/}
                            <select className="font-bold text-[1rem] text-[#5b5b5b] select select-bordered w-full" onChange={(event) => {
                                setAddService((prev) => {
                                    return {
                                        ...prev,
                                        provider: event.target.value
                                    }
                                })
                            }}>
                                <option disabled selected>اختر المزود</option>
                                <option value="Manuel">يدوي</option>
                                <option value="smmcpan.com">smmcpan.com</option>
                                <option value="numbersapp.online">numbersapp.online</option>
                            </select>
                            <label className="input input-bordered flex items-center gap-2">
                                معدل لكل 1000
                                <input type="text" className="grow" onChange={(event) => {
                                    setAddService((prev) => {
                                        return {
                                            ...prev,
                                            rate: event.target.value
                                        }
                                    })
                                }} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                الكمية
                                <input type="text" className="grow" onChange={(event) => {
                                    setAddService((prev) => {
                                        return {
                                            ...prev,
                                            quantity: event.target.value
                                        }
                                    })
                                }} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                الحد الأدنى
                                <input type="text" className="grow" onChange={(event) => {
                                    setAddService((prev) => {
                                        return {
                                            ...prev,
                                            min: event.target.value
                                        }
                                    })
                                }} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                الحد الأقصى
                                <input type="text" className="grow" onChange={(event) => {
                                    setAddService((prev) => {
                                        return {
                                            ...prev,
                                            max: event.target.value
                                        }
                                    })
                                }} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                السعر بريال
                                <input type="number" className="grow" min={0} onChange={(event) => {
                                    setAddService((prev) => {
                                        return {
                                            ...prev,
                                            price: event.target.value
                                        }
                                    })
                                }} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                تخفيض %
                                <input type="number" className="grow" min={0} max={100} onChange={(event) => {
                                    setAddService((prev) => {
                                        return {
                                            ...prev,
                                            discount: event.target.value
                                        }
                                    })
                                }} />
                            </label>
                        </form> : <form action="" className="flex flex-col gap-[1rem] mt-[1rem]">
                            <select onChange={(event) => {
                                setCategorieSelected(event.target.value);
                                setAddService((prev) => {
                                    return {
                                        ...prev,
                                        category: event.target.value
                                    }
                                })
                            }
                            } className="font-bold text-[1rem] text-[#5b5b5b] select select-bordered w-full">
                                <option disabled selected>اختر الفئة</option>
                                {
                                    categories && categories.map((categorie) => {
                                        return (
                                            <option value={categorie.nameAr}>{categorie.nameAr}</option>
                                        )
                                    })
                                }
                            </select>
                            {
                                !loading ?
                                    <select onChange={(event) => {
                                        const obj = JSON.parse(event.target.value);
                                        setAddService((prev) => {
                                            return {
                                                ...prev,
                                                ...obj
                                            }
                                        })
                                    }
                                    } className="font-bold text-[1rem] text-[#5b5b5b] select select-bordered w-full">
                                        <option disabled selected>اختر الخدمة</option>
                                        {
                                            services && services.map((service) => {
                                                return (
                                                    <option value={JSON.stringify(service)}>{service.nameAr}</option>
                                                )
                                            })
                                        }
                                    </select> : <div className='flex justify-center'><Loading /></div>
                            }
                        </form>
                }
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn ml-[0.5rem]">اغلاق</button>
                        <button disabled={loading} className='btn btn-primary' onClick={handleSubmit}>{submit ? <Loading /> : "حفظ التغييرات"}</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default AddService