import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import RegisterPage from './pages/RegisterPage';
import PatientPage from './pages/PatientPage';
import EntryPage from './pages/EntryPage';

import FootballTeamsPage from './pages/FootballTeamWinPage'
import FootballTablePage from './pages/FootballTablePage'

import NFLPlayersPage from './pages/NFLPlayersPage'
import NFLTeamsPage from './pages/NFLTeamsPage'
import FootballGoalScorersPage from './pages/FootballGoalScorersPage';
import FootballAssistsPage from './pages/FootballAssistsPage';
import FootballTeamWinPage from './pages/FootballTeamWinPage';
import FootballCleanSheetPage from './pages/FootballCleanSheetPage';
import FootballGoalScorersStandingsPage from './pages/FootballGoalScorerStandings';
import FootballGoalScorersResultsPage from './pages/FootballGoalScorerResults';
import FootballCleanSheetStandingsPage from './pages/FootballCleanSheetStandings';
import FootballCleanSheetResultsPage from './pages/FootballCleanSheetResults';
import FootballAssistsStandingsPage from './pages/FootballAssistsStandings';
import FootballAssistsResultsPage from './pages/FootballAssistsResults';
import FootballTeamWinStandingsPage from './pages/FootballTeamWinStandings';
import FootballTeamWinResultsPage from './pages/FootballTeamWinResults';
import NFLTeamWinPage from './pages/NFLTeamWinPage';
import NFLTeamWinStandingsPage from './pages/NFLTeamWinStandings';
import NFLTeamWinResultsPage from './pages/NFLTeamWinResults';
import NFLTouchDownsPage from './pages/NFLTouchDownsPage';
import NFLTouchDownStandingsPage from './pages/NFLTouchDownStandings';
import NFLTouchDownResultsPage from './pages/NFLTouchDownResults';
import NFLReceivingYardsPage from './pages/NFLRecYardsPage';
import NFLReceivingYardsStandingsPage from './pages/NFLRecYardsStandings';
import NFLReceivingYardsResultsPage from './pages/NFLRecYardsResults';
import NFLRushingYardsPage from './pages/NFLRushYardsPage';
import NFLRushingYardsStandingsPage from './pages/NFLRushYardsStandings';
import NFLRushingYardsResultsPage from './pages/NFLRushYardsResults';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: 'entry', element:  <EntryPage /> },
        { path: 'home', element:  <FootballGoalScorersPage  /> },

        { path: 'football-teamwin', element:  <FootballTeamWinPage /> },
        { path: 'football-teamwin-standings', element:  <FootballTeamWinStandingsPage /> },
        { path: 'football-teamwin-results', element:  <FootballTeamWinResultsPage /> },
        
        { path: 'football-cleansheet', element:  <FootballCleanSheetPage /> },
        { path: 'football-cleansheet-standings', element:  <FootballCleanSheetStandingsPage /> },
        { path: 'football-cleansheet-results', element:  <FootballCleanSheetResultsPage /> },
       
       
        { path: 'football-goalscorers', element:  <FootballGoalScorersPage /> },
        { path: 'football-goalscorers-standings', element:  <FootballGoalScorersStandingsPage /> },
        { path: 'football-goalscorers-results', element:  <FootballGoalScorersResultsPage /> },

         {path: 'football-assists', element:  <FootballAssistsPage /> },
         {path: 'football-assists-standings', element:  <FootballAssistsStandingsPage /> },
         {path: 'football-assists-results', element:  <FootballAssistsResultsPage /> },

         { path: 'nfl-teamwin', element:  <NFLTeamWinPage /> },
        { path: 'nfl-teamwin-standings', element:  <NFLTeamWinStandingsPage /> },
        { path: 'nfl-teamwin-results', element:  <NFLTeamWinResultsPage /> },

        { path: 'nfl-touchdown', element:  <NFLTouchDownsPage /> },
        { path: 'nfl-touchdown-standings', element:  <NFLTouchDownStandingsPage /> },
        { path: 'nfl-touchdown-results', element:  <NFLTouchDownResultsPage /> },

        { path: 'nfl-recyards', element:  <NFLReceivingYardsPage /> },
        { path: 'nfl-recyards-standings', element:  <NFLReceivingYardsStandingsPage /> },
        { path: 'nfl-recyards-results', element:  <NFLReceivingYardsResultsPage /> },

        { path: 'nfl-rushyards', element:  <NFLRushingYardsPage /> },
        { path: 'nfl-rushyards-standings', element:  <NFLRushingYardsStandingsPage /> },
        { path: 'nfl-rushyards-results', element:  <NFLRushingYardsResultsPage /> },




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
