import React from 'react'
import Header from '../components/Header'
import Post from '../components/Post'
import UploadForm from '../components/UploadForm'
const Home = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Header/>
      <section>
        <div className=' w-full mt-10' >
          <div onClick={()=>setOpen(true)} className='md:w-2/5 sm:w-4/5 w-11/12 rounded-md text-xs my-2 h-12 mx-auto cursor-pointer bg-[#4C525E] hover:opacity-85' >
           <p className='text-secondary py-4 pl-4'> What's your view on market today</p>
           
          </div>
          <UploadForm open={open} setOpen={setOpen} />
          <Post/>
        </div>
      </section>
    </div>
  )
}

export default Home