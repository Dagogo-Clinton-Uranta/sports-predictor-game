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


const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '50vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(5, 5, 12, 5),
}));





export default function NFLPlayersPage() {
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

<Container  style={{display: 'flex', justifyContent: 'center',alignItems:"center",flex:4, border: '1px solid #0000001A',  marginTop: '2%', marginBottom: '2%', borderRadius: '15px',backgroundColor:"#f4f0ec" }}>
    <StyledContent>


     <div style={{display:"flex", justifyContent:"space-between"}}>
      <Typography variant="h6" sx={{ textAlign: 'left', mb: 2}}>
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
  
  <div style={{backgroundImage:`url(${NFL4})`,borderRadius:"0.5rem" , backgroundPosition: 'center', 
      backgroundSize: 'cover',fontWeight:"bold",fontSize:"1.4rem",
      boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',
      backgroundRepeat: 'no-repeat', height:"210px", width:"210px" ,display:"flex",justifyContent:"center",alignItems:"center",color:"white", }} >3+ TOUCHDOWN</div>
 
 
  <div style={{backgroundImage:`url(${NFL1})`, borderRadius:"0.5rem",backgroundPosition: 'center', 
       boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',  
      backgroundSize: 'cover', height:"210px", width:"210px",display:"flex",justifyContent:"center",alignItems:"center",color:"white",fontWeight:"bold",fontSize:"1.4rem",
      backgroundRepeat: 'no-repeat', }}>50+ RECIEVING YARDS</div>
 
 
  <div style={{backgroundImage:`url(${NFL2})`,borderRadius:"0.5rem",backgroundPosition: 'center',  
       boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',
     backgroundSize: 'cover', height:"210px", width:"210px",display:"flex",justifyContent:"center",alignItems:"center",color:"white",fontWeight:"bold",fontSize:"1.4rem",
      backgroundRepeat: 'no-repeat', }}>50+ RUSHING YARDS</div>
 
 
  <div style={{backgroundImage:`url(${NFL3})`,borderRadius:"0.5rem",backgroundPosition: 'center',  
      boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',
      backgroundSize: 'cover', height:"210px", width:"210px",display:"flex",justifyContent:"center",alignItems:"center",color:"white",fontWeight:"bold",fontSize:"1.4rem",
      backgroundRepeat: 'no-repeat', }} >100+ PASSING YARDS</div>

       </div>
    

      {/* <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider> */}
    </StyledContent>
  </Container>

<Container   style={{display: 'flex',flexDirection:"column", justifyContent: 'space-between',flex:2, border: '1px solid #0000001A',   marginTop: '2%', marginBottom: '2%', borderRadius: '15px',backgroundColor:"#f4f0ec" }}>
    
   
    
    <div>
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
          value={"Select a Team"}
          label="icon"
          onChange={(event) => {
          
          }}
        >
       
       {premTeams && premTeams.length >0 ? premTeams.map((kiwi)=>(
  <MenuItem style={{color:"black"}} value={kiwi}>{kiwi}</MenuItem>
)):
<MenuItem style={{color:"black"}}  value={null}>{"No items listed!"}</MenuItem>
}
       
        </Select>


        </div>  
      </div>


      <div style={{marginTop:"-6rem"}}>
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
          value={"Select a Team"}
          label="icon"
          onChange={(event) => {
          
          }}
        >
       
       {premTeams && premTeams.length >0 ? premTeams.map((kiwi)=>(
  <MenuItem style={{color:"black"}} value={kiwi}>{kiwi}</MenuItem>
)):
<MenuItem style={{color:"black"}}  value={null}>{"No items listed!"}</MenuItem>
}
       
        </Select>


        </div>  
      </div>

  <div style={{backgroundColor:"lightgrey", color:"#260448",textAlign:"center"}}>SELECTION</div>
    
      <TextField
            style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%"}}
            fullWidth
            placeholder=" Add blood investigation"
            variant="outlined"
            multiline
            maxRows={2}
            value= {"Arsenal"}
           //onChange = {(e)=>{setTitle(e.target.value)}}
           
            
            />


            <Button style={{backgroundColor: '#260952',height:"3rem" ,color:'white',marginBottom:"6rem" }}>
              Submit
            </Button>

   
  </Container>


</Container>
}
      </Container>
    </>
  );
}
