import React from 'react'
import Header from '../components/Header'
import Post from '../components/Post'

const Home = () => {
  return (
    <div>
      <Header/>
      <section>
        <div className=' w-full mt-10' >
          <div className='md:w-2/5 sm:w-4/5 w-11/12 rounded-md text-xs my-2 h-12 mx-auto bg-[#4C525E]' >
           <p className='text-secondary py-4 pl-4'> What's your view on market today</p>
           
          </div>
          <Post/>
        </div>
      </section>
    </div>
  )
}

export default Home