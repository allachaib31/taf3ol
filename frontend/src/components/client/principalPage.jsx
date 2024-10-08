import { faCircleXmark, faCoins, faMoneyBill1Wave, faSackDollar, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import { useOutletContext } from "react-router-dom";
import level1Image from "../../images/level1.png";
import level2Image from "../../images/level2.png";
import level3Image from "../../images/level3.png";
import level4Image from "../../images/level4.png";
import level5Image from "../../images/level5.png";
import level6Image from "../../images/level6.png";

function PrincipalPage() {
    const { t, i18n } = useOutletContext();
    return (
        <div className='container mx-auto relative '>
            <div className='flex lg:block justify-center '>
                <div className='flex lg:flex-row flex-col lg:gap-0 gap-[1rem] lg:justify-between'>
                    <div className="card bg-black text-white w-[19rem] xs:w-80 xxl:w-96 shadow-xl">
                        <div className="card-body p-[1rem] flex flex-row justify-around">
                            <div className='flex flex-col items-center justify-center'>
                                <h1 className='text-[1.2rem] lg:text-[1rem] xxl:text-[1.2rem] flex gap-[0.5rem] items-center'><FontAwesomeIcon className='text-primary' icon={faSackDollar} /> <span>{t('title_home_card_1')}</span></h1>
                                <h1 className='font-[900] text-3xl lg:text-xl xxl:text-3xl'>0</h1>
                            </div>
                            <div className="w-[0.2rem] h-[63px] lg:h-full bg-white"></div>
                            <div className='flex flex-col items-center justify-center'>
                                <h1 className='text-[1.2rem] lg:text-[1rem] xxl:text-[1.2rem] flex gap-[0.5rem] items-center'><FontAwesomeIcon className='text-primary' icon={faMoneyBill1Wave} /> <span>{t('title_home_card_1.1')}</span></h1>
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
                            <h1 className='text-xl xxl:text-3xl font-bold'>{t('title_home_card_2')}</h1>
                        </div>
                    </div>
                    <div className="card bg-black text-white w-[19rem] xs:w-80 xxl:w-96 shadow-xl">
                        <div className="card-body p-[1rem] items-center justify-center">
                            <h1 className='text-xl xxl:text-3xl flex gap-[1rem]'>{t('title_home_card_3')} <FontAwesomeIcon icon={faCoins} /></h1>
                            <button className='btn btn-primary text-xl h-auto ' onClick={() => document.getElementById('my_modal_1').showModal()}>{t('button_home_card_3')}</button>
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
                    }} className="tab text-[1rem] font-[900] [--tab-bg:#FDF001] [--tab-color:black]" aria-label={t('title_home_tab_1')} defaultChecked />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 text-[1.2rem] font-bold">
                    {
                            i18n.language === 'ar' ? <>
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
                            </> : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis velit enim doloribus dolorem repudiandae, qui est nihil deleniti nisi voluptates neque molestiae expedita odit explicabo repellat sint error, quas perferendis."
                        }
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
                        aria-label={t('title_home_tab_2')}
                    />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 text-[1.2rem] font-bold">
                        {
                            i18n.language === 'ar' ? <>
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
                            </> : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis velit enim doloribus dolorem repudiandae, qui est nihil deleniti nisi voluptates neque molestiae expedita odit explicabo repellat sint error, quas perferendis."
                        }
                    </div>
                </div>
            </div>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box max-w-[70rem]">
                    <div className='overflow-x-auto'>
                    <table className='table '>
                        <thead className='text-xl'>
                            <tr>
                                <th>مستوى الحساب</th>
                                <th className='text-center text-xl sm:text-3xl'><span>جديد</span><br /><div className='inline-block bg-primary rounded-full p-[0.5rem]'><img src={level1Image} alt="" /></div></th>
                                <th className='text-center text-xl sm:text-3xl'><span>مبتدئ</span><br /><div className='inline-block bg-primary rounded-full p-[0.5rem]'><img src={level2Image} alt="" /></div></th>
                                <th className='text-center text-xl sm:text-3xl'><span>نشيط</span><br /><div className='inline-block bg-primary rounded-full p-[0.5rem]'><img src={level3Image} alt="" /></div></th>
                                <th className='text-center text-xl sm:text-3xl'><span>مميز</span><br /><div className='inline-block bg-primary rounded-full p-[0.5rem]'><img src={level4Image} alt="" /></div></th>
                                <th className='text-center text-xl sm:text-3xl'><span>VIP</span><br /><div className='inline-block bg-primary rounded-full p-[0.5rem]'><img src={level5Image} alt="" /></div></th>
                                <th className='text-center text-xl sm:text-3xl'><span>ملكي</span><br /><div className='inline-block bg-primary rounded-full p-[0.5rem]'><img src={level6Image} alt="" /></div></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>متاح</th>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-error' icon={faCircleXmark} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-primary' icon={faSquareCheck} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-primary' icon={faSquareCheck} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-primary' icon={faSquareCheck} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-primary' icon={faSquareCheck} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-primary' icon={faSquareCheck} /></td>
                            </tr>
                            <tr>
                                <th>يمكن تحويل {">="} 500 نقطة</th>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-error' icon={faCircleXmark} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-primary' icon={faSquareCheck} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-primary' icon={faSquareCheck} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-primary' icon={faSquareCheck} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-primary' icon={faSquareCheck} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-primary' icon={faSquareCheck} /></td>
                            </tr>
                            <tr>
                                <th>يمكن تحويل {">="} 250 نقطة</th>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-error' icon={faCircleXmark} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-error' icon={faCircleXmark} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-primary' icon={faSquareCheck} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-primary' icon={faSquareCheck} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-primary' icon={faSquareCheck} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-primary' icon={faSquareCheck} /></td>
                            </tr>
                            <tr>
                                <th>يمكن تحويل {">="} 100 نقطة</th>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-error' icon={faCircleXmark} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-error' icon={faCircleXmark} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-error' icon={faCircleXmark} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-primary' icon={faSquareCheck} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-primary' icon={faSquareCheck} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-primary' icon={faSquareCheck} /></td>
                            </tr>
                            <tr>
                                <th>تحويل النقاط باقل من 4 ايام</th>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-error' icon={faCircleXmark} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-error' icon={faCircleXmark} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-error' icon={faCircleXmark} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-error' icon={faCircleXmark} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-primary' icon={faSquareCheck} /></td>
                                <td className='text-center text-xl sm:text-3xl'><FontAwesomeIcon className='text-primary' icon={faSquareCheck} /></td>
                            </tr>
                            <tr>
                                <th>كل 100 نقطة ~</th>
                                <td className='text-center text-xl sm:text-3xl'>-</td>
                                <td className='text-center text-xl sm:text-3xl'>1.00$</td>
                                <td className='text-center text-xl sm:text-3xl'>1.25$</td>
                                <td className='text-center text-xl sm:text-3xl'>1.50$</td>
                                <td className='text-center text-xl sm:text-3xl'>1.75$</td>
                                <td className='text-center text-xl sm:text-3xl'>2.00$</td>
                            </tr>
                        </tbody>
                    </table>
                    <h1>ملاحظات :</h1>
                    <ul className='list-disc'>
                        <li>سوف تحصل على نقاط كلما طلبت, كل 1 دولار يتم انفاقه = 1 نقطة</li>
                        <li>كل 100 نقطة = 1-2 دولار حسب مستوى الحساب</li>
                        <li>لا يمكنك تحويل اقل من 100 نقطة الى رصيدك</li>
                        <li>لتحويل النقاط الى رصيد , يرجى التواصل معنا على التذاكر واختيار الموضوع : النقاط واكتب بالرسالة : يرجى تحويل النقاط جميعها الى رصيد</li>
                    </ul>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">اغلاق</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default PrincipalPage