import React, { useState } from 'react';
import IMG from '../../assets/images/empty-avatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Container, Paper, Button, Typography, ButtonBase, Avatar } from '@mui/material';
import { admitPatients } from 'src/redux/actions/patient.action';
import { notifySuccessFxn } from 'src/utils/toast-fxn';
import { useNavigate } from 'react-router-dom';


const PatientDetails = () => {
  const { selectedPatient } = useSelector((state) => state.patient);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const mystyle = {
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: 200,
    fontSize: '18px',
    lineHeight: '30px',
    color: 'black',
  };

  const admitPatientFxn = () => {
    dispatch(admitPatients(selectedPatient?.uid, setLoading, navigate));
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
            {selectedPatient?.firstName + ' ' + ' ' + selectedPatient?.lastName}
           </Typography>
           <Typography variant="body2" gutterBottom style={mystyle}>
           {selectedPatient?.age}YRS | KID
           </Typography>

           <Typography variant="body2" color="text.secondary" style={mystyle}>
           {selectedPatient?.complaint}
           </Typography>
         </Grid>

       </Grid>
     </Grid>
     <div style={{padding: '10px'}}>
     <center>
           <div style={{ marginTop: '10px', minHeight: '180px', border: '0px solid red' }}>
            {selectedPatient?.aboutIssue ?? 'pturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis '}
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
             disabled={loading}
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
             disabled={loading}
             onClick={admitPatientFxn}
           >
            {loading ? "Loading" : "Admit"}
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
