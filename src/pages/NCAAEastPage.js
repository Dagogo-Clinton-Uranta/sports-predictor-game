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
  setThirtyTwoEast1,
  setThirtyTwoEast2,
  setThirtyTwoEast3,
  setThirtyTwoEast4,
  setThirtyTwoEast5,
  setThirtyTwoEast6,
  setThirtyTwoEast7,
  setThirtyTwoEast8,
  setSixteenEast1,
  setSixteenEast2,
  setSixteenEast3,
  setSixteenEast4,
  setEightEast1,
  setEightEast2,
  setFourEast1
  
} from 'src/redux/actions/tournamentEast.action';




import FLOGO from '../assets/images/fLogo.png';
import SALAH from '../assets/images/salah.jpeg';
import BRUNO from '../assets/images/BRUNO.jpeg';
import ALISSON from '../assets/images/ALISSON.jpeg'
import HALAAND from '../assets/images/HAALAND.jpeg'
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import { indexOf } from 'lodash';

import { SingleEliminationBracket, DoubleEliminationBracket, Match, MATCH_STATES, SVGViewer,createTheme } from '@g-loot/react-tournament-brackets';
import useComponentSize from '@rehooks/component-size'
import { clearGroupEast } from 'src/redux/reducers/tournamentEast.slice';
import { clearGroupMidWest } from 'src/redux/reducers/tournamentMidWest.slice';
import { clearGroupSouth } from 'src/redux/reducers/tournamentSouth.slice';
import { clearGroupWest } from 'src/redux/reducers/tournamentWest.slice';

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



export default function NCAAEastPage() {
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
 
} = useSelector((state) => state.tournamentEast);


const {fourMidWest1}= useSelector((state) => state.tournamentMidWest);
const {fourWest1}= useSelector((state) => state.tournamentWest);
const {fourSouth1}= useSelector((state) => state.tournamentSouth);

const moveToFinal  =() =>{
  if(!(fourEast1.length &&fourMidWest1.length && fourSouth1.length && fourWest1.length)){
    notifyErrorFxn("Please make finals predictions for all regions first!")
  }else{
    navigate('/dashboard/ncaa-finals')
  }
}

const callThirtyTwoEast1 = (entry)=>{ dispatch(setThirtyTwoEast1(entry))}
const callThirtyTwoEast2 = (entry)=>{ dispatch(setThirtyTwoEast2(entry))}
const callThirtyTwoEast3 = (entry)=>{ dispatch(setThirtyTwoEast3(entry))}
const callThirtyTwoEast4 = (entry)=>{ dispatch(setThirtyTwoEast4(entry))}
const callThirtyTwoEast5 = (entry)=>{ dispatch(setThirtyTwoEast5(entry))}
const callThirtyTwoEast6 = (entry)=>{ dispatch(setThirtyTwoEast6(entry))}
const callThirtyTwoEast7 = (entry)=>{ dispatch(setThirtyTwoEast7(entry))}
const callThirtyTwoEast8 = (entry)=>{ dispatch(setThirtyTwoEast8(entry))}

const callSixteenEast1 = (entry)=>{ dispatch(setSixteenEast1(entry))}
const callSixteenEast2 = (entry)=>{ dispatch(setSixteenEast2(entry))}
const callSixteenEast3 = (entry)=>{ dispatch(setSixteenEast3(entry))}
const callSixteenEast4 = (entry)=>{ dispatch(setSixteenEast4(entry))}

const callEightEast1 = (entry)=>{ dispatch(setEightEast1(entry))}
const callEightEast2 = (entry)=>{ dispatch(setEightEast2(entry))}

