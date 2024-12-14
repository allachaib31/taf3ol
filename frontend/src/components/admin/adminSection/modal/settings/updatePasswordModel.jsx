import React from 'react'

function UpdatePasswordModel() {
    return (
        <dialog id="updatePassword" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">تغير كلمة سر</h3>
                <hr />
                <div className='flex flex-col gap-[1rem] mt-[1rem]'>
                    <label className="input input-bordered flex items-center gap-2">
                    كلمة السر الحالية
                        <input type="text" className="grow"/>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                    كلمة السر الجديدة
                        <input type="text" className="grow"/>
                    </label>
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn ml-[0.5rem]">اغلاق</button>
                        <button className='btn btn-primary'>حفظ</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default UpdatePasswordModel