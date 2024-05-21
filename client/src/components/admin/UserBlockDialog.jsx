import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FaRegUser } from "react-icons/fa";
import axios from '../../axiosInstance';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

export default function UserBlockDialog({setUsers, users, userName, setUserName,action,setDialogOpen}) {
  const [open, setOpen] = useState(true) 
  const [loading,setLoading] = useState(false);

  const cancelButtonRef = useRef(null)
    useEffect(()=>{
       // console.log(userName,action)
    },[])

    const blockUser = async() =>{
        setLoading(true)
        axios.put(`/admin/block_user/${userName}`,{action:action}).then((response)=>{
            if(response.data.success){
                toast.info(response.data.message);
                // setUsers({...users,isBlocked:response.data.blocked})
                const updatedUsers = users.map((user)=>user.userName == userName?{...user,isBlocked:response.data.blocked}:user)
                setUsers(updatedUsers);
            }else{
                toast.warning(response.data.message)
            }
        }).catch((err)=>{
            console.log(err);
            toast.error(err.message);
        }).finally(()=>{
            setLoading(false)
            setUserName('');
            setDialogOpen(false)
        })
    }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog onClose={()=>setDialogOpen(false)} className="relative z-10" initialFocus={cancelButtonRef} >
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
              <Dialog.Panel style={{ 'fontFamily': '"Poppins", sans-serif' }}  className="relative transform overflow-hidden rounded-lg bg-[#3e4651]  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-[#3e4651]  px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      {/* <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> */}
                      <FaRegUser />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-slate-200">
                       {action=='block'?'Block User':'Unblock User'}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-slate-300">
                          Are you sure you want to {action} this account? (@{userName})
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#3e4651]  px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-slate-300 px-3 py-2 text-sm font-semibold text-slate-500 shadow-sm hover:bg-slate-100 sm:ml-3 sm:w-auto"
                    onClick={() => {setOpen(false),blockUser()}}
                  >
                    {loading?<><ClipLoader size={11} />Loading</>: action=='block'?'Block':'Unblock'}
                  </button>
                  <button
                    type="button" 
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-300 shadow-sm  hover:bg-slate-800 sm:mt-0 sm:w-auto"
                    onClick={() => {setOpen(false),setDialogOpen(false),setUserName(false)}}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
