import { Grid, Container, Typography, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from 'src/redux/actions/auth.action';
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

export default function PatientPage() {
  const theme = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { selectedPatient } = useSelector((state) => state.patient);

  useEffect(() => {
    dispatch(fetchMyTransactions(user?.id));
    console.log('Transac Changed.');
  }, [user]);

  useEffect(() => {
    dispatch(getStudents());
    dispatch(fetchUserData(user?.id));
  }, []);

  const patientData = [
    {
      name: 'Iman Ihsan',
      age: '26',
      issue: 'Head Ache',
      aboutIssue: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime rops are two independent booleans; they can be combined to allow a Grid component to be both a flex container and child mollitia',
    },
    {
      name: 'Jack Dawson',
      age: '27',
      issue: 'Cough',
      aboutIssue: 'Lorem ipsum dolor sit rops are two independent booleans; they can be combined to allow a Grid component to be both a flex container and child amet consectetur adipisicing elit. Maxime mollitia',
    },
    {
      name: 'Bilal Haidar',
      age: '24',
      issue: 'Anxiety Dis...',
      aboutIssue: 'Lorem ipsum dolor sit amet consectetur rops are two independent booleans; they can be combined to allow a Grid component to be both a flex container and child adipisicing elit. Maxime mollitia',
    },
  ];

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={10} sm={4.5} sx={{ border: '0px solid red' }}>
            {/* <Grid item xs={12} md={8} lg={4} style={{width: '100%', border: '2px solid red'}}> */}
            <Paper
              sx={{
                // p: 2,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                maxHeight: 300,
                overflowY: 'auto',
                // border: '1px solid black',
                background: '#474747',
                borderRadius: '9px',
              }}
            >
              <div style={{  }}>
                <WaitingRoom patientData={patientData} />
              </div>
            </Paper>

            <br />
            <br />

            <Paper
              sx={{
                // border: '1px solid black',
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                height: 410,
                backgroundColor: '#F5F5F5',
                borderRadius: '9px',
              }}
            >
              {selectedPatient ?  <PatientDetails /> :  <EmptyPane title={'Action Pane'}/>}
            </Paper>
          </Grid>

          {/* </Grid> */}

          <Grid item xs={0.2} sm={0} sx={{ border: '0px solid black' }} />

          <Grid item xs={12} sm={7.0} sx={{ border: '0px solid green' }}>
          <Grid container spacing={2} justifyContent="center">
              {/* Image 1 */}
              <Grid item xs={2.2} style={{backgroundColor: '#D7DBA5', height: '150px', borderRadius: '9px'}}>
               <center> <img src={IMG1} alt="Image 1" style={{marginTop: '12%', marginRight: '10%'}} /></center>
               <Typography variant="subtitle1" style={{ textAlign: 'left', marginTop: '35%' }}>
                  INVESTIGATIONS
                </Typography>
              </Grid>
              &nbsp;&nbsp;&nbsp;
              {/* Image 2 */}
              <Grid item xs={2.2} style={{backgroundColor: '#21D0C3', height: '150px', borderRadius: '9px'}}>
                <center><img src={IMG2} alt="Image 2" style={{marginTop: '12%', marginRight: '10%'}} /></center>
                <Typography variant="subtitle1" style={{ textAlign: 'center', marginTop: '35%' }}>
                  RADIOLOGY
                </Typography>
              </Grid>
              &nbsp;&nbsp;&nbsp;
              {/* Image 3 */}
              <Grid item xs={2.2} style={{backgroundColor: '#A160E4', height: '150px', borderRadius: '9px'}}>
               <center> <img src={IMG3} alt="Image 3" style={{marginTop: '12%', marginRight: '10%'}} /></center>
               <Typography variant="subtitle1" style={{ textAlign: 'center', marginTop: '35%' }}>
                  PRESCRIPTIONS
                </Typography>
              </Grid>
              &nbsp;&nbsp;&nbsp;
              {/* Image 4 */}
              <Grid item xs={2.2} style={{backgroundColor: '#00B8D4', height: '150px', borderRadius: '9px'}}>
                <center><img src={IMG4} alt="Image 4" style={{marginTop: '12%', marginRight: '10%'}} /></center>
                <Typography variant="subtitle1" style={{ textAlign: 'center', marginTop: '35%' }}>
                  INTERVENTIONS
                </Typography>
              </Grid>
              &nbsp;&nbsp;&nbsp;
              {/* Image 5 */}
              <Grid item xs={2.5} style={{backgroundColor: '#E5EEF9', height: '150px', borderRadius: '9px'}}>
                <center><img src={IMG5} alt="Image 5" style={{marginTop: '12%', marginRight: '10%'}} /></center>
                <Typography variant="subtitle1" style={{ textAlign: 'center', marginTop: '28%' }}>
                  REFERRALS
                </Typography>
              </Grid>
            </Grid>
            <br /><br/><br/>
            <Typography variant="subtitle1">
            Available hospital Beds
            </Typography>
            <br/>
            <Grid item xs={12} sm={12} sx={{ border: '0px solid red', width: '100%', }}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <HospitalBed bedNum={1} />
                <HospitalBed bedNum={2} />
                <HospitalBed bedNum={3} />
                <HospitalBed bedNum={4} />
                <HospitalBed bedNum={5} />
                <HospitalBed bedNum={6} />
                <HospitalBed bedNum={7} />
                <HospitalBed bedNum={8} />
                <HospitalBed bedNum={9} />
                <HospitalBed bedNum={10} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
