import React from 'react'

function CurrenciesModel() {
    return (
        <dialog id="currenciesModel" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">عملة جديدة</h3>
                <hr />
                <div className='flex flex-col gap-[1rem] mt-[1rem]'>
                    <label className="input input-bordered flex items-center gap-2">
                        اسم العملة
                        <input type="text" className="grow" placeholder="Dollar" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        اختصار
                        <input type="text" className="grow" placeholder="USD" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        رمز
                        <input type="text" className="grow" placeholder="$" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        سعر
                        <input type="text" className="grow" placeholder="1.00" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        سعر الشراء
                        <input type="text" className="grow" placeholder="1.00" />
                    </label>
                    <div className="form-control">
                        <label className="label w-fit gap-[0.5rem] cursor-pointer">
                            <input type="checkbox" className="toggle" defaultChecked />
                            <span className="label-text text-xl">مفعلة</span>
                        </label>
                    </div>
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

export default CurrenciesModel