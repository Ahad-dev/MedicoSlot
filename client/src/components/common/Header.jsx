import React from 'react'

const Header = ({label}) => {
  return (
    <h1 className='font-semibold text-2xl mb-5 text-green-500'>
      {label}
    </h1>
  )
}

export default Header
