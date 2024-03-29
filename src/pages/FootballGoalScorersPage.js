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
} from 'src/redux/actions/football.action';




import FLOGO from '../assets/images/fLogo.png';
import SALAH from '../assets/images/salah.jpeg';
import BRUNO from '../assets/images/BRUNO.jpeg';
import ALISSON from '../assets/images/ALISSON.jpeg'
import HALAAND from '../assets/images/HAALAND.jpeg'
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import { indexOf } from 'lodash';


const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '50vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(5, 5, 12, 5),
}));


const RespContent = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
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



export default function FootballGoalScorersPage() {
  const theme = useTheme();
 // const classes = useStyles()

  const navigate = useNavigate();
  const dispatch = useDispatch();


const premTeams = [
"Arsenal",
"Aston Villa",
"Brighton and Hove Albion",
"Burnley",
"Chelsea",
"Crystal Palace",
"Everton",
"Fulham",
"Leeds United",
"Liverpool",
"Leicester City",
"Manchester City",
"Manchester United",
"Newcastle United",
"Sheffield United",
"Southampton",
"Tottenham Hotspur",
"West Bromwich Albion",
"West Ham United",
"Wolverhampton Wanderers",
]

//const goalScorerCompId  = "umhhXlB1kcrXLcu6hYIQ"



const {user} = useSelector((state) => state.auth);
const { premierLeagueTeams,teamPlayersInFocus,isLoading,goalScorerCompetitionInFocus,leagueInFocus} = useSelector((state) => state.football);





console.log("OUR USER LEAGUES IS-->",user.Leagues)

console.log("OUR LEAGUE IN FOCUS IS-->",leagueInFocus)

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

setGoalScorerCompId(goalScorerCompetitionInFocus && goalScorerCompetitionInFocus.id)

 },[leagueInFocus,leagueInFocus.leagueName])



 
  



useEffect(()=>{

  if(!leagueTeams.length){dispatch(getPremierLeagueTeams())}
 
 
  if(leagueTeams.length < 1 && premierLeagueTeams && premierLeagueTeams.length > 0){setLeagueTeams(premierLeagueTeams)}
  setTeamPlayers(teamPlayersInFocus)
 
 },[premierLeagueTeams,teamPlayersInFocus])



 useEffect(()=>{
  dispatch(fetchGoalScorerCompetitionInFocus(user && user.Leagues &&  user.Leagues.length && leagueInFocus.leagueCode))
  dispatch(fetchAssistCompetitionInFocus(user && user.Leagues &&  user.Leagues.length && leagueInFocus.leagueCode))
  dispatch(fetchTeamWinCompetitionInFocus(user && user.Leagues &&  user.Leagues.length && leagueInFocus.leagueCode))
  dispatch(fetchCleanSheetCompetitionInFocus(user && user.Leagues &&  user.Leagues.length && leagueInFocus.leagueCode))
 },[user,leagueInFocus])

 console.log("user LOOK HERE--->",user)

 useEffect(()=>{
 
  if(!leagueTeams.length){dispatch(getPremierLeagueTeams())}
 
 
  if(leagueTeams.length < 1 && premierLeagueTeams && premierLeagueTeams.length > 0){setLeagueTeams(premierLeagueTeams)}
  setTeamPlayers(teamPlayersInFocus)

 
 },[premierLeagueTeams,teamPlayersInFocus])



 useEffect(()=>{
 
if(user && user.competitions && user.competitions.includes(goalScorerCompetitionInFocus && goalScorerCompetitionInFocus.id)){

   setJoined(true)

}else{
  setJoined(false)
}


 
 },[user,leagueInFocus])



 console.log("WHAT AM I GETTING FROM THE GOAL SCORER COMP NOW--->",goalScorerCompetitionInFocus)


console.log("WHAT AM I GETTING FROM THE USER ?--->",user)




useEffect(()=>{
                                                                /*consider if you really need this isOpen logic, just to clear a chosen selection -- i will do the past selections upon  UNLOCK, IN THE ADMIN NOW */
  if(goalScorerCompetitionInFocus && goalScorerCompetitionInFocus.gameWeekStarted === false && user ){
  
   console.log("YOU HAVENT FINISHED LOGIC FOR PUTTING CURRENT PREDICTION INTO PAST SELECTIONS")
  
  }
   
   },[leagueInFocus])








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

