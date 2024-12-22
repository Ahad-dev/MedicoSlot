import UserCard from '@/components/admin/UserCard'
import { Button } from '@/components/ui/button'
import { getAllUsers } from '@/services/admin'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ManageUser = () => {
    const [users,setUsers] = useState([])
        useEffect(()=>{
            getAllUsers().then((data)=>{
                console.log(data)
                setUsers(data.users)
            })
        },[])
  return (
    <>
    <h1 className='text-2xl font-semibold'>Manage Users</h1>    
    <hr className='my-4'/>
    
    <Link to={'/admin/add-user'}>
        <Button className="bg-teal-700 hover:bg-teal-500 p-5 w-36 mx-auto">Add User</Button>
    </Link>
        <div className='p-4 flex flex-wrap gap-4'>
            {users.map((user)=>{
                return <UserCard user={user}/>
            })}
        </div>
    </>
  )
}

export default ManageUser