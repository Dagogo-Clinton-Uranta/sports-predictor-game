import React from 'react';
import IMG from '../../assets/images/empty-avatar.png';
import { useSelector } from 'react-redux';
import { Grid, Container, Paper, Button, Typography, ButtonBase, Avatar } from '@mui/material';


const PatientDetails = () => {
  const { selectedPatient } = useSelector((state) => state.patient);

  const mystyle = {
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: 200,
    fontSize: '18px',
    lineHeight: '30px',
    color: 'black',
  };

  const admitPatient = () => {
    
  }

  return (
   <>
   {selectedPatient && (
     <Grid container spacing={1}>
     <Grid item>
       <Avatar alt="avatar" src={IMG} style={{ width: '80px', height: '80px', marginRight: '20px' }} />
       {/* </ButtonBase> */}
     </Grid>
     <Grid item xs={12} sm container>
       <Grid item xs container direction="column" spacing={2}>
         <Grid item xs style={{ border: '0px solid red' }}>
           <Typography gutterBottom variant="subtitle1" component="div" style={mystyle}>
            {selectedPatient?.name}
           </Typography>
           <Typography variant="body2" gutterBottom style={mystyle}>
           {selectedPatient?.age}YRS | KID
           </Typography>

           <Typography variant="body2" color="text.secondary" style={mystyle}>
           {selectedPatient?.issue}
           </Typography>
         </Grid>

       </Grid>
     </Grid>
     <div style={{padding: '10px'}}>
     <center>
           <div style={{ marginTop: '10px', minHeight: '180px', border: '0px solid red' }}>
            {selectedPatient?.aboutIssue}
           </div>
         </center>
         {/* <hr /> */}
           <br/>
           <Grid container spacing={2} style={{alignContent: 'bottom', alignItems: 'bottom'}}>
         <Grid item xs={6} md={6}>
           <Button
             type="submit"
             fullWidth
             variant="contained"
             style={{
               backgroundColor: "#21D0C3",
               color: "white",
               fontSize: "15px",
               padding: '6px',
               height: '50px'
             }}
           >
             Discharge
           </Button>
         </Grid>

         <Grid item xs={6} md={6}>
           <Button
             type="submit"
             fullWidth
             variant="contained"
             style={{
               backgroundColor: "white",
               border: '1px solid black',
               color: "black",
               fontSize: "15px",
               padding: "6px",
               height: '50px'
             }}
             onClick={admitPatient}
           >
             Admit
           </Button>
         </Grid>
       </Grid>
     </div>
   </Grid>
   )}
   </>
  );
};

export default PatientDetails;
