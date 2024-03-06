import { Grid, Container, Typography, Button, Paper, CircularProgress, Divider, Select, MenuItem, makeStyles, TextField ,TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { fetchCandidateData } from 'src/redux/actions/auth.action';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { fetchMyTransactions } from 'src/redux/actions/transaction.action';
import { getStudents } from 'src/redux/actions/student.action';
import WaitingRoom from 'src/components/patient/waiting-room';
import PatientDetails from 'src/components/patient/patient-details';
import IMG1 from '../assets/images/blood-investigation.png';
import IMG2 from '../assets/images/radiology.png';
import IMG3 from '../assets/images/prescription.png';
import IMG4 from '../assets/images/intervention.png';
import IMG5 from '../assets/images/referrals.png';
import HospitalBed from 'src/components/patient/hospital-bed';
import EmptyPane from 'src/components/patient/empty-pane';
import {refreshCountdown ,getAllPatients,removePatient, refreshWaitdown, enterPatient, reset } from 'src/redux/actions/patient.action';
import { ToastContainer } from 'react-toastify';
import {CSSTransition,TransitionGroup} from 'react-transition-group';


import {submitAssistPrediction,getPremierLeagueTeamPlayers,
  getPremierLeagueTeams,joinCompetition,fetchGoalScorerCompetitionInFocus,
   fetchGoalScorerResultsPerLeague, fetchCleanSheetCompetitionInFocus,
    fetchTeamWinCompetitionInFocus, fetchAssistCompetitionInFocus,
    setLeagueInFocus,
    fetchRangeOfCompetitors,
} from 'src/redux/actions/football.action';


import {
  setThirtyTwoSouth1,
  setThirtyTwoSouth2,
  setThirtyTwoSouth3,
  setThirtyTwoSouth4,
  setThirtyTwoSouth5,
  setThirtyTwoSouth6,
  setThirtyTwoSouth7,
  setThirtyTwoSouth8,
  setSixteenSouth1,
  setSixteenSouth2,
  setSixteenSouth3,
  setSixteenSouth4,
  setEightSouth1,
  setEightSouth2,
  setFourSouth1,
  
  setFinal1,
  setFinal2,
  setWinner,

  setNCAAPredictionsForUser
  
} from 'src/redux/actions/tournamentSouth.action';



import {clearGroupSouth} from 'src/redux/reducers/tournamentSouth.slice';
import {clearGroupMidWest} from 'src/redux/reducers/tournamentMidWest.slice';
import {clearGroupEast} from 'src/redux/reducers/tournamentEast.slice';
import {clearGroupWest} from 'src/redux/reducers/tournamentWest.slice';



import FLOGO from '../assets/images/fLogo.png';
import SALAH from '../assets/images/salah.jpeg';
import BRUNO from '../assets/images/BRUNO.jpeg';
import ALISSON from '../assets/images/ALISSON.jpeg'
import HALAAND from '../assets/images/HAALAND.jpeg'
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import { indexOf } from 'lodash';

import { SingleEliminationBracket, DoubleEliminationBracket, Match, MATCH_STATES, SVGViewer,createTheme } from '@g-loot/react-tournament-brackets';
import useComponentSize from '@rehooks/component-size'

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '50vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(5, 5, 12, 5),
}));


const StyledContent1 = styled('div')(({ theme }) => ({
//  maxWidth: 480,
//  margin: 'auto',
//  minHeight: '50vh',
//  display: 'flex',
//  justifyContent: 'center',
  flexDirection: 'column',
 // padding: theme.spacing(5, 5, 12, 5),
 paddingTop:12,
 paddingBottom:12,
}));


const RespContent = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));


const RespScale = styled('div')(({ theme }) => ({
 

  [theme.breakpoints.up('xl')]: {
    scale:"0.85",
  },

  [theme.breakpoints.down('xl')]: {
    scale:"0.9",
  },


  [theme.breakpoints.down('lg')]: {
    scale:"0.8",
  },
 
  [theme.breakpoints.down('md')]: {
    scale:"0.9",
  },


}));


const RespGrid = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: "repeat(1, 1fr)",
  },

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
}));



const RespJoin = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    height:"25rem"
  },

  [theme.breakpoints.up('md')]: {
    height:"81%"
  },
}));


const RespTourney = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    marginTop:"0rem"
  },

  [theme.breakpoints.up('md')]: {
    marginTop:"-10rem"
  },
}));


