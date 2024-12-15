import { AppointmentReport, BacktoDashboard } from '@/components/common'
import React, { useEffect, useState } from 'react'
import { getAppoitmentsById } from '@/services/Appointment'
import { useParams } from 'react-router-dom'

const AppointmentDetails = () => {
    const {id} = useParams()
    const [appointment, setAppointment] = useState(null)

    useEffect(() => {
        getAppoitmentsById(id)
        .then(res => {
            setAppointment(res)
        })
        .catch(err => {
            console.log(err)
        })
    }, [id])

    

  return (
    <div>
        <BacktoDashboard></BacktoDashboard>
        {appointment &&<AppointmentReport appointment = {appointment}></AppointmentReport>}
    </div>
  )
}

export default AppointmentDetails