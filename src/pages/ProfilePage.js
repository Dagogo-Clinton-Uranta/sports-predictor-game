import { Grid, Container, Typography, Button, Paper, CircularProgress, Divider, Select, MenuItem, makeStyles, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
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



import {fetchAllCompetitionsInOneLeague,fetchAllCompetitionsForOneUser, fetchAllUsersInOneLeague, startCompetition,updateUserBalance } from 'src/redux/actions/football.action';

import HOWTO from '../assets/images/HOW-TO-PLAY.pdf'
import './points.css'

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
  [theme.breakpoints.down('xl')]: {
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


const RespFlex = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display:"flex",
    flexDirection:"column",
    gap:"1.5rem",
    justifyContent:"space-between",
    width:"100%"
  },

  [theme.breakpoints.up('md')]: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    width:"100%"
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


const RespVar = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
     width:"100%",
    fontSize:"1.5rem ",
  },

  [theme.breakpoints.up('md')]: {
    width:"42rem",
    fontSize:"2.5rem ",
  
 },

}));


const RespInp = styled('input')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
     width:"100%",
    fontSize:"1.5rem ",
  },

  [theme.breakpoints.up('md')]: {
    width:"38rem",
    fontSize:"2.5rem ",
  
 },

}));


const RespButton = styled('button')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
     width:"100%",
     borderRadius:"0.5rem"
   
  },

  [theme.breakpoints.up('md')]: {
    width:"30%",
    marginTop:"1.5rem",
    borderRadius:"0.5rem"
   
  
 },

}));




export default function ProfilePage() {
  const theme = useTheme();
 // const classes = useStyles()

  const navigate = useNavigate();
  const dispatch = useDispatch();
 const [title,setTitle] = useState( "")

 const { user } = useSelector((state) => state.auth);

 useEffect(()=>{

  if(user && !user.Leagues ||user && user.Leagues &&  user.Leagues.length === 0){
    navigate('/dashboard/entry')
  }
   },[user])


 
 const { allCompetitionsForOneUser,allCompetitionsInOneLeague,allUsersInOneLeague,userInFocusForDeposits,depositCanChangeNow } = useSelector((state) => state.football);
 console.log("ALL COMPETITIONS FOR ONE USER--->",allCompetitionsForOneUser)
    
useEffect(()=>{

  dispatch(fetchAllCompetitionsInOneLeague(user && user.Leagues &&  user.Leagues.length && user.Leagues[0].leagueCode))

   dispatch(fetchAllCompetitionsForOneUser(user && user.competitions))


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

 /* {date:"11/11/23",action:"DEPOSIT",amount:"+50,000"},
  {date:"11/11/23",action:"GOAL SCORER",amount:"20,000"},
  {date:"11/11/23",action:"TEAM WIN",amount:"-10,000"},
  {date:"11/11/23",action:"ASSIST WIN",amount:"+100,000"},
  {date:"11/11/23",action:"DEPOSIT",amount:"+50,000"},
  {date:"11/11/23",action:"GOAL SCORER",amount:"20,000"},*/

 
 
]

  

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

         {/* <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <a href={HOWTO} download >
         <Button onClick={()=>{}}  style={{backgroundColor: '#260952',height:"4.2rem" ,color:'white',margin:"0 auto",width:"rem" }}>
              How To Play
            </Button>
            </a>

         </div>*/}


        { <RespContent  style={{ display:'flex',  marginTop: '5%',gap:"1rem", marginBottom: '5%'}}>


        <Container  style={{display: 'flex',flexDirection:"column",flex:4, justifyContent: 'center',alignItems:"center", gap:"1rem",marginTop: '2%', marginBottom: '2%', }}>

<Container  style={{display: 'flex', justifyContent: 'center',alignItems:"center", border: '1px solid #0000001A', borderRadius: '15px',backgroundColor:"#FAFAFA"}}>
    <StyledContent>


     <div style={{display:"flex", justifyContent:"space-between"}}>
      <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,cursor:"pointer",}}>
          DEPOSIT
        </Typography>

       {/*  <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,color:"lightgrey",cursor:"pointer",}} onClick={()=>{navigate('/dashboard/nfl-touchdown')}}>
          NFL
        </Typography>*/}
    </div>
        <Divider/>
        
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
      POINTS
      </div>
        </RespVar>
 
    
       
 

       </RespGrid>

       <RespButton onClick={()=>{}}  style={{backgroundColor: '#260952',height:"4.2rem" ,color:'white',margin:"0 auto" }}>
              DEPOSIT
            </RespButton>
    

   </StyledContent>
  </Container>

  <Container  style={{display: 'flex', justifyContent: 'flex-start',alignItems:"flex-start",flex:4, border: '1px solid #0000001A', borderRadius: '15px',backgroundColor:"#FAFAFA"}}>
    <StyledContent>


     <div style={{display:"flex", justifyContent:"space-between"}}>
      <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,cursor:"pointer",}}>
          COMPETITIONS
        </Typography>

       {/*  <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,color:"lightgrey",cursor:"pointer",}} onClick={()=>{navigate('/dashboard/nfl-touchdown')}}>
          NFL
        </Typography>*/}
    </div>
        <Divider/>
        
        <div style={{display: "grid",
     
     marginTop:"1.3rem",
   
      gridTemplateColumns: "repeat(1, 1fr)",
      gridTemplateRows: "repeat(2, 1fr)",
      gridColumnGap: "15px",
      gridRowGap: "15px"}}> 