const RespShow = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display:"block"
  },

  [theme.breakpoints.up('sm')]: {
    display:"none"
  },
}));


const RespHide = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display:"none"
  },

  [theme.breakpoints.up('sm')]: {
    display:"block"
  },
}));


const RespTitleHide = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display:"none"
  },

  [theme.breakpoints.up('sm')]: {
    display:"flex",
    justifyContent:"space-between"
  },
}));



const WhiteTheme = createTheme({
  textColor: { main: 'white', highlighted: 'black', dark: 'white' },
  matchBackground: { wonColor: '#FAFAFA', lostColor: '#260952' },
  score: {
    background: { wonColor: '#87b2c4', lostColor: '#87b2c4' },
    text: { highlightedWonColor: '#7BF59D', highlightedLostColor: '#FB7E94' },
  },
  border: {
    color: '#CED1F2',
    highlightedColor: '#da96c6',
  },
  roundHeader: { backgroundColor: '#da96c6', fontColor: 'white' },
  connectorColor: '#CED1F2',
  connectorColorHighlight: '#da96c6',
  svgBackground: '#FAFAFA',
  backgroundColor:/*"#f4f0ec"*/'#FAFAFA' 
});



export default function NCAAFinalsPage() {
  const theme = useTheme();
 // const classes = useStyles()

  const navigate = useNavigate();
  const dispatch = useDispatch();



//const goalScorerCompId  = "umhhXlB1kcrXLcu6hYIQ"



const {user} = useSelector((state) => state.auth);
const { premierLeagueTeams,teamPlayersInFocus,isLoading,goalScorerCompetitionInFocus,leagueInFocus,competitorRangeInFocus} = useSelector((state) => state.football);


const dummyData =[
  {userName:"Boomers",playerName:"Furman"},
  {userName:"Kingsmen",playerName:"Alabama"},
  {userName:"Globe Trotters",playerName:"Princeton"},
  {userName:"Marksmen",playerName:"Maryland"},
  
]


const { 
  thirtyTwoSouth1,
  thirtyTwoSouth2,
  thirtyTwoSouth3,
  thirtyTwoSouth4,
  thirtyTwoSouth5,
  thirtyTwoSouth6,
  thirtyTwoSouth7,
  thirtyTwoSouth8,

  sixteenSouth1,
  sixteenSouth2,
  sixteenSouth3,
  sixteenSouth4,

  eightSouth1,
  eightSouth2,

  fourSouth1,
  final1,
  final2,
  winner
 
} = useSelector((state) => state.tournamentSouth);

const {
  

    thirtyTwoEast1,
    thirtyTwoEast2,
    thirtyTwoEast3,
    thirtyTwoEast4,
    thirtyTwoEast5,
    thirtyTwoEast6,
    thirtyTwoEast7,
    thirtyTwoEast8,
  
    sixteenEast1,
    sixteenEast2,
    sixteenEast3,
    sixteenEast4,
  
    eightEast1,
    eightEast2,
  
    
     fourEast1

}= useSelector((state) => state.tournamentEast);



const {
  
  
    thirtyTwoWest1,
    thirtyTwoWest2,
    thirtyTwoWest3,
    thirtyTwoWest4,
    thirtyTwoWest5,
    thirtyTwoWest6,
    thirtyTwoWest7,
    thirtyTwoWest8,
  
    sixteenWest1,
    sixteenWest2,
    sixteenWest3,
    sixteenWest4,
  
    eightWest1,
    eightWest2,
  
    
     fourWest1


    }= useSelector((state) => state.tournamentWest);


const {
  
  thirtyTwoMidWest1,
  thirtyTwoMidWest2,
  thirtyTwoMidWest3,
  thirtyTwoMidWest4,
  thirtyTwoMidWest5,
  thirtyTwoMidWest6,
  thirtyTwoMidWest7,
  thirtyTwoMidWest8,

  sixteenMidWest1,
  sixteenMidWest2,
  sixteenMidWest3,
  sixteenMidWest4,

  eightMidWest1,
  eightMidWest2,

  
   fourMidWest1

}= useSelector((state) => state.tournamentMidWest);

const movetoFinal  =() =>{
  if(!(fourEast1.length &&fourMidWest1.length && fourSouth1.length && fourWest1.length)){
    notifyErrorFxn("Please make finals predictions for all regions first!")
  }else{
    navigate('/dashboard/ncaa-finals')
  }
}


console.log("OUR COMPETITOR RANGE IS--->",competitorRangeInFocus)

/*console.log("OUR LEAGUE IN FOCUS IS-->",leagueInFocus)*/

useEffect(()=>{

  if(user && !user.Leagues ||user && user.Leagues &&  user.Leagues.length === 0){
    navigate('/dashboard/entry')
  }
   },[user])


  

const [leagueTeams,setLeagueTeams] =  useState(premierLeagueTeams && premierLeagueTeams.length > 0? premierLeagueTeams:[])
const [teamPlayers,setTeamPlayers] =  useState([])
const [chosenPlayer,setChosenPlayer] = useState({}) 
const [chosenTeam,setChosenTeam] = useState('')
const [loading,setLoading] = useState(false)

const [waiting,setWaiting] =  useState(false)

 const [joined,setJoined] =  useState(true)
 const [eliminated,setEliminated] =  useState(false)
 const [goalScorerCompId,setGoalScorerCompId] = useState(goalScorerCompetitionInFocus?goalScorerCompetitionInFocus.id:"umhhXlB1kcrXLcu6hYIQ")





 useEffect(()=>{
 
  dispatch(fetchRangeOfCompetitors(16,32,"south"))
 
},[user,leagueInFocus])


 useEffect(()=>{
 
  dispatch(fetchRangeOfCompetitors(16,32,"south"))
 
},[user,leagueInFocus])



 const getPremierLeagueTeamPlayersForGoalScorers = (teamId) =>{
  
  dispatch(getPremierLeagueTeamPlayers(teamId))
 
  console.log("TEAMS PLAYERS --->",teamPlayersInFocus)
}

const submitThisAssistPrediction = (prediction,compId,leagueId)=>{
if((!prediction||!prediction.hasOwnProperty("name")|| (!prediction.hasOwnProperty("userId")) ||(!prediction.hasOwnProperty("teamName")))){
notifyErrorFxn("Please select a player before submitting!")
 return
}else{

  dispatch(fetchGoalScorerCompetitionInFocus(user && user.Leagues &&  user.Leagues.length && leagueInFocus.leagueCode))
  setLoading(true)

setTimeout(()=>{ 
  dispatch(submitAssistPrediction(prediction,compId,leagueId,goalScorerCompetitionInFocus.gameWeekStarted,goalScorerCompetitionInFocus.isOpen,user.pastGoalScorerSelections))
  setLoading(false)
}
  ,1300)

}
}

const joinLeague = (compId,userId,accountBalance) => {

  if(user && user.eliminatedCompetitions && user.eliminatedCompetitions.includes(goalScorerCompetitionInFocus && goalScorerCompetitionInFocus.id) ){
 notifyErrorFxn("you have been eliminated from this competition, you cannot join")
  }else{
  dispatch(joinCompetition(compId,userId,accountBalance))
  }
}



const loadAndNavigate = ()=>{

  if(user && user.competitions && user.competitions.includes(goalScorerCompetitionInFocus && goalScorerCompetitionInFocus.id)){
    
    dispatch(fetchGoalScorerResultsPerLeague(user && user.Leagues &&  user.Leagues.length && leagueInFocus.leagueCode))
    setWaiting(true)

   setTimeout( ()=>(navigate('/dashboard/football-goalscorers-results')),1800)
  
   
  }
 }



 const matches =  
 [  

  {
    "id": 260002,
    "name": "Round of 16",
    "nextMatchId": 260003, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
    "tournamentRoundText": "4", // Text for Round Header
    "startTime": "2021-05-30",
    "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
    "participants": [
      {
        "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc", // Unique identifier of any kind
        "resultText": "WON", // Any string works
        "isWinner": false,
        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
        "name": "giacomo123"
      },
      {
        "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
        "resultText": null,
        "isWinner": true,
        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
        "name": "Ant"
      }
    ]
  },

  {
    "id": 260003,
    "name": "Quarter-Final",
    "nextMatchId": 260004, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
    "tournamentRoundText": "3", // Text for Round Header
    "startTime": "2021-05-30",
    "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
    "participants": [
      {
        "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc", // Unique identifier of any kind
        "resultText": "WON", // Any string works
        "isWinner": false,
        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
        "name": "giacomo123"
      },
      {
        "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
        "resultText": null,
        "isWinner": true,
        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
        "name": "Ant"
      }
    ]
  },
  {
    "id": 260003,
    "name": "Quarter-Final",
    "nextMatchId": 260004, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
    "tournamentRoundText": "2", // Text for Round Header
    "startTime": "2021-05-30",
    "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
    "participants": [
      {
        "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc", // Unique identifier of any kind
        "resultText": "WON", // Any string works
        "isWinner": false,
        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
        "name": "giacomo123"
      },
      {
        "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
        "resultText": null,
        "isWinner": true,
        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
        "name": "Ant"
      }
    ]
  },
  {
    "id": 260003,
    "name": "Quarter-Final",
    "nextMatchId": 260004, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
    "tournamentRoundText": "2", // Text for Round Header
    "startTime": "2021-05-30",
    "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
    "participants": [
      {
        "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc", // Unique identifier of any kind
        "resultText": "WON", // Any string works
        "isWinner": false,
        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
        "name": "giacomo123"
      },
      {
        "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
        "resultText": null,
        "isWinner": true,
        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
        "name": "Ant"
      }
    ]
  },
  {
    "id": 260003,
    "name": "Quarter-Final",
    "nextMatchId": 260004, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
    "tournamentRoundText": "2", // Text for Round Header
    "startTime": "2021-05-30",
    "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
    "participants": [
      {
        "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc", // Unique identifier of any kind
        "resultText": "WON", // Any string works
        "isWinner": false,
        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
        "name": "giacomo123"
      },
      {
        "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
        "resultText": null,
        "isWinner": true,
        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
        "name": "Ant"
      }
    ]
  },
  {
    "id": 260004,
    "name": "Semi-Final",
    "nextMatchId": 260005, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
    "tournamentRoundText": "3", // Text for Round Header
    "startTime": "2021-05-30",
    "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
    "participants": [
      {
        "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc", // Unique identifier of any kind
        "resultText": "WON", // Any string works
        "isWinner": false,
        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
        "name": "giacomo123"
      },
      {
        "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
        "resultText": null,
        "isWinner": true,
        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
        "name": "Ant"
      }
    ]
  },
  {
    "id": 260004,
    "name": "Semi-Final",
    "nextMatchId": 260005, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
    "tournamentRoundText": "3", // Text for Round Header
    "startTime": "2021-05-30",
    "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
    "participants": [
      {
        "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc", // Unique identifier of any kind
        "resultText": "WON", // Any string works
        "isWinner": false,
        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
        "name": "giacomo123"
      },
      {
        "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
        "resultText": null,
        "isWinner": true,
        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
        "name": "Ant"
      }
    ]
  },
  {
    "id": 260004,
    "name": "Semi-Final",
    "nextMatchId": 26005, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
    "tournamentRoundText": "4", // Text for Round Header
    "startTime": "2021-05-30",
    "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
    "participants": [
      {
        "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc", // Unique identifier of any kind
        "resultText": "WON", // Any string works
        "isWinner": false,
        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
        "name": "giacomo123"
      },
      {
        "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
        "resultText": null,
        "isWinner": true,
        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
        "name": "Ant"
      }
    ]
  },
 
  {
    "id": 260005,
    "name": "Final - Match",
    "nextMatchId": null, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
    "tournamentRoundText": "4", // Text for Round Header
    "startTime": "2021-05-30",
    "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
    "participants": [
      {
        "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc", // Unique identifier of any kind
        "resultText": "WON", // Any string works
        "isWinner": false,
        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
        "name": "giacomo123"
      },
      {
        "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
        "resultText": null,
        "isWinner": true,
        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
        "name": "Ant"
      }
    ]
  }

]


let ref = useRef(null)
let size = useComponentSize(ref)
let { width, height } = size


const predictionObject = {
 userId:user && user.id,
 roundof32Predictions:[ thirtyTwoSouth1,
  thirtyTwoSouth2,
  thirtyTwoSouth3,
  thirtyTwoSouth4,
  thirtyTwoSouth5,
  thirtyTwoSouth6,
  thirtyTwoSouth7,
  thirtyTwoSouth8,
  
  thirtyTwoMidWest1,
  thirtyTwoMidWest2,
  thirtyTwoMidWest3,
  thirtyTwoMidWest4,
  thirtyTwoMidWest5,
  thirtyTwoMidWest6,
  thirtyTwoMidWest7,
  thirtyTwoMidWest8,

  thirtyTwoWest1,
  thirtyTwoWest2,
  thirtyTwoWest3,
  thirtyTwoWest4,
  thirtyTwoWest5,
  thirtyTwoWest6,
  thirtyTwoWest7,
  thirtyTwoWest8,

  thirtyTwoEast1,
  thirtyTwoEast2,
  thirtyTwoEast3,
  thirtyTwoEast4,
  thirtyTwoEast5,
  thirtyTwoEast6,
  thirtyTwoEast7,
  thirtyTwoEast8,
],

 roundOf16Predictions:[
  
  sixteenMidWest1,
  sixteenMidWest2,
  sixteenMidWest3,
  sixteenMidWest4,

  sixteenEast1,
  sixteenEast2,
  sixteenEast3,
  sixteenEast4,

  sixteenWest1,
  sixteenWest2,
  sixteenWest3,
  sixteenWest4,

  sixteenSouth1,
  sixteenSouth2,
  sixteenSouth3,
  sixteenSouth4,

 ],
 eliteEightPredictions:[

  eightMidWest1,
  eightMidWest2,

  eightWest1,
  eightWest2,

  eightEast1,
  eightEast2,

  eightSouth1,
  eightSouth2,

 ],
  eastWinner:fourEast1,
  southWinner:fourSouth1,
  midWestWinner:fourMidWest1,
  westWinner:fourWest1,
  
  finalist1:final1,
  finalist2:final2,
 
  overallWinner:winner
}

useEffect(()=>{

  if( !fourEast1 || !fourWest1 || !fourMidWest1 || !fourSouth1  ){ 
  navigate("/dashboard/ncaa-south")
  }


},[])


const NCAAcompId = "QHzOAVhAtGN3SmqnBwVX"


const sendNCAAPredictions = (userId,predictionObject,navigate) => {
 let compId  = NCAAcompId

  if( !final1 || !final2 || !winner || !fourEast1 || !fourWest1 || !fourMidWest1 || !fourSouth1  ){ 
    notifyErrorFxn("Please make sure all predicitions have been selected before submitting!")
    return
  }
  else{
    dispatch(setNCAAPredictionsForUser(userId,compId,predictionObject,navigate))
  }
  }


const callFinal1 =  (entry)=>{ dispatch(setFinal1(entry))}
const callFinal2 =  (entry)=>{ dispatch(setFinal2(entry))}
const callWinner =  (entry)=>{ dispatch(setWinner(entry))}

const resetAllRoundsPrediction = ()=> {
  if(window.confirm("Confirm Selection Reset?")){

    dispatch(clearGroupEast())
    dispatch(clearGroupMidWest())
    dispatch(clearGroupSouth())
    dispatch(clearGroupWest())

  }
}


  return (
    <>
      <Container maxWidth="xl" sx={{ marginTop:"5%" }}>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        { <RespContent  style={{ display:'flex',  marginTop: '5%',gap:"1rem", marginBottom: '5%'}}>

<Container  ref={ref} style={{display: 'flex', justifyContent: 'flex-start',alignItems:"flex-start",flexDirection:"column",flex:4, border: '1px solid #0000001A', paddingTop: '2%', paddingBottom: '2%',marginTop: '2%', marginBottom: '2%', borderRadius: '15px',backgroundColor:/*"#f4f0ec"*/'#FAFAFA' }}>
    


<Divider style={{width:"100%",position:"relative",top:"2rem"}}/>

     <div style={{display:"flex", justifyContent:"flex-start",flexDirection:"column"}}>
      <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,cursor:"pointer"}}>
          FINALS
        </Typography>

      
    </div>
       
       
    <RespScale style={{display:"flex",flexDirection:"row",justifyContent:"space-between",gap:"0.5rem",alignItems:"center",width:"100%"}}>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",color:"white",backgroundColor:"#260448", height:"2.5rem",width:"6.5rem",borderRadius:"5%"}} >
              SEMIFINAL
              
               </div>


               <div style={{display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",color:"white",backgroundColor:"#260448", height:"2.5rem",width:"6.5rem",borderRadius:"5%"}} >
               FINAL
               </div>


               <div style={{display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",color:"white",backgroundColor:"#260448", height:"2.5rem",width:"6.5rem",borderRadius:"5%"}} >
               SEMIFINAL
               </div>

             
      </RespScale>

  
       <RespTourney style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"100%",height:"100%",overflow:"hidden",}}>
        {/*<SingleEliminationBracket
          theme={WhiteTheme}
           matches={matches}
           
           matchComponent={Match}
           svgWrapper={({ children, ...props }) => (
            <SVGViewer 
            width={width-50} 
            height={height-10}
             {...props}>
              {children}
            </SVGViewer>
          )}

          
           />*/}

             

                   



  
<RespScale style={{display:"flex",flex:"1",justifyContent:"space-evenly",flexDirection:"column",alignItems:"center",height:"100%",fontSize:"12px",}}>  
   
   <div onClick={()=>{callFinal1(fourSouth1)}}
    style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[0] &&competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[0].eliteEight === "lost" ?"grey":"#260448", height:"3rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"-2.5rem"}} >
   {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[0] &&competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[0].name */}
   {fourSouth1}
   </div>


   <div onClick={()=>{callFinal1(fourEast1)}}
   style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[1] &&competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[1].eliteEight === "lost" ?"grey":"#260448", height:"3rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"2.5rem"}} >
   {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[1] &&competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[1].name */}
   {fourEast1}
    </div>




</RespScale>


<RespScale style={{display:"flex",flexDirection:"column",flex:"1",display:"flex",justifyContent:"space-evenly",alignItems:"center",height:"100%",fontSize:"12px",}}>  
           
           <div onClick={()=>{callWinner(final1)}}
           style={{cursor:"pointer",color:"white",backgroundColor:"#260448", height:"4rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%"}} >
           {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.eliteEight && item.eliteEight === 'won'))[0] &&competitorRangeInFocus.filter((item)=>(item.eliteEight && item.eliteEight === 'won'))[0].name */}
           {final1}
           </div>
        </RespScale>


<RespScale style={{display:"flex",flexDirection:"column",flex:"1",display:"flex",justifyContent:"space-evenly",alignItems:"center",height:"100%",fontSize:"16px",}}>  
           
           <div style={{cursor:"pointer",color:"white",backgroundColor:"#260448", height:"7rem",width:"9rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%"}} >
           {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.eliteEight && item.eliteEight === 'won'))[0] &&competitorRangeInFocus.filter((item)=>(item.eliteEight && item.eliteEight === 'won'))[0].name */}
           {winner}
           </div>
        </RespScale>


        <RespScale style={{display:"flex",flexDirection:"column",flex:"1",display:"flex",justifyContent:"space-evenly",alignItems:"center",height:"100%",fontSize:"12px",}}>  
           
           <div onClick={()=>{callWinner(final2)}}
            style={{cursor:"pointer",color:"white",backgroundColor:"#260448", height:"4rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%"}} >
           {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.eliteEight && item.eliteEight === 'won'))[0] &&competitorRangeInFocus.filter((item)=>(item.eliteEight && item.eliteEight === 'won'))[0].name */}
           {final2}
           </div>
        </RespScale>

          
