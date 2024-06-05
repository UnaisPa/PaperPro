import React, { useEffect, useState } from 'react'
import TableComponentUsers from '../../components/admin/TableComponentUsers';
import TradingLoader from '../../components/loader/TradingLoader';
import axios from '../../axiosInstance';
import { Pagination, Stack } from '@mui/material';
import TableComponentPortfolio from '../../components/admin/TableComponentPortfolio';
const PortfolioManagement = () => {
    const [page, setPage] = useState(1)


    const handlePageChange = (event, value) => {
        setPage(value);
        //console.log(value)
    }

    const [users, setUsers] = useState([]);
    const [totalCount,setTotalCount] = useState(0)
    
    const getAllUsers = async () => {
        let api;
        if(page==1){
            api = "/admin/get_all_users"
        }else{
            api = `/admin/get_all_users?p=${page}`
        }

        axios.get(api).then((response) => {
            setUsers(response.data.users);
            console.log(response.data)
            setTotalCount(response.data.totalCount)
            console.log(response.data.totalCount)
        }).catch((err) => {
            toast.error(err.message)
            console.log(err)
        })
    }

    

    useEffect(() => {
        getAllUsers()
    }, [page])


    return (
        <>
            <div className='' >
                <h1 className='text-slate-200 text-2xl font-semibold ml-4' >Portfolio Management</h1>
                <div className='w-full  fixed sm:relative' >
                    {/* <TableComponentUsers users={users} /> */}
                   {users[0]?<><TableComponentPortfolio setUsers={setUsers} users={users} />
                    <div className='flex px-4 pb-10 justify-between' >
                        <p className='text-slate-400' ></p>
                        <Stack>
                            <Pagination
                                variant="text"
                                count={Math.ceil(totalCount/5)} // Total number of pages
                                page={page} // Current page
                                onChange={handlePageChange} // Handler for page change
                                color="primary"
                                sx={{
                                    '& .MuiPaginationItem-text': {
                                        color: 'white',
                                    },
                                }}
                            />
                        </Stack>
                    </div>
                    </>: <TradingLoader />}

                </div>
            </div>
        </>
    )
}

export default PortfolioManagement