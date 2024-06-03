import { Fragment, useState } from 'react'
import { Dialog, Transition, } from '@headlessui/react'
import { FaExclamation } from 'react-icons/fa'
import axios from '../../axiosInstance'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import ReportSuccess from './ReportSuccess'

export default function ReportPostDialog({ setOpenDialog, postBy, reportedBy, postId }) {
    const [open, setOpen] = useState(true);
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false)
    const handleReportPost = (e) => {
        e.preventDefault();
        setLoading(true);
        if (text.trim() == '') {
            toast.warning('Please Enter your reason!')
        } else {

            axios.post(`/post/report_post/${postId}`, { reason: text, postBy, reportedBy }).then((response) => {
                if (response.data.success) {
                    setSuccess(true)
                    setTimeout(() => {
                        setOpen(false);
                        setOpenDialog(false)
                    }, 4000)
                }
            }).catch((err)=>{
                toast.error(err.response?.data?.message);
                console.log(err)
            }).finally(()=>{
                setLoading(false);
            })
        }
    }
    return (

        <Transition show={open}>
            <Dialog className="relative z-10" onClose={() => setOpenDialog(false)}>
                <Transition.Child
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
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel style={{ 'fontFamily': '"Poppins", sans-serif' }} className="relative transform overflow-hidden rounded-lg bg-[#3e4651] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <form onSubmit={handleReportPost}>
                                    <div className="bg-[#3e4651] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <FaExclamation className="h-6 w-6 text-red-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-slate-200">
                                                    Report Post
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-slate-400">
                                                        Could you please let us know why you're reporting this post?
                                                    </p>
                                                    <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder='Enter your reason!' className='w-full mt-4 outline-none rounded-md p-2 bg-slate-400 bg-opacity-20 text-white' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-[#3e4651] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="submit"
                                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                            disabled={loading}
                                        >
                                            {loading ? <div className='text-slate-200'><ClipLoader size={14} color='white' /> Loading</div> : 'Submit'}
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 outline-none w-full justify-center text-slate-400  px-3 py-2 text-sm font-semibold sm:mt-0 sm:w-auto"
                                            onClick={() => { setOpen(false), setOpenDialog(false) }}
                                            data-autofocus
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                                {success && <ReportSuccess setDialogOpen={setSuccess} />}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
