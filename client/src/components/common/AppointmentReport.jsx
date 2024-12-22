import React from 'react'
import Header from './Header'
import LabeledCard from './LabeledCard'

const AppointmentReport = ({appointment}) => {
    console.log(appointment)
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
        {appointment.report.prescription && 
            <textarea className='border border-green-500/50 rounded-sm shadow-lg p-4 w-full text-gray-400 text-xl' rows={5}   disabled >
                {appointment.report.prescription}
            </textarea>
}
    </div>

  )
}

export default AppointmentReport