import React from 'react'
import giftImage from "../../../images/gift.png"
import { useOutletContext } from 'react-router-dom';

function Gifts() {
  const { t, i18n } = useOutletContext();
  return (
    <div className='relative z-50'>
      <div className='flex justify-center items-center mt-[1rem]'>
        <img src={giftImage} alt="" />
      </div>
      <div>
        <h1 className='text-3xl font-[900] my-[1rem]'>{i18n.language === "ar" ? "نشر فيديو يوتيوب" : "Post a YouTube video"}</h1>
        <p className='text-[1rem]'>{i18n.language === "ar" ? `لزيادة فرص الربح والاستفادة من خدمات موقعنا، يمكنك نشر فيديو على قناتك في يوتيوب يوضح كيفية
          استخدام موقعنا خطوة بخطوة. ابدأ بتسجيل حساب وتسجيل الدخول، ثم أضف رصيدًا واستعرض كيفية
          تقديم الطلبات والتواصل مع الدعم الفني. بعد نشر الفيديو، قم برفع تذكرة بعنوان "أخر" وأرسل رابط الفيديو
          ليتم إضافة 3 دولارات إلى رصيدك. تأكد من أن قناتك تحتوي على أكثر من 100 مشترك و5 مقاطع فيديو على الأقل
          ، مع إضافة عبارة "Tafa3ol - موقع بيع متابعين" في عنوان الفيديو. لا تنس وضع رابط الفيديو في صندوق الوصف.
          لمزيد من الربح، استخدم رابط الأفيليت الخاص بك في صفحة التسويق بالعمولة. ملاحظة: إذا قمت بإزالة الفيديو بعد
          استلام الرصيد، سيتم تعليق حسابك وحذف جميع الطلبات` : `To increase your chances of earning and benefiting from our website's services, you can publish a video on your YouTube channel explaining how to use our website step by step. Start by registering an account and logging in, then add credit and review how to submit requests and communicate with technical support. After publishing the video, raise a ticket titled "Other" and send the video link to add $ 3 to your balance. Make sure your channel has more than 100 subscribers and at least 5 videos, adding the phrase "Tafa3ol - Followers Selling Site" in the video title. Don't forget to put the video link in the description box. For more profit, use your affiliate link on the affiliate marketing page. Note: If you remove the video after receiving the balance, your account will be suspended and all requests will be deleted`}</p>
        <h1 className='text-3xl font-[900] my-[1rem]'>{i18n.language === "ar" ? "النشر على منتدى" :"Post on forum"}</h1>
        <p className='text-[1rem]'>
          {i18n.language === "ar" ? `
        للحصول على مكافأة إضافية، يمكنك نشر بوست على أحد المنتديات يشرح تجربتك مع موقع تفاعول ويوضح
          كيفية استخدامه. اشرح الخطوات الخاصة بالتسجيل، شحن الرصيد، تقديم الطلبات، والتواصل مع الدعم الفني.
          بعد نشر البوست، قم برفع تذكرة بعنوان "آخر" وشارك رابط المنشور ليتم إضافة 2 دولار إلى حسابك. تأكد من ذكر
          اسم الموقع "Tafa3ol - موقع بيع متابعين" في المنشور. يمكنك أيضًا استخدام رابط الأفيليت الخاص بك من صفحة
          التسويق بالعمولة لزيادة أرباحك. يجب أن يكون حساب المنتدى الخاص بك قد مضى عليه أكثر من شهر ويحتوي على
          5 منشورات سابقة على الأقل.` : `For an additional bonus, you can post on one of the forums explaining your experience with Tafa3ol and explaining how to use it. Explain the steps for registering, charging your balance, submitting requests, and contacting technical support. After publishing the post, raise a ticket titled "Other" and share the post link to add $2 to your account. Make sure to mention the name of the site "Tafa3ol - Followers Selling Site" in the post. You can also use your affiliate link from the affiliate marketing page to increase your earnings. Your forum account must be more than a month old and contain at least 5 previous posts.`}
        </p>
        <h1 className='text-3xl font-[900] my-[1rem]'>{i18n.language === "ar" ? "نشر مقال على موقعك/مدونتك" : "Publish an article on your website/blog"}</h1>
        <p className='text-[1rem]'>{i18n.language === "ar" ? `-قم بنشر مقال على موقعك أو مدونتك حول التسويق الالكتروني واذكر اسمنا ورابط الموقع كالتالي : موقع بيع
          متابعين - Tafa3olملاحظة : يمكنك أستخدام رابط الافيليت الخاص بك الموجود ب صفحة : التسويق بالعمولة
          للحصول على ارباح بطريقة اخرى ايضا لكل عميل يقوم بالتسجيل من اللينك الخاص بك.
          -بعد نشر البوست, يرجى رفع تذكرة عنوانها “ اخر “ وارسل لنا رابط المنشور ليتم اضافة 3 دولار لحسابك بالموقع.
          الشروط والاحكام :
          -يجب أن يكون موقعك / مدونتك فعال وليس جديد ويجب أن يحتوي على بعض المنشورات القديمة.` : `- Publish an article on your website or blog about e-marketing and mention our name and the website link as follows: Followers Selling Website - Tafa3ol Note: You can use your affiliate link on the page: Affiliate Marketing to get profits in another way as well for each customer who registers from your link. - After publishing the post, please raise a ticket titled “Other” and send us the post link to add $ 3 to your account on the site. Terms and Conditions: - Your website / blog must be active and not new and must contain some old posts.`}</p>
      </div>
    </div>
  )
}

export default Gifts