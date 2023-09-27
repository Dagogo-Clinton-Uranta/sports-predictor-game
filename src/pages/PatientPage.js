import { Grid, Container, Typography, Button, Paper, CircularProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
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
import { fetchAllTreatmentCategories, fetchAllTreatmentTests, getAdmittedPatients, getPatients, getWaitingRoomPatients, reset } from 'src/redux/actions/patient.action';
import { ToastContainer } from 'react-toastify';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import './stylefiles/transitions.css';
import BloodInvestigation from 'src/components/treatment/blood-investigation';
import Prescription from 'src/components/treatment/prescription';
import Radiology from 'src/components/treatment/radiology';
import ECG from 'src/components/treatment/ecg';
import Referrals from 'src/components/treatment/referrals';

export default function PatientPage() {
  const theme = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();

 
  const [selectedBed, setSelectedBed] = useState(null);
  const [selectedTreatment, setSelectedTreatment] = useState(null);

const [showPic,setShowPic] = useState(true)
const [bloodInvClicked,setBloodInvClicked] = useState(false)

const [blinkRadiology,setBlinkRadiology] = useState(true)
const [radiologyClicked,setRadiologyClicked] = useState(false)

  const [state, setState] = useState({
    prescription:'',
    bloodInv1:'',
    bloodInv2:'',
    radiology1:null,
    radiology2:null,
    ecg: 'Mid Axillary',
    referral:'',
  });

  useEffect(() => {
    dispatch(getWaitingRoomPatients());
    dispatch(getAdmittedPatients());
    dispatch(fetchAllTreatmentCategories());
    dispatch(fetchAllTreatmentTests());
    dispatch(fetchUserData(user?.uid));
  }, []);


  const { user } = useSelector((state) => state.auth);

  const { selectedPatient, patients, admittedPatients, isLoading } = useSelector((state) => state.patient);

  const previousValue = useRef(null);
 
  useEffect(() => {
      previousValue.current = selectedPatient;
  }, [selectedPatient]);



  useEffect(() => {

    let timesRun = 27;
    let timesRunRadiology = 27;
    
  if(selectedTreatment !== 1){  
 setBloodInvClicked(false)
  }

  if(selectedTreatment !== 2){  
    setRadiologyClicked(false)
     }
   

   const candidateResponseArray =user && user.response? user.response:[]

   const particularPatientPosition = selectedPatient && candidateResponseArray && candidateResponseArray.length > 0 ? candidateResponseArray.map((item)=>(item.patientId)).indexOf(selectedPatient.id):-1
  

  if(particularPatientPosition !== -1 && candidateResponseArray[particularPatientPosition] && candidateResponseArray[particularPatientPosition].bloodInvestigationPassed === true)
  {
   
   
     // stop the blinking after 27 times run
     timesRun = 0;

    /* if(previousValue.current !==  selectedPatient){
      timesRun = 27;
  }*/
   


    const interval = setInterval(() => {
  
    
   


      if(timesRun >= 27 || previousValue.current !==  selectedPatient){
        clearInterval(interval);
    }
    console.log("i have run blood inv now",timesRun)
    timesRun += 1;
      setShowPic(!showPic);
      

    }, 800);

    //return () => clearInterval(interval);
    
  }



  if(particularPatientPosition !== -1 && candidateResponseArray[particularPatientPosition] && candidateResponseArray[particularPatientPosition].radiologyPassed === true)
  {
   
   
    
     timesRunRadiology = 0;
   
    /* if(previousValue.current !==  selectedPatient){
      timesRunRadiology = 27;
  }*/


    const intervalRadiology = 
    
    
      
      setInterval(() => {
      

      if(timesRunRadiology >= 27 ){
        clearInterval(intervalRadiology);
    }
    console.log("i have run radiology now",timesRunRadiology)
    timesRunRadiology += 1;
      setBlinkRadiology(!blinkRadiology);

    }
    , 800);

 

   // return () => clearInterval(intervalRadiology);
    
  }

    
  }, [selectedPatient]);



  const handleSelectBed = (bedNum) => {
    console.log(`Selected Bed is: ${bedNum}`);
    setSelectedBed(bedNum);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });

    console.log("state IS:",state)
  };

  const renderContent = (selectedTreatment, state, setState, handleChange, selectedPatient) => {
    switch (selectedTreatment) {
      case 1:
        return <BloodInvestigation state={state} setState={setState} handleChange={handleChange} />;
      case 2:
        return <Radiology state={state} setState={setState} handleChange={handleChange} />;
      case 3:
        return <ECG state={state} setState={setState} handleChange={handleChange} /> ;
      case 4:
        return  <Prescription state={state} handleChange={handleChange} />;
      case 5:
        return  <Referrals state={state} setState={setState} handleChange={handleChange} />;
      default:
        return selectedPatient ? <PatientDetails /> : <EmptyPane title={'Action Pane'} />;
    }
  };
  


  return (
    <>
      <Container maxWidth="xl">
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
        {isLoading ? (
          <center>
            <CircularProgress />
          </center>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={10} sm={4.5} sx={{ border: '0px solid red' }}>
              <Paper
                sx={{
                  mt: -2,
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
                <div style={{}}>
                  <WaitingRoom patientData={patients} setSelectedTreatment={setSelectedTreatment} setSelectedBed={setSelectedBed} />
                </div>
              </Paper>

              <br />
              <br />

              <Paper
                sx={{
                  mt: -2,
                  p: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 497,
                  backgroundColor: '#F5F5F5',
                  borderRadius: '9px',
                }}
              >
                  {renderContent(selectedTreatment, state, setState, handleChange, selectedPatient)}
                 {/* <Referrals state={state} setState={setState} handleChange={handleChange} /> */}
                {/* {selectedTreatment === 1 ?  <BloodInvestigation state={state} setState={setState} handleChange={handleChange} /> : 
                selectedTreatment === 2 ? <Prescription state={state} handleChange={handleChange} /> : selectedPatient ? <PatientDetails /> : <EmptyPane title={'Action Pane'} />}  */}
              </Paper>
            </Grid>

            {/* </Grid> */}

            <Grid item xs={0.2} sm={0} sx={{ border: '0px solid black' }} />

            <Grid item xs={12} sm={7.0} sx={{ border: '0px solid green' }}>
              <Grid container spacing={2}>
                {/* Image 1 */}
                <Grid item xs={2.2} style={{ backgroundColor: '#D7DBA5', height: '150px', borderRadius: '9px', cursor: 'pointer', border: selectedTreatment === 1 ? '4.5px solid #4C4E37' : selectedBed != null ? '2.5px solid #4C4E37' : ''}} 
                onClick={() => {
                 if(selectedBed){
                  setSelectedTreatment(1);
                 setBloodInvClicked(true)
                 }
                }}>
                  
                  <center>
                    {' '}
                    
                    <img src={IMG1} alt="Image 1" style={{opacity:!bloodInvClicked?(showPic?"1":"0.4"):1, marginTop: '12%', marginRight: '10%' }} />
                  </center>


                  <Typography variant="subtitle1" style={{ textAlign: 'left', marginTop: '35%' }}>
                    INVESTIGATIONS
                  </Typography>
                </Grid>
                &nbsp;&nbsp;&nbsp;
                {/* Image 2 */}
                <Grid item xs={2.2} style={{ backgroundColor: '#21D0C3', height: '150px', borderRadius: '9px', cursor: 'pointer', border: selectedTreatment === 2 ? '4.5px solid #4C4E37' : selectedBed != null ? '2.5px solid #4C4E37' : ''}} 
                onClick={() => {
                 if(selectedBed){
                  setSelectedTreatment(2);
                  setRadiologyClicked(true)
                 }
                }}>
                  <center>
                    <img src={IMG2} alt="Image 2" style={{opacity:!radiologyClicked?(blinkRadiology?"1":"0.4"):1, marginTop: '12%', marginRight: '10%' }} />
                    </center>

                  <Typography variant="subtitle1" style={{ textAlign: 'center', marginTop: '35%' }}>
                    RADIOLOGY
                  </Typography>
                </Grid>
                &nbsp;&nbsp;&nbsp;
                {/* Image 3 */}
                <Grid item xs={2.2} style={{ backgroundColor: '#00B8D4', height: '150px', borderRadius: '9px', cursor: 'pointer', border: selectedTreatment === 3 ? '4.5px solid #4C4E37' : selectedBed != null ? '2.5px solid #4C4E37' : ''}} 
                   onClick={() => {
                    if(selectedBed){
                     setSelectedTreatment(3);
                    }
                   }}>
                 <center>
                    {' '}
                    <img src={IMG4} alt="Image 3" style={{ marginTop: '12%', marginRight: '10%' }} />
                  </center>
                  <Typography variant="subtitle1" style={{ textAlign: 'center', marginTop: '35%' }}>
                  ECG
                  </Typography>
                </Grid>
                &nbsp;&nbsp;&nbsp;
                {/* Image 4 */}
                <Grid item xs={2.2} style={{ backgroundColor:'#A160E4', height: '150px', borderRadius: '9px',  cursor: 'pointer', border: selectedTreatment === 4 ? '4.5px solid #4C4E37' : selectedBed != null ? '2.5px solid #4C4E37' : ''}} 
                   onClick={() => {
                    if(selectedBed){
                     setSelectedTreatment(4);
                    }
                   }}>
                  <center>
                    <img src={IMG3} alt="Image 4" style={{ marginTop: '12%', marginRight: '10%' }} />
                  </center>
                  <Typography variant="subtitle1" style={{ textAlign: 'center', marginTop: '35%' }}>
                     PRESCRIPTIONS  &nbsp;&nbsp;&nbsp;
                  </Typography>
                </Grid>
                &nbsp;&nbsp;&nbsp;
                {/* Image 5 */}
                <Grid item xs={2.2} style={{ backgroundColor: '#E5EEF9', height: '150px', borderRadius: '9px',  cursor: 'pointer', border: selectedTreatment === 5 ? '4.5px solid #4C4E37' : selectedBed != null ? '2.5px solid #4C4E37' : ''}} 
                  onClick={() => {
                    if(selectedBed){
                     setSelectedTreatment(5);
                    }
                   }}>
                 <center>
                    <img src={IMG5} alt="Image 5" style={{ marginTop: '12%', marginRight: '10%' }} />
                  </center>
                  <Typography variant="subtitle1" style={{ textAlign: 'center', marginTop: '35%' }}>
                    REFERRALS
                  </Typography>
                </Grid>
              </Grid>
              <br />
              <br />
              <br />
              <Typography variant="subtitle1"><b>Available hospital Beds</b></Typography>
              <br />
              <Grid item xs={12} sm={12} sx={{ border: '0px solid red', width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  {Array?.from({ length: 10 })?.map((_, index) => {
                    const bedNum = index + 1;
                    // Find the patient with the matching bedNumber
                    const patientWithBed = admittedPatients?.find((patient) => patient.bedNumber === bedNum);

                    return <HospitalBed key={bedNum} bedNum={bedNum} patient={patientWithBed} onSelectBed={handleSelectBed} selectedBed={selectedBed} />;
                  })}
                </Grid>

                {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
              </Grid> */}
              </Grid>
             
              <Button
                    // fullWidth
                    variant="contained"
                    style={{
                      marginTop: '5%',
                      marginLeft: '0%',
                      backgroundColor: '#21D0C3',
                      color: 'white',
                      fontSize: '15px',
                      padding: '4px',
                      width: '18%',
                      height: '50px',
                    }}
                    onClick={() => {
                      setSelectedBed(null);
                      setSelectedTreatment(null);
                      dispatch(reset(user?.uid))
                    }}
                  >
                    Reset
                  </Button>
                  


            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}
