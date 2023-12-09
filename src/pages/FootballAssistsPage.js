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

import {submitAssistPrediction,getPremierLeagueTeamPlayers,getPremierLeagueTeams,joinCompetition,fetchAssistCompetitionInFocus} from 'src/redux/actions/football.action';

import { ToastContainer } from 'react-toastify';
import {CSSTransition,TransitionGroup} from 'react-transition-group';



import FLOGO from '../assets/images/fLogo.png';
import SALAH from '../assets/images/salah.jpeg';
import BRUNO from '../assets/images/BRUNO.jpeg';
import ALISSON from '../assets/images/ALISSON.jpeg'
import HALAAND from '../assets/images/HAALAND.jpeg'
import { notifyErrorFxn } from 'src/utils/toast-fxn';


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

export default function FootballAssistsPage() {
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

const userPrediction = {
  playerId:"YyDTzEVzE3ElDsfQ2EmU",
  playerName:"Marcus Rashford",
  userId:"el2iJl0WN1O3zqPu0ZVRWz1pUAl1",
  userName:"Farmers"
}

const assistCompId = "9DSs5TpMhPtMK7sNT4Jn"

const { premierLeagueTeams,teamPlayersInFocus,isLoading,assistCompetitionInFocus} = useSelector((state) => state.football);
const {user} = useSelector((state) => state.auth);
const [leagueTeams,setLeagueTeams] =  useState(premierLeagueTeams && premierLeagueTeams.length > 0? premierLeagueTeams:[])
const [teamPlayers,setTeamPlayers] =  useState([])
const [chosenPlayer,setChosenPlayer] = useState({})
const [chosenTeam,setChosenTeam] = useState('')
const [loading,setLoading] = useState(false)

const [joined,setJoined] =  useState(false)

useEffect(()=>{

 if(!leagueTeams.length){dispatch(getPremierLeagueTeams())}


 if(leagueTeams.length < 1 && premierLeagueTeams && premierLeagueTeams.length > 0){setLeagueTeams(premierLeagueTeams)}
 setTeamPlayers(teamPlayersInFocus)

},[premierLeagueTeams,teamPlayersInFocus])
  

useEffect(()=>{
 
  if(!leagueTeams.length){dispatch(getPremierLeagueTeams())}
 
 
  if(leagueTeams.length < 1 && premierLeagueTeams && premierLeagueTeams.length > 0){setLeagueTeams(premierLeagueTeams)}
  setTeamPlayers(teamPlayersInFocus)

 
 },[premierLeagueTeams,teamPlayersInFocus])


 useEffect(()=>{
 
  if(user && user.competitions && user.competitions.includes(assistCompId)){
  
     setJoined(true)
  
  }
   
   },[user])


   useEffect(()=>{
    dispatch(fetchAssistCompetitionInFocus(user.Leagues[0].leagueCode))
   })
  


const getPremierLeagueTeamPlayersForAssists = (teamId) =>{
  
     dispatch(getPremierLeagueTeamPlayers(teamId))
    
     console.log("TEAMS PLAYERS --->",teamPlayersInFocus)
}

const submitThisAssistPrediction = (prediction,compId,leagueId)=>{
 if(!chosenPlayer){
   notifyErrorFxn("Please select a player before submitting!")
 }else{
  dispatch(fetchAssistCompetitionInFocus(user && user.Leagues[0].leagueCode))
  setLoading(true)
 
  setTimeout(()=>{ 
    dispatch(submitAssistPrediction(prediction,compId,leagueId,assistCompetitionInFocus.gameWeekStarted,assistCompetitionInFocus.isOpen,user.pastAssistSelections))

    setLoading(false)
  }
    ,1300)
} 
}


const joinLeague = (compId,userId,accountBalance) => {

  dispatch(joinCompetition(compId,userId,accountBalance))

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
      <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,cursor:"pointer",}}>
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
        backgroundSize: 'cover',fontWeight:"bold",fontSize:"1.2rem",
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',cursor:"pointer",
        backgroundRepeat: 'no-repeat', height:"210px", width:"210px" ,display:"flex",justifyContent:"center",alignItems:"center",color:"white", }} >GOAL SCORER</div>
   
   
    <div  onClick={()=>{navigate('/dashboard/football-assists')}}
     style={{backgroundImage:`url(${BRUNO})`, borderRadius:"0.5rem",backgroundPosition: 'center', 
         boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',cursor:"pointer",  
        backgroundSize: 'cover', height:"210px", width:"210px",display:"flex",justifyContent:"center",alignItems:"center",color:"white",fontWeight:"bold",fontSize:"1.2rem",
        backgroundRepeat: 'no-repeat', }}>ASSIST</div>
   
   
    <div  onClick={()=>{navigate('/dashboard/football-cleansheet')}}
     style={{backgroundImage:`url(${ALISSON})`,borderRadius:"0.5rem",backgroundPosition: 'center',  
         boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',cursor:"pointer",
       backgroundSize: 'cover', height:"210px", width:"210px",display:"flex",justifyContent:"center",alignItems:"center",color:"white",fontWeight:"bold",fontSize:"1.2rem",
        backgroundRepeat: 'no-repeat', }}>CLEAN SHEET</div>
   
   
    <div  onClick={()=>{navigate('/dashboard/football-teamwin')}}
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



