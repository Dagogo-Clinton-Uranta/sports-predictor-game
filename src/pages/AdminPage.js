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
import './points.css'
import { Input, InputLabel } from '@material-ui/core';


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


const RespVar = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
     width:"100%",
    fontSize:"1.5rem ",
    flexDirection:"column",
    gap:"0.5rem",
  },

  [theme.breakpoints.up('md')]: {
    width:"42rem",
    fontSize:"2.5rem ",
  
 },

}));




const RespButton = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
     width:"55%",
   
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


const RespInp2 = styled('Input')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
     width:"100%",
     fontSize:"1.2rem ",
   
  },


  [theme.breakpoints.up('md')]: {
    width:"46%",
    fontSize:"1.5rem ",
   
 }

  
}));



export default function ProfilePage() {
  const theme = useTheme();
 // const classes = useStyles()

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title,setTitle] = useState( "")


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
         START COMPETITION
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
      
     backgroundSize: 'cover', height:"70px",display:"flex",justifyContent:"space-between",alignItems:"center",color:"black",fontWeight:"bold",paddingRight:"2rem",paddingLeft:"2rem",
      backgroundRepeat: 'no-repeat', }}>
        
        <div >
      
      </div>
        
       
          
      <Select
          style={{backgroundColor:"#FFFFFF",'.MuiOutlinedInput-notchedOutline': { border: 0 },  boxShadow: 'none',borderRadius:"0.1rem",width:"100%",height:"100%"}}
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
  <MenuItem style={{color:"black"}} value={1}>{1}</MenuItem>
  <MenuItem style={{color:"black"}}  value={2}>{2}</MenuItem>
     
        </Select>
        
     { /*  
      <div style={{fontSize:"1rem",marginBottom:"20px"}}>
      POINTS
      </div>
      */}
        </RespVar>


        <RespVar
  style={{backgroundColor:`#FAFAFA`,borderRadius:"0.5rem",backgroundPosition: 'center',   border: '0px solid #0000001A',
      
     backgroundSize: 'cover', height:"70px",display:"flex",justifyContent:"space-between",alignItems:"center",color:"black",marginBottom:"1rem",
      backgroundRepeat: 'no-repeat', }}>
        
        
        
      <RespInp2 className= "adminBigPoints"
            style={{backgroundColor:"#FFFFFF",border: '1px solid #0000001A',height:"100%",fontWeight:"bold"}}
            
            placeholder= {"ENTRY FEE"}
           // value= { title}
           // onChange = {(e)=>{setTitle(e.target.value)}}
           
            
            />


<RespInp2 className= "adminBigPoints"
            style={{backgroundColor:"#FFFFFF",border: '1px solid #0000001A',height:"100%",fontWeight:"bold"}}
            
            placeholder= {"DEADLINE"}
            //value= { title}
            //onChange = {(e)=>{setTitle(e.target.value)}}
           
            
            />
          
        </RespVar>




       </RespGrid>



       <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"2rem"}}>
        
       <RespButton>
        <Button onClick={()=>{}}  style={{backgroundColor: '#260952',height:"4.2rem" ,color:'white',width:"100%" }}>
              Submit
         </Button>
      </RespButton>


         

        </div>
    

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
style={{backgroundColor:`#FFFFFF`,borderRadius:"0.5rem",backgroundPosition: 'center',  border: '1px solid #0000001A', marginLeft:"-1rem",
    
   backgroundSize: 'cover', height:"90px", width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",color:"black",fontWeight:"bold",fontSize:"1.1rem",gap:"10%",padding:"1rem",
    backgroundRepeat: 'no-repeat', }}>
      
     
      <RespHidden>
       11/11/2023
      </RespHidden>


      <div>
      KANU WARRIORS
      </div>


      <div>
      +10,000 PTS
      </div>
    
    </div>


<div /*onClick={()=>{navigate('/dashboard/football-cleansheet')}}*/
style={{backgroundColor:`#FFFFFF`,borderRadius:"0.5rem",backgroundPosition: 'center',  border: '1px solid #0000001A',  marginLeft:"-1rem",
    
   backgroundSize: 'cover', height:"90px", width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",color:"black",fontWeight:"bold",fontSize:"1.1rem",gap:"10%",padding:"1rem",
    backgroundRepeat: 'no-repeat' }}>

     <RespHidden >
       11/11/2023
      </RespHidden>


      <div >
      KANU WARRIORS
      </div>

      <div>
      +10,000 PTS
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

       <Button onClick={()=>{}}  style={{backgroundColor: '#260952',height:"4.2rem" ,color:'white',margin:"0 auto",width:"30%" }}>
              DEPOSIT
            </Button>
    

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
      LEAGUE MEMBERS
    </Typography>
</div>
    <Divider/>


        <Table sx={{ tableLayout:"fixed",backgroundColor:"#FAFAFA" }} aria-label="custom pagination table">
          <TableHead  sx={{backgroundColor:"#FAFAFA  !important" }} >
            <TableRow>
              <TableCell>Team Name</TableCell>
              <TableCell align="left">Balance</TableCell>
              <TableCell align="left"></TableCell>
            
             
            </TableRow>
          </TableHead>

         <Divider/>

          <TableBody style={{ paddingBottom:"1rem" }}>
            {standingsList.map((row,index) => (
                  <TableRow key={index}>
                    <TableCell style={{ width: 140,borderBottom:"1px solid lightgrey" }} component="th" scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell style={{ width: 140,borderBottom:"1px solid lightgrey" }} align="left">
                       {row.amount}
                    </TableCell>
                    <TableCell style={{ width: 140,borderBottom:"1px solid lightgrey" }} align="left">
                     {row.action}
                    
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
