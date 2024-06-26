import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from '../../axiosInstance'
import { toast } from 'react-toastify'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function LikedUsers({ postId,setDisplayLikedUsers,displayLikedUsers }) {
    const [open, setOpen] = useState(true);
    const [users, setUsers] = useState([]);

    const cancelButtonRef = useRef(null)

    const getLikedUsers = async () => {
        axios.get(`/post/get_liked_users/${postId}`).then((response) => {
            if (response.data.users) {
                setUsers(response.data.users);
            }
            console.log(response.data);
        }).catch((err) => {
            console.log(err);
            toast.error(err.response?.data);
        })
    }

    useEffect(() => {
        getLikedUsers();

    }, [])

    return (
        <div  >
        <Transition.Root show={open} as={Fragment}> 
            <Dialog onClose={()=>setDisplayLikedUsers(false)} className="relative z-10" initialFocus={cancelButtonRef}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel style={{ 'fontFamily': '"Poppins", sans-serif' }} className="relative w-full transform overflow-hidden rounded-lg bg-[#3e4651]  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-[#3e4651]  px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">

                                        <div className=" mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3" className="text-base font-semibold text-slate-300">
                                                Liked Users
                                            </Dialog.Title>

                                        </div>
                                    </div>
                                </div>
                                {users.length>0 ?
                                    users.map((user) => {
                                        return (
                                            <div key={user._id} className='mb-10 '>
                                                <div className=' flex mx-10' >
                                                    <div className=' w-1/6 h-10' >
                                                        {user.profilePicture?<img className='rounded-full  h-12 w-12' src={user.profilePicture} />:<div className='bg-primary border rounded-full h-12 w-12' >
                                                            <p className='text-center my-2 text-black font-semi' >{user.name.split('')[0].toUpperCase()}</p>
                                                        </div>}
                                                    </div>
                                                    <div className=' w-2/3 h-10' >
                                                        <h1 className='font-semibold text-slate-300' >{user.name}</h1>
                                                        <p className='text-sm text-slate-400' >{user.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    : <div className='text-center my-24 text-slate-400' >
                                        No likes
                                    </div>}

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
        </div>
    )
}
