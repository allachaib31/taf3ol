import React from 'react'

function AddApiModel() {
    return (
        <dialog id="addApi" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">اضافة API </h3>
                <hr />
                <div className='mt-[1rem] flex flex-col gap-[1rem]'>
                    <label className="input input-bordered flex items-center gap-2">
                        الاسم
                        <input type="text" className="grow" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        الرابط
                        <input type="text" className="grow" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        الرمز المميز
                        <input type="text" className="grow" />
                    </label>
                    <select className="select select-bordered w-full">
                        <option disabled selected>اختر المجموعة الخاصة بي api</option>
                        <option>ZNET</option>
                    </select>
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

export default AddApiModel