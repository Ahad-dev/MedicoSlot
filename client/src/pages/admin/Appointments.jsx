import AppointmentTable from '@/components/admin/AppointmentTable'
import { getAllAppointments } from '@/services/admin'
import React, { useEffect, useState } from 'react'

const Appointments = () => {
        const [appointments,setAppointments] = useState([])
    
        useEffect(()=>{
            getAllAppointments().then((data)=>{
                console.log(data)
                setAppointments(data)
            })
        },[])
  return (
    <div>
        <AppointmentTable data = {appointments} details={true}/>
    </div>
  )
}

export default Appointments