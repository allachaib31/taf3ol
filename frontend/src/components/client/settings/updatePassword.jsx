import React from 'react'
import { useOutletContext } from 'react-router-dom';

function UpdatePassword() {
  const { t, i18n } = useOutletContext();
  return (
    <div className='relative z-50'>
      <div>
        <form className='flex flex-col gap-[1rem] justify-center items-center'>
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
            {/* Display the uploaded or default image */}
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="Profile"
              className="object-cover w-full h-full"
            />

          </div>
          <div className='flex flex-col'>
            <label htmlFor="name">{t('label_1_updatePassword')}</label>
            <input type="text" className='input input-bordered w-80' />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="name">{t('label_2_updatePassword')}</label>
            <input type="text" className='input input-bordered w-80' />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="name">{t('label_3_updatePassword')}</label>
            <input type="text" className='input input-bordered w-80' />
          </div>
          <button className='btn btn-primary px-[2rem] text-xl'>{t('button_1_updatePassword')}</button>
        </form>
      </div>
    </div>
  )
}

export default UpdatePassword