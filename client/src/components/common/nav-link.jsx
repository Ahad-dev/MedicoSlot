import { Link,useResolvedPath } from "react-router-dom"
import { motion } from "motion/react"

const NavLink = ({name,icon:Icon,path,isOpen}) => {

    const {pathname} = useResolvedPath  ();


  return (
    <Link to={path} className='px-4 py-4 relative hover:bg-Additional-gray/40 text-white cursor-pointer flex gap-3 items-center  text-center'>
        {pathname == path && <motion.div
        initial={{height:0,opacity:0}}
        animate={{height:"100%",opacity:1}}
        transition={{duration:0.5}}
        className={`bg-green-700 rounded-full h-full left-0 top-0  w-1 absolute`}></motion.div>}
        <Icon className="min-w-10 " size = {25}/>
        <p className={` text-center text-md ${pathname == path?"font-semibold":""}`}>{isOpen && name}</p>
    </Link>
  )
}

export default NavLink