<RespScale style={{display:"flex",flex:"1",justifyContent:"space-evenly",flexDirection:"column",alignItems:"center",height:"100%",fontSize:"12px",}}>  
   
   <div onClick={()=>{callFinal2(fourWest1)}}
    style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[0] &&competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[0].eliteEight === "lost" ?"grey":"#260448", height:"3rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"-2.5rem"}} >
   {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[0] &&competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[0].name */}
   {fourWest1}
   </div>


   <div onClick={()=>{callFinal2(fourMidWest1)}}
   style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[1] &&competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[1].eliteEight === "lost" ?"grey":"#260448", height:"3rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"2.5rem"}} >
   {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[1] &&competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[1].name */}
   {fourMidWest1}
    </div>




</RespScale>



         
  </RespTourney>
 
    

      {/* <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider> */}
 
  </Container>

  {/*========================================================================== IF THEY ARE PART OF THIS LEAGUE  \/  =========================================================== */}

<>
    
   
    
   

   
      { 
      
      <Container   style={{display: 'flex',flexDirection:"column", justifyContent: 'flex-start',flex:2, border: '1px solid #0000001A',   marginTop: '2%', marginBottom: '2%', borderRadius: '15px',backgroundColor:"#FAFAFA" }}>    
     
      
     <h4>March Madness</h4>
     
     <div style={{display:"flex", justifyContent:"space-between"}}>
      <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,cursor:"pointer",}}>
          PREDICT
        </Typography>

        <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,color:"lightgrey",cursor:"pointer",}} onClick={()=>{ /*loadAndNavigate()*/ } }>
        { waiting?"loading..":'RESULTS' }
        </Typography>
    </div>
        <Divider/>

   <div style={{marginTop:"3rem",marginBottom:"5rem",width:"100%",display: 'flex',flexDirection:"column", justifyContent: 'flex-start',gap:"2rem"}}>

        <div style={{marginTop:"0rem",width:"100%"}}>
      <Button onClick={()=>{navigate('/dashboard/ncaa-south')}}  style={{width:"100%",backgroundColor: '#260952',height:"4rem" ,color:'white'}}>
            { "SOUTH"}
            </Button>
      </div>


  
        <div style={{marginTop:"0rem",width:"100%"}}>
      <Button onClick={()=>{navigate('/dashboard/ncaa-midwest')}}  style={{width:"100%",backgroundColor: '#260952',height:"4rem" ,color:'white'}}>
            { "MIDWEST"}
            </Button>
      </div>



        <div style={{marginTop:"0rem",width:"100%"}}>
      <Button onClick={()=>{navigate('/dashboard/ncaa-east')}}  style={{width:"100%",backgroundColor: '#260952',height:"4rem" ,color:'white'}}>
            { "EAST"}
            </Button>
      </div>




      <div style={{marginTop:"0rem",width:"100%"}}>
      <Button onClick={()=>{navigate('/dashboard/ncaa-west')}}  style={{width:"100%",backgroundColor: '#260952',height:"4rem" ,color:'white'}}>
            { "WEST"}
            </Button>
      </div>


      <div style={{marginTop:"0rem",width:"100%"}}>
      <Button onClick={()=>{resetAllRoundsPrediction()}}  style={{width:"100%",backgroundColor: '#260952',height:"4rem" ,color:'white'}}>
            { "RESET"}
            </Button>
      </div>
  </div>

     
   
  <div style={{backgroundColor:'#F4F4F4', height:"2rem",color:"#260448",fontWeight:"bolder",display:"flex",justifyContent:"center",alignItems:"center"}}>SELECTIONS</div>
  


      {/*<TextField
            style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%",marginBottom:"1rem"}}
            fullWidth
            placeholder= "select a team or player"
            variant="outlined"
            multiline
            maxRows={2}
            value= {fourSouth1}
            disabled
           
            
      />*/}



            <Button onClick={()=>{sendNCAAPredictions(user.id,predictionObject,navigate)}}  style={{backgroundColor: '#260952',height:"4rem" ,color:'white',marginBottom:"6rem" }}>
            { loading?"Loading":"SUBMIT"}
            </Button>

     </Container>
    }



