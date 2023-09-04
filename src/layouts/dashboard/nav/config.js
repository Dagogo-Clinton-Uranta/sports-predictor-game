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
    title: 'student',
    path: '/dashboard/students',
    icon: icon('student'),
  },
  {
    title: 'teacher',
    path: '/dashboard/teachers',
    icon: icon('teacher'),
  },

  {
    title: 'reports',
    path: '/dashboard/reports',
    icon: icon('report'),
  },
  {
    title: 'settings',
    // path: '/dashboard/settings',
    path: '#',
    icon: icon('settings'),
  },
];

export default navConfig;
