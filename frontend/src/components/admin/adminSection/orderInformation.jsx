import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function OrderInformation() {
    return (
        <div>
            <h1 className='text-3xl font-bold'>تفاصيل طلب</h1>
            <div className="badge badge-success text-white"><FontAwesomeIcon icon={faCircleCheck} className=' ml-[0.5rem]'/> مقبول</div>
            <div className='mt-[1rem] flex flex-wrap md:gap-[3rem]'>
                <div className='w-1/2 md:w-[30%] text-[1.3rem]'>
                    <h1>رقم الطلب</h1>
                    <h1>المقدم</h1>
                    <h1>المستلم</h1>
                    <h1>المنتج</h1>
                    <h1>السعر الاجمالي</h1>
                    <h1>الكمية</h1>
                    <h1>كلفة الواحدة</h1>
                    <h1>UUID</h1>
                    <h1>ID_ENC</h1>
                    <h1>مدة التنفيذ</h1>
                    <h1>التاريخ</h1>
                </div>
                <div className='w-1/2 md:w-[30%] text-[1.3rem]'>
                    <h1 className='font-[900]'> 49263 | 3849362-AS7AB</h1>
                    <h1 className='font-[900]'>Keram2355</h1>
                    <h1></h1>
                    <h1 className='font-[900]'>Itunes 100 TL</h1>
                    <h1 className='font-[900]'>105.645 TR</h1>
                    <h1 className='font-[900]'>1</h1>
                    <h1>105.645</h1>
                    <h1>4a4e7ddb-56de-417a-9c22-2bbebc1440d9</h1>
                    <h1>ID_7b009d2fc31375e7 </h1>
                    <h1 className='font-[900]'>0 دقيقة و 8 ثانية </h1>
                    <h1 className='font-[900]'>2024-12-05 20:30:54 </h1>
                </div>
                <div className='w-full md:mt-0 mt-[1rem] md:w-[30%] text-[1.3rem]'>
                    <h1>الرد</h1>
                    <p>[ "✅ تمت العملية بنجاح" ]</p>
                </div>
            </div>
        </div>
    )
}

export default OrderInformation