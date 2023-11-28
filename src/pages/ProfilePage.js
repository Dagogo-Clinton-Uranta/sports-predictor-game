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
    width:"35rem",
    fontSize:"2.5rem ",
  
 },

}));


const RespInp = styled('input')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
     width:"100%",
    fontSize:"1.5rem ",
  },

  [theme.breakpoints.up('md')]: {
    width:"35rem",
    fontSize:"2.5rem ",
  
 },

}));



export default function ProfilePage() {
  const theme = useTheme();
 // const classes = useStyles()

  const navigate = useNavigate();
  const dispatch = useDispatch();
 const [title,setTitle] = useState( "10,000")

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

  {date:"11/11/23",action:"DEPOSIT",amount:"+50,000"},
  {date:"11/11/23",action:"GOAL SCORER",amount:"20,000"},
  {date:"11/11/23",action:"TEAM WIN",amount:"-10,000"},
  {date:"11/11/23",action:"ASSIST WIN",amount:"+100,000"},
  {date:"11/11/23",action:"DEPOSIT",amount:"+50,000"},
  {date:"11/11/23",action:"GOAL SCORER",amount:"20,000"},

 
 
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

          <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <a href={HOWTO} download >
         <Button onClick={()=>{}}  style={{backgroundColor: '#260952',height:"4.2rem" ,color:'white',margin:"0 auto",width:"rem" }}>
              How To Play
            </Button>
            </a>

            </div>


        { <RespContent  style={{ display:'flex',  marginTop: '5%',gap:"1rem", marginBottom: '5%'}}>


        <Container  style={{display: 'flex',flexDirection:"column",flex:4, justifyContent: 'center',alignItems:"center", gap:"1rem",marginTop: '2%', marginBottom: '2%', }}>

<Container  style={{display: 'flex', justifyContent: 'center',alignItems:"center", border: '1px solid #0000001A', borderRadius: '15px',backgroundColor:"#FAFAFA"}}>
    <StyledContent>


     <div style={{display:"flex", justifyContent:"space-between"}}>
      <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,cursor:"pointer",}}>
          AMOUNT
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
            
            placholder= "select a team or player"
            value= {title}
           onChange = {(e)=>{setTitle(e.target.value)}}
           
            
            />
        
        
      <div style={{fontSize:"1rem",marginBottom:"20px"}}>
      POINTS
      </div>
        </RespVar>
 
    
       
 

       </RespGrid>

       <Button onClick={()=>{}}  style={{backgroundColor: '#260952',height:"4.2rem" ,color:'white',margin:"0 auto",width:"30%" }}>
              Submit
            </Button>
    

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


<div /*onClick={()=>{navigate('/dashboard/football-cleansheet')}}*/
style={{backgroundColor:`#FFFFFF`,borderRadius:"0.5rem",backgroundPosition: 'center',  border: '1px solid #0000001A', 
    
   backgroundSize: 'cover', height:"90px" ,display:"flex",justifyContent:"flex-start",alignItems:"center",color:"black",fontWeight:"bold",fontSize:"1.1rem",gap:"10%",padding:"1rem",
    backgroundRepeat: 'no-repeat' }}>
      
     
      <div >
       11/11/2023
      </div>


      <div>
      GOALSCORER
      </div>
    
    </div>


<div /*onClick={()=>{navigate('/dashboard/football-cleansheet')}}*/
style={{backgroundColor:`#FFFFFF`,borderRadius:"0.5rem",backgroundPosition: 'center',  border: '1px solid #0000001A', 
    
   backgroundSize: 'cover', height:"90px", width:"100%",display:"flex",justifyContent:"flex-start",alignItems:"center",color:"black",fontWeight:"bold",fontSize:"1.1rem",gap:"10%",padding:"1rem",
    backgroundRepeat: 'no-repeat' }}>

     <div >
       11/11/2023
      </div>


      <div >
      TEAM WIN
      </div>
  </div>



     </div>
    

      {/* <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider> */}
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
