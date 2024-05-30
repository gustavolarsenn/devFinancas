import { FaPlus } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import axios from 'axios';

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
        onClick: async () => {
            try {
              await axios.get('http://localhost:8000/logout', { withCredentials: true });
              console.log('Logged out successfully!');
              // Optionally, you can also clear any user data from your app's state or localStorage here.
            } catch (error) {
              console.error('Failed to log out:', error);
            }
          },
        path: '/',
        icon: <IoLogOutOutline />,
    },
]