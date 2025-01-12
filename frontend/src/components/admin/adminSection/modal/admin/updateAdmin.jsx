import React, { useEffect, useState } from 'react'
import Loading from '../../../../loading';
import { putMethode } from '../../../../../utils/apiFetchs';
import { updateAdminRoute } from '../../../../../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../../../../screens/admin/homeAdmin';
import Alert from '../../../../alert';

function UpdateAdmin({ updateAdmin, setUpdateAdmin, admins, setAdmins, indexAdmin }) {
    const navigate = useNavigate();
    const socket = useSocket();
    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState({
        display: false,
    });
    const [isOpen, setIsOpen] = useState(false);
    const [permissions, setPermissions] = useState({
        customerControl: false,
        adminControl: false,
        sections: false,
        inventory: false,
        orders: false,
        settings: false,
        balance: false,
    });

    const togglePermission = (key) => {
        setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert({
            display: false,
        });
        try {
            const response = await putMethode(updateAdminRoute, {...updateAdmin, permission: permissions});
            setAlert({
                display: true,
                status: true,
                text: response.data.msg
            });
            let updateListAdmin = [...admins];
            updateListAdmin[indexAdmin].name = response.data.admin.name;
            updateListAdmin[indexAdmin].username = response.data.admin.username;
            updateListAdmin[indexAdmin].email = response.data.admin.email;
            updateListAdmin[indexAdmin].permission = response.data.admin.permission;
            setAdmins(updateListAdmin);
            socket.emit('broadcast-notification', {
                msg: `${response.data.responsableName} قام بتحديث معلومات المسؤول (${updateListAdmin[indexAdmin].name})`,
                name: "update Admin",
                updateListAdmin: updateListAdmin
            });
        } catch (err) {
            console.log(err)
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
        if(updateAdmin) {
            setPermissions(updateAdmin.permission);
        }
    }, [updateAdmin])
    return (
        <dialog id="updateAdmin" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-[0.5rem]">تعديل مسؤول</h3>
                <hr />
                <form className='flex flex-col gap-[1rem] mt-[1rem]'>
                    {alert.display && <Alert msg={alert} />}
                    <label className="input input-bordered flex items-center gap-2">
                        الاسم
                        <input type="text" className="grow" onChange={(event) => {
                            setUpdateAdmin((prevAdmin) => {
                                return {
                                    ...prevAdmin,
                                    name: event.target.value
                                }
                            })
                        }} value={updateAdmin.name} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        اسم المستخدم
                        <input type="text" className="grow" onChange={(event) => {
                            setUpdateAdmin((prevAdmin) => {
                                return {
                                    ...prevAdmin,
                                    username: event.target.value
                                }
                            })
                        }} value={updateAdmin.username} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        بريد إلكتروني
                        <input type="email" className="grow" onChange={(event) => {
                            setUpdateAdmin((prevAdmin) => {
                                return {
                                    ...prevAdmin,
                                    email: event.target.value
                                }
                            })
                        }} value={updateAdmin.email} />
                    </label>
                    <div className="relative">
                        {/* Dropdown Toggle Button */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setIsOpen(!isOpen)
                            }}
                            className="select select-bordered w-full flex items-center"
                        >
                            <span>الصلاحيات</span>
                        </button>

                        {/* Dropdown Content */}
                        {isOpen && (
                            <div className="absolute top-full mt-2 bg-white shadow-lg rounded-lg w-full p-4">
                                {/* Other Checkboxes */}
                                {[
                                    { key: "customerControl", label: "التحكم بالزبائن" },
                                    { key: "adminControl", label: "التحكم بالادمن" },
                                    { key: "sections", label: "الأقسام والمنتجات" },
                                    { key: "inventory", label: "المخزون" },
                                    { key: "orders", label: "الطلبات" },
                                    { key: "settings", label: "اعدادات" },
                                    { key: "balance", label: "تحويل رصيد" },
                                ].map((item) => (
                                    <div key={item.key} className="form-control">
                                        <label className="label w-fit gap-[0.5rem] cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={permissions[item.key]}
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    togglePermission(item.key)
                                                }}
                                                className="checkbox"
                                            />
                                            <span className="ml-2 text-gray-700">{item.label}</span>
                                        </label>
                                    </div>

                                ))}
                            </div>
                        )}
                    </div>
                </form>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn ml-[0.5rem]">اغلاق</button>
                        <button disabled={loading} className='btn btn-primary' onClick={handleSubmit}>{loading ? <Loading /> : 'تعديل'}</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default UpdateAdmin