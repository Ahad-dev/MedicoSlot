import React from 'react'

const Header = ({label,role="Patient"}) => {
  return (
    <h1 className={`font-semibold text-2xl mb-5 ${role=="Patient"?"text-Primary-dark-Green":"text-Primary-dark-blue"} `}>
      {label}
    </h1>
  )
}

export default Header
