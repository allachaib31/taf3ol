import React from 'react'

function AddStock() {
    return (
        <dialog id="addStock" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">اضافه مخزن</h3>
                <hr />
                <div className='mt-[1rem]'>
                    <label className="input input-bordered flex items-center gap-2">
                    الاسم
                        <input type="text" className="grow" />
                    </label>
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

export default AddStock