const callFourEast1 = (entry)=>{ dispatch(setFourEast1(entry))}



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


 const resetEastRoundsPrediction = ()=> {
  if(window.confirm("Confirm Selection Reset?")){

    dispatch(clearGroupEast())
    

  }
}


 useEffect(()=>{
 
  dispatch(fetchRangeOfCompetitors(32,48,"east"))
 
},[user,leagueInFocus])


 useEffect(()=>{
 
  dispatch(fetchRangeOfCompetitors(32,48,"east"))
 
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

<RespHide style={{width:"100%"}}>   
<Divider style={{width:"100%",position:"relative",top:"2rem"}}/>

     <div style={{display:"flex", justifyContent:"flex-start",flexDirection:"column"}}>
      <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,cursor:"pointer"}}>
          EAST
        </Typography>

      
    </div>
       
        
    <RespScale style={{display:"flex",flexDirection:"row",justifyContent:"space-between",gap:"0.5rem",alignItems:"center",width:"100%"}}>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center", textAlign:"center",color:"white",backgroundColor:"#260448", height:"2.5rem",width:"6.5rem",borderRadius:"5%"}} >
              R64
              
               </div>


               <div style={{display:"flex",justifyContent:"center",alignItems:"center", textAlign:"center",color:"white",backgroundColor:"#260448", height:"2.5rem",width:"6.5rem",borderRadius:"5%"}} >
               R32
               </div>


               <div style={{display:"flex",justifyContent:"center",alignItems:"center", textAlign:"center",color:"white",backgroundColor:"#260448", height:"2.5rem",width:"6.5rem",borderRadius:"5%"}} >
               S16
               </div>

               <div style={{display:"flex",justifyContent:"center",alignItems:"center", textAlign:"center",color:"white",backgroundColor:"#260448", height:"2.5rem",width:"6.5rem",borderRadius:"5%"}} >
               E8
               </div>

               <div style={{display:"flex",justifyContent:"center",alignItems:"center", textAlign:"center",color:"white",backgroundColor:"#260448", height:"2.5rem",width:"6.5rem",borderRadius:"5%"}} >
                Q4
               </div>
             </RespScale>

        
       
             <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"100%",height:"100%",overflow:"hidden",marginTop:"-10px"}}>
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

             

                     
<RespScale style={{display:"flex",flexDirection:"column",flex:"1",justifyContent:"space-around",alignItems:"center",height:"100%",fontSize:"12px"}}>  
                
                    
                     
                <div style={{display:"flex",flexDirection:"column",gap:"2.5rem"}}>
                  
                  <div>
                   <div onClick={()=>{callThirtyTwoEast1(competitorRangeInFocus && competitorRangeInFocus[0] &&  competitorRangeInFocus[0].name)}}
                    style={{cursor:"pointer",display:"flex",justifyContent:"flex-start",gap:"0.5rem",paddingLeft:"0.3rem",alignItems:"center",color:"white",backgroundColor: competitorRangeInFocus[0] &&  competitorRangeInFocus[0].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderTopLeftRadius:"5%",borderTopRightRadius:"5%"}} >
                    {competitorRangeInFocus && competitorRangeInFocus[0] &&  competitorRangeInFocus[0].seed}. {competitorRangeInFocus && competitorRangeInFocus[0] &&  competitorRangeInFocus[0].name}
                   </div>
                
                
                   <div onClick={()=>{callThirtyTwoEast1(competitorRangeInFocus && competitorRangeInFocus[15] &&  competitorRangeInFocus[15].name.substring(0,11))}}
                    style={{cursor:"pointer",display:"flex",justifyContent:"flex-start",gap:"0.5rem",paddingLeft:"0.3rem",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[15] &&  competitorRangeInFocus[15].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderBottomLeftRadius:"5%",borderBottomRightRadius:"5%",borderTop:"1px solid white"}} >
                   {competitorRangeInFocus && competitorRangeInFocus[15] && competitorRangeInFocus[15].seed}. {competitorRangeInFocus && competitorRangeInFocus[15] && competitorRangeInFocus[15].name.substring(0,11)}
                   </div>
                 </div>
                

                 <div>
                   <div  onClick={()=>{callThirtyTwoEast2(competitorRangeInFocus && competitorRangeInFocus[7] &&  competitorRangeInFocus[7].name)}}
                   style={{cursor:"pointer",display:"flex",justifyContent:"flex-start",gap:"0.5rem",paddingLeft:"0.3rem",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[7] &&  competitorRangeInFocus[7].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderTopLeftRadius:"5%",borderTopRightRadius:"5%"}} >
                   {competitorRangeInFocus && competitorRangeInFocus[7] && competitorRangeInFocus[7].seed}. {competitorRangeInFocus && competitorRangeInFocus[7] && competitorRangeInFocus[7].name}
                   </div>
                
                
                   <div onClick={()=>{callThirtyTwoEast2(competitorRangeInFocus && competitorRangeInFocus[8] &&  competitorRangeInFocus[8].name)}}
                    style={{cursor:"pointer",display:"flex",justifyContent:"flex-start",gap:"0.5rem",paddingLeft:"0.3rem",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[8] &&  competitorRangeInFocus[8].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderBottomLeftRadius:"5%",borderBottomRightRadius:"5%",borderTop:"1px solid white"}} >
                   {competitorRangeInFocus && competitorRangeInFocus[8] && competitorRangeInFocus[8].seed}. {competitorRangeInFocus && competitorRangeInFocus[8] && competitorRangeInFocus[8].name}
                   </div>
                </div>


                </div>
                
                 <div  style={{display:"flex",flexDirection:"column",gap:"2.5rem"}}>
                   
                 <div> 
                    <div onClick={()=>{callThirtyTwoEast3(competitorRangeInFocus && competitorRangeInFocus[4] &&  competitorRangeInFocus[4].name)}}
                     style={{cursor:"pointer",display:"flex",justifyContent:"flex-start",gap:"0.5rem",paddingLeft:"0.3rem",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[4] &&  competitorRangeInFocus[4].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderTopLeftRadius:"5%",borderTopRightRadius:"5%"}} >
                    {competitorRangeInFocus && competitorRangeInFocus[4] && competitorRangeInFocus[4].seed}. {competitorRangeInFocus && competitorRangeInFocus[4] && competitorRangeInFocus[4].name}
                    </div>
                 
                 
                    <div onClick={()=>{callThirtyTwoEast3(competitorRangeInFocus && competitorRangeInFocus[11] &&  competitorRangeInFocus[11].name)}}
                     style={{cursor:"pointer",display:"flex",justifyContent:"flex-start",gap:"0.5rem",paddingLeft:"0.3rem",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[11] &&  competitorRangeInFocus[11].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderBottomLeftRadius:"5%",borderBottomRightRadius:"5%",borderTop:"1px solid white"}} >
                    {competitorRangeInFocus && competitorRangeInFocus[11] && competitorRangeInFocus[11].seed}. {competitorRangeInFocus && competitorRangeInFocus[11] && competitorRangeInFocus[11].name}
                    </div>
                 </div>
                
                 <div>
                     <div onClick={()=>{callThirtyTwoEast4(competitorRangeInFocus && competitorRangeInFocus[3] &&  competitorRangeInFocus[3].name)}}
                      style={{cursor:"pointer",display:"flex",justifyContent:"flex-start",gap:"0.5rem",paddingLeft:"0.3rem",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[3] &&  competitorRangeInFocus[3].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderTopLeftRadius:"5%",borderTopRightRadius:"5%"}} >
                     {competitorRangeInFocus && competitorRangeInFocus[3] && competitorRangeInFocus[3].seed}. {competitorRangeInFocus && competitorRangeInFocus[3] && competitorRangeInFocus[3].name}
                     </div>
                  
                  
                     <div onClick={()=>{callThirtyTwoEast4(competitorRangeInFocus && competitorRangeInFocus[12] &&  competitorRangeInFocus[12].name)}}
                      style={{cursor:"pointer",display:"flex",justifyContent:"flex-start",gap:"0.5rem",paddingLeft:"0.3rem",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[12] &&  competitorRangeInFocus[12].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderBottomLeftRadius:"5%",borderBottomRightRadius:"5%",borderTop:"1px solid white"}} >
                     {competitorRangeInFocus && competitorRangeInFocus[12] && competitorRangeInFocus[12].seed}. {competitorRangeInFocus && competitorRangeInFocus[12] && competitorRangeInFocus[12].name}
                  </div>
                </div>

                </div>
                
                
                <div  style={{display:"flex",flexDirection:"column",gap:"2.5rem"}}>
                  
                 <div>
                     <div onClick={()=>{callThirtyTwoEast5(competitorRangeInFocus && competitorRangeInFocus[5] &&  competitorRangeInFocus[5].name)}}
                      style={{cursor:"pointer",display:"flex",justifyContent:"flex-start",gap:"0.5rem",paddingLeft:"0.3rem",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[5] &&  competitorRangeInFocus[5].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderTopLeftRadius:"5%",borderTopRightRadius:"5%"}} >
                     {competitorRangeInFocus && competitorRangeInFocus[5] && competitorRangeInFocus[5].seed}. {competitorRangeInFocus && competitorRangeInFocus[5] && competitorRangeInFocus[5].name}
                     </div>
                  
                  
                     <div onClick={()=>{callThirtyTwoEast5(competitorRangeInFocus && competitorRangeInFocus[10] &&  competitorRangeInFocus[10].name)}}
                      style={{cursor:"pointer",display:"flex",justifyContent:"flex-start",gap:"0.5rem",paddingLeft:"0.3rem",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[10] &&  competitorRangeInFocus[10].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderBottomLeftRadius:"5%",borderBottomRightRadius:"5%",borderTop:"1px solid white"}} >
                     {competitorRangeInFocus && competitorRangeInFocus[10] && competitorRangeInFocus[10].seed}. {competitorRangeInFocus && competitorRangeInFocus[10] && competitorRangeInFocus[10].name}
                     </div>
                 </div>
                 
                 <div>
                   <div onClick={()=>{callThirtyTwoEast6(competitorRangeInFocus && competitorRangeInFocus[2] &&  competitorRangeInFocus[2].name)}}
                    style={{cursor:"pointer",display:"flex",justifyContent:"flex-start",gap:"0.5rem",paddingLeft:"0.3rem",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[2] &&  competitorRangeInFocus[2].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderTopLeftRadius:"5%",borderTopRightRadius:"5%"}} >
                   {competitorRangeInFocus && competitorRangeInFocus[2] && competitorRangeInFocus[2].seed}. {competitorRangeInFocus && competitorRangeInFocus[2] && competitorRangeInFocus[2].name}
                   </div>
                
                
                   <div onClick={()=>{callThirtyTwoEast6(competitorRangeInFocus && competitorRangeInFocus[13] &&  competitorRangeInFocus[13].name)}}
                    style={{cursor:"pointer",display:"flex",justifyContent:"flex-start",gap:"0.5rem",paddingLeft:"0.3rem",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[13] &&  competitorRangeInFocus[13].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderBottomLeftRadius:"5%",borderBottomRightRadius:"5%",borderTop:"1px solid white"}} >
                   {competitorRangeInFocus && competitorRangeInFocus[13] && competitorRangeInFocus[13].seed}. {competitorRangeInFocus && competitorRangeInFocus[13] && competitorRangeInFocus[13].name}
                   </div>
                </div>
               
                </div>
                
                <div  style={{display:"flex",flexDirection:"column",gap:"2.5rem"}}>
                  
                <div>
                   <div onClick={()=>{callThirtyTwoEast7(competitorRangeInFocus && competitorRangeInFocus[6] &&  competitorRangeInFocus[6].name)}}
                    style={{cursor:"pointer",display:"flex",justifyContent:"flex-start",gap:"0.5rem",paddingLeft:"0.3rem",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[6] &&  competitorRangeInFocus[6].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderTopLeftRadius:"5%",borderTopRightRadius:"5%"}} >
                   {competitorRangeInFocus && competitorRangeInFocus[6] && competitorRangeInFocus[6].seed}. {competitorRangeInFocus && competitorRangeInFocus[6] && competitorRangeInFocus[6].name}
                   </div>
                
                
                   <div onClick={()=>{callThirtyTwoEast7(competitorRangeInFocus && competitorRangeInFocus[9] &&  competitorRangeInFocus[9].name)}}
                    style={{cursor:"pointer",display:"flex",justifyContent:"flex-start",gap:"0.5rem",paddingLeft:"0.3rem",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[9] &&  competitorRangeInFocus[9].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderBottomLeftRadius:"5%",borderBottomRightRadius:"5%",borderTop:"1px solid white"}} >
                   {competitorRangeInFocus && competitorRangeInFocus[9] && competitorRangeInFocus[9].seed}. {competitorRangeInFocus && competitorRangeInFocus[9] && competitorRangeInFocus[9].name}
                   </div>
                </div>

                
                <div>
                   <div onClick={()=>{callThirtyTwoEast8(competitorRangeInFocus && competitorRangeInFocus[1] &&  competitorRangeInFocus[1].name)}}
                    style={{cursor:"pointer",display:"flex",justifyContent:"flex-start",gap:"0.5rem",paddingLeft:"0.3rem",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[1] &&  competitorRangeInFocus[1].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderTopLeftRadius:"5%",borderTopRightRadius:"5%"}} >
                   {competitorRangeInFocus && competitorRangeInFocus[1] && competitorRangeInFocus[1].seed}. {competitorRangeInFocus && competitorRangeInFocus[1] && competitorRangeInFocus[1].name}
                   </div>
                
                   <div onClick={()=>{callThirtyTwoEast8(competitorRangeInFocus && competitorRangeInFocus[14] &&  competitorRangeInFocus[14].name)}}
                   style={{cursor:"pointer",display:"flex",justifyContent:"flex-start",gap:"0.5rem",paddingLeft:"0.3rem",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[14] &&  competitorRangeInFocus[14].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderBottomLeftRadius:"5%",borderBottomRightRadius:"5%",borderTop:"1px solid white"}} >
                   {competitorRangeInFocus && competitorRangeInFocus[14] && competitorRangeInFocus[14].seed}. {competitorRangeInFocus && competitorRangeInFocus[14] && competitorRangeInFocus[14].name}
                   </div>
              </div>
                
                 </div>
                
                
    </RespScale>

      <RespScale style={{display:"flex",flex:"1",justifyContent:"space-evenly",flexDirection:"column",alignItems:"center",height:"100%",fontSize:"12px",}}> 
            
               <div onClick={()=>{callSixteenEast1(thirtyTwoEast1)}}
               
               style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[0] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[0].roundTwo === "lost"?"grey":"#260448", height:"3rem",width:"7rem",marginBottom:"0.5rem",marginTop:"0.5rem",borderRadius:"5%",position:"relative",top:"-1rem",display:"flex",alignItems:"center",justifyContent:"center"}} >
             
               {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[0] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[0].name */}
               {thirtyTwoEast1}
               </div>
 
 
                <div onClick={()=>{callSixteenEast1(thirtyTwoEast2)}}
                 style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[1] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[1].roundTwo === "lost"?"grey":"#260448", height:"3rem",width:"7rem",marginBottom:"0.5rem",marginTop:"0.5rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"-1.5rem"}} >
                {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[1] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[1].name */}
                {thirtyTwoEast2}
                </div>


                <div  onClick={()=>{callSixteenEast2(thirtyTwoEast3)}}
                style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[2] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[2].roundTwo === "lost"?"grey":"#260448", height:"3rem",width:"7rem",marginBottom:"0.5rem",marginTop:"0.5rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%"}} >
                {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[2] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[2].name */}
                {thirtyTwoEast3}
                </div>
 
 
                <div onClick={()=>{callSixteenEast2(thirtyTwoEast4)}}
                 style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[3] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[3].roundTwo === "lost"?"grey":"#260448", height:"3rem",width:"7rem",marginBottom:"0.5rem",marginTop:"0.5rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"-1rem"}} >
                {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[3] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[3].name*/ }
                {thirtyTwoEast4}
                </div>


                <div onClick={()=>{callSixteenEast3(thirtyTwoEast5)}}
                 style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[4] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[4].roundTwo === "lost"?"grey":"#260448", height:"3rem",width:"7rem",marginBottom:"0.5rem",marginTop:"0.5rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"1rem"}} >
                {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[4] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[4].name */}
                {thirtyTwoEast5}
                </div>
 
 
                <div  onClick={()=>{callSixteenEast3(thirtyTwoEast6)}}
                 style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[5] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[5].roundTwo === "lost"?"grey":"#260448", height:"3rem",width:"7rem",marginBottom:"0.5rem",marginTop:"0.5rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%"}} >
                {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[5] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[5].name */}
                {thirtyTwoEast6}
                </div>


                <div  onClick={()=>{callSixteenEast4(thirtyTwoEast7)}}
                style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[6] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[6].roundTwo === "lost"?"grey":"#260448", height:"3rem",width:"7rem",marginBottom:"0.5rem",marginTop:"0.5rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"1.5rem"}} >
                {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[6] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[6].name */}
                {thirtyTwoEast7}
                </div>
 
 
                <div  onClick={()=>{callSixteenEast4(thirtyTwoEast8)}}
                style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[7] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[7].roundTwo === "lost"?"grey":"#260448", height:"3rem",width:"7rem",marginBottom:"0.5rem",marginTop:"0.5rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"1rem"}} >
                {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[7] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[7].name */}
                {thirtyTwoEast8}
                </div>


    </RespScale>

    <RespScale style={{display:"flex",flex:"1",justifyContent:"space-evenly",flexDirection:"column",alignItems:"center",height:"100%",fontSize:"12px",}}> 

               <div onClick={()=>{callEightEast1(sixteenEast1)}}
               
               style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[0] &&competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[0].sweetSixteen === "lost"?"grey":"#260448", height:"3rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"-3rem"}} >
               {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[0] &&competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[0].name */}
               {sixteenEast1}
               </div>
 
 
               <div onClick={()=>{callEightEast1(sixteenEast2)}}
                style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[1] &&competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[1].sweetSixteen === "lost"?"grey":"#260448", height:"3rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"-1rem"}} >
               {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[1] &&competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[1].name */}
               {sixteenEast2}
                </div>


                <div onClick={()=>{callEightEast2(sixteenEast3)}}
                 style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[2] &&competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[2].sweetSixteen === "lost"?"grey":"#260448", height:"3rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"1rem"}} >
                {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[2] &&competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[2].name */}
                {sixteenEast3}
               </div>
 
 
               <div onClick={()=>{callEightEast2(sixteenEast4)}}
                 style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[3] &&competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[3].sweetSixteen === "lost"?"grey":"#260448", height:"3rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"2.5rem"}} >
               {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[3] &&competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[3].name */}
               {sixteenEast4}
                </div>
           
          </RespScale>

           <RespScale style={{display:"flex",flex:"1",justifyContent:"space-evenly",flexDirection:"column",alignItems:"center",height:"100%",fontSize:"12px",}}>  
   
              <div onClick={()=>{callFourEast1(eightEast1)}}
               style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[0] &&competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[0].eliteEight === "lost" ?"grey":"#260448", height:"3rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"-2.5rem"}} >
              {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[0] &&competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[0].name */}
              {eightEast1}
              </div>


              <div onClick={()=>{callFourEast1(eightEast2)}}
              style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[1] &&competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[1].eliteEight === "lost" ?"grey":"#260448", height:"3rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"2.5rem"}} >
              {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[1] &&competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[1].name */}
              {eightEast2}
               </div>




           </RespScale>

           <RespScale style={{display:"flex",flexDirection:"column",flex:"1",display:"flex",justifyContent:"space-evenly",alignItems:"center",height:"100%",fontSize:"12px",}}>  
           
              <div style={{cursor:"pointer",color:"white",backgroundColor:"#260448", height:"4rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%"}} >
              {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.eliteEight && item.eliteEight === 'won'))[0] &&competitorRangeInFocus.filter((item)=>(item.eliteEight && item.eliteEight === 'won'))[0].name */}
              {fourEast1}
              </div>
           </RespScale>



      

  </div >
      
    

      {/* <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider> */}

 </RespHide>

 <RespShow>
 

 <div style={{display:"flex", justifyContent:"flex-start",flexDirection:"column"}}>
 <RespShow>
 <h4 style={{marginTop:"0rem"}}>March Madness</h4>
 </RespShow>
 
  <Typography variant="h6" sx={{ textAlign: 'left',cursor:"pointer"}}>
      EAST
    </Typography>
 
 
    <Divider style={{width:"100%",position:"relative"}}/>
 </div>
 
   <center style={{marginTop:"4rem",marginBottom:"4rem"}}>
   <h4>Please Make Predictions on the web</h4>
   </center>
 
 
 
    
   <div style={{backgroundColor:'#F4F4F4', height:"2rem",color:"#260448",fontWeight:"bolder",display:"flex",justifyContent:"center",alignItems:"center"}}>EAST PREDICTIONS</div>
      <TableContainer component={Paper} style={{marginTop:"0rem",backgroundColor:"#FAFAFA"}}>
       
  
        {/*<h4> &nbsp; - &nbsp; Finalist</h4>*/}
        
         
            <Divider/>
        
        
                <Table sx={{ tableLayout:"fixed",backgroundColor:"#FAFAFA" }} aria-label="custom pagination table">
                  <TableHead  sx={{backgroundColor:"#FAFAFA  !important" }} >
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="left">Username</TableCell>
                      <TableCell align="left">Pick</TableCell>
                    
                     
             </TableRow>
           </TableHead>
 
          <Divider/>
 
           <TableBody>
             {dummyData.map((row,index) => (
                   <TableRow key={index}>
                     <TableCell style={{ width: 140,borderBottom:"1px solid lightgrey" }} component="th" scope="row">
                       {index+1}
                     </TableCell>
                     <TableCell style={{ width: 140,borderBottom:"1px solid lightgrey" }} align="left">
                       {row && row.userName?row.userName:row && row.teamName}
                     </TableCell>
                     <TableCell style={{ width: 140,borderBottom:"1px solid lightgrey" }} align="left">
                   
                     {row && row.playerName}
                     
                     </TableCell>
                     </TableRow>  
                   ))
     
                   
                   }
     
                 
            </TableBody>
          </Table>
        </TableContainer> 
     
  
  </RespShow>

  </Container>

  {/*========================================================================== IF THEY ARE PART OF THIS LEAGUE  \/  =========================================================== */}

