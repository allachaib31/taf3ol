import React from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'

function Settings() {
  const { t, i18n } = useOutletContext();
  return (
    <div>
      <Outlet context={{t,i18n}}/>
    </div>
  )
}

export default Settings