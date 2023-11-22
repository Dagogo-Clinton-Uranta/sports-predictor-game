// component
import SvgColor from '../../../components/svg-color';


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
    path: '/dashboard/football-players',
    icon: icon('student'),
    children:[
      
        {
          title: 'GOAL SCORER',
          path: '/dashboard/football-goalscorers',
          
          icon: icon('teacher'),
        },
        {
          title: 'ASSIST',
          path: '/dashboard/football-assists',
          icon: icon('teacher'),
        },
        {
          title: 'CLEAN SHEET',
          path: '/dashboard/football-cleansheet',
          icon: icon('teacher'),
        },

        {
          title: 'TEAM WIN',
          path: '/dashboard/football-teamwin',
          icon: icon('teacher'),
        },
        
      
    ]
  },
  {
    title: 'NFL',
    path: '/dashboard/football-players',
    icon: icon('student'),
    children:[
      
        {
          title: 'TOUCHDOWN',
          path: '/dashboard/nfl-touchdown',
          
          icon: icon('teacher'),
        },
        {
          title: 'RUSHING YARDS',
          path: '/dashboard/nfl-rushyards',
          icon: icon('teacher'),
        },
        {
          title: 'RECEIVING YARDS',
          path: '/dashboard/nfl-recyards',
          icon: icon('teacher'),
        },
        {
          title: 'TEAM WIN',
          path: '/dashboard/nfl-teamwin',
          icon: icon('teacher'),
        },
      
    ]
  },

  {
    title: 'SETTINGS',
    // path: '/dashboard/settings',
    path: '#',
    icon: icon('settings'),
  },
];

export default navConfig;
