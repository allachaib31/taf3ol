import React from 'react'
import { Outlet } from 'react-router-dom'

function AdminScreen() {
  return (
    <div dir="rtl" lang="ar" className='fontCairo min-h-screen'>
        <Outlet />
    </div>
  )
}

export default AdminScreen