{ joined  && 

<Container   style={{display: 'flex',flexDirection:"column", justifyContent: 'space-between',flex:2, border: '1px solid #0000001A',   marginTop: '2%', marginBottom: '2%', borderRadius: '15px',backgroundColor:"#FAFAFA" }}>
    
   
    <div>

    <h4>FOOTBALL &nbsp; - &nbsp; Assist</h4>

    <div style={{display:"flex", justifyContent:"space-between"}}>
      <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,cursor:"pointer",}}>
          SELECT
        </Typography>

        <Typography onClick={()=>{navigate('/dashboard/football-assists-results')}} variant="h6" sx={{ textAlign: 'left', mb: 2,color:"lightgrey",cursor:"pointer",}} >
          RESULTS
        </Typography>
    </div>
    <Divider/>


    <p>Teams</p>  
    <div style={{ display: 'flex',flexDirection:"column" ,justifyContent: 'space-between', height:"100%",marginBottom: '50px' }}>
  
    <Select
          style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%"}}
         inputProps={{
         /* classes: {
              icon: classes.icon,
          },*/
      }}
        
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={chosenTeam}
          label="icon"
          onChange={(event) => {

             const teamNamesOnly =  leagueTeams.map((item)=>(item.name))

             const IdofInterest = teamNamesOnly.indexOf(event.target.value)


            getPremierLeagueTeamPlayersForAssists(leagueTeams[IdofInterest].id)
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
         /* classes: {
              icon: classes.icon,
          },*/
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
                             teamName:user.teamName
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


     
   
  <div style={{backgroundColor:/*"#f5f6ec"*/'#F4F4F4', height:"2rem",color:"#260448",fontWeight:"bolder",display:"flex",justifyContent:"center",alignItems:"center"}}>SELECTION</div>
  


      <TextField
            style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%"}}
            fullWidth
            placeholder= "select a team or player"
            variant="outlined"
            multiline
            maxRows={2}
            value= {chosenPlayer && chosenPlayer.name}
           //onChange = {(e)=>{setTitle(e.target.value)}}
           
            
            />


            <Button onClick={()=>{submitThisAssistPrediction(chosenPlayer,"Assist",user.Leagues[0].leagueId)}} style={{backgroundColor: '#260952',height:"3rem" ,color:'white',marginBottom:"6rem" }}>
             { loading?"Loading":"Submit"}
            </Button>

   
  </Container>

}


{/*========================================================================== IF THEY ARE NOT PART OF THIS LEAGUE \/ =========================================================== */}




{!joined  &&  
      
      <Container   style={{display: 'flex',flexDirection:"column", justifyContent: 'space-between',flex:2, border: '1px solid #0000001A',   marginTop: '2%', marginBottom: '2%', borderRadius: '15px',backgroundColor:"#FAFAFA" }}>    

   <h4>FOOTBALL &nbsp; - &nbsp; Assist</h4>

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
         <div>ENTRY FEE - {assistCompetitionInFocus && assistCompetitionInFocus.entryFee && (assistCompetitionInFocus.entryFee).toLocaleString()} &nbsp; PTS</div>
            <Button onClick={()=>{joinLeague(assistCompId,user.id,user.accountBalance)}}  style={{backgroundColor: '#260952',height:"4rem" ,color:'white',width:"75%"}}>
              JOIN
            </Button>
        </RespJoin>

     </Container>
    }

</RespContent>
}
      </Container>
    </>
  );
}
