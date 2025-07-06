import React from 'react'

// here we want 2 texts so we will get it from the props
const Title = ({text1,text2}) => {
  return (
    <>
    <div className='inline-flex gap-2 items-center mb-3'>
        <p className='w-8 sm:w-[80px] h-[2px] sm:h-[3px] bg-gray-700 '></p>
        <p className='text-gray-600'>{text1} <span className='text-gray-700 font-medium'>{text2}</span></p>
        <p className='w-8 sm:w-[80px] h-[2px] sm:h-[3px] bg-gray-700 '></p>
    </div>
    </>
  )
}

export default Title