import React, { useEffect } from 'react'
import { Header, Navbar } from '../../components/client'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function ClientPage() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);

    // Change the direction based on the language
    if (lng === 'ar') {
      document.getElementById("client").dir = 'rtl';
      document.getElementById("client").lang = 'ar';
    } else {
      document.getElementById("client").dir = 'ltr';
      document.getElementById("client").lang = 'en';
    }
  };
  useEffect(() => {
    // Set initial direction based on the current language
    //alert(i18n.language)
    if (i18n.language === 'ar') {
      document.getElementById("client").dir = 'rtl';
    } else {
      document.getElementById("client").dir = 'ltr';
    }
  }, [i18n.language]);
  return (
    <div id='client' lang='ar' dir='rtl' className='fontZain'>
      <Header changeLanguage={changeLanguage} i18n={i18n} t={t}/>
      <Navbar i18n={i18n} t={t}/>
      <div className={`p-[1rem] ${i18n.language === 'ar' ? 'xl:mr-[20rem]' : 'xl:ml-[20rem]'} mt-[6.2rem]`}>
        <Outlet context={{ t, i18n }}/>
      </div>
    </div>
  )
}

export default ClientPage