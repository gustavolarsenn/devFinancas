import { FaPlus } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

export const NavbarData = [
    {
        title: 'Home',
        path: '/dashboard',
        icon: <IoHome />  
    },
    {
        title: 'Cadastrar',
        path: '/cadastro',
        icon: <FaPlus />  
    },
    {
        title: 'Histórico',
        path: '/historico',
        icon: <FaHistory />
    },
    {
        title: 'Logout',
        path: '/',
        icon: <IoLogOutOutline />
    },
]