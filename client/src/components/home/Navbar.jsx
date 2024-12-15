import { Button } from "../ui/button"
import { LogIn } from "lucide-react"
import { MdAppRegistration } from "react-icons/md"
import { Link } from "react-router-dom"


const Navbar = () => {
  return (
    <nav className="w-full border-b border-gray-500/20 p-3">
        <div className="flex justify-between mx-10 items-center">
            <div className='h-12 w-12 overflow-hidden'>
                <img src="/logo.png" alt="" height={100}/>
            </div>
            <div className="flex gap-5">
                <Button className="bg-Primary-dark-blue hover:bg-blue-500"> <Link to={"/login"}>Login</Link> <LogIn></LogIn></Button>
                <Button className="bg-Primary-dark-blue hover:bg-blue-500">Sign Up <MdAppRegistration></MdAppRegistration></Button>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
