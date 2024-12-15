import React from 'react'
import Header from './Header'
import LabeledCard from './LabeledCard'

const AppointmentReport = ({appointment}) => {
    console.log(appointment.doctorName)
  return (
    <div className='space-y-10'>
      <Header label={"Appointment Report"}/>
        <div className='grid grid-cols-2 gap-5'>
            <LabeledCard label={"Doctor Name"} data={appointment.doctorName}/>
            <LabeledCard label={"Purpose"} data={appointment.doctor.specialization}/>
            <LabeledCard label={"Experience"} data={appointment.doctor.experience}/>
        </div>
        <div className='grid grid-cols-2 gap-5'>
            <LabeledCard label={"Appointment Date"} data={appointment.date}/>
            <LabeledCard label={"Time Slot"} data={appointment.time}/>
            <LabeledCard label={"Day"} data={appointment.day}/>
            <LabeledCard label={"Status"} data={appointment.status}/>
        </div>
    </div>

  )
}

export default AppointmentReport