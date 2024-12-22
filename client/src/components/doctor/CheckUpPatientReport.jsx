import React from 'react'
import { Header } from '../common'
import LabeledCard from '../common/LabeledCard' 

const CheckUpPatientReport = ({appointment}) => {
    console.log(appointment.doctorName)
  return (
    <div className='space-y-10'>
      <Header label={"Appointment Report"} role = "Doctor"/>
        <div className='grid grid-cols-2 gap-5'>
            <LabeledCard label={"Patient Name"} data={appointment.patientName}/>
            <LabeledCard label={"Age"} data={appointment.patient.patient_id.age? appointment.patient.patient_id.age:20}/>
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

export default CheckUpPatientReport