import React from 'react'
import Avatar from './Avatar'
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { logout } from '@/services/auth';
import { Button } from '../ui/button';

const Navbar = () => {
  const navigation = useNavigate()

  const onLogout = async()=>{
    await logout()
    navigation("/login");
  }
  return (
    <>
    <nav className='py-3 sticky top-0 bg-white  z-[11] px-10 flex justify-between items-center border-b '>
        <div className='h-12 w-12 overflow-hidden'>
          <img src="/logo.png" alt="" height={100}/>
        </div>
        <div className="flex gap-10 justify-center items-center">
          <Avatar />
          <Button onClick={onLogout} className="bg-red-500"  >
              <LuLogOut/>
          </Button>          
        </div>
    </nav>
    </>

  )
}

export default Navbar
