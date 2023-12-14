import { Grid, Container, Typography, Button, Paper, CircularProgress, Divider, Select, MenuItem, makeStyles, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
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
import {fetchAllCompetitionsInOneLeague, fetchAllUsersInOneLeague, startCompetition,updateUserBalance } from 'src/redux/actions/football.action';
import { ToastContainer } from 'react-toastify';
import {CSSTransition,TransitionGroup} from 'react-transition-group';


import BloodInvestigation from 'src/components/treatment/blood-investigation';
import Prescription from 'src/components/treatment/prescription';
import Radiology from 'src/components/treatment/radiology';
import ECG from 'src/components/treatment/ecg';
import Referrals from 'src/components/treatment/referrals';
import Countdown from 'react-countdown';

import FLOGO from '../assets/images/fLogo.png';
import SALAH from '../assets/images/salah.jpeg';
import BRUNO from '../assets/images/BRUNO.jpeg';
import ALISSON from '../assets/images/ALISSON.jpeg'
import HALAAND from '../assets/images/HAALAND.jpeg'
import './points.css'
import { Input, InputLabel } from '@material-ui/core';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import ManageButtonComponent from './ManageButtonComponent';


const StyledContent = styled('div')(({ theme }) => ({
  width: "100%",
  margin: 'auto',
  minHeight: '50vh',
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  padding: theme.spacing(5, 5, 12, 5),
}));


const RespContent = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
  },
}));



const RespGrid = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: "repeat(1, 1fr)",
    
  },

  [theme.breakpoints.up('md')]: {
    //gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateColumns: "1fr",
    
  
  },
}));


const RespHidden = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
     display:"none",
   
  },

  [theme.breakpoints.up('md')]: {
    display:"inline",
  
 },

}));



const RespVisible = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    
     display:"inline",
   
  },

  [theme.breakpoints.up('md')]: {
    display:"none",
  
 },

}));



const RespVar = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
     width:"100%",
    fontSize:"1.5rem ",
    flexDirection:"column",
    gap:"1.5rem",
  },

  [theme.breakpoints.up('md')]: {
    width:"52rem",
    fontSize:"2.5rem ",
  
 },

}));


const RespVar2 = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
     width:"100%",
    fontSize:"1.5rem ",
    flexDirection:"row",
    gap:"0.5rem",
  },

  [theme.breakpoints.up('md')]: {
    width:"42rem",
    fontSize:"2.5rem ",
  
 },

}));


const RespSelect = styled('select')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
     width:"100%",
    fontSize:"1rem ",
    flexDirection:"column",
    gap:"0.5rem",
    height:"2rem",
  },

  [theme.breakpoints.up('md')]: {
    width:"42rem",
    fontSize:"1.5rem ",
  
 },

}));





const RespButton = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
     width:"100%",
   
  },

  [theme.breakpoints.up('md')]: {
    width:"30%",
    marginTop:"1.5rem"
   
  
 },

}));


const RespInp = styled('input')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
     width:"100%",
    fontSize:"1.5rem ",
    border: '1px solid #0000001A'
  },

  [theme.breakpoints.up('md')]: {
    width:"35rem",
    fontSize:"1.6rem ",
    border: '1px solid #0000001A'
  
 },

}));


const RespButton2 = styled('button')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
     width:"100%",
     fontSize:"1.2rem ",
     height:"10rem",
     borderRadius:"10px"
  },


  [theme.breakpoints.up('md')]: {
    width:"20rem",
    fontSize:"1.2rem ",
    height:"4rem",
    borderRadius:"10px"
 }

  
}));

const RespSelect2 = styled('select')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
     width:"100%",
     fontSize:"1.2rem ",
     height:"10rem",
   
  },


  [theme.breakpoints.up('md')]: {
    width:"46%",
    fontSize:"1.5rem ",
    height:"4rem",
   
 }

  
}));


const RespDeposit = styled('button')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
     width:"100%",
     borderRadius:"0.5rem"
     
  },


  [theme.breakpoints.up('md')]: {
    width:"30%",
    borderRadius:"0.5rem"
   
   
 }

  
}));





