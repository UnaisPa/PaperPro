import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { RiUserUnfollowFill, RiUserUnfollowLine } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch,useSelector } from 'react-redux';
import { deletePost } from '../redux/postSlice';
import axios from "../axios.js"
import { toast } from "react-toastify";
import { ClipLoader } from 'react-spinners';

export default function TailwindDialog({ type, title, description, setOpendDialog, post }) {
    const dispatch = useDispatch()
    const {currentUser} = useSelector((state)=>state.user);
    const [open, setOpen] = useState(true)
    const [loading,setLoading] = useState(false)

    const cancelButtonRef = useRef(null)

    //Delete current User's post
    const deleteUserPost = async () => {
        setLoading(true)
        const postId = post._id
        if (currentUser._id === post.user._id) {
            await axios.delete(`/post/delete_post/${postId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            }).then((response) => {
                dispatch(deletePost(postId))
                toast.success(response.data.message)
            }).catch((err) => {
                console.log(err);
                toast.error(err.response.message || err.message)
            }).finally(()=>{
                setLoading(false)
                setOpendDialog(false);
            })
        }
    }

    // useEffect(()=>{
    //     console.log(post._id)
    // })

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-slate-900 bg-opacity-65 transition-opacity" />
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
                            <Dialog.Panel style={{ 'fontFamily': '"Poppins", sans-serif' }} className="relative transform overflow-hidden rounded-lg bg-slate-400 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className=" bg-[#3e4651]  px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-300 sm:mx-0 sm:h-10 sm:w-10">
                                            {/* <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> */}
                                            {type == 'unfollow' && <RiUserUnfollowLine size={22} />}
                                            {type == 'delete_post' && <AiOutlineDelete size={22} />}
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-slate-200">
                                                {title}
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-slate-300">
                                                    {description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#3e4651] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        disabled={loading}
                                        className={`inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 sm:ml-3 sm:w-auto`}
                                        onClick={type=='delete_post'?deleteUserPost:''}
                                    >
                                        {loading?<><ClipLoader className='mx-2' color='white' size={20} /> Loading..</> : title.split(" ")[0]}
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => { setOpen(false), setOpendDialog(false) }}
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
