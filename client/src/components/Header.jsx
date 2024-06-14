import React, { useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import { useNavigate, useLocation } from "react-router-dom";
import { BiSolidUserCircle } from "react-icons/bi";
import { useSelector,useDispatch } from "react-redux"
import { GrChat } from "react-icons/gr";
import io from 'socket.io-client';
import { toast } from "react-toastify";
import { Badge } from "@mui/material";
const socket = io('https://paperpro.site');
// const socket = io('http://localhost:5001');

import { incrementUnreadCount,setUnreadCount } from "../redux/chatSlice";

export default function Header({fromChat}) {
    const dispatch = useDispatch()
    const {unreadCount} = useSelector((state)=>state.chat);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const history = useNavigate();
    const location = useLocation();

    const { currentUser } = useSelector((state) => state.user)
    const menuItems = [
        { label: "Home", path: "/" },
        { label: "Portfolio", path: "/portfolio" },
        { label: "News", path: "/news" },
        { label: "Stocks", path: '/stocks' },
        { label: "Tutorial", path: '/tutorial' },
        { label: "Chat", path: '/chat' }
    ];

    useEffect(() => {
        if(socket){
            socket.emit('initial',currentUser._id);
            
            socket.on('connection', () => {
                console.log('Connected to server');
            });
    
            socket.on('disconnect', () => {
                console.log('Disconnected from server');
            });
        }
        

        return () => {
            socket.off('connection');
            socket.off('disconnect');
        };
    }, []);

    //getNotification
    if(!fromChat){
        useEffect(() => {
            if (socket) {
                socket.on('unreadCount', (count) => {
                    //toast.success(count)
                    dispatch(incrementUnreadCount(count));
                });
            }
            // Cleanup the event listener on component unmount
            return () => {
                socket.off('unreadCount');
            };
        }, [socket]);
    }

    if(fromChat){
        dispatch(setUnreadCount());
    }
    

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarBrand onClick={() => history('/')} >
                    <h5 className='text-primary w-fit cursor-pointer md:pl-20 font-semibold text-2xl hover:text-[#a6d752]'>Paper pro</h5>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-10" justify="center">
                {menuItems.map((item, index) => (
                    <NavbarItem key={index} isActive={location.pathname === item.path}>
                        <Link className={location.pathname === item.path ? "text-primary font-semibold text-sm cursor-pointer" : "text-secondary cursor-pointer text-sm"} onClick={() => history(item.path)}>
                            {item.label == 'Chat' ? <Badge badgeContent={!fromChat?unreadCount:0} color="primary">
                                <GrChat className="mt-2" color="action" />
                            </Badge> : item.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify="end">
                {/* <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem> */}
                <NavbarItem>
                    {/* <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button> */}
                    <div onClick={() => history('/profile')} className="flex cursor-pointer">

                        {currentUser?.profilePicture ? <img className="w-8 h-8 rounded-full" src={currentUser?.profilePicture} /> : <BiSolidUserCircle size={30} className="text-primary" />}
                        <p className="text-secondary text-sm ml-2 my-auto">{currentUser.name.split(' ')[0]}</p>

                    </div>
                </NavbarItem>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden text-white"
                />
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item.label}-${index}`}>
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            onClick={() => history(item.path)}
                            size="lg"
                        >
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