<Container  style={{display: 'flex', justifyContent: 'center',alignItems:"center",flex:4, border: '1px solid #0000001A',  marginTop: '2%', marginBottom: '2%', borderRadius: '15px',backgroundColor:/*"#f4f0ec"*/'#FAFAFA' }}>
    <StyledContent>


     <div style={{display:"flex", justifyContent:"space-between"}}>
      <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,cursor:"pointer"}}>
          Football
        </Typography>

        <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,color:"lightgrey",cursor:"pointer",}} onClick={()=>{navigate('/dashboard/nfl-touchdown')}}>
          NFL
        </Typography>
    </div>
        <Divider/>
        
         <RespGrid style={{display: "grid",
       
         marginTop:"1.3rem",
          //gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gridColumnGap: "15px",
          gridRowGap: "15px"}}> 
    
    <div onClick={()=>{navigate('/dashboard/football-goalscorers')}}
     style={{backgroundImage:`url(${SALAH})`,borderRadius:"0.5rem" , backgroundPosition: 'center', 
        backgroundSize: 'cover',fontWeight:"bold",fontSize:"1.2rem",cursor:"pointer",
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',
        backgroundRepeat: 'no-repeat', height:"210px", width:"210px" ,display:"flex",justifyContent:"center",alignItems:"center",color:"white", }} >GOAL SCORER</div>
   
   
    <div onClick={()=>{navigate('/dashboard/football-assists')}}
     style={{backgroundImage:`url(${BRUNO})`, borderRadius:"0.5rem",backgroundPosition: 'center', 
         boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)', cursor:"pointer", 
        backgroundSize: 'cover', height:"210px", width:"210px",display:"flex",justifyContent:"center",alignItems:"center",color:"white",fontWeight:"bold",fontSize:"1.2rem",
        backgroundRepeat: 'no-repeat', }}>ASSIST</div>
   
   
    <div onClick={()=>{navigate('/dashboard/football-cleansheet')}}
    style={{backgroundImage:`url(${ALISSON})`,borderRadius:"0.5rem",backgroundPosition: 'center',  
         boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',cursor:"pointer",
       backgroundSize: 'cover', height:"210px", width:"210px",display:"flex",justifyContent:"center",alignItems:"center",color:"white",fontWeight:"bold",fontSize:"1.2rem",
        backgroundRepeat: 'no-repeat', }}>CLEAN SHEET</div>
   
   
    <div onClick={()=>{navigate('/dashboard/football-teamwin')}}
     style={{backgroundImage:`url(${HALAAND})`,borderRadius:"0.5rem",backgroundPosition: 'center',  
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',cursor:"pointer",
        backgroundSize: 'cover', height:"210px", width:"210px",display:"flex",justifyContent:"center",alignItems:"center",color:"white",fontWeight:"bold",fontSize:"1.2rem",
        backgroundRepeat: 'no-repeat', }} >TEAM WIN</div>

         </RespGrid>
    

      {/* <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider> */}
    </StyledContent>
  </Container>

  {/*========================================================================== IF THEY ARE PART OF THIS LEAGUE  \/  =========================================================== */}