{/*========================================================================== IF THEY ARE PART OF THIS COMPETITION  /\  =========================================================== */}


{/*========================================================================== IF THEY ARE NOT PART OF THIS COMPETITION \/ =========================================================== */}




{/*(user && user.competitions && user.competitions.includes(goalScorerCompetitionInFocus && goalScorerCompetitionInFocus.id))   &&
      
      <Container   style={{display: 'flex',flexDirection:"column", justifyContent: 'space-between',flex:2, border: '1px solid #0000001A',   marginTop: '2%', marginBottom: '2%', borderRadius: '15px',backgroundColor:"#FAFAFA" }}>    

   <h4>FOOTBALL &nbsp; - &nbsp; Goal Scorer</h4>

     <div style={{display:"flex", justifyContent:"space-between"}}>
      <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,cursor:"pointer",}}>
          SELECT
        </Typography>

        <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,color:"lightgrey",cursor:"pointer",}} onClick={()=>{}}>
          RESULTS
        </Typography>
    </div>
        <Divider/>


         <RespJoin style={{display:"flex", justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"0.5rem"}}>

        {  goalScorerCompetitionInFocus.hasOwnProperty("compName")?(
           <>
             <div>ENTRY FEE - {goalScorerCompetitionInFocus && goalScorerCompetitionInFocus.entryFee && (goalScorerCompetitionInFocus.entryFee).toLocaleString()} &nbsp; PTS</div>
            <Button onClick={()=>{joinLeague(goalScorerCompId,user.id,user.accountBalance)}}  style={{backgroundColor: '#260952',height:"4rem" ,color:'white',width:"75%"}}>
              JOIN
            </Button>
          </>

         ):(
          !eliminated ?


            <div>NO COMPETITION YET</div>
         :  
         
         <div>ELIMINATED FROM THIS COMPETITION</div>
          

         )
           }

        </RespJoin>

     </Container>
    */}

  
   
  </>


</RespContent>
}
      </Container>
    </>
  );
}
