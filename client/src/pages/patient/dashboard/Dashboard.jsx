import AppointmentsHistoryTable from '@/components/common/appointments-history-table'
import BasicInfo from '@/components/common/basic-info'
import UncommingAppointmentsTable from '@/components/patients/uncomming-appointments-table'
import { getAppointmentHistory, getUncommingAppointments } from '@/services/Patient'
import { useEffect, useState } from 'react'
import { uncommingAppointmentsColumns } from '@/data/patient/colums'


const Dashboard = () => {
  const [upcommingAppointments, setUpcommingAppointments] = useState([])
  const [appointmentsHistory, setAppointmentsHistory] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
      getAppointmentHistory().then((data) => {
        setAppointmentsHistory(data)
          setLoading(false)
      })
      getUncommingAppointments().then((data) => {
        setUpcommingAppointments(data)
          setLoading(false)
      })
  }, [])  
  return (
    <>
        <BasicInfo />
        <UncommingAppointmentsTable data={upcommingAppointments}  columns={uncommingAppointmentsColumns}/>
        <AppointmentsHistoryTable data={appointmentsHistory} columns={uncommingAppointmentsColumns}/>
    </>
  )
}

export default Dashboard
