import React from 'react'

const Header = () => {
  return (
    <div className='flex border p-2 ' >
        <div className='border w-2/4 p-5' >
            <h5 className='text-primary w-fit cursor-pointer md:pl-20 font-semibold text-2xl hover:text-[#a6d752]'>Paper pro</h5>
        </div>
        <div className='flex border  w-2/4 p-5 text-white' >
            <div  className=' flex justify-around align-middle md:justify-center w-full' >
                <p className='md:mr-20 sm:mr-2 p-1'>About</p>
            </div>
        </div>
    </div>
  )
}

export default Header