import React from 'react'

const LabeledCard = ({label,data}) => {
  return (
    
    <div className='space-y-4'>
    <h2 className='font-semibold'>{label}</h2>
    <div className='shadow-sm shadow-black/20 bg-slate-400/30 p-5 rounded-sm text-xl'> <p className='text-slate-600'>{data}</p></div>
    </div>
  )
}

export default LabeledCard