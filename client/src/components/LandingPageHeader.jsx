import React from 'react'

const LandingPageHeader = () => {
  return (
    <div className='flex p-2 ' >
        <div className=' w-2/4 p-5' >
            <h5 className='text-primary w-fit cursor-pointer md:pl-20 font-semibold text-2xl hover:text-[#8fb848]'>Paper pro</h5>
        </div>
        <div className='flex  w-2/4 p-5 text-white' >
            <div  className=' flex justify-around align-middle md:justify-center w-full' >
                <p className='md:mr-20 sm:mr-2 p-1'>About</p>
                <button className='border text-xs sm:text-base border-e-2 border-primary pl-4 pr-4 p-1 sm:pl-6 sm:pr-5 rounded-2xl'>Login</button>
            </div>
        </div>
    </div>
  )
}

export default LandingPageHeader