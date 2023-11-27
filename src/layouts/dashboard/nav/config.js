// component
import SvgColor from '../../../components/svg-color';
import { IoIosAmericanFootball } from "react-icons/io";
import { IoIosFootball } from "react-icons/io";
import { MdOutlineManageAccounts } from "react-icons/md";

import { AiOutlineUser } from "react-icons/ai";


// const icon = (name) => <SvgColor src={`/assets/icons/${name}.png`} sx={{ width: 1, height: 1 }} />;
const icon = (name) => <img src={`/assets/icons2/${name}.png`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'HOME',
    path: '/dashboard/home',
    icon: icon('dashboard'),
  },
  {
    title: 'FOOTBALL',
    path: '/dashboard/football-goalscorers',
    icon: <IoIosFootball />,
    
  },
  {
    title: 'NFL',
    path: '/dashboard/nfl-touchdown',
    icon: <IoIosAmericanFootball />,
   
  },
  {
    title: 'PROFILE',
    path: '/dashboard/profile',
    icon: <AiOutlineUser />,
   
  },
  {
    title: 'ADMIN',
    path: '/dashboard/admin',
    icon:<MdOutlineManageAccounts />
   
  },

  {
    title: 'SETTINGS',
    // path: '/dashboard/settings',
    path: '#',
    icon: icon('settings'),
  },
];

export default navConfig;
