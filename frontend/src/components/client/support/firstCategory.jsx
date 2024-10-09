import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

function FirstCategory({subject ,setSubject}) {
  const { t, i18n } = useOutletContext();
  return (
    <div>
      <h1 className='text-2xl sm:text-3xl font-bold my-[1.5rem]'>{t('title_2_support')}</h1>
      <div className='flex flex-wrap gap-[1rem] justify-around mt-[1.5rem]'>
        <button onClick={() => setSubject(1)} className={`btn w-52 text-[1rem] sm:text-xl h-auto px-[3rem] ${subject == 1 ? "btn-primary" : "btn-outline"} btn-primary hover:btn-secondary text-black`}><span className='text-black'>{t('subject_1_category_1_support')}</span></button>
        <button onClick={() => setSubject(2)} className={`btn w-52 text-[1rem] sm:text-xl h-auto px-[3rem] ${subject == 2 ? "btn-primary" : "btn-outline"} btn-primary hover:btn-secondary text-black`}><span className='text-black'>{t('subject_2_category_1_support')}</span></button>
        <button onClick={() => setSubject(3)} className={`btn w-52 text-[1rem] sm:text-xl h-auto px-[3rem] ${subject == 3 ? "btn-primary" : "btn-outline"} btn-primary hover:btn-secondary text-black`}><span className='text-black'>{t('subject_3_category_1_support')}</span></button>
        <button onClick={() => setSubject(4)} className={`btn w-52 text-[1rem] sm:text-xl h-auto px-[3rem] ${subject == 4 ? "btn-primary" : "btn-outline"} btn-primary hover:btn-secondary text-black`}><span className='text-black'>{t('subject_4_category_1_support')}</span></button>
      </div>
    </div>
  )
}

export default FirstCategory