import React from 'react'

function Notifications() {
  return (
    <div>
      <h1 className="text-3xl font-[900]">اراسل اشعار</h1>
      <div className='flex flex-col gap-[1rem] mt-[1rem]'>
        <div>
          <div className="form-control">
            <label className="label gap-[1rem] w-fit cursor-pointer">
              <input type="radio" name="radio-10" className="radio" defaultChecked />
              <span className="label-text text-xl">كل المستخدمين</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label gap-[1rem] w-fit cursor-pointer">
              <input type="radio" name="radio-10" className="radio" defaultChecked />
              <span className="label-text text-xl">تحديد المستخدمين</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label gap-[1rem] w-fit cursor-pointer">
              <input type="radio" name="radio-10" className="radio" defaultChecked />
              <span className="label-text text-xl">تحديد مجموعة</span>
            </label>
          </div>
        </div>
        <label className="input input-bordered flex items-center gap-2">
          العنوان
          <input type="text" className="grow" />
        </label>
        <textarea className="textarea textarea-bordered w-full" placeholder="الرسالة"></textarea>
        <button className='btn btn-primary'>ارسال</button>
      </div>
    </div>
  )
}

export default Notifications