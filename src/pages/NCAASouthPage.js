import { Grid, Container, Typography, Button, Paper, CircularProgress, Divider, Select, MenuItem, makeStyles, TextField } from '@mui/material';
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
  setFourSouth1
  
} from 'src/redux/actions/tournamentSouth.action';



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



export default function NCAASouthPage() {
  const theme = useTheme();
 // const classes = useStyles()

  const navigate = useNavigate();
  const dispatch = useDispatch();



//const goalScorerCompId  = "umhhXlB1kcrXLcu6hYIQ"



const {user} = useSelector((state) => state.auth);
const { premierLeagueTeams,teamPlayersInFocus,isLoading,goalScorerCompetitionInFocus,leagueInFocus,competitorRangeInFocus} = useSelector((state) => state.football);


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

  fourSouth1
 
} = useSelector((state) => state.tournamentSouth);

const {fourEast1}= useSelector((state) => state.tournamentEast);
const {fourWest1}= useSelector((state) => state.tournamentWest);
const {fourMidWest1}= useSelector((state) => state.tournamentMidWest);

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


 const resetAllRoundsPrediction = ()=> {
  if(window.confirm("are you sure you want to get rid of ALL your predictions, including the latest round?")){

    dispatch(clearGroupEast())
    dispatch(clearGroupMidWest())
    dispatch(clearGroupSouth())
    dispatch(clearGroupWest())

  }
}



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

/*
// R32
const [thirtyTwo1,setThirtyTwo1] = useState('')
const [thirtyTwo2,setThirtyTwo2] = useState('')
const [thirtyTwo3,setThirtyTwo3] = useState('')
const [thirtyTwo4,setThirtyTwo4] = useState('')
const [thirtyTwo5,setThirtyTwo5] = useState('')
const [thirtyTwo6,setThirtyTwo6] = useState('')
const [thirtyTwo7,setThirtyTwo7] = useState('')
const [thirtyTwo8,setThirtyTwo8] = useState('')

//S16
const [sixteen1,setSixteen1] = useState('')
const [sixteen2,setSixteen2] = useState('')
const [sixteen3,setSixteen3] = useState('')
const [sixteen4,setSixteen4] = useState('')

//E8
const [eight1,setEight1] = useState('')
const [eight2,setEight2] = useState('')
//Q4
const [four1,setFour1] = useState('')
*/

const callThirtyTwoSouth1 = (entry)=>{ dispatch(setThirtyTwoSouth1(entry))}
const callThirtyTwoSouth2 = (entry)=>{ dispatch(setThirtyTwoSouth2(entry))}
const callThirtyTwoSouth3 = (entry)=>{ dispatch(setThirtyTwoSouth3(entry))}
const callThirtyTwoSouth4 = (entry)=>{ dispatch(setThirtyTwoSouth4(entry))}
const callThirtyTwoSouth5 = (entry)=>{ dispatch(setThirtyTwoSouth5(entry))}
const callThirtyTwoSouth6 = (entry)=>{ dispatch(setThirtyTwoSouth6(entry))}
const callThirtyTwoSouth7 = (entry)=>{ dispatch(setThirtyTwoSouth7(entry))}
const callThirtyTwoSouth8 = (entry)=>{ dispatch(setThirtyTwoSouth8(entry))}

const callSixteenSouth1 = (entry)=>{ dispatch(setSixteenSouth1(entry))}
const callSixteenSouth2 = (entry)=>{ dispatch(setSixteenSouth2(entry))}
const callSixteenSouth3 = (entry)=>{ dispatch(setSixteenSouth3(entry))}
const callSixteenSouth4 = (entry)=>{ dispatch(setSixteenSouth4(entry))}

const callEightSouth1 = (entry)=>{ dispatch(setEightSouth1(entry))}
const callEightSouth2 = (entry)=>{ dispatch(setEightSouth2(entry))}

