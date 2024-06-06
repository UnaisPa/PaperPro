import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import the styles
import { useSelector } from 'react-redux';
import axios from '../../axiosInstance';
import { toast } from 'react-toastify';
import AdminForm from '../../components/admin/AdminForm';
const AdminManagement = () => {
    const [superAdmins, setSuperAdmins] = useState([]);
    const [admins, setAdmins] = useState([])
    const { currentUser } = useSelector((state) => state.user);

    const getAllAdmins = () => {
        axios.get('/admin/get_admins').then((response) => {
            const supers = [];
            const others = [];

            response.data.admins.forEach((admin) => {
                if (admin.isSuperAdmin) {
                    supers.push(admin);
                } else {
                    others.push(admin);
                }
            });

            setSuperAdmins(supers);
            setAdmins(others);
        }).catch((err)=>{
            toast.error(err.response?.data?.message);
        })
    }

    useEffect(() => {
        getAllAdmins();
    }, [])
    return (
        <div className=' m-4' >
            <div className="w-full">
                <Tabs >
                    <TabList className="flex">
                        <Tab
                            className="px-4 py-2 cursor-pointer text-slate-300 focus:outline-none"
                            selectedClassName="font-semibold border-opacity-85  border-b-primary  border-b-2 text-white"
                        >
                            Admin
                        </Tab>
                        <Tab
                            className="px-4 py-2 cursor-pointer text-slate-300 focus:outline-none"
                            selectedClassName="font-semibold border-opacity-85  border-b-primary  border-b-2 text-white"
                        >
                            Add Admin
                        </Tab>

                    </TabList> 
                    <TabPanel>
                        <h1 className='text-slate-200  mt-6 ml-2 font-medium' >Super Admin</h1>
                        <div className=' m-2 sm:flex' >
                            {superAdmins.map((admin, index) => {
                                return (
                                    <div className=' rounded-md bg-slate-800 bg-opacity-70 border border-slate-700 m-2 w-1/4 h-72 pt-10' >
                                        {currentUser.profilePicture ? <img className=' rounded-full w-20 h-20 mx-auto' src={currentUser.profilePicture} /> : <img src='../src/assets/superAdmin.jpg' className='shadow rounded-full w-20 h-20 mx-auto' />}
                                        <h1 className='text-center text-slate-300 font-medium mt-2' >{admin.name}</h1>
                                        <p className='text-slate-500 text-center text-xs' >@ahammed8@gmail.com</p>
                                        <p className='text-slate-400 text-center text-xs mt-2 w-11/12 mx-auto' >Super Admin</p>
                                    </div>
                                )
                            })}
                        </div>
                        <h1 className='text-slate-200 ml-2 mt-6 font-medium' >Admins</h1>
                        <div className=' m-2  sm:flex' >
                            
                            {admins.map((admin, index) => {
                                return (
                                    <div className=' rounded-md bg-slate-800 bg-opacity-70 border border-slate-700 m-2 w-1/4 h-72 pt-10' >
                                        {currentUser.profilePicture ? <img className=' rounded-full w-20 h-20 mx-auto' src={currentUser.profilePicture} /> : <div  className=' rounded-full w-20 h-20 mx-auto text-center text-2xl text-black py-6 font-semibold bg-primary' >{admin.name.split("")[0]}</div>}
                                        <h1 className='text-center text-slate-300 font-medium mt-2' >{admin.name}</h1>
                                        <p className='text-slate-500 text-center text-xs' >{admin.email}</p>
                                        <p className='text-slate-400 text-center text-xs mt-2 w-11/12 mx-auto' >Admin</p>
                                    </div>
                                )
                            })}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className=' m-4' > 
                            <AdminForm />
                        </div>
                    </TabPanel>

                </Tabs>
            </div>
        </div>
    )
}

export default AdminManagement