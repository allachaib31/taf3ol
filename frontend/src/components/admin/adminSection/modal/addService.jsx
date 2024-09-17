import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function AddService() {
    return (
        <dialog id="addService" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">إضافة خدمة</h3>
                <hr />
                <form action="" className="flex flex-col gap-[1rem] mt-[1rem]">
                    <label className="input input-bordered flex items-center gap-2">
                        اسم الخدمة
                        <input type="text" className="grow" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        اسم الخدمة (الإنجليزية)<input type="text" className="grow" />
                    </label>
                    <select className="font-bold text-[1rem] text-[#5b5b5b] select select-bordered w-full">
                        <option disabled selected>اختر الفئة</option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                    </select>
                    <select className="font-bold text-[1rem] text-[#5b5b5b] select select-bordered w-full">
                        <option disabled selected>اختر الوضع</option>
                        <option>آلي</option>
                        <option>يدوي</option>
                    </select>
                    <select className="font-bold text-[1rem] text-[#5b5b5b] select select-bordered w-full">
                        <option disabled selected>اختر المزود</option>
                        <option>smmcpan.com</option>
                    </select>
                    <label className="input input-bordered flex items-center gap-2">
                        معدل لكل 1000
                        <input type="text" className="grow" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        الحد الأدنى
                        <input type="text" className="grow" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        الحد الأقصى
                        <input type="text" className="grow" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        زيادة <div className="tooltip" data-tip="تقييد قبول كمية مضاعفة للقيمة المحددة">
                        <FontAwesomeIcon icon={faCircleQuestion} />
                        </div>
                        <input type="text" className="grow" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                    فيضان، %
                        <input type="text" className="grow" />
                    </label>
                </form>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn ml-[0.5rem]">اغلاق</button>
                        <button className="btn btn-primary">حفظ التغييرات</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default AddService