import React from "react";
import { UpdatePasswordModel } from "../modal";

function Account() {
  return (
    <div>
      <h1 className="text-3xl font-[900]">الحساب</h1>
      <div className="container mx-auto border flex flex-col gap-[1rem] justify-center items-center p-[1rem]">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="flex gap-[1rem] w-full">
          <label className="w-1/2 input input-bordered flex items-center gap-2">
            الاسم الاول
            <input type="text" className="grow" />
          </label>
          <label className="w-1/2 input input-bordered flex items-center gap-2">
            الاسم الاخير
            <input type="text" className="grow" />
          </label>
        </div>
        <div className="flex gap-[1rem] w-full">
          <label className="w-1/2 input input-bordered flex items-center gap-2">
          الايمايل
            <input type="text" className="grow" />
          </label>
          <label className="w-1/2 input input-bordered flex items-center gap-2">
          رقم الهاتف
            <input type="text" className="grow" />
          </label>
        </div>
        <button className="btn btn-primary w-full">حفظ</button>
        <p className="underline font-bold cursor-pointer" onClick={()=>document.getElementById('updatePassword').showModal()}>تغير كلمة سر</p>
      </div>
      <UpdatePasswordModel />
    </div>
  );
}

export default Account;
