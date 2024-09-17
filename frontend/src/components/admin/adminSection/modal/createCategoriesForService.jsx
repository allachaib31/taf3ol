import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";


function CreateCategoriesForService({titleModalCategorie}) {
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
        <dialog id="CreateCategoriesForService" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-[0.5rem]">{titleModalCategorie}</h3>
                <hr />
                <form action="" className="flex flex-col gap-[1rem] mt-[1rem]">
                    <label className="input input-bordered flex items-center gap-2">
                    إسم الفئة
                        <input type="text" className="grow" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                    اسم الفئة (الإنجليزية)<input type="text" className="grow" />
                    </label>
                    <select className="font-bold text-[1rem] text-[#5b5b5b] select select-bordered w-full">
                        <option disabled selected>الموضع</option>
                        <option>أعلى</option>
                        <option>أسفل</option>
                    </select>
                    <button
                        className="btn btn-info max-w-sm"
                        type="button"
                        onClick={handleFileClick}
                    >
                        <FontAwesomeIcon icon={faUpload} /> تحميل أيقونة
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
    )
}

export default CreateCategoriesForService