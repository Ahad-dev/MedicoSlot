import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import UserImage from "../patients/UserImage"

import {motion} from "motion/react"

import { useAuthentication } from "@/context/AuthenticationContext"

const BasicInfo = () => {

    const {user} = useAuthentication()


  return (
    <motion.div
    initial={{y:30,opacity:0}}
    animate={{y:0,opacity:1}}
    transition={{duration:0.5}}>
        <Card 
        >
            <CardHeader className={`text-2xl ${user?.role==="Patient"?"text-Primary-dark-Green":"text-Primary-dark-blue"}`}>
                <CardTitle >Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
                    <div className="grid grid-flow-col grid-rows-2 gap-4 items-center">
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-600 font-semibold">Full Name</label>
                            <p className="text-gray-900">{user?.fullName}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-600 font-semibold">Email Address</label>
                            <p className="text-gray-900">johndoe@gmail.com</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-600 font-semibold">Age</label>
                            <p className="text-gray-900">{user?.age}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-600 font-semibold">CNIC</label>
                            <p className="text-gray-900">{user?.CNIC}</p>
                        </div>
                        <div className="row-span-2 col-span-3 m-auto">
                            <UserImage></UserImage>
                        </div>
                        

                    </div>
            </CardContent>
        </Card>
    </motion.div>

  )
}

export default BasicInfo
