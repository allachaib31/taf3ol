import React from 'react'
import whatDistinguishesUsImage from "../../../images/whatDistinguishesUsImage.svg";
import pourcentageImage from "../../../images/pourcentageImage.svg";
import payMethodeImage from "../../../images/payMethodeImage.svg";
import supportImage from "../../../images/supportImage.svg";
import chartImage from "../../../images/chartImage.svg";
import promotionImage from "../../../images/promotionImage.svg";
import marketingImage from "../../../images/marketingImage.svg";
import deliveryImage from "../../../images/deliveryImage.svg";
import updateImage from "../../../images/updateImage.svg";
import paymentImage from "../../../images/payment.svg";
import largeLogo from "../../../images/largeLogo.svg";
import instagramIcon from "../../../images/instagramIcon.svg";
function LandingPage() {
    return (
        <div className='my-[2rem]'>
            <div className='container mx-auto '>
                <form action="" className='bg-accent rounded-[14px] p-[1rem] sm:p-[2rem]'>
                    <p className='font-bold'>يمكنك الاستفادة من خدماتنا عن طريق تسجيل الدخول إلى حسابك معنا!</p>
                    <div className='flex md:flex-row gap-[1rem] flex-col justify-between py-[1.5rem]'>
                        <input type="text" placeholder='إسم المستخدم' className='w-full md:w-1/3 shadow-lg input bg-base-100 text-black' />
                        <input type="text" placeholder='كلمة السر' className='w-full md:w-1/3 shadow-lg input bg-base-100 text-black' />
                        <button className='w-full md:w-[12rem] btn bg-black text-white font-bold'>تسجيل الدخول</button>
                    </div>
                    <div className='flex items-center gap-[0.5rem] font-bold'><input type="radio" name="radio-1" className="radio" /> تذكرني</div>
                    <p className='font-bold mt-[1rem]'>هل نسيت كلمة المرور؟ <a href="" className='underline'>اعادة تعيين</a></p>
                </form>
                <div className='mt-[4rem]'>
                    <h1 className='text-[40px] sm:text-[72px] font-bold'>ما يميزنا ؟</h1>
                    <div className='flex lg:flex-row flex-col-reverse gap-[2rem] items-center'>
                        <div className='flex flex-col gap-[1rem] lg:w-[60%]'>
                            <div className='flex sm:flex-row flex-col sm:gap-0 gap-[1rem]'>
                                <div className='flex items-center sm:w-1/2 gap-[1rem] font-bold xl:text-[1.3rem]'>
                                    <img src={pourcentageImage} alt="" /> ارخص وافضل الخدمات
                                </div>
                                <div className='flex items-center sm:w-1/2 gap-[1rem] font-bold xl:text-[1.3rem]'>
                                    <img src={payMethodeImage} alt="" /> طرق دفع آمنة
                                </div>
                            </div>
                            <div className='flex sm:flex-row flex-col sm:gap-0 gap-[1rem]'>
                                <div className='flex items-center sm:w-1/2 gap-[1rem] font-bold xl:text-[1.3rem]'>
                                    <img src={supportImage} alt="" /> دعم فني متواصل 24/7
                                </div>
                                <div className='flex items-center sm:w-1/2 gap-[1rem] font-bold xl:text-[1.3rem]'>
                                    <img src={chartImage} alt="" /> لوحة تحكم سهلة وسلسة
                                </div>
                            </div>
                            <div className='flex sm:flex-row flex-col sm:gap-0 gap-[1rem]'>
                                <div className='flex items-center sm:w-1/2 gap-[1rem] font-bold xl:text-[1.3rem]'>
                                    <img src={promotionImage} alt="" /> خصم خاص لكبار التجار
                                </div>
                                <div className='flex items-center sm:w-1/2 gap-[1rem] font-bold xl:text-[1.3rem]'>
                                    <img src={marketingImage} alt="" /> نظام تسويق بالعمولة
                                </div>
                            </div>
                            <div className='flex sm:flex-row flex-col sm:gap-0 gap-[1rem]'>
                                <div className='flex items-center sm:w-1/2 gap-[1rem] font-bold xl:text-[1.3rem]'>
                                    <img src={deliveryImage} alt="" /> توصيل سريع للطلبات
                                </div>
                                <div className='flex items-center sm:w-1/2 gap-[1rem] font-bold xl:text-[1.3rem]'>
                                    <img src={updateImage} alt="" /> تحديث مستمر للخدمات
                                </div>
                            </div>
                        </div>
                        <div className='lg:w-[40%]'>
                            <img src={whatDistinguishesUsImage} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: `url(${paymentImage})`,
                    backgroundSize: "cover"
                }}>
            </div>
            <div className='container mx-auto mt-[3rem]'>
                <div className='flex items-center justify-center'>
                    <h1 className='text-[40px] md:text-[72px] font-bold'>
                        خدمات
                    </h1>
                    <img src={largeLogo} className='md:w-auto md:h-auto w-[150px]' alt="" />
                </div>
                <div className='rounded-[14px] flex md:flex-row flex-col md:gap-0 gap-[1rem] bg-accent px-[1rem] py-[2rem]'>
                    <div className='flex flex-wrap justify-center md:justify-start md:flex-col gap-[1rem] md:w-[20%] '>
                        <div className='btn md:w-[70%] sm:w-[30%] w-[40%]  font-bold text-white bg-[#5C51E5]'>إنستغرام</div>
                        <div className='btn md:w-[70%] sm:w-[30%] w-[40%] font-bold text-white bg-[#4267B2]'>فايسبوك</div>
                        <div className='btn md:w-[70%] sm:w-[30%] w-[40%] font-bold text-white bg-[#FF0000]'>يوتيوب</div>
                        <div className='btn md:w-[70%] sm:w-[30%] w-[40%] font-bold text-white bg-[#1DB954]'>سبوتيفاي</div>
                        <div className='btn md:w-[70%] sm:w-[30%] w-[40%] font-bold text-white bg-[#FF0050]'>تيك توك</div>
                        <div className='btn md:w-[70%] sm:w-[30%] w-[40%] font-bold text-white bg-[#2E2E2E]'>آكس (تويتر)</div>
                        <div className='btn md:w-[70%] sm:w-[30%] w-[40%] font-bold text-white bg-[#C1BF07]'>سناب شات</div>
                    </div>
                    <div className='flex flex-col gap-[1rem] items-center md:w-[80%]'>
                        <img src={instagramIcon} alt="" />
                        <h1 className='text-[25px] sm:text-[40px] font-bold'>منصة خدمات Instagram</h1>
                        <p className='text-center font-bold'>يمكنك ايجاد جميع خدمات الانستغرام التي يمكن تخيلها في TAFA3OLحيث اننا نتميز بافضل الخدمات وارخص الاسعار بهذا المجال وهذه الخدمات تشمل زيادة متابعين انستغرام, زيادة لايكات انستغرام, زيادة مشاهدات انستغرام, زيادة تعليقات انستغرام, زيادة منشن انستغرام, زيادة انطباعات انستغرام, زيادة وصول انستغرام, زيادة زيارات انستغرام, زيادة حفظ انستغرام, زيادة مشاهدات بث مباشر انستغرام, انستغرام ريل, انستغرام تي في, دايركت مسج انستغرام, خدمات نشر. لا شك في أن وجودك على وسائل التواصل الاجتماعي سيتطور مع هذه الخدمات.</p>
                        <button className='btn bg-black font-bold text-[1.3rem] text-white'>سجل الآن</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage