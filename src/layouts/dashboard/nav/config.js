// component
import SvgColor from '../../../components/svg-color';
import { IoIosAmericanFootball } from "react-icons/io";
import { IoIosFootball } from "react-icons/io";


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
    title: 'SETTINGS',
    // path: '/dashboard/settings',
    path: '#',
    icon: icon('settings'),
  },
];

export default navConfig;
