import React from 'react'

function AddItemToStock() {
    return (
        <div className='flex flex-col gap-[0.5rem]'>
            <label htmlFor="carts">* قم بترتيب البطاقات كل بطاقة ضمن سطر ولا تترك اسطر فارغة</label>
            <textarea name="carts" className="textarea textarea-bordered"></textarea>
            <label className="input input-bordered flex items-center gap-2">
                ملاحظة
                <input type="text" className="grow" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                كلفة الواحدة
                <input type="text" className="grow" />
            </label>
            <div className="form-control">
                <label className="label gap-[1rem] cursor-pointer w-fit">
                    <input type="checkbox" defaultChecked className="checkbox" />
                    <span className="label-text text-[1rem]">ارسال اشعار</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label gap-[1rem] cursor-pointer w-fit">
                    <input type="radio" name="radio-10" className="radio" defaultChecked />
                    <span className="label-text text-[1rem]">كل المستخدمين</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label gap-[1rem] cursor-pointer w-fit">
                    <input type="radio" name="radio-10" className="radio" />
                    <span className="label-text text-[1rem]">تحديد المستخدمين</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label gap-[1rem] cursor-pointer w-fit">
                    <input type="radio" name="radio-10" className="radio" />
                    <span className="label-text text-[1rem]">تحديد مجموعة</span>
                </label>
            </div>
            <label className="input input-bordered flex items-center gap-2">
                العنوان
                <input type="text" className="grow" />
            </label>
            <label htmlFor="msg">الرسالة</label>
            <textarea name="msg" className="textarea textarea-bordered">المنتج متوفر الان</textarea>
            <button className='btn btn-primary'>ارسال</button>
        </div>
    )
}

export default AddItemToStock