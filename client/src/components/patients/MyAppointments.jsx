import React from 'react'
import AppointmentCard from './AppointmentCard'

const MyAppointments = ({appointments}) => {
  return (
    appointments?<div className='flex  gap-8 flex-wrap justify-center'>
        {appointments.map(appointment => (
            <AppointmentCard key={appointment.id} appointment={appointment}/>
            ))
        }
    </div>:<div className='flex justify-center items-center h-96'>
        <h1 className='text-2xl text-gray-400'>No Appointments Found</h1>
    </div>
    

)
}

export default MyAppointments
