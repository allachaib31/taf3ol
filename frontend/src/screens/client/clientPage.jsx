import React from 'react'
import { Header, Navbar } from '../../components/client'
import { Outlet } from 'react-router-dom'

function ClientPage() {
  return (
    <div lang='ar' dir='rtl' className='fontZain'>
        <Header />
        <Navbar />
        <div className='p-[1rem] xl:mr-[20rem]'>
          <Outlet />
        </div>
    </div>
  )
}

export default ClientPage