import React from 'react'
import { Outlet } from 'react-router-dom'

function AppWeb() {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default AppWeb