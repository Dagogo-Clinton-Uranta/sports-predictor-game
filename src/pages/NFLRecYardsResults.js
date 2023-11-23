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

import BloodInvestigation from 'src/components/treatment/blood-investigation';
import Prescription from 'src/components/treatment/prescription';
import Radiology from 'src/components/treatment/radiology';
import ECG from 'src/components/treatment/ecg';
import Referrals from 'src/components/treatment/referrals';
import Countdown from 'react-countdown';

import FLOGO from '../assets/images/fLogo.png';
import NFL4 from '../assets/images/NFL4.jpeg';
import NFL1 from '../assets/images/NFL1.jpeg';
import NFL2 from '../assets/images/NFL2.jpeg'
import NFL3 from '../assets/images/NFL3.jpeg'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';


const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '50vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(5, 5, 12, 5),
}));


const standingsList = [
  {userName:"Avengers",pick:"Salah"},
  {userName:"BB Team",pick:"Fernandes"},
  {userName:"C Team",pick:"Kane"},
  {userName:"Tots",pick:"Son"}
]


export default function NFLReceivingYardsResultsPage() {
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
        { <Container  style={{ display:'flex',  marginTop: '5%',gap:"1rem", marginBottom: '5%'}}>

<Container  style={{display: 'flex', justifyContent: 'center',alignItems:"center",flex:4, border: '1px solid #0000001A',  marginTop: '2%', marginBottom: '2%', borderRadius: '15px',backgroundColor:"#FAFAFA" }}>
    <StyledContent>


     <div style={{display:"flex", justifyContent:"space-between"}}>
      <Typography variant="h6" sx={{ textAlign: 'left', mb: 2,color:"lightgray"}} onClick={()=>{navigate('/dashboard/football-goalscorers')}}>
          Football
        </Typography>

        <Typography variant="h6" sx={{ textAlign: 'left', mb: 2}}>
          NFL
        </Typography>
    </div>
        <Divider/>
        
        <div style={{display: "grid",
       
       marginTop:"1.3rem",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        gridColumnGap: "15px",
        gridRowGap: "15px"}}> 
  
  <center  onClick={()=>{navigate('/dashboard/nfl-touchdowns')}}
   style={{backgroundImage:`url(${NFL4})`,borderRadius:"0.5rem" , backgroundPosition: 'center', padding:"10px",
      backgroundSize: 'cover',fontWeight:"bold",fontSize:"1.2rem",
      boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',
      backgroundRepeat: 'no-repeat', height:"210px", width:"210px" ,display:"flex",justifyContent:"center",alignItems:"center",color:"white", }} >3+ TOUCHDOWN</center>
 
 
  <center onClick={()=>{navigate('/dashboard/nfl-recyards')}}
   style={{backgroundImage:`url(${NFL1})`, borderRadius:"0.5rem",backgroundPosition: 'center', padding:"10px",
       boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',  
      backgroundSize: 'cover', height:"210px", width:"210px",display:"flex",justifyContent:"center",alignItems:"center",color:"white",fontWeight:"bold",fontSize:"1.2rem",
      backgroundRepeat: 'no-repeat', }}>50+ RECEIVING YARDS</center>
 
 
  <center onClick={()=>{navigate('/dashboard/nfl-rushyards')}}
   style={{backgroundImage:`url(${NFL2})`,borderRadius:"0.5rem",backgroundPosition: 'center', padding:"10px", 
       boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',
     backgroundSize: 'cover', height:"210px", width:"210px",display:"flex",justifyContent:"center",alignItems:"center",color:"white",fontWeight:"bold",fontSize:"1.2rem",
      backgroundRepeat: 'no-repeat', }}>50+ RUSHING YARDS</center>
 
 
  <center onClick={()=>{navigate('/dashboard/nfl-teamwin')}}
   style={{backgroundImage:`url(${NFL3})`,borderRadius:"0.5rem",backgroundPosition: 'center', padding:"10px", 
      boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',
      backgroundSize: 'cover', height:"210px", width:"210px",display:"flex",justifyContent:"center",alignItems:"center",color:"white",fontWeight:"bold",fontSize:"1.2rem",
      backgroundRepeat: 'no-repeat', }} >TEAM WIN</center>

       </div>
    

      {/* <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider> */}
    </StyledContent>
  </Container>
  <Container   style={{display: 'flex',flexDirection:"column", justifyContent: 'space-between',flex:2, border: '1px solid #0000001A',   marginTop: '2%', marginBottom: '2%', borderRadius: '15px',backgroundColor:"#FAFAFA" }}>
    
    
   
    <TableContainer component={Paper} style={{marginTop:"0rem"}}>
          
    <h4>NFL &nbsp; - &nbsp; Touchdown</h4>
    
         
    <div style={{display:"flex", justifyContent:"space-between"}}>
      <Typography  onClick={()=>{navigate('/dashboard/nfl-recyards')}}  variant="h6" sx={{ textAlign: 'left', mb: 2,color:"lightgrey"}}>
          PREDICT
        </Typography>
    
        <Typography  variant="h6" sx={{ textAlign: 'left', mb: 2}} >
          RESULTS
        </Typography>
    </div>
        <Divider/>
    
    
            <Table sx={{ tableLayout:"fixed",backgroundColor:"#FAFAFA" }} aria-label="custom pagination table">
              <TableHead  sx={{backgroundColor:"#FAFAFA " }} >
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="left">Username</TableCell>
                  <TableCell align="left">Pick</TableCell>
                
                 
                </TableRow>
              </TableHead>
    
             <Divider/>
    
              <TableBody>
                {standingsList.map((row,index) => (
                      <TableRow key={index}>
                        <TableCell style={{ width: 140,borderBottom:"1px solid lightgrey" }} component="th" scope="row">
                          {index+1}
                        </TableCell>
                        <TableCell style={{ width: 140,borderBottom:"1px solid lightgrey" }} align="left">
                          {row.userName}
                        </TableCell>
                        <TableCell style={{ width: 140,borderBottom:"1px solid lightgrey" }} align="left">
                      
                        {row.pick}
                        </TableCell>
                        </TableRow>  
                      ))
        
                      
                }
        
                    
               </TableBody>
             </Table>
           </TableContainer>
       
      </Container>
    


</Container>
}
      </Container>
    </>
  );
}
