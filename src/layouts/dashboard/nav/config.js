// component
import SvgColor from '../../../components/svg-color';
import { IoIosAmericanFootball } from "react-icons/io";
import { IoIosFootball } from "react-icons/io";
import { MdOutlineManageAccounts } from "react-icons/md";

import { AiOutlineUser } from "react-icons/ai";
import { PiCirclesFourDuotone } from "react-icons/pi";

import { FaFlag } from "react-icons/fa6";

// const icon = (name) => <SvgColor src={`/assets/icons/${name}.png`} sx={{ width: 1, height: 1 }} />;
const icon = (name) => <img src={`/assets/icons2/${name}.png`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'HOME',
    path: '/dashboard/football-goalscorers',
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
    title: 'PICK 4',
    path: '/dashboard/pick-four-goalscorers',
    icon: <PiCirclesFourDuotone />,
   
  },
  {
    title: 'PROFILE',
    path: '/dashboard/profile',
    icon: <FaFlag />,
   
  },
 /* {
    title: 'ADMIN',
    path: '/dashboard/admin',
    icon:<MdOutlineManageAccounts />
   
 },*/

  {
    title: 'SETTINGS',
    // path: '/dashboard/settings',
    path: '#',
    icon: icon('settings'),
  },
];

export default navConfig;
