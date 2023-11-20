// component
import SvgColor from '../../../components/svg-color';


// const icon = (name) => <SvgColor src={`/assets/icons/${name}.png`} sx={{ width: 1, height: 1 }} />;
const icon = (name) => <img src={`/assets/icons2/${name}.png`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/home',
    icon: icon('dashboard'),
  },
  {
    title: 'competitions',
    path: '/dashboard/football-players',
    icon: icon('student'),
    children:[
      
        {
          title: 'goal scorer',
          //path: '/dashboard/football-teams',
          path: '#',
          icon: icon('teacher'),
        },
        {
          title: 'assists',
          path: '/dashboard/football-table',
          icon: icon('teacher'),
        },
        {
          title: 'penalty',
          path: '/dashboard/nfl-teams',
          icon: icon('teacher'),
        },
        {
          title: 'clean sheet',
          path: '/dashboard/nfl-players',
          icon: icon('teacher'),
        },
      
    ]
  },

  {
    title: 'settings',
    // path: '/dashboard/settings',
    path: '#',
    icon: icon('settings'),
  },
];

export default navConfig;
