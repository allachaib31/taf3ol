import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';


function AppWeb() {
  useEffect(() => {
    AOS.init({
        duration: 1200, // You can customize the animation duration
    });
}, []);
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default AppWeb