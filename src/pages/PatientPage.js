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
import IMG from '../assets/images/rec.png';
import HospitalBed from 'src/components/patient/hospital-bed';

export default function PatientPage() {
  const theme = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { myGroups, isLoading } = useSelector((state) => state.group);
  const { students } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(fetchMyTransactions(user?.id));
    console.log('Transac Changed.');
  }, [user]);

  useEffect(() => {
    dispatch(getStudents());
    dispatch(fetchUserData(user?.id));
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={10} sm={4} sx={{ border: '0px solid red' }}>
            {/* <Grid item xs={12} md={8} lg={4} style={{width: '100%', border: '2px solid red'}}> */}
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 280,
                border: '1px solid black',
              }}
            >
              <div style={{ paddingRight: '10px', paddingLeft: '20px' }}>
                <WaitingRoom />
              </div>
            </Paper>

            <br />
            <br />

            <Paper
              sx={{
                border: '1px solid black',
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                height: 350,
              }}
            >
              <PatientDetails />
            </Paper>
          </Grid>

          {/* </Grid> */}

          <Grid item xs={0.2} sm={0} sx={{ border: '0px solid black' }} />

          <Grid item xs={12} sm={7.8} sx={{ border: '0px solid green' }}>
            <Grid container spacing={2}>
              {/* Image 1 */}
              <Grid item xs={2.5}>
                <img src={IMG} alt="Image 1" width="250px" height="100px" />
              </Grid>
              {/* Image 2 */}
              <Grid item xs={2.2}>
                <img src={IMG} alt="Image 2" width="250px" height="100px" />
              </Grid>
              {/* Image 3 */}
              <Grid item xs={2.2}>
                <img src={IMG} alt="Image 3" width="250px" height="100px" />
              </Grid>
              {/* Image 4 */}
              <Grid item xs={2.2}>
                <img src={IMG} alt="Image 4" width="200px" height="100px" />
              </Grid>
              {/* Image 5 */}
              <Grid item xs={2.5}>
                <img src={IMG} alt="Image 5" width="200px" height="100px" />
              </Grid>

              {/* Labels */}
              <Grid item xs={2.5}>
                <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
                  INVESTIGATIONS
                </Typography>
              </Grid>
              <Grid item xs={2.2}>
                <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
                  RADIOLOGY
                </Typography>
              </Grid>
              <Grid item xs={2.2}>
                <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
                  PRESCRIPTIONS
                </Typography>
              </Grid>
              <Grid item xs={2.2}>
                <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
                  INTERVENTIONS
                </Typography>
              </Grid>
              <Grid item xs={2.5}>
                <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
                  REFERRALS
                </Typography>
              </Grid>
            </Grid>
            <br />
            <Grid item xs={12} sm={12} sx={{ border: '0px solid red', width: '100%', padding: '20px' }}>
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
