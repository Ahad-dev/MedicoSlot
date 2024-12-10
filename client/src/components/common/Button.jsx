import React from 'react'

const Button = ({lable=null,bgColor="bg-black/80",textColor="text-white",rounded="rounded-sm",startIcon:SIcon=null,endIcon:EIcon=null,size=22,values}) => {
  return (
    <button {...values} className={`${bgColor} ${textColor} ${lable?"gap-2":""} transition-all duration-300 hover:scale-110 font-semibold px-3 py-2 ${rounded}  flex justify-center items-center  $`}>
        {SIcon && <SIcon size={size}/>}{<p>{lable}</p>} {EIcon && <EIcon size = {23}/>}
    </button>
  )
}

export default Button
