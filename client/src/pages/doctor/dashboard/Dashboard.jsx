import { BasicInfo } from '@/components/common'
import UncommingAppointmentsTable from '@/components/common/Table'
import { doctorUpcommingAppointmentsColumns } from '@/data/patient/colums'
import { getAppointmentHistory, getUncommingAppointments } from '@/services/doctor'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [upcommingAppointments, setUpcommingAppointments] = useState([])
    const [appointmentsHistory, setAppointmentsHistory] = useState([])
      const [loading, setLoading] = useState(true)
      useEffect(() => {
          getUncommingAppointments().then((data) => {
            console.log(data)
            setUpcommingAppointments(data)
              setLoading(false)
          })
          getAppointmentHistory().then((data) => {
            setAppointmentsHistory(data)
              setLoading(false)
          })
      }, [])  
  return (
    <>
        <BasicInfo />
        <UncommingAppointmentsTable role="Doctor" headerLabel="Upcomming Appointment" DetailLink={"/doctor/appointments"} data={upcommingAppointments}  columns={doctorUpcommingAppointmentsColumns}/>
        <UncommingAppointmentsTable role="Doctor" headerLabel="Appointment History" DetailLink={"/doctor/appointments"} data={appointmentsHistory}  columns={doctorUpcommingAppointmentsColumns}/>

    </>
  )
}

export default Dashboard