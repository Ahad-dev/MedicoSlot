import React, { useEffect, useState } from 'react'
import { getDoctorAppoitmentsById,completeCheckup } from '@/services/Appointment'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import CheckUpPatientReport from '@/components/doctor/CheckUpPatientReport'
import { toast } from 'sonner'

const CheckUpPatient = () => {
    const {id} = useParams()
    const [appointment, setAppointment] = useState(null)
    const [prescription, setPrescription] = useState("")
    console.log("ID:", id)

    useEffect(() => {
        getDoctorAppoitmentsById(id)
        .then(res => {
            console.log(res)
            setAppointment(res)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    const handleCompleteCheckUP = () => {
        completeCheckup(id, prescription)
        .then(res => {
            console.log(res)
            toast.success("Checkup completed successfully")
        })
        .catch(err => {
            console.log(err)
            toast.error("Error completing checkup")
        })
    
    }


  return (
    <div className='space-y-10'>
        <Button className = "mb-5" variant = "destructive" ><Link to="/doctor/dashboard"> Go back home </Link></Button>
        {appointment &&<CheckUpPatientReport appointment = {appointment}></CheckUpPatientReport>}
        <textarea onChange={
            (e) => {
                setPrescription(e.target.value)
            }
        } className="w-full h-60 border-2 border-gray-300 rounded-lg outline-none p-5" placeholder="Write prescription here"></textarea>
        <div className='flex justify-between'>
            <Button className="mt-5 bg-Primary-dark-blue hover:bg-blue-400 text-white " onClick={handleCompleteCheckUP}>Complete Checkup</Button>
            {/* <Button className="mt-5 bg-Primary-dark-blue hover:bg-blue-400 text-white " >Go for another Appointment</Button> */}
        </div>
    </div>
  )
}

export default CheckUpPatient;