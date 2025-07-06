import React from 'react'

const NewsLetter = () => {

    const onSubmitHandler = (e) =>
    {
        e.preventDefault();
    }

  return (
    <>
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe Now & Get 20% Off</p>
        <p className='text-gray-600 mt-3'>
            Join the cool club — exclusive deals, hot drops, and zero spam. Just style, straight to your inbox!
        </p>

        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input type="email" className='w-full sm:flex-1 outline-none p-3' placeholder='Enter Your Email' required />
            <button type="submit" className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>

    </div>
    </>
  )
}

export default NewsLetter