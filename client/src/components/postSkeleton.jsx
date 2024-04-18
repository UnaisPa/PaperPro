import React from 'react'
import Skeleton from '@mui/material/Skeleton';

const PostSkeleton = () => {
    return (
        <>

            <div className="md:w-2/5 sm:w-4/5 w-11/12 rounded-md text-xs my-2 mx-auto bg-opacity-50 bg-[#2f3238]">
                <div className="text-slate-300 py-4 px-6">
                    <div className=" flex">
                        <Skeleton sx={{ bgcolor: '  rgb(51, 58, 69)' }} variant="circular" width={42} height={42} />
                        <div className="ml-2">
                            <Skeleton sx={{ bgcolor: '  rgb(51, 58, 69)' }} variant="rounded" width={210} height={20} />
                            <Skeleton sx={{ bgcolor: '  rgb(51, 58, 69)' }} className='mt-2' variant="rounded" width={110} height={10} />
                        </div>

                    </div>
                    <div className="my-2">
                        <Skeleton sx={{ bgcolor: '  rgb(51, 58, 69)' }} className='mt-3.5' variant="rounded" width={true} height={10} />
                        <Skeleton sx={{ bgcolor: '  rgb(51, 58, 69)' }} className='mt-2.5' variant="rounded" width={true} height={10} />
                        <Skeleton sx={{ bgcolor: '  rgb(51, 58, 69)' }} className='my-2.5 bg-slate-700' variant="rounded" width={true} height={10} />
                        <Skeleton sx={{ bgcolor: '  rgb(51, 58, 69)' }} className='mt-8 ' variant="rounded" width={true} height={189} />
                    </div>
                    <div className="flex">
                        <div className="flex hover:text-slate-100 cursor-pointer">
                            <Skeleton sx={{ bgcolor: '  rgb(51, 58, 69)' }} className='mt-2' variant="rounded" width={60} height={20} />
                        </div>
                        <div className="flex ml-4 hover:text-slate-100 cursor-pointer">
                            <Skeleton sx={{ bgcolor: '  rgb(51, 58, 69)' }} className='mt-2' variant="rounded" width={60} height={20} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostSkeleton