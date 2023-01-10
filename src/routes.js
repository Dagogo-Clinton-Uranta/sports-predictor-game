import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import HomePage from './pages/HomePage';
import CoolersPage from './pages/CoolersPage';
import MyCoolersPage from './pages/MyCoolersPage';
import PublicCoolerPage from './pages/PublicCoolerPage';
import PrivateCoolerPage from './pages/PrivateCoolerPage';
import MembersPage from './pages/MembersPage';
import CreateCoolerPage from './pages/CreateCoolerPage';
import PublicCoolerJoin from './pages/PublicCoolerJoin';
import PrivateCoolerJoin from './pages/PrivateCoolerJoin';
import RegisterPage from './pages/RegisterPage';


export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: 'home', element: <HomePage /> },
        { path: 'cooler', element: <CoolersPage /> },
        { path: 'my-cooler', element: <MyCoolersPage /> },
        { path: 'public-cooler', element: <PublicCoolerPage /> },
        { path: 'private-cooler', element: <PrivateCoolerPage /> },
        { path: 'members', element: <MembersPage /> },
        { path: 'join-public-cooler', element: <PublicCoolerJoin /> },
        { path: 'join-private-cooler', element: <PrivateCoolerJoin /> },
        { path: 'create-cooler', element: <CreateCoolerPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        // { element: <Navigate to="/dashboard/home" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