export default function EntryPage() {
  const theme = useTheme();
 // const classes = useStyles()

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

 // const { allCompetitionsInOneLeague,allUsersInOneLeague,userInFocusForDeposits,depositCanChangeNow } = useSelector((state) => state.football);


  const [dropDown,setDropDown] = useState(false)


  const [title,setTitle] = useState( "")

  const [loading,setLoading] = useState(false)

  const [sportName,setSportName] = useState('Football')
  const [deadline,setDeadline] = useState('')
  const [entryFee, setEntryFee] = useState('')
  const [leagueId,setLeagueId] = useState()
  const [compName, setCompName] = useState('')
  //const  [userInFocus,setUserInFocus] = useState(userInFocusForDeposits)

  const addObject = {
    sportName,
    deadline,
    entryFee,
    leagueId,
    compName
 
   }



   
useEffect(()=>{

   // dispatch(fetchAllCompetitionsInOneLeague(user && user.Leagues[0].leagueCode))
   // dispatch(fetchAllUsersInOneLeague(user && user.Leagues[0].leagueCode,user && user.Leagues[0].leagueName))
 console.log("WHATS THE ISSUE?")

},[])



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
const standingsList = [

  {date:"Avengers",action:"MANAGE",amount:"50,000"},
  {date:"BB Team",action:"MANAGE",amount:"20,000"},
  {date:"919 Defenders",action:"MANAGE",amount:"10,000"},
  {date:"Avengers",action:"MANAGE",amount:"100,000"},
  {date:"919 Defenders",action:"MANAGE",amount:"50,000"},
  {date:"BB Team",action:"MANAGE",amount:"20,000"},

 
 
]


const startThisCompetition = async(addObject,navigate) => {
   
  if(!sportName || !deadline ||!entryFee ||!leagueId||!compName){
    notifyErrorFxn("Please make sure to fill in all fields.")
  }
  else{
 
  setLoading(true)
  dispatch(startCompetition(addObject,navigate))
 
  // console.log("identity is",identity)
  // console.log("update this subject is updating.........")
  setTimeout(()=>{setLoading(false)},1800)
  }
}

const updateThisUserBalance = async(userInFocus,leagueCode,leagueName) =>{

 if (window.confirm(`are you sure you want to update the balance for team "${userInFocus && userInFocus.teamName}" ?`)){

    dispatch(updateUserBalance(userInFocus.id,userInFocus.accountBalance,leagueCode,leagueName )) 

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


        <Container  style={{display: 'flex',flexDirection:"column",flex:4, justifyContent: 'center',alignItems:"center", gap:"1rem",marginTop: '2%', marginBottom: '2%', }}>

<Container  style={{display: 'flex', justifyContent: 'center',alignItems:"center", border: '1px solid #0000001A', borderRadius: '15px',backgroundColor:"#FAFAFA"}}>
    <StyledContent>


     <div style={{display:"flex", justifyContent:"space-between"}}>
      <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,cursor:"pointer",}}>
         ENTER LEAGUE CODE
        </Typography>

       {/*  <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,color:"lightgrey",cursor:"pointer",}} onClick={()=>{navigate('/dashboard/nfl-touchdown')}}>
          NFL
        </Typography>*/}
    </div>
        <Divider/>
        
        <center style={{display:"flex",justifyContent:"center",width:"100%"}}>
        <RespGrid style={{display: "grid",
     
       marginTop:"1.3rem",
       // gridTemplateColumns: "repeat(1, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        gridColumnGap: "15px",
        gridRowGap: "15px"}}> 
  
 
  
        
      
        
       
  <RespVar
  style={{backgroundColor:`#FFFFFF`,borderRadius:"0.5rem",backgroundPosition: 'center',   border: '1px solid #0000001A',
      
     backgroundSize: 'cover', height:"90px",display:"flex",justifyContent:"center",alignItems:"center",color:"black",fontWeight:"bold",paddingRight:"2rem",paddingLeft:"2rem",
      backgroundRepeat: 'no-repeat', }}>
        
      

     {/* <div >
      10,000
      </div>*/}

      <RespInp className="bigPoints"
            style={{backgroundColor:"#FFFFFF",border:"0px solid white",width:"100%",fontWeight:"bold"}}
            
            
            value= {title}
           onChange = {(e)=>{setTitle(e.target.value)}}
           
            
            />
        
        
      <div style={{fontSize:"1rem",marginBottom:"20px"}}>
      CODE
      </div>
        </RespVar>
     


        <RespVar
  style={{backgroundColor:`#FAFAFA`,borderRadius:"0.5rem",backgroundPosition: 'center',   border: '0px solid #0000001A',
      
     backgroundSize: 'cover', height:"70px",display:"flex",justifyContent:"space-around",alignItems:"center",color:"black",marginBottom:"1rem",
      backgroundRepeat: 'no-repeat', }}>
        
        
        
        
        <RespButton2 onClick={()=>{navigate('/dashboard/create-league')}}  style={{backgroundColor: '#260952',height:"4.2rem" ,color:'white' }}>
              Create League
         </RespButton2>
      



     
        <RespButton2 onClick={()=>{}}  style={{backgroundColor: '#260952',height:"4.2rem" ,color:'white' }}>
              Join League
         </RespButton2>
      


          
        </RespVar>




       </RespGrid>
       </center>


      {/* <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"2rem"}}>
        
       <RespButton>
        <Button onClick={()=>{startThisCompetition(addObject)}}  style={{backgroundColor: '#260952',height:"4.2rem" ,color:'white',width:"100%" }}>
              Submit
         </Button>
      </RespButton>


         

        </div>*/}
    

   </StyledContent>
  </Container>





</Container> 




</RespContent>
}
      </Container>
    </>
  );
}