const callFourSouth1 = (entry)=>{ dispatch(setFourSouth1(entry))}


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
          SOUTH
        </Typography>

      
    </div>
       
       
    <RespScale style={{display:"flex",flexDirection:"row",justifyContent:"space-between",gap:"0.5rem",alignItems:"center",width:"100%"}}>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",color:"white",backgroundColor:"#260448", height:"2.5rem",width:"6.5rem",borderRadius:"5%"}} >
              R64
              
               </div>


               <div style={{display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",color:"white",backgroundColor:"#260448", height:"2.5rem",width:"6.5rem",borderRadius:"5%"}} >
               R32
               </div>


               <div style={{display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",color:"white",backgroundColor:"#260448", height:"2.5rem",width:"6.5rem",borderRadius:"5%"}} >
               S16
               </div>

               <div style={{display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",color:"white",backgroundColor:"#260448", height:"2.5rem",width:"6.5rem",borderRadius:"5%"}} >
               E8
               </div>

               <div style={{display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",color:"white",backgroundColor:"#260448", height:"2.5rem",width:"6.5rem",borderRadius:"5%"}} >
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
                   <div onClick={()=>{callThirtyTwoSouth1(competitorRangeInFocus && competitorRangeInFocus[0] &&  competitorRangeInFocus[0].name)}}
                    style={{cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center",color:"white",backgroundColor: competitorRangeInFocus[0] &&  competitorRangeInFocus[0].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderTopLeftRadius:"5%",borderTopRightRadius:"5%"}} >
                    {competitorRangeInFocus && competitorRangeInFocus[0] &&  competitorRangeInFocus[0].name}
                   </div>
                
                
                   <div onClick={()=>{callThirtyTwoSouth1(competitorRangeInFocus && competitorRangeInFocus[1] &&  competitorRangeInFocus[1].name)}}
                    style={{cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[1] &&  competitorRangeInFocus[1].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderBottomLeftRadius:"5%",borderBottomRightRadius:"5%",borderTop:"1px solid white"}} >
                   {competitorRangeInFocus && competitorRangeInFocus[1] && competitorRangeInFocus[1].name}
                   </div>
                 </div>
                

                 <div>
                   <div  onClick={()=>{callThirtyTwoSouth2(competitorRangeInFocus && competitorRangeInFocus[2] &&  competitorRangeInFocus[2].name)}}
                   style={{cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[2] &&  competitorRangeInFocus[2].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderTopLeftRadius:"5%",borderTopRightRadius:"5%"}} >
                   {competitorRangeInFocus && competitorRangeInFocus[2] && competitorRangeInFocus[2].name}
                   </div>
                
                
                   <div onClick={()=>{callThirtyTwoSouth2(competitorRangeInFocus && competitorRangeInFocus[3] &&  competitorRangeInFocus[3].name)}}
                    style={{cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[3] &&  competitorRangeInFocus[3].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderBottomLeftRadius:"5%",borderBottomRightRadius:"5%",borderTop:"1px solid white"}} >
                   {competitorRangeInFocus && competitorRangeInFocus[3] && competitorRangeInFocus[3].name}
                   </div>
                </div>


                </div>
                
                 <div  style={{display:"flex",flexDirection:"column",gap:"2.5rem"}}>
                   
                 <div> 
                    <div onClick={()=>{callThirtyTwoSouth3(competitorRangeInFocus && competitorRangeInFocus[4] &&  competitorRangeInFocus[4].name)}}
                     style={{cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[4] &&  competitorRangeInFocus[4].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderTopLeftRadius:"5%",borderTopRightRadius:"5%"}} >
                    {competitorRangeInFocus && competitorRangeInFocus[4] && competitorRangeInFocus[4].name}
                    </div>
                 
                 
                    <div onClick={()=>{callThirtyTwoSouth3(competitorRangeInFocus && competitorRangeInFocus[5] &&  competitorRangeInFocus[5].name)}}
                     style={{cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[5] &&  competitorRangeInFocus[5].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderBottomLeftRadius:"5%",borderBottomRightRadius:"5%",borderTop:"1px solid white"}} >
                    {competitorRangeInFocus && competitorRangeInFocus[5] && competitorRangeInFocus[5].name}
                    </div>
                 </div>
                
                 <div>
                     <div onClick={()=>{callThirtyTwoSouth4(competitorRangeInFocus && competitorRangeInFocus[6] &&  competitorRangeInFocus[6].name)}}
                      style={{cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[6] &&  competitorRangeInFocus[6].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderTopLeftRadius:"5%",borderTopRightRadius:"5%"}} >
                     {competitorRangeInFocus && competitorRangeInFocus[6] && competitorRangeInFocus[6].name}
                     </div>
                  
                  
                     <div onClick={()=>{callThirtyTwoSouth4(competitorRangeInFocus && competitorRangeInFocus[7] &&  competitorRangeInFocus[7].name)}}
                      style={{cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[7] &&  competitorRangeInFocus[7].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderBottomLeftRadius:"5%",borderBottomRightRadius:"5%",borderTop:"1px solid white"}} >
                     {competitorRangeInFocus && competitorRangeInFocus[7] && competitorRangeInFocus[7].name}
                  </div>
                </div>

                </div>
                
                
                <div  style={{display:"flex",flexDirection:"column",gap:"2.5rem"}}>
                  
                 <div>
                     <div onClick={()=>{callThirtyTwoSouth5(competitorRangeInFocus && competitorRangeInFocus[8] &&  competitorRangeInFocus[8].name)}}
                      style={{cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[8] &&  competitorRangeInFocus[8].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderTopLeftRadius:"5%",borderTopRightRadius:"5%"}} >
                     {competitorRangeInFocus && competitorRangeInFocus[8] && competitorRangeInFocus[8].name}
                     </div>
                  
                  
                     <div onClick={()=>{callThirtyTwoSouth5(competitorRangeInFocus && competitorRangeInFocus[9] &&  competitorRangeInFocus[9].name)}}
                      style={{cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[9] &&  competitorRangeInFocus[9].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderBottomLeftRadius:"5%",borderBottomRightRadius:"5%",borderTop:"1px solid white"}} >
                     {competitorRangeInFocus && competitorRangeInFocus[9] && competitorRangeInFocus[9].name}
                     </div>
                 </div>
                 
                 <div>
                   <div onClick={()=>{callThirtyTwoSouth6(competitorRangeInFocus && competitorRangeInFocus[10] &&  competitorRangeInFocus[10].name)}}
                    style={{cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[10] &&  competitorRangeInFocus[10].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderTopLeftRadius:"5%",borderTopRightRadius:"5%"}} >
                   {competitorRangeInFocus && competitorRangeInFocus[10] && competitorRangeInFocus[10].name}
                   </div>
                
                
                   <div onClick={()=>{callThirtyTwoSouth6(competitorRangeInFocus && competitorRangeInFocus[11] &&  competitorRangeInFocus[11].name)}}
                    style={{cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[11] &&  competitorRangeInFocus[11].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderBottomLeftRadius:"5%",borderBottomRightRadius:"5%",borderTop:"1px solid white"}} >
                   {competitorRangeInFocus && competitorRangeInFocus[11] && competitorRangeInFocus[11].name}
                   </div>
                </div>
               
                </div>
                
                <div  style={{display:"flex",flexDirection:"column",gap:"2.5rem"}}>
                  
                <div>
                   <div onClick={()=>{callThirtyTwoSouth7(competitorRangeInFocus && competitorRangeInFocus[12] &&  competitorRangeInFocus[12].name)}}
                    style={{cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[12] &&  competitorRangeInFocus[12].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderTopLeftRadius:"5%",borderTopRightRadius:"5%"}} >
                   {competitorRangeInFocus && competitorRangeInFocus[12] && competitorRangeInFocus[12].name}
                   </div>
                
                
                   <div onClick={()=>{callThirtyTwoSouth7(competitorRangeInFocus && competitorRangeInFocus[13] &&  competitorRangeInFocus[13].name)}}
                    style={{cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[13] &&  competitorRangeInFocus[13].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderBottomLeftRadius:"5%",borderBottomRightRadius:"5%",borderTop:"1px solid white"}} >
                   {competitorRangeInFocus && competitorRangeInFocus[13] && competitorRangeInFocus[13].name}
                   </div>
                </div>

                
                <div>
                   <div onClick={()=>{callThirtyTwoSouth8(competitorRangeInFocus && competitorRangeInFocus[14] &&  competitorRangeInFocus[14].name)}}
                    style={{cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[14] &&  competitorRangeInFocus[14].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderTopLeftRadius:"5%",borderTopRightRadius:"5%"}} >
                   {competitorRangeInFocus && competitorRangeInFocus[14] && competitorRangeInFocus[14].name}
                   </div>
                
                   <div onClick={()=>{callThirtyTwoSouth8(competitorRangeInFocus && competitorRangeInFocus[15] &&  competitorRangeInFocus[15].name)}}
                   style={{cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center",color:"white",backgroundColor:competitorRangeInFocus[15] &&  competitorRangeInFocus[15].roundOne==="lost"?"grey" :"#260448", height:"1.5rem",display:"flex",width:"7rem",borderBottomLeftRadius:"5%",borderBottomRightRadius:"5%",borderTop:"1px solid white"}} >
                   {competitorRangeInFocus && competitorRangeInFocus[15] && competitorRangeInFocus[15].name}
                   </div>
              </div>
                
                 </div>
                
                
    </RespScale>

      <RespScale style={{display:"flex",flex:"1",justifyContent:"space-evenly",flexDirection:"column",alignItems:"center",height:"100%",fontSize:"12px",}}> 
            
               <div onClick={()=>{callSixteenSouth1(thirtyTwoSouth1)}}
               
               style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[0] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[0].roundTwo === "lost"?"grey":"#260448", height:"3rem",width:"7rem",borderRadius:"5%",position:"relative",top:"-1rem",display:"flex",alignItems:"center",justifyContent:"center"}} >
             
               {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[0] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[0].name */}
               {thirtyTwoSouth1}
               </div>
 
 
                <div onClick={()=>{callSixteenSouth1(thirtyTwoSouth2)}}
                 style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[1] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[1].roundTwo === "lost"?"grey":"#260448", height:"3rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"-1.5rem"}} >
                {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[1] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[1].name */}
                {thirtyTwoSouth2}
                </div>


                <div  onClick={()=>{callSixteenSouth2(thirtyTwoSouth3)}}
                style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[2] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[2].roundTwo === "lost"?"grey":"#260448", height:"3rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%"}} >
                {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[2] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[2].name */}
                {thirtyTwoSouth3}
                </div>
 
 
                <div onClick={()=>{callSixteenSouth2(thirtyTwoSouth4)}}
                 style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[3] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[3].roundTwo === "lost"?"grey":"#260448", height:"3rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"-1rem"}} >
                {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[3] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[3].name*/ }
                {thirtyTwoSouth4}
                </div>


                <div onClick={()=>{callSixteenSouth3(thirtyTwoSouth5)}}
                 style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[4] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[4].roundTwo === "lost"?"grey":"#260448", height:"3rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"1rem"}} >
                {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[4] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[4].name */}
                {thirtyTwoSouth5}
                </div>
 
 
                <div  onClick={()=>{callSixteenSouth3(thirtyTwoSouth6)}}
                 style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[5] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[5].roundTwo === "lost"?"grey":"#260448", height:"3rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%"}} >
                {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[5] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[5].name */}
                {thirtyTwoSouth6}
                </div>


                <div  onClick={()=>{callSixteenSouth4(thirtyTwoSouth7)}}
                style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[6] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[6].roundTwo === "lost"?"grey":"#260448", height:"3rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"1.5rem"}} >
                {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[6] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[6].name */}
                {thirtyTwoSouth7}
                </div>
 
 
                <div  onClick={()=>{callSixteenSouth4(thirtyTwoSouth8)}}
                style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[7] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[7].roundTwo === "lost"?"grey":"#260448", height:"3rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"1rem"}} >
                {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[7] &&competitorRangeInFocus.filter((item)=>(item.roundOne && item.roundOne === 'won'))[7].name */}
                {thirtyTwoSouth8}
                </div>


    </RespScale>

    <RespScale style={{display:"flex",flex:"1",justifyContent:"space-evenly",flexDirection:"column",alignItems:"center",height:"100%",fontSize:"12px",}}> 

               <div onClick={()=>{callEightSouth1(sixteenSouth1)}}
               
               style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[0] &&competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[0].sweetSixteen === "lost"?"grey":"#260448", height:"3rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"-3rem"}} >
               {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[0] &&competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[0].name */}
               {sixteenSouth1}
               </div>
 
 
               <div onClick={()=>{callEightSouth1(sixteenSouth2)}}
                style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[1] &&competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[1].sweetSixteen === "lost"?"grey":"#260448", height:"3rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"-1rem"}} >
               {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[1] &&competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[1].name */}
               {sixteenSouth2}
                </div>


                <div onClick={()=>{callEightSouth2(sixteenSouth3)}}
                 style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[2] &&competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[2].sweetSixteen === "lost"?"grey":"#260448", height:"3rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"1rem"}} >
                {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[2] &&competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[2].name */}
                {sixteenSouth3}
               </div>
 
 
               <div onClick={()=>{callEightSouth2(sixteenSouth4)}}
                 style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[3] &&competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[3].sweetSixteen === "lost"?"grey":"#260448", height:"3rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"2.5rem"}} >
               {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[3] &&competitorRangeInFocus.filter((item)=>(item.roundTwo && item.roundTwo === 'won'))[3].name */}
               {sixteenSouth4}
                </div>
           
          </RespScale>

           <RespScale style={{display:"flex",flex:"1",justifyContent:"space-evenly",flexDirection:"column",alignItems:"center",height:"100%",fontSize:"12px",}}>  
   
              <div onClick={()=>{callFourSouth1(eightSouth1)}}
               style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[0] &&competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[0].eliteEight === "lost" ?"grey":"#260448", height:"3rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"-2.5rem"}} >
              {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[0] &&competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[0].name */}
              {eightSouth1}
              </div>


              <div onClick={()=>{callFourSouth1(eightSouth2)}}
              style={{cursor:"pointer",color:"white",backgroundColor:competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[1] &&competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[1].eliteEight === "lost" ?"grey":"#260448", height:"3rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%",position:"relative",top:"2.5rem"}} >
              {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[1] &&competitorRangeInFocus.filter((item)=>(item.sweetSixteen && item.sweetSixteen === 'won'))[1].name */}
              {eightSouth2}
               </div>




           </RespScale>

           <RespScale style={{display:"flex",flexDirection:"column",flex:"1",display:"flex",justifyContent:"space-evenly",alignItems:"center",height:"100%",fontSize:"12px",}}>  
           
              <div style={{cursor:"pointer",color:"white",backgroundColor:"#260448", height:"4rem",width:"7rem",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5%"}} >
              {/*competitorRangeInFocus && competitorRangeInFocus.filter((item)=>(item.eliteEight && item.eliteEight === 'won'))[0] &&competitorRangeInFocus.filter((item)=>(item.eliteEight && item.eliteEight === 'won'))[0].name */}
              {fourSouth1}
              </div>
           </RespScale>



      

  </div >
 
    

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
  


      <TextField
            style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%",marginBottom:"1rem"}}
            fullWidth
            placeholder= "SOUTH"
            variant="outlined"
            multiline
            maxRows={2}
            value= {fourSouth1}
            disabled
           
            
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


            <Button onClick={()=>{movetoFinal()}}  style={{backgroundColor: '#260952',height:"4rem" ,color:'white',marginBottom:"6rem" }}>
            { loading?"Loading":"PROCEED TO FINAL"}
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
