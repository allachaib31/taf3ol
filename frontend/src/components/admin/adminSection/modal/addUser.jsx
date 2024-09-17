import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";

function AddUser() {
    const fileInputRef = useRef(null);
    const handleFileClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            /* setInputs((prevInput) => {
                      return {
                          ...prevInput,
                          image: file
                      }
                  })*/
        }
    };
    return (
        <dialog id="addUser" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-[0.5rem]">إضافة مستخدم</h3>
                <hr />
                <form action="" className="flex flex-col gap-[1rem] mt-[1rem]">
                    <label className="input input-bordered flex items-center gap-2">
                        اسم المستخدم
                        <input type="text" className="grow" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        الاسم الأول <input type="text" className="grow" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        الاسم الأخير <input type="text" className="grow" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        بريد إلكتروني
                        <input type="text" className="grow" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        رقم الهاتف
                        <input type="text" className="grow" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                    كلمة المرور
                        <input type="password" className="grow" />
                    </label>
                    <button
                        className="btn btn-info max-w-sm"
                        type="button"
                        onClick={handleFileClick}
                    >
                        <FontAwesomeIcon icon={faUpload} /> تحميل صورة
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        accept="image/png, image/gif, image/jpeg"
                    />
                </form>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn ml-[0.5rem]">اغلاق</button>
                        <button className="btn btn-primary">ارسال</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}

export default AddUser;
