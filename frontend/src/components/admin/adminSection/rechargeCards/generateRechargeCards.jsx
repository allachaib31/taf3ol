import React from 'react'

function GenerateRechargeCards() {
    let arr = Array.from({ length: 20 - 6 + 1 }, (_, i) => i + 6);
    return (
        <div>
            <h1 className='text-3xl font-[900]'>توليد بطاقات شحن الموقع</h1>
            <div className='flex flex-col mt-[1rem]'>
                <div>
                    <label className="input input-bordered w-full flex items-center gap-2">
                    عنوان البطاقات
                        <input type="text" className="grow"/>
                    </label>
                </div>
                <div className='flex sm:flex-row flex-col gap-[1rem] my-[1rem]'>
                    <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                        رصيد البطاقة
                        <input type="text" className="grow" />
                    </label>
                    <label className="input input-bordered w-full sm:w-1/2 flex items-center gap-2">
                        عدد البطاقات
                        <input type="text" className="grow" />
                    </label>
                </div>
                <div>
                    <select className="select select-bordered w-full">
                        <option disabled selected>عدد الحروف</option>
                        {
                            arr.map((value) => {
                                return (
                                    <option>{value}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='text-[1.1rem] flex flex-col gap-[0.5rem] mt-[1rem]'>
                    <h1 className='text-xl'>نوعية النص</h1>
                    <div className='flex items-center gap-[0.5rem]'>
                        <input type="radio" name="radio-1" className="radio" defaultChecked />
                        استخدام احرف وارقام 0-9 a-Z
                    </div>
                    <div className='flex items-center gap-[0.5rem]'>
                        <input type="radio" name="radio-1" className="radio" />

                        استخدام ارقام فقط 0-9
                    </div>
                </div>
                <button className='btn btn-primary mt-[1rem]'>توليد</button>
            </div>
        </div>
    )
}

export default GenerateRechargeCards