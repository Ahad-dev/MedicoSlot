import React from 'react'

const UserImage = () => {
  return (
    <div className='h-full w-[fit-content] rounded-full overflow-hidden object-cover shadow-lg hover:scale-105 transition-all duration-100'>
        <img src="/image.png" alt="img"  height={"100%"} />
    </div>
  )
}

export default UserImage
