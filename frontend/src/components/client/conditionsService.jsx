import React from 'react'
import { useTranslation } from 'react-i18next';

function ConditionsService() {
    const { t, i18n} = useTranslation();
    return (
        <div className='my-[3rem] container mx-auto'>
            <div className='flex gap-[2rem] flex-col justify-center items-center'>
                <h1 className='text-[40px] text-center md:text-[72px] font-bold'>{t('terms_title')}</h1>
                <p className='sm:p-0 p-4 sm:text-[1.1rem] font-bold'>يمكنك ايجاد جميع خدمات الانستغرام التي يمكن تخيلها في TAFA3OLحيث اننا نتميز بافضل الخدمات وارخص الاسعار بهذا المجال وهذه الخدمات تشملزيادة متابعين انستغرام, زيادة لايكات انستغرام, زيادة مشاهدات انستغرام, زيادة تعليقات انستغرام, زيادة منشن انستغرام, زيادة انطباعات انستغرام, زيادة وصول انستغرام, زيادة زيارات انستغرام, زيادة حفظ انستغرام, زيادة مشاهدات بث مباشر انستغرام, انستغرام ريل, انستغرام تي في, دايركت مسج انستغرام, خدمات نشر. لا شك في أن وجودك على وسائل التواصل الاجتماعي سيتطور مع هذه الخدمات.</p>
            </div>
        </div>
    )
}

export default ConditionsService