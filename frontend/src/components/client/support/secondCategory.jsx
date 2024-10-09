import React from 'react'
import { useOutletContext } from 'react-router-dom';

function SecondCategory({subject ,setSubject}) {
    const { t, i18n } = useOutletContext();
    return (
        <div>
            <h1 className='text-2xl sm:text-3xl font-bold my-[1.5rem]'>{t('title_2_support')}</h1>
            <div className='flex flex-wrap gap-[0.5rem] sm:gap-[1rem] justify-around mt-[1.5rem]'>
                <button onClick={() => setSubject(1)} className={`btn w-1/3 sm:w-1/5 text-[1rem] sm:text-xl h-auto px-[1rem] ${subject == 1 ? "btn-primary" : "btn-outline"} btn-primary hover:btn-secondary text-black`}><span className='text-black'>{t("subject_1_category_2_support")}</span></button>
                <button onClick={() => setSubject(2)} className={`btn w-1/3 sm:w-1/5 text-[1rem] sm:text-xl h-auto px-[1rem] ${subject == 2 ? "btn-primary" : "btn-outline"} btn-primary hover:btn-secondary text-black`}><span className='text-black'>{t("subject_2_category_2_support")}</span></button>
                <button onClick={() => setSubject(3)} className={`btn w-1/3 sm:w-1/5 text-[1rem] sm:text-xl h-auto px-[1rem] ${subject == 3 ? "btn-primary" : "btn-outline"} btn-primary hover:btn-secondary text-black`}><span className='text-black'>{t("subject_3_category_2_support")}</span></button>
                <button onClick={() => setSubject(4)} className={`btn w-1/3 sm:w-1/5 text-[1rem] sm:text-xl h-auto px-[1rem] ${subject == 4 ? "btn-primary" : "btn-outline"} btn-primary hover:btn-secondary text-black`}><span className='text-black'>{t("subject_4_category_2_support")}</span></button>
                <button onClick={() => setSubject(5)} className={`btn w-1/3 sm:w-1/5 text-[1rem] sm:text-xl h-auto px-[1rem] ${subject == 5 ? "btn-primary" : "btn-outline"} btn-primary hover:btn-secondary text-black`}><span className='text-black'>{t("subject_5_category_2_support")}</span></button>
                <button onClick={() => setSubject(6)} className={`btn w-1/3 sm:w-1/5 text-[1rem] sm:text-xl h-auto px-[1rem] ${subject == 6 ? "btn-primary" : "btn-outline"} btn-primary hover:btn-secondary text-black`}><span className='text-black'>{t("subject_6_category_2_support")}</span></button>
                <button onClick={() => setSubject(7)} className={`btn w-1/3 sm:w-1/5 text-[1rem] sm:text-xl h-auto px-[1rem] ${subject == 7 ? "btn-primary" : "btn-outline"} btn-primary hover:btn-secondary text-black`}><span className='text-black'>{t("subject_7_category_2_support")}</span></button>
                <button onClick={() => setSubject(8)} className={`btn w-1/3 sm:w-1/5 text-[1rem] sm:text-xl h-auto px-[1rem] ${subject == 8 ? "btn-primary" : "btn-outline"} btn-primary hover:btn-secondary text-black`}><span className='text-black'>{t("subject_8_category_2_support")}</span></button>
                <button onClick={() => setSubject(9)} className={`btn w-1/3 sm:w-1/5 text-[1rem] sm:text-xl h-auto px-[1rem] ${subject == 9 ? "btn-primary" : "btn-outline"} btn-primary hover:btn-secondary text-black`}><span className='text-black'>{t("subject_9_category_2_support")}</span></button>
                <button onClick={() => setSubject(10)} className={`btn w-1/3 sm:w-1/5 text-[1rem] sm:text-xl h-auto px-[1rem] ${subject == 10 ? "btn-primary" : "btn-outline"} btn-primary hover:btn-secondary text-black`}><span className='text-black'>{t("subject_10_category_2_support")}</span></button>
                <button onClick={() => setSubject(11)} className={`btn w-1/3 sm:w-1/5 text-[1rem] sm:text-xl h-auto px-[1rem] ${subject == 11 ? "btn-primary" : "btn-outline"} btn-primary hover:btn-secondary text-black`}><span className='text-black'>{t("subject_11_category_2_support")}</span></button>
            </div>
        </div>
    )
}

export default SecondCategory