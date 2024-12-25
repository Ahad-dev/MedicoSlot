import React from 'react'
import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from '../ui/card'
import { Link } from 'react-router-dom'
import { deleteUser } from '@/services/admin'
import { LoaderComponent } from '../common/Loader'

const UserCard = ({user}) => {
  const [loading, setLoading] = React.useState(false)

  const handleDelete = () => {
    setLoading(true)
    const confirm = window.confirm("Are you sure you want to delete this user?")
    
    if(confirm) {
      // Call the delete user function
      deleteUser(user._id)
      .then(response => {
        //refresh the page
        window.location.reload()
        console.log(response)
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
    };
  }

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
        <button className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-5 py-2" onClick={handleDelete}>{!loading?"Delete":<LoaderComponent></LoaderComponent>}</button>
      </CardFooter>
    </Card>
  )
}

export default UserCard