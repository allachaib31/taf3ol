import { faNewspaper, faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function General() {
  return (
    <div>
      <h1 className="text-3xl font-[900]">الاعدادات</h1>
      <div className='flex flex-col gap-[2rem]'>
        <details className="dropdown w-full border">
          <summary className="btn btn-lg text-2xl font-[900] btn-ghost m-1 w-full"><FontAwesomeIcon icon={faSquareArrowUpRight} /> التواصل الاجتماعي</summary>
          <div className="w-full menu dropdown-content bg-base-100 rounded-box z-[1] p-2 shadow">
            <div className='flex sm:flex-row flex-col gap-[1rem] my-[1rem]'>
              <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                صفحة الفيس بوك
                <input type="text" className="grow" />
              </label>
              <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                صفحة تويتر
                <input type="text" className="grow" />
              </label>
            </div>
            <div className='flex sm:flex-row flex-col gap-[1rem] my-[1rem]'>
              <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                صفحة انستغرام
                <input type="text" className="grow" />
              </label>
              <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                صفحة يوتيوب
                <input type="text" className="grow" />
              </label>
            </div>
            <div className='flex sm:flex-row flex-col gap-[1rem] my-[1rem]'>
              <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                وتس اب
                <input type="text" className="grow" />
              </label>
              <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                تلغرام
                <input type="text" className="grow" />
              </label>
            </div>
          </div>
        </details>
        <details className="dropdown w-full border">
          <summary className="btn btn-lg text-2xl font-[900] btn-ghost m-1 w-full"><FontAwesomeIcon icon={faNewspaper} /> الشريط الاخباري</summary>
          <div className="w-full menu dropdown-content bg-base-100 rounded-box z-[1] p-2 shadow">
            <div className='flex sm:flex-row flex-col gap-[1rem] my-[1rem]'>
              <textarea className="textarea textarea-bordered w-full sm:w-1/2" placeholder="الشريط الاخباري AR"></textarea>
              <textarea className="textarea textarea-bordered w-full sm:w-1/2" placeholder="الشريط الاخباري EN"></textarea>
            </div>
          </div>
        </details>
      </div>
      <button className='btn btn-primary mt-[1rem] w-full'>حفظ</button>
    </div>
  )
}

export default General