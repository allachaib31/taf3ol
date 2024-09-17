import React from 'react'

function DisableCategory() {
    return (
        <dialog id="disableCategory" className="modal">
            <div className="modal-box">
                <h1 className="font-bold text-lg">تعطيل الفئة</h1>
                <p>هل أنت متأكد أنك تريد تعطيل الفئة؟</p>
                <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn ml-[0.5rem]">اغلاق</button>
                    <button className="btn btn-primary">تعطيل</button>
                </form>
            </div>
            </div>
        </dialog>
    )
}

export default DisableCategory