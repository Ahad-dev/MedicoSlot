import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const BacktoDashboard = () => {
  return (
    <Button className = "mb-5" variant = "destructive" ><Link to="/patient/dashboard"> Go back home </Link></Button>
  )
}

export default BacktoDashboard