<>
    
   
    
   

   
      {user && user.competitions && user.competitions.includes(goalScorerCompetitionInFocus && goalScorerCompetitionInFocus.id)  &&  
      
      <Container   style={{display: 'flex',flexDirection:"column", justifyContent: 'space-between',flex:2, border: '1px solid #0000001A',   marginTop: '2%', marginBottom: '2%', borderRadius: '15px',backgroundColor:"#FAFAFA" }}>    
     
      
     <h4>FOOTBALL &nbsp; - &nbsp; Goal Scorer</h4>
     
     <div style={{display:"flex", justifyContent:"space-between"}}>
      <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,cursor:"pointer",}}>
          SELECT
        </Typography>

        <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,color:"lightgrey",cursor:"pointer",}} onClick={()=>{ loadAndNavigate() } }>
        { waiting?"loading..":'RESULTS' }
        </Typography>
    </div>
        <Divider/>


 <div>
    <p>Teams</p>  
    <div style={{ display: 'flex',flexDirection:"column" ,justifyContent: 'space-between', height:"100%",marginBottom: '50px' }}>
  
    <Select
          style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%"}}
         inputProps={{
        
      }}
        
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={chosenTeam}
          label="icon"
          onChange={(event) => {

             const teamNamesOnly =  leagueTeams.map((item)=>(item.name))

             const IdofInterest = teamNamesOnly.indexOf(event.target.value)


            getPremierLeagueTeamPlayersForGoalScorers(leagueTeams[IdofInterest].id)
            console.log("EVENT TARGET TEAM",event.target.value)
            setChosenTeam(event.target.value)
          }}
        >
       
       {leagueTeams && leagueTeams.length >0 ? leagueTeams.map((kiwi)=>(
  <MenuItem style={{color:"black"}} value={kiwi.name}>{kiwi.name}</MenuItem>
)):
<MenuItem style={{color:"black"}}  value={null}>{"No items listed!"}</MenuItem>
}
       
        </Select>


        </div>  
      </div>



      <div style={{marginTop:"-4rem"}}>
    <p>Player</p>  
    <div style={{ display: 'flex',flexDirection:"column" ,justifyContent: 'space-between', height:"100%",marginBottom: '50px' }}>
  
    <Select
          style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%"}}
         inputProps={{
       
           }}
        
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={chosenPlayer.name}
          label="icon"
          onChange={(event) => {

            const playerNamesOnly =  teamPlayersInFocus.map((item)=>(item.name))

             const IdofInterest = playerNamesOnly.indexOf(event.target.value)

           


            setChosenPlayer({teamId:teamPlayersInFocus[IdofInterest].id,
                             name:teamPlayersInFocus[IdofInterest].name,
                             userId:user.id,
                             teamName:user.teamName,
                             gameWeek:goalScorerCompetitionInFocus.currentGameWeek
                         })
            console.log("CHOSEN PLAYER IS--->",event.target.value)
         }}
        >
       
       {teamPlayers && teamPlayers.length >0 ? teamPlayers.map((kiwi)=>(
  <MenuItem style={{color:"black"}} value={kiwi.name}>{kiwi.name}</MenuItem>
)):
<MenuItem style={{color:"black"}}  value={null}>{"No items listed!"}</MenuItem>
}
       
        </Select>


        </div>  
      </div>


     
   
  <div style={{backgroundColor:'#F4F4F4', height:"2rem",color:"#260448",fontWeight:"bolder",display:"flex",justifyContent:"center",alignItems:"center"}}>SELECTION</div>
  


      <TextField
            style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%"}}
            fullWidth
            placeholder= "select a team or player"
            variant="outlined"
            multiline
            maxRows={2}
            value= {chosenPlayer && chosenPlayer.name}
           
           
            
            />


            <Button onClick={()=>{submitThisAssistPrediction(chosenPlayer,"Goal Scorer",leagueInFocus.leagueId)}}  style={{backgroundColor: '#260952',height:"3rem" ,color:'white',marginBottom:"6rem" }}>
            { loading?"Loading":"Submit"}
            </Button>

     </Container>
    }



{/*========================================================================== IF THEY ARE PART OF THIS COMPETITION  /\  =========================================================== */}


{/*========================================================================== IF THEY ARE NOT PART OF THIS COMPETITION \/ =========================================================== */}




{!(user && user.competitions && user.competitions.includes(goalScorerCompetitionInFocus && goalScorerCompetitionInFocus.id))   &&
      
      <Container   style={{display: 'flex',flexDirection:"column", justifyContent: 'space-between',flex:2, border: '1px solid #0000001A',   marginTop: '2%', marginBottom: '2%', borderRadius: '15px',backgroundColor:"#FAFAFA" }}>    

   <h4>FOOTBALL &nbsp; - &nbsp; Goal Scorer</h4>

     <div style={{display:"flex", justifyContent:"space-between"}}>
      <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,cursor:"pointer",}}>
          SELECT
        </Typography>

        <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,color:"lightgrey",cursor:"pointer",}} onClick={()=>{/*navigate('/dashboard/football-goalscorers-results')*/}}>
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
    }

  
   
  </>


</RespContent>
}
      </Container>
    </>
  );
}