<>
    
   
    
   

   
      { 
      
      <Container   style={{display: 'flex',flexDirection:"column", justifyContent: 'flex-start',flex:2, border: '1px solid #0000001A',   marginTop: '2%', marginBottom: '2%', borderRadius: '15px',backgroundColor:"#FAFAFA" }}>    
     
      
     <h4>March Madness</h4>
  <RespHide>
     <div style={{display:"flex", justifyContent:"space-between"}}>
      <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,cursor:"pointer",}}>
          PREDICT
        </Typography>

        <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,color:"lightgrey",cursor:"pointer",}} onClick={()=>{ /*loadAndNavigate()*/ } }>
        { waiting?"loading..":'RESULTS' }
        </Typography>
    </div>
    </RespHide> 

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

   <RespHide>
      <div style={{marginTop:"0rem",width:"100%"}}>
      <Button onClick={()=>{resetEastRoundsPrediction()}}  style={{width:"100%",backgroundColor: '#260952',height:"4rem" ,color:'white'}}>
            { "RESET"}
            </Button>
      </div>
   </RespHide>
        
  </div>

 <RespHide>
  <div style={{backgroundColor:'#F4F4F4', height:"2rem",color:"#260448",fontWeight:"bolder",display:"flex",justifyContent:"center",alignItems:"center"}}>SELECTIONS</div>
  


  <TextField
        style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%",marginBottom:"1rem"}}
        fullWidth
        disabled
        placeholder= "SOUTH"
        variant="outlined"
        multiline
        maxRows={2}
        value= {fourSouth1}
       
       
        
        />


<TextField
        style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%",marginBottom:"1rem"}}
        fullWidth
        placeholder= "MID WEST"
        variant="outlined"
        multiline
        maxRows={2}
        value= {fourMidWest1}
        disabled
       
       
        
        />



<TextField
        style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%",marginBottom:"1rem"}}
        fullWidth
        placeholder= "EAST"
        variant="outlined"
        multiline
        maxRows={2}
        value= {fourEast1}
        disabled
       
        
        />



<TextField
        style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%",marginBottom:"1rem"}}
        fullWidth
        placeholder= "WEST"
        variant="outlined"
        multiline
        maxRows={2}
        value= {fourWest1}
        disabled
       
        
        />


            <Button onClick={()=>{moveToFinal()}}  style={{width:"100%",backgroundColor: '#260952',height:"4rem" ,color:'white',marginBottom:"6rem" }}>
            { loading?"Loading":"PROCEED TO FINAL"}
            </Button>
 </RespHide>


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
