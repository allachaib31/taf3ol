import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react'

function AddModelAdvertisement() {
    const fileInputRef = useRef(null);
    const handleFileClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            /*setInputs((prevInput) => {
                return {
                    ...prevInput,
                    image: file
                }
            })*/
        }
    };
    return (
        <dialog id="addAdvertisement" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">اضافة صورة متحركة</h3>
                <hr />
                <div className='mt-[1rem] flex flex-col gap-[1rem]'>
                    <label className="input input-bordered flex items-center gap-2">
                        العنوان
                        <input type="text" className="grow" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                    رابط الانتقال
                        <input type="text" className="grow" />
                    </label>
                    <button className='btn btn-secondary' type="button" onClick={handleFileClick}>
                        <FontAwesomeIcon icon={faUpload} /> تحميل صورة
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        accept="image/png, image/gif, image/jpeg"
                    />
                </div>
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

export default AddModelAdvertisement