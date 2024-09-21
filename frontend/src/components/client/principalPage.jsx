import { faCoins, faMoneyBill1Wave, faSackDollar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function PrincipalPage() {
    return (
        <div className='container mx-auto relative '>
            <div className='flex lg:block justify-center '>
                <div className='flex lg:flex-row flex-col lg:gap-0 gap-[1rem] lg:justify-between'>
                    <div className="card bg-black text-white w-[19rem] xs:w-80 xxl:w-96 shadow-xl">
                        <div className="card-body p-[1rem] flex flex-row justify-between">
                            <div className='flex flex-col items-center justify-center'>
                                <h1 className='text-[1.2rem] lg:text-[1rem] xxl:text-[1.2rem] flex gap-[0.5rem] items-center'><FontAwesomeIcon className='text-primary' icon={faSackDollar} /> <span>رصيدك الحالي:</span></h1>
                                <h1 className='font-[900] text-3xl lg:text-xl xxl:text-3xl'>0</h1>
                            </div>
                            <div className="w-[0.2rem] h-[63px] lg:h-full bg-white"></div>
                            <div className='flex flex-col items-center justify-center'>
                                <h1 className='text-[1.2rem] lg:text-[1rem] xxl:text-[1.2rem] flex gap-[0.5rem] items-center'><FontAwesomeIcon className='text-primary' icon={faMoneyBill1Wave} /> <span>انفقت معنا:</span></h1>
                                <h1 className='font-[900] text-3xl lg:text-xl xxl:text-3xl'>0</h1>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-black text-white w-[19rem] xs:w-80 xxl:w-96 shadow-xl">
                        <div className="card-body p-[1rem] justify-center items-center">
                            <div
                                className="radial-progress bg-primary text-primary-content border-primary border-4"
                                style={{ "--value": 70 }}
                                role="progressbar">
                                70%
                            </div>
                            <h1 className='text-xl xxl:text-3xl font-bold'>حالة الحساب</h1>
                        </div>
                    </div>
                    <div className="card bg-black text-white w-[19rem] xs:w-80 xxl:w-96 shadow-xl">
                        <div className="card-body p-[1rem] items-center justify-center">
                            <h1 className='text-xl xxl:text-3xl flex gap-[1rem]'>النقاط <FontAwesomeIcon icon={faCoins} /></h1>
                            <button className='btn btn-primary text-xl h-auto ' onClick={() => document.getElementById('my_modal_1').showModal()}>تحويل النقاط</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-[1rem]'>
                <div role="tablist" className="tabs tabs-lifted">
                    <input type="radio" id='tab1' onClick={(event) => {
                        document.getElementById("tab2").classList.add(...["bg-black", "text-white"]);
                        event.currentTarget.classList.remove(...["bg-black", "text-white"])
                        event.currentTarget.classList.add(...["[--tab-bg:#FDF001]", "[--tab-color:black]"]);
                    }} name="my_tabs_2" role="tab" style={{
                        width: "167px"
                    }} className="tab text-[1rem] font-[900] [--tab-bg:#FDF001] [--tab-color:black]" aria-label="معلومات و تحديثات" defaultChecked />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 text-[1.2rem] font-bold">
                        <h1>الخدمات حاليا مكتوبة على هذا التنسيق :</h1>
                        <p>اسم الخدمة [الحد الاعلى] [وقت البدا - السرعة] <br /> تبدا سرعة التوصيل بعد وقت البدا الموجود بالوصف.</p>
                        <ul>
                            <li>🔥 = افضل الخدمات.</li>
                            <li>💧 = خاصية تجزئة الطلب مفعلة.</li>
                            <li><span className='text-green-500 font-bold text-[1.3rem]'>♻</span> = زر التعويض مفعل.</li>
                            <li>⛔ = زر الالغاء مفعل.</li>
                        </ul>
                        <p>Rxx = فترة التعويض (xx تدل على عدد ايام التعويض, مثال: R30 = 30 يوم ضمان تعويض). <br /> ARxx = فترة التعويض التلقائي (xx تدل على عدد ايام التعويض التلقائي, مثال: AR30 = 30 يوم تعويض تلقائي).</p>
                        <ul className='list-disc'>
                            <li> الطلبات ذات البدا الفوري يمكن ان تحتاج 0 -1 ساعة للبدا . (الطلبات التي تحتاج ساعة للبدا غالبا ما تبدا خلال دقائق قليلة).</li>
                            <li> H كما في 1H, 12H, الخ تعني عدد الساعات للبدا.</li>
                            <li>HQ/LQ = جودة عالية/جودة قليلة.</li>
                            <li>السرعة تصل لغاية تعني xx/Day, مثال الطلب 10K/Day يمكن ان يكون 5K/Day, نحن نذكر هنا السرعة القصوى للخدمة,</li>
                        </ul>
                        <p>يرجى الرجوع الى صندوق الوصف لمزيد من التفاصيل..</p>
                        <p>الخدمات الموجودة في قسم 🔥افضل الخدمات [ننصح بها] [خدمات حصرية] [الاكثر مبيعا] [الاسرع] , هي خدمات ذات جودة عالية والاعلى طلبا من قبل العملاء.</p>
                        <h1>لمزيد من الاخبار, شاهد قسم الاخبار لموقعنا.</h1>
                        <h1>لمزيد من المعلومات, شاهد قسم الاسئلة الشائعة لموقعنا</h1>
                        <h1>لمزيد من المساعدة, يرجى التواصل معنا الان.</h1>
                    </div>

                    <input
                        onClick={(event) => {
                            document.getElementById("tab1").classList.add(...["bg-black", "text-white"]);
                            event.currentTarget.classList.remove(...["bg-black", "text-white"])
                            event.currentTarget.classList.add(...["[--tab-bg:#FDF001]", "[--tab-color:black]"]);
                        }}
                        id='tab2'
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        style={{
                            width: "167px"
                        }}
                        className="tab text-[1rem] font-[900] bg-black text-white"
                        aria-label="الاشتراكات"
                    />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 text-[1.2rem] font-bold">
                        <h1>الخدمات حاليا مكتوبة على هذا التنسيق :</h1>
                        <p>اسم الخدمة [الحد الاعلى] [وقت البدا - السرعة] <br /> تبدا سرعة التوصيل بعد وقت البدا الموجود بالوصف.</p>
                        <ul>
                            <li>🔥 = افضل الخدمات.</li>
                            <li>💧 = خاصية تجزئة الطلب مفعلة.</li>
                            <li><span className='text-green-500 font-bold text-[1.3rem]'>♻</span> = زر التعويض مفعل.</li>
                            <li>⛔ = زر الالغاء مفعل.</li>
                        </ul>
                        <p>Rxx = فترة التعويض (xx تدل على عدد ايام التعويض, مثال: R30 = 30 يوم ضمان تعويض). <br /> ARxx = فترة التعويض التلقائي (xx تدل على عدد ايام التعويض التلقائي, مثال: AR30 = 30 يوم تعويض تلقائي).</p>
                        <ul className='list-disc'>
                            <li> الطلبات ذات البدا الفوري يمكن ان تحتاج 0 -1 ساعة للبدا . (الطلبات التي تحتاج ساعة للبدا غالبا ما تبدا خلال دقائق قليلة).</li>
                            <li> H كما في 1H, 12H, الخ تعني عدد الساعات للبدا.</li>
                            <li>HQ/LQ = جودة عالية/جودة قليلة.</li>
                            <li>السرعة تصل لغاية تعني xx/Day, مثال الطلب 10K/Day يمكن ان يكون 5K/Day, نحن نذكر هنا السرعة القصوى للخدمة,</li>
                        </ul>
                        <p>يرجى الرجوع الى صندوق الوصف لمزيد من التفاصيل..</p>
                        <p>الخدمات الموجودة في قسم 🔥افضل الخدمات [ننصح بها] [خدمات حصرية] [الاكثر مبيعا] [الاسرع] , هي خدمات ذات جودة عالية والاعلى طلبا من قبل العملاء.</p>
                        <h1>لمزيد من الاخبار, شاهد قسم الاخبار لموقعنا.</h1>
                        <h1>لمزيد من المعلومات, شاهد قسم الاسئلة الشائعة لموقعنا</h1>
                        <h1>لمزيد من المساعدة, يرجى التواصل معنا الان.</h1>
                    </div>
                </div>
            </div>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <table className='w-[1900px]'>
                        <thead>
                            <tr>
                                <th>جديد</th>
                                <th>مبتدئ</th>
                                <th>نشيط</th>
                                <th>مميز</th>
                                <th>VIP</th>
                                <th>ملكي</th>
                            </tr>
                        </thead>
                    </table>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default PrincipalPage