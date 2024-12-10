import React from 'react'
import  homeavatar from "@/assets/home/HeroIllustraction.svg"
import { Button } from '../ui/button'
import {motion} from 'motion/react'

const HeroSection = () => {
  return (  
    <motion.div
    initial={{opacity:0, y:50}}
    animate={{opacity:1, y:0}}
    transition={{duration:0.5}}
    className='flex justify-around items-center'>
      <div className='flex flex-col gap-8 justify-center items-center max-w-96'>
        <div className='text-center space-y-2'>
            <h1 className='text-5xl font-bold text-blue-500'>Your Health, Our Priority</h1>
            <p className='text-gray-500/70'>Book Appointments Easily, Access Reports, and Manage Your Health Online</p>
        </div>
        <Button>Get Started</Button>
      </div>
      <img src={homeavatar} width={600} alt="adsf" />
    </motion.div>
  )
}

export default HeroSection
