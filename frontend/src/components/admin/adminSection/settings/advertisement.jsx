import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { AddModelAdvertisement } from '../modal';

const sortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: 'ghost',
};

function Advertisement() {
  return (
    <div>
      <h1 className="text-3xl font-[900]">الصور المتحركة</h1>
      <button className='btn btn-primary mt-[1rem]' onClick={() => document.getElementById('addAdvertisement').showModal()}>اضافة صورة متحركة</button>
      <div className='flex flex-col gap-[1rem] mt-[1rem]'>
        <div className="card bg-base-100 w-full shadow-xl">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">الصورة المتحركة الاولى</h2>
            <div className="card-actions justify-end">
              <button className='btn btn-warning'>اخفاء</button>
              <button className="btn btn-error">حذف</button>
            </div>
          </div>
        </div>, <div className="card bg-base-100 w-full shadow-xl">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">الصورة المتحركة الاولى</h2>
            <div className="card-actions justify-end">
              <button className='btn btn-success'>اضهار</button>
              <button className="btn btn-error">حذف</button>
            </div>
          </div>
        </div>, <div className="card bg-base-100 w-full shadow-xl">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">الصورة المتحركة الاولى</h2>
            <div className="card-actions justify-end">
              <button className='btn btn-warning'>اخفاء</button>
              <button className="btn btn-error">حذف</button>
            </div>
          </div>
        </div>
      </div>
      <AddModelAdvertisement />
    </div>
  )
}

export default Advertisement