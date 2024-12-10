import React from 'react'
import AppointmentCard from './AppointmentCard'

const MyAppointments = ({appointments}) => {
  return (
    <div className='flex  gap-8 flex-wrap justify-center'>
        {appointments.map(appointment => (
            <AppointmentCard key={appointment.id} appointment={appointment}/>
            ))
        }
    </div>

)
}

export default MyAppointments
