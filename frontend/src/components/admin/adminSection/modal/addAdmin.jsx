import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef } from 'react'

function AddAdmin() {
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
        <dialog id="addAdmin" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-[0.5rem]">إضافة مسؤول</h3>
                <hr />
                <form action="" className='flex flex-col gap-[1rem] mt-[1rem]'>
                    <label className="input input-bordered flex items-center gap-2">
                        الاسم
                        <input type="text" className="grow" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        اسم المستخدم
                        <input type="text" className="grow" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        بريد إلكتروني
                        <input type="text" className="grow" />
                    </label>
                    <button className='btn btn-info max-w-sm' type="button" onClick={handleFileClick}>
                        <FontAwesomeIcon icon={faUpload} /> تحميل صورة
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        accept="image/png, image/gif, image/jpeg"
                    />
                </form>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn ml-[0.5rem]">اغلاق</button>
                        <button className='btn btn-primary'>ارسال</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default AddAdmin