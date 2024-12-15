import BasicInfo from '@/components/common/basic-info'
import DeleteAccount from '@/components/patients/DeleteAccount'
import Notifications from '@/components/patients/Notifications'
import React from 'react'

const Settings = () => {
  return (
    <div className='space-y-6'>
      <BasicInfo/>
      <Notifications/>
      <DeleteAccount/>
    </div>
  )
}

export default Settings
