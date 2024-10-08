import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const NewOrder = () => {
  const { t, i18n } = useOutletContext();
  const [activeTab, setActiveTab] = useState('newOrder'); // default to first tab

  return (
    <div className="relative z-50 ">
      {/* Tabs */}
      <div className="flex sm:flex-row flex-col sm:gap-0 gap-[1rem] sm:mb-0 mb-[1rem]">
        <button
          className={`py-2 px-4 text-lg font-bold sm:rounded-t-[10px] ${activeTab === 'newOrder' ? 'bg-primary text-black border' : 'bg-black text-white'
            }`}
          onClick={() => setActiveTab('newOrder')}
        >
          {t('title_newOrder_tab_1')}
        </button>
        <button
          className={`py-2 px-4 text-lg font-bold sm:rounded-t-[10px] ${activeTab === 'subscriptions' ? 'bg-primary text-black border' : 'bg-black text-white'
            }`}
          onClick={() => setActiveTab('subscriptions')}
        >
          {t('title_newOrder_tab_2')}
        </button>
        <button
          className={`py-2 px-4 text-lg font-bold sm:rounded-t-[10px] ${activeTab === 'favorites' ? 'bg-primary text-black border' : 'bg-black text-white'
            }`}
          onClick={() => setActiveTab('favorites')}
        >
          {t('title_newOrder_tab_3')}
        </button>
      </div>

      {/* Content */}
      <div className="border-2 p-[1rem]">
        {activeTab === 'newOrder' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div>
              <h1 className="text-xl font-bold mb-4"> {t('title_1_newOrder_tabContent_1')}</h1>
              <form className="space-y-4">
                {/* Search Input */}
                <div>
                  <label className="block mb-1 text-sm font-bold">{t('lable_1_newOrder_tabContent_1')}</label>
                  <input
                    type="text"
                    placeholder={t('placeholder_1_newOrder_tabContent_1')}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                {/* Section */}
                <div>
                  <label className="block mb-1 text-sm font-bold">{t('lable_2_newOrder_tabContent_1')}</label>
                  <details className='relative'>
                    <summary className='input text-[1rem] input-bordered pt-[0.7rem] cursor-pointer'>افضل الخدمات - الاكثر مبيعا</summary>
                    <div className='overflow-x-auto z-50 absolute py-[0.5rem] bg-white shadow-md w-full flex flex-col'>
                      <label className="input input-bordered flex items-center gap-2 my-[0.5rem] mx-[1rem]">
                        <input type="text" className="grow" placeholder={t('placeholder_1_newOrder_tabContent_1')} />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4 opacity-70">
                          <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                        </svg>
                      </label>
                      <ul className='flex text-black flex-col w-full h-[200px] text-wrap'>
                        <li className='hover:bg-[#F1F1F1] text-[1rem] border-y cursor-pointer p-[1rem]'>🔴 YouTube Views [NEW - Recommended] [Country/Quality: REAL Arab Mix] [Start time: 0-12H] [Speed: Up to 1-5k/Day] [Refill: 60 Days]</li>

                      </ul>
                    </div>
                  </details>
                </div>

                {/* Service */}
                <div>
                  <label className="block mb-1 text-sm font-bold">{t('lable_3_newOrder_tabContent_1')}</label>
                  <details className='relative'>
                    <summary className='input truncate text-[1rem] input-bordered pt-[0.7rem] cursor-pointer'>🔴 مشاهدات يوتيوب [خدمة جديدة - مميزة] [البلد/الجودة: عرب مكس - حقيقية] [وقت البدا: خلال 0-12 ساعة] [السرعة: تصل الى 1-5 الاف/باليوم] [الضمان: 60 يوم] - $1.188 لكل 1000</summary>
                    <div className='overflow-x-auto z-40 absolute py-[0.5rem] bg-white shadow-md w-full flex flex-col'>
                      <label className="input input-bordered flex items-center gap-2 my-[0.5rem] mx-[1rem]">
                        <input type="text" className="grow" placeholder={t('lable_1_newOrder_tabContent_1')} />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4 opacity-70">
                          <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                        </svg>
                      </label>
                      <ul className='flex text-black flex-col w-full h-[200px] text-wrap'>
                        <li className='hover:bg-[#F1F1F1] text-[1rem] border-y cursor-pointer p-[1rem]'>🔴 YouTube Views [NEW - Recommended] [Country/Quality: REAL Arab Mix] [Start time: 0-12H] [Speed: Up to 1-5k/Day] [Refill: 60 Days]</li>

                      </ul>
                    </div>
                  </details>
                </div>
                <div className='lg:hidden'>
                  <h1 className="text-xl font-bold mb-4">{t('title_2_newOrder_tabContent_1')}</h1>
                  <div className="bg-gray-100 p-4 rounded-[14px]">
                    <p>{t('title_3_newOrder_tabContent_1')}</p>
                    <ul className="list-disc pl-5 space-y-1 p-[1rem]">
                    <li>{i18n.language === "ar" ? "في خانة الرابط : ضع رابط فيديو اليوتيوب" : "Lorem ipsum dolor sit amet consectetur adipisicing elit"}</li>
                    <li>{i18n.language === "ar" ? "لا تضع اكثر من طلب لنفس الرابط بنفس الوقت" : "Lorem ipsum dolor sit amet consectetur adipisicing elit"}</li>
                    </ul>
                  </div>
                </div>
                {/* URL */}
                <div>
                  <label className="block mb-1 text-sm font-bold">{t('lable_4_newOrder_tabContent_1')}</label>
                  <input
                    type="url"
                    placeholder={t('placeholder_2_newOrder_tabContent_1')}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="block mb-1 text-sm font-bold">{t('lable_5_newOrder_tabContent_1')}</label>
                  <input
                    type="number"
                    placeholder={t('placeholder_3_newOrder_tabContent_1')}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                {/* Approx Speed */}
                <div>
                  <label className="block mb-1 text-sm font-bold">{t('lable_6_newOrder_tabContent_1')}</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block mb-1 text-sm font-bold">{t('lable_7_newOrder_tabContent_1')}</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full btn btn-primary">
                  {t('button_1_newOrder_tabContent_1')}
                </button>
              </form>
            </div>

            {/* Description Section */}
            <div className='lg:block hidden'>
              <h1 className="text-xl font-bold mb-4">{t('title_2_newOrder_tabContent_1')}</h1>
              <div className="bg-gray-100 p-4 rounded-[14px]">
                <p>{t('title_3_newOrder_tabContent_1')}</p>
                <ul className="list-disc pl-5 space-y-1 p-[1rem]">
                  <li>{i18n.language === "ar" ? "في خانة الرابط : ضع رابط فيديو اليوتيوب" : "Lorem ipsum dolor sit amet consectetur adipisicing elit"}</li>
                  <li>{i18n.language === "ar" ? "لا تضع اكثر من طلب لنفس الرابط بنفس الوقت" : "Lorem ipsum dolor sit amet consectetur adipisicing elit"}</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subscriptions' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <h1 className="text-xl font-bold mb-4"> {t('title_1_newOrder_tabContent_1')}</h1>
            <form className="space-y-4">
              {/* Search Input */}
              <div>
                <label className="block mb-1 text-sm font-bold">{t('lable_1_newOrder_tabContent_1')}</label>
                <input
                  type="text"
                  placeholder={t('placeholder_1_newOrder_tabContent_1')}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* Section */}
              <div>
                <label className="block mb-1 text-sm font-bold">{t('lable_2_newOrder_tabContent_1')}</label>
                <details className='relative'>
                  <summary className='input text-[1rem] input-bordered pt-[0.7rem] cursor-pointer'>افضل الخدمات - الاكثر مبيعا</summary>
                  <div className='overflow-x-auto z-50 absolute py-[0.5rem] bg-white shadow-md w-full flex flex-col'>
                    <label className="input input-bordered flex items-center gap-2 my-[0.5rem] mx-[1rem]">
                      <input type="text" className="grow" placeholder={t('placeholder_1_newOrder_tabContent_1')} />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                          fillRule="evenodd"
                          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                          clipRule="evenodd" />
                      </svg>
                    </label>
                    <ul className='flex text-black flex-col w-full h-[200px] text-wrap'>
                      <li className='hover:bg-[#F1F1F1] text-[1rem] border-y cursor-pointer p-[1rem]'>🔴 YouTube Views [NEW - Recommended] [Country/Quality: REAL Arab Mix] [Start time: 0-12H] [Speed: Up to 1-5k/Day] [Refill: 60 Days]</li>

                    </ul>
                  </div>
                </details>
              </div>

              {/* Service */}
              <div>
                <label className="block mb-1 text-sm font-bold">{t('lable_3_newOrder_tabContent_1')}</label>
                <details className='relative'>
                  <summary className='input truncate text-[1rem] input-bordered pt-[0.7rem] cursor-pointer'>🔴 مشاهدات يوتيوب [خدمة جديدة - مميزة] [البلد/الجودة: عرب مكس - حقيقية] [وقت البدا: خلال 0-12 ساعة] [السرعة: تصل الى 1-5 الاف/باليوم] [الضمان: 60 يوم] - $1.188 لكل 1000</summary>
                  <div className='overflow-x-auto z-40 absolute py-[0.5rem] bg-white shadow-md w-full flex flex-col'>
                    <label className="input input-bordered flex items-center gap-2 my-[0.5rem] mx-[1rem]">
                      <input type="text" className="grow" placeholder={t('lable_1_newOrder_tabContent_1')} />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                          fillRule="evenodd"
                          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                          clipRule="evenodd" />
                      </svg>
                    </label>
                    <ul className='flex text-black flex-col w-full h-[200px] text-wrap'>
                      <li className='hover:bg-[#F1F1F1] text-[1rem] border-y cursor-pointer p-[1rem]'>🔴 YouTube Views [NEW - Recommended] [Country/Quality: REAL Arab Mix] [Start time: 0-12H] [Speed: Up to 1-5k/Day] [Refill: 60 Days]</li>

                    </ul>
                  </div>
                </details>
              </div>
              <div className='lg:hidden'>
                <h1 className="text-xl font-bold mb-4">{t('title_2_newOrder_tabContent_1')}</h1>
                <div className="bg-gray-100 p-4 rounded-[14px]">
                  <p>{t('title_3_newOrder_tabContent_1')}</p>
                  <ul className="list-disc pl-5 space-y-1 p-[1rem]">
                  <li>{i18n.language === "ar" ? "في خانة الرابط : ضع رابط فيديو اليوتيوب" : "Lorem ipsum dolor sit amet consectetur adipisicing elit"}</li>
                  <li>{i18n.language === "ar" ? "لا تضع اكثر من طلب لنفس الرابط بنفس الوقت" : "Lorem ipsum dolor sit amet consectetur adipisicing elit"}</li>
                  </ul>
                </div>
              </div>
              {/* URL */}
              <div>
                <label className="block mb-1 text-sm font-bold">{t('lable_4_newOrder_tabContent_1')}</label>
                <input
                  type="url"
                  placeholder={t('placeholder_2_newOrder_tabContent_1')}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block mb-1 text-sm font-bold">{t('lable_5_newOrder_tabContent_1')}</label>
                <input
                  type="number"
                  placeholder={t('placeholder_3_newOrder_tabContent_1')}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* Approx Speed */}
              <div>
                <label className="block mb-1 text-sm font-bold">{t('lable_6_newOrder_tabContent_1')}</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block mb-1 text-sm font-bold">{t('lable_7_newOrder_tabContent_1')}</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full btn btn-primary">
                {t('button_1_newOrder_tabContent_1')}
              </button>
            </form>
          </div>

          {/* Description Section */}
          <div className='lg:block hidden'>
            <h1 className="text-xl font-bold mb-4">{t('title_2_newOrder_tabContent_1')}</h1>
            <div className="bg-gray-100 p-4 rounded-[14px]">
              <p>{t('title_3_newOrder_tabContent_1')}</p>
              <ul className="list-disc pl-5 space-y-1 p-[1rem]">
                <li>{i18n.language === "ar" ? "في خانة الرابط : ضع رابط فيديو اليوتيوب" : "Lorem ipsum dolor sit amet consectetur adipisicing elit"}</li>
                <li>{i18n.language === "ar" ? "لا تضع اكثر من طلب لنفس الرابط بنفس الوقت" : "Lorem ipsum dolor sit amet consectetur adipisicing elit"}</li>
              </ul>
            </div>
          </div>
        </div>
        )}

        {activeTab === 'favorites' && (
          <div>
            <h1 className="text-xl font-bold mb-4">{t('label_1_newOrder_tabContent_3')}</h1>
            <input
              type="text"
              placeholder={t('placeholder_1_newOrder_tabContent_3')}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <h1 className="text-xl font-bold mb-4">{t('label_2_newOrder_tabContent_3')}</h1>
            <input
              type="text"
              placeholder={t("placeholder_2_newOrder_tabContent_3")}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button className="w-full btn btn-primary">
              {t('button_1_newOrder_tabContent_1')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewOrder;
