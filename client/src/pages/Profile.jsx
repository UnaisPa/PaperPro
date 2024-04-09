import React from 'react'
import Header from '../components/Header'
import axios from "../axios.js"
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"
const Profile = () => {
  const navigate = useNavigate()
  const handleLogout = (e) =>{
    e.preventDefault();
    const token = localStorage.getItem('jwt');
    console.log(token)
    axios.post('/users/logout',null,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    },{withCredentials:true}).then((response)=>{
      toast.success(response.data.message)
      console.log(response.data)
      localStorage.removeItem('jwt');
      localStorage.removeItem('root');
      window.location.href='/'
    }).catch((err)=>{
      console.log(err.response ? err.response.data : err.message);
      toast.error(err.response ? err.response.data.message : err.message);
    })

  }
  return (
    <div>
        <Header/>
        profile
        <button className='border text-white' onClick={handleLogout} >
          Logout
        </button>
    </div>
  )
}

export default Profile