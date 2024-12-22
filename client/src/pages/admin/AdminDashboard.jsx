import AppointmentTable from '@/components/admin/AppointmentTable'
import UsersTable  from '@/components/admin/UserTable'
import { getAllUsers,getAllAppointments } from '@/services/admin'
import React, { useEffect, useState } from 'react'

const AdminDashboard = () => {
    const [users,setUsers] = useState([])
    const [appointments,setAppointments] = useState([])

    useEffect(()=>{
        getAllUsers().then((data)=>{
            console.log(data)
            setUsers(data.users)
        })
        getAllAppointments().then((data)=>{
            console.log(data)
            setAppointments(data)
        })
    },[])
  return (
    <div className='p-4 space-y-6'>
        <UsersTable data={users}/>
        <AppointmentTable data = {appointments}/>
    </div>
  )
}

export default AdminDashboard