{allCompetitionsForOneUser && allCompetitionsForOneUser.map((item)=>(



<div 
style={{backgroundColor:`#FFFFFF`,borderRadius:"0.5rem",backgroundPosition: 'center',  border: '1px solid #0000001A', marginLeft:"-1rem",
    
   backgroundSize: 'cover', height:"90px", width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",color:"black",fontWeight:"bold",fontSize:"1.1rem",gap:"10%",padding:"1rem",
    backgroundRepeat: 'no-repeat', }}>
      
     
      <RespHidden>
      {item.dateCreated &&typeof(item.dateCreated) !== "string"  ?(new Date(item.dateCreated.seconds*1000)).toDateString():item.dateCreated}
      </RespHidden>


      <div>
      {item.compName}
      </div>


      <div>
      {/*+10,000 PTS*/}
      </div>
    
  </div>
    )

      )}  






     </div>
    

      {/* <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider> */}
    </StyledContent>
  </Container>




  <Container  style={{display: 'flex', justifyContent: 'center',alignItems:"center", border: '1px solid #0000001A', borderRadius: '15px',backgroundColor:"#FAFAFA"}}>
    <StyledContent>


     <div style={{display:"flex", justifyContent:"space-between"}}>
      <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,cursor:"pointer",}}>
          JOIN LEAGUE
        </Typography>

       {/*  <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,color:"lightgrey",cursor:"pointer",}} onClick={()=>{navigate('/dashboard/nfl-touchdown')}}>
          NFL
        </Typography>*/}
    </div>
        <Divider/>
        
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
 
    
       
 

       </RespGrid>


       <RespFlex>
            <RespButton onClick={()=>{navigate('/dashboard/entry')}}  style={{backgroundColor: '#260952',height:"4.2rem" ,color:'white',margin:"0 auto" }}>
              JOIN
            </RespButton>

            <RespButton onClick={()=>{navigate('/dashboard/create-league')}}  style={{backgroundColor: '#260952',height:"4.2rem" ,color:'white',margin:"0 auto" }}>
              CREATE LEAGUE
            </RespButton>
         </RespFlex>

    

   </StyledContent>
  </Container>

</Container> 

<Container   style={{display: 'flex',flexDirection:"column", justifyContent: 'space-between',flex:2, border: '1px solid #0000001A',   marginTop: '2%', marginBottom: '2%', borderRadius: '15px',backgroundColor:"#FAFAFA" }}>
    
   
<TableContainer component={Paper} style={{marginTop:"2.7rem"}}>
      
 
{/*<h4>FOOTBALL &nbsp; - &nbsp; Goal Scorer</h4>*/}

     
<div style={{display:"flex", justifyContent:"space-between"}}>
  {/*<Typography  onClick={()=>{navigate('/dashboard/football-goalscorers')}}  variant="h6" sx={{ textAlign: 'left', mb: 2,color:"lightgrey",cursor:"pointer",}}>
      SELECT
    </Typography>*/}

    <Typography  variant="h6" sx={{ textAlign: 'left', mb: 2,cursor:"pointer",}} >
      TRANSACTIONS
    </Typography>
</div>
    <Divider/>


        <Table sx={{ tableLayout:"fixed",backgroundColor:"#FAFAFA" }} aria-label="custom pagination table">
          {/*<TableHead  sx={{backgroundColor:"#FAFAFA  !important" }} >
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Username</TableCell>
              <TableCell align="left">Pick</TableCell>
            
             
            </TableRow>
          </TableHead>*/}

         <Divider/>

          <TableBody style={{ paddingBottom:"1rem" }}>
            {standingsList.map((row,index) => (
                  <TableRow key={index}>
                    <TableCell style={{ width: 140,borderBottom:"1px solid lightgrey" }} component="th" scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell style={{ width: 140,borderBottom:"1px solid lightgrey" }} align="left">
                      {row.action}
                    </TableCell>
                    <TableCell style={{ width: 140,borderBottom:"1px solid lightgrey" }} align="left">
                  
                    {row.amount}
                    </TableCell>
                    </TableRow>  
                  ))
    
                  
            }
    
                
           </TableBody>
         </Table>
       </TableContainer>
   
  </Container>



  


</RespContent>
}
      </Container>
    </>
  );
}
