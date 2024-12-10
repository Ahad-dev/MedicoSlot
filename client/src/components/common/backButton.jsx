import React from 'react'
import { Link } from 'react-router-dom'

const BackButton = ({label,href}) => {
  return (
    <Link
        to={href}
        className="text-blue-500 hover:text-blue-700"
    >
        {label}
    </Link>
  )
}

export default BackButton