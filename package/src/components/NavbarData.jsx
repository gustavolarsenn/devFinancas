import { FaPlus } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";

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
        path: '/dashboard',
        icon: <FaHistory />
    },
]