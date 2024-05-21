import React, { useState } from 'react';
import { ClipLoader, MoonLoader } from 'react-spinners';
import UserBlockDialog from './UserBlockDialog';

const TableComponentUsers = ({ users,setUsers }) => {
    const [userName, setUserName] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false);
    const [action, setAction] = useState('')
    const handleBlockButton = async(action, userName) => {
        setAction(action);
        setUserName(userName) //  2 passing reference of user to dialog component
        await setDialogOpen(true)
    }

    return (
        <div className=" px-4 min-h-[88vh]">
            <div className="py-8">
                <div className="overflow-x-scroll ">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="px-5 py-3 border-b-2 border-slate-500 bg-[#323a46] text-left text-xs font-semibold text-white uppercase tracking-wider"
                                >
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-3 border-b-2 border-slate-500 bg-[#323a46] text-left text-xs font-semibold text-white uppercase tracking-wider"
                                >
                                    Username
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-3 border-b-2 border-slate-500 bg-[#323a46] text-left text-xs font-semibold text-white uppercase tracking-wider"
                                >
                                    Total P&L
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-3 border-b-2 border-slate-500 bg-[#323a46] text-left text-xs font-semibold text-white uppercase tracking-wider"
                                >
                                    Total Trades
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-3 border-b-2 border-slate-500 bg-[#323a46] text-left text-xs font-semibold text-white uppercase tracking-wider"
                                >
                                    Edit
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.email}>
                                    <td className="px-5 py-5 border-b border-slate-500 bg-[#29303a] text-sm">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                {user.profilePicture ? <img className="rounded-full h-10 w-10" src={user.profilePicture} alt={`${user.name}`} /> : <div className="rounded-full h-10 w-10 bg-body text-slate-200 text-center pt-2 " >{user.name.split('')[0].toUpperCase()}</div>}
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-slate-200 whitespace-no-wrap">{user.name}</p>
                                                <p className="text-slate-400 whitespace-no-wrap">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-slate-500 bg-[#29303a] text-sm">
                                        <p className="text-slate-200 whitespace-no-wrap">@{user.userName}</p>
                                        <p className="text-slate-400 whitespace-no-wrap">{user.department}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-slate-500 bg-[#29303a] text-sm">
                                        <span className={` ${user.portfolioDetails?.totalProfit >= 0 ? 'text-green-900' : user.portfolioDetails?.totalProfit < 0 ? 'text-red-900' : 'text-red-900'} relative inline-block px-3 py-1 font-semibold leading-tight`}>
                                            <span aria-hidden className={` ${user.portfolioDetails?.totalProfit >= 0 ? 'bg-green-200' : user.portfolioDetails?.totalProfit < 0 ? 'bg-red-200' : 'bg-red-200'} absolute inset-0  opacity-50 rounded-full`} ></span>
                                            <span className="relative">{user.portfolioDetails?.totalProfit ? user.portfolioDetails?.totalProfit.toFixed(2) : "0"}</span>
                                        </span>
                                    </td>
                                    <td className="px-5 py-5 border-b border-slate-500 bg-[#29303a] text-sm">
                                        <p className="text-slate-200 whitespace-no-wrap">{user.portfolioDetails?.transactions ? user.portfolioDetails?.transactions.length : 0}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-slate-500 bg-[#29303a] text-sm">
                                        {user.isBlocked?<button  onClick={()=>handleBlockButton('unblock', user.userName)} className="cursor-pointer w-fit bg-slate-400 text-slate-900 rounded-2xl relative inline-block px-3 py-1 font-semibold leading-tight">
                                             Unblock
                                        </button>:<button  onClick={()=>handleBlockButton('block', user.userName)} className="cursor-pointer w-fit bg-slate-400 text-slate-900 rounded-2xl relative inline-block px-3 py-1 font-semibold leading-tight">
                                             Block
                                        </button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {dialogOpen && <UserBlockDialog setUsers={setUsers} users={users} userName={userName} setUserName={setUserName} action={action} setDialogOpen={setDialogOpen} />}
            </div>
        </div>
    );
};

export default TableComponentUsers;
