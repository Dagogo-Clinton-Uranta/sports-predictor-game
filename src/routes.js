import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import RegisterPage from './pages/RegisterPage';
import PatientPage from './pages/PatientPage';
import EntryPage from './pages/EntryPage';

import FootballTeamsPage from './pages/FootballTeamsPage'
import FootballTablePage from './pages/FootballTablePage'

import NFLPlayersPage from './pages/NFLPlayersPage'
import NFLTeamsPage from './pages/NFLTeamsPage'
import FootballPlayersPage from './pages/FootballPlayersPage';


export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: 'entry', element:  <EntryPage /> },
        { path: 'home', element:  <FootballTeamsPage /> },
        { path: 'football-teams', element:  <FootballTeamsPage /> },
        { path: 'football-players', element:  <FootballPlayersPage /> },
        { path: 'nfl-teams', element:  <NFLTeamsPage /> },
        { path: 'nfl-players', element:  <NFLPlayersPage /> },
        { path: 'football-table', element:  <PatientPage /> },
        { path: 'patient', element: <PatientPage /> },
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
        { element: <Navigate to="/dashboard/home" />, index: true },
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
