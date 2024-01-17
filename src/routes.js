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
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import PickFourTeamWinPage from './pages/PickFourTeamWinPage';
import PickFourTeamWinStandingsPage from './pages/PickFourTeamWinStandings';
import PickFourTeamWinResultsPage from './pages/PickFourTeamWinResults';
import PickFourCleanSheetPage from './pages/PickFourCleanSheetPage';
import PickFourCleanSheetStandingsPage from './pages/PickFourCleanSheetStandings';
import PickFourCleanSheetResultsPage from './pages/PickFourCleanSheetResults';
import PickFourGoalScorersPage from './pages/PickFourGoalScorersPage';
import PickFourGoalScorersStandingsPage from './pages/PickGoalScorerStandings';
import PickFourGoalScorersResultsPage from './pages/PickFourGoalScorerResults';
import PickFourAssistsPage from './pages/PickFourAssistsPage';
import PickFourAssistsStandingsPage from './pages/PickFourAssistsStandings';
import PickFourAssistsResultsPage from './pages/PickFourAssistsResults';
import CreateLeaguePage from './pages/CreateLeaguePage';
import NCAASouthPage from './pages/NCAASouthPage';
import NCAAWestPage from './pages/NCAAWestPage';
import NCAAMidWestPage from './pages/NCAAMidWestPage';
import NCAAEastPage from './pages/NCAAEastPage';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },

        { path: 'entry',
        element:  <EntryPage /> },

        { path: 'create-league',
        element:  <CreateLeaguePage /> },
       
        { path: 'home', element:  <FootballGoalScorersPage   /> },


        { path: 'ncaa-south', element:  <NCAASouthPage /> },
        { path: 'ncaa-west', element:  <NCAAWestPage /> },
        { path: 'ncaa-midwest', element:  <NCAAMidWestPage /> },
        { path: 'ncaa-east', element:  <NCAAEastPage /> },


        /*PICK FOUR  --- */
        { path: 'pick-four-teamwin', element:  <PickFourTeamWinPage /> },
        { path: 'pick-four-teamwin-standings', element:  <PickFourTeamWinStandingsPage /> },
        { path: 'pick-four-teamwin-results', element:  <PickFourTeamWinResultsPage /> },
        
        { path: 'pick-four-cleansheet', element:  <PickFourCleanSheetPage /> },
        { path: 'pick-four-cleansheet-standings', element:  <PickFourCleanSheetStandingsPage /> },
        { path: 'pick-four-cleansheet-results', element:  <PickFourCleanSheetResultsPage /> },
       
       
        { path: 'pick-four-goalscorers', element:  <PickFourGoalScorersPage /> },
        { path: 'pick-four-goalscorers-standings', element:  <PickFourGoalScorersStandingsPage /> },
        { path: 'pick-four-goalscorers-results', element:  <PickFourGoalScorersResultsPage /> },

         {path: 'pick-four-assists', element:  <PickFourAssistsPage /> },
         {path: 'pick-four-assists-standings', element:  <PickFourAssistsStandingsPage /> },
         {path: 'pick-four-assists-results', element:  <PickFourAssistsResultsPage /> },

         /*PICK FOUR  END--- */


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


        { path: 'profile', element:  <ProfilePage /> },
        { path: 'admin', element:  <AdminPage /> },


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
