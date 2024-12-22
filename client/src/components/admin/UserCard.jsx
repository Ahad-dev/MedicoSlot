import React from 'react'
import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from '../ui/card'
import { Link } from 'react-router-dom'

const UserCard = ({user}) => {
  return (
    <Card className="flex flex-col p-3 hover:bg-gradient-to-tr from-teal-500 to-teal-800  hover:text-white hover:scale-105 transition-all duration-300">
        <CardHeader>User Details</CardHeader>
      <CardContent className="flex flex-col items-center space-y-2">
        <CardTitle>{user.fullName}</CardTitle>
        <p>{user.CNIC}</p>
        <p>{user.role}</p>
      </CardContent>
      <CardFooter className = "flex justify-between gap-5">
       <Link to={`/admin/update-user/${user._id}`}>
        <button className="bg-teal-800 hover:bg-teal-600 text-white rounded-lg py-2 px-5">Update</button>
       </Link>
        <button className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-5 py-2">Delete</button>
      </CardFooter>
    </Card>
  )
}

export default UserCard