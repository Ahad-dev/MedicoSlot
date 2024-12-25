import UserCard from '@/components/admin/UserCard'
import { SearchBar } from '@/components/common'
import { Button } from '@/components/ui/button'
import { getAllUsers } from '@/services/admin'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ManageUser = () => {
        useEffect(()=>{
            getAllUsers().then((data)=>{
                console.log(data)
                setUsers(data.users)
            })
        },[])

         const [users, setUsers] = useState([]);
          const [filteredUsers, setFilteredUsers] = useState([]);
            const [loading, setLoading] = useState(true);
          
            useEffect(() => {
                getAllUsers().then((data)=>{
                    console.log(data)
                    setUsers(data.users)
                    setFilteredUsers(data.users); // Initially, show all data
                    setLoading(false);
              });
            }, []);
          
            console.log(filteredUsers);
          
            const handleSearch = (searchTerm) => {
              const lowerCaseTerm = searchTerm.trim().toLowerCase(); // Normalize search term
              if (lowerCaseTerm === '') {
                // If the search term is empty, reset to all users
                setFilteredUsers(users);
                return;
              }

                const filtered = users.filter((user) => {
                // Check user properties
                return (
                  user.fullName?.toLowerCase().includes(lowerCaseTerm) || // Match name
                  user.CNIC?.toLowerCase().includes(lowerCaseTerm) || // Match email
                  user.role?.toLowerCase().includes(lowerCaseTerm) // Match role
                );
                });

            
            
              setFilteredUsers(filtered); // Update the state with filtered data
            };
          
  return (
    <>
    <h1 className='text-2xl font-semibold'>Manage Users</h1>    
          {/* <Header label="Appointments" /> */}
          <SearchBar handleSearch={handleSearch} />
    <hr className='my-4'/>
    
    <Link to={'/admin/add-user'}>
        <Button className="bg-teal-700 hover:bg-teal-500 p-5 w-36 mx-auto">Add User</Button>
    </Link>
        <div className='p-4 flex flex-wrap gap-4'>
            {filteredUsers.map((user)=>{
                return <UserCard user={user}/>
            })}
        </div>
    </>
  )
}

export default ManageUser