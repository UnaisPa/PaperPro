
import React, { useState } from 'react';
import Dashboard from '../../pages/admin/Dashboard';
import UserManagement from '../../pages/admin/UserManagement';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { HiMenuAlt1, HiX } from "react-icons/hi";
import ContentManagement from '../../pages/admin/ContentManagement';
import { useSelector } from 'react-redux';
import { FaRegShareSquare } from 'react-icons/fa';
import { GoReport } from 'react-icons/go';
import { BiLogOut } from "react-icons/bi";
import LogoutDialog from '../Dialogs/LogoutDialog';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [openDialog,setOpenDialog] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const [sideBarOpen, setSideBarOpen] = useState(true);
    const handleSideBar = (e) => {
        setSideBarOpen(!sideBarOpen);

    }
    const [selected, setSelected] = useState('Dashboard');

    const menuItems = [
        { name: 'Dashboard', icon: 'home', component: Dashboard },
        { name: 'Users', icon: 'users', component: UserManagement },
        { name: 'Content', icon: 'folder', component: ContentManagement },
        // { name: 'Calendar', icon: 'calendar', component: ContentManagement },
        // { name: 'Documents', icon: 'folder', component: ContentManagement },
        // { name: 'Reports', icon: 'chart-bar', component: ContentManagement },
    ];

    const handleLogout = () =>{

    }
    const icons = {
        home: (
            <svg className="h-6 w-6 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
        ),
        users: (
            <svg className="h-6 w-6 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
        ),
        briefcase: (
            <svg className="h-6 w-6 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
        ),
        calendar: (
            <svg className="h-6 w-6 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
        ),
        folder: (
            <svg className="h-6 w-6 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
            </svg>
        ),
        'chart-bar': (
            <svg className="h-6 w-6 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 17.625 7.5 15l-4.875 4.875M16.5 17.25a4.125 4.125 0 100-8.25 4.125 4.125 0 000 8.25z" />
            </svg>
        ),
    };

    return (
        <div className="h-screen ">
            {sideBarOpen && <div className="flex fixed flex-col h-[100vh] w-64 bg-gray-800 p-4">
                <div className="flex items-center ml-1 mb-6">
                    <p className='text-xl text-primary font-semibold' >Paper pro</p>
                </div>
                <nav className="flex-1">
                    <ul role="list" className="space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={`/admin/${item.name.toLowerCase()}`}
                                    className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${selected === item.name
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        }`}
                                    onClick={() => setSelected(item.name)}
                                >
                                    {icons[item.icon]}
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>}
            <div className={`${sideBarOpen ? 'ml-64' : 'ml-0'} flex-1  `} >
                <div className='cursor-pointer  flex justify-between  m-3'  >{sideBarOpen ? <HiX onClick={handleSideBar} className='hover:opacity-85' color='grey' size={30} /> : <HiMenuAlt1 onClick={handleSideBar} className='hover:opacity-85' color='white' size={30} />}
                    {currentUser?.profilePicture ? <img onClick={() => setIsOpen(!isOpen)} src={currentUser.profilePicture} className='w-8 h-8 rounded-full' /> : <div onClick={() => setIsOpen(!isOpen)} className=' w-8 h-8 rounded-full font-semibold text-black bg-primary text-center py-1' >{currentUser.name.split("")[0]}</div>}
                </div>
                {isOpen && <div className="origin-top-right absolute mr-3 right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {/* <p
                           
                            className="flex px-4 py-2 cursor-pointer text-sm text-gray-300 hover:bg-gray-600 hover:text-gray-200"
                            role="menuitem"
                        >
                           helo
                        </p> */}
                        <p
                            onClick={() => {setOpenDialog(true), setIsOpen(false) }}
                            className="flex px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-gray-200"
                            role="menuitem"
                        >
                            <BiLogOut size={18} className="mr-2" /> Logout
                        </p>
                        
                         {/* <p
                            onClick={() => { setIsOpen(false) }}
                            className="flex px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-gray-200"
                            role="menuitem"
                        >
                            <GoReport size={18} className="mr-2" />Report Post
                        </p> */}
                    </div>
                </div>}
                {openDialog&&<LogoutDialog setOpenDialog={setOpenDialog} />}

                <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path='users' element={<UserManagement />} />
                    <Route path='content' element={<ContentManagement />} />
                    <Route path="/" exact element={<Dashboard />} />

                </Routes>

            </div>
        </div>
    );
};

export default Sidebar;


