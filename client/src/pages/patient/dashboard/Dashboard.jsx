import AppointmentsHistoryTable from '@/components/patients/appointments-history-table'
import BasicInfo from '@/components/patients/basic-info'
import UncommingAppointmentsTable from '@/components/patients/uncomming-appointments-table'
import React from 'react'

const Dashboard = () => {
  return (
    <>
        <BasicInfo />
        <UncommingAppointmentsTable/>
        <AppointmentsHistoryTable/>
    </>
  )
}

export default Dashboard
