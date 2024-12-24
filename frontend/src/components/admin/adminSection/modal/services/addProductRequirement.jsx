import React from 'react'

function AddProductRequirement() {
    return (
        <dialog id="addProductRequirement" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">اضافة مطلب جديد</h3>
                <hr />
                <div className='mt-[1rem] flex flex-col gap-[1rem]'>
                    <label className="input input-bordered flex items-center gap-2">
                        اسم AR
                        <input type="text" className="grow" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        اسم EN
                        <input type="text" className="grow" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        توضيح AR
                        <input type="text" className="grow" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        توضيح EN
                        <input type="text" className="grow" />
                    </label>
                    <select className="select select-bordered w-full">
                        <option disabled selected>التحقق</option>
                        <option>ارقام فقط</option>
                        <option>احرف فقط</option>
                        <option>ارقام و احرف فقط</option>
                        <option>البريد الالكتروني</option>
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

export default AddProductRequirement