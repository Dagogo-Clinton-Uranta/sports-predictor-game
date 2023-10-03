import React, { useState,useEffect } from 'react';
import IMG from '../../assets/images/empty-avatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Container, Paper, TextareaAutosize, Button, Typography, Divider, Avatar,CircularProgress } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { submitPrescription} from 'src/redux/actions/candidate.action';
import { admitPatients, fetchAllTreatmentCategories, fetchAllTreatmentTests } from 'src/redux/actions/patient.action';
import { notifySuccessFxn } from 'src/utils/toast-fxn';
import { useNavigate } from 'react-router-dom';
import MAN from '../../assets/images/man.png';
import WOMAN from '../../assets/images/woman.png';
import KID from '../../assets/images/kid.png';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '4rem',
      paddingRight: '4rem',
    },
    searchInput: {
      background: 'white',
      border: '1px solid #00000026',
      padding: '10px',
      borderRadius: '8px',
      // marginRight: theme.spacing(2),
      width: '100%',
      minWidth: '100%',
      '& .MuiInputBase-input': {
        color: 'grey',
      },
      '& .MuiInputBase-input::placeholder': {
        color: 'grey',
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: 'grey',
      },
      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottomColor: 'grey',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'grey',
      },
    },
  }));

const Prescription = ({ state, handleChange }) => {
  const { selectedPatient } = useSelector((state) => state.patient);
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {user } = useSelector((state) => state.auth);
  const [prescriptionArray,setPrescriptionArray] = useState([])

  const [candidateResponseArray,setCandidateResponseArray]= useState(user.response? user.response:[])
  const [particularPatientPosition,setParticularPatientPosition] = useState(selectedPatient && candidateResponseArray.length > 0 ? candidateResponseArray.map((item)=>(item.patientId)).indexOf(selectedPatient.id):-1)

const [neverSubmitted,setNeverSubmitted] =  useState((particularPatientPosition === -1  ) ?true:false)
const [hasSubmittedBefore,setHasSubmittedBefore] = useState((particularPatientPosition !== -1  ) ?true:false)
const [trigger,setTrigger] = useState(true)
const [testTaken,setTestTaken] = useState(false);

  const splitPrescription= (prescriptionString)=>{
    
 const returnArray =  prescriptionString.split(',')

 const finalReturnArray = returnArray.map((item)=>(item.trim()))
 setPrescriptionArray(finalReturnArray)
 console.log("our trimmed return array", finalReturnArray)

  }
  
  //console.log("current state",state)

  const mystyle = {
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: 200,
    fontSize: '18px',
    lineHeight: '30px',
    color: 'black',
  };

  const getAvatarSrc = (gender) => {
    switch (gender) {
      case 'male':
        return MAN;
      case 'female':
        return WOMAN;
      case 'kid':
        return KID;
      default:
        return MAN; 
    }
  };


  /*LOGIC FOR SETTING VIEW RESULTS FOR PRESCRIPTION*/ 
  useEffect(() => {
   


    setTestTaken(false)
   
   

   if(neverSubmitted===true && hasSubmittedBefore === true )
  {

    setTestTaken("loading")
   setTimeout(()=>{
    if(candidateResponseArray[particularPatientPosition].prescriptionPassed === true){
    setTestTaken(true)
    }else{
      setTestTaken(false)
    }
  
  },5000)
    
  }
  
   
  else if( hasSubmittedBefore !== true && particularPatientPosition !== -1 && (candidateResponseArray[particularPatientPosition].prescriptionPassed === true )){

   setTestTaken(true)

  }


  setCandidateResponseArray(user.response? user.response:[])
  setParticularPatientPosition(selectedPatient && user.response && user.response.length> 0 ? user.response.map((item)=>(item.patientId)).indexOf(selectedPatient.id):-1)
  setNeverSubmitted((particularPatientPosition === -1  ) ?true:false)

  //YOU PROBABLY NEED A DIFFERENT LOGIC THAN THE ONE COMMENTED OUT BELOW, TO HAVE SUBMITTED BEFORE OR NEVER BEEN SUBMITTED TO CHANGE ONLY AFTER THE FIRST SUBMIT OF A PATIENT
  setHasSubmittedBefore(user.response.map((item)=>(item.patientId)).indexOf(selectedPatient.id) !== -1 /*&& (candidateResponseArray[particularPatientPosition] && candidateResponseArray[particularPatientPosition].hasOwnProperty("bloodInvestigationPassed"))*/?true:false)
  setTrigger(!trigger)



  }, [selectedPatient,user]);
   /*LOGIC FOR SETTING VIEW RESULTS FOR BLOOD INVESTIGATION - END*/ 




   /*LOGIC FOR SETTING VIEW RESULTS FOR BLOOD INVESTIGATION RERUN*/ 
  useEffect(() => {
   
    setTestTaken(false)
    console.log("OUR STATE IS!:",state)
   

   if(neverSubmitted===true && hasSubmittedBefore === true )
  {

    setTestTaken("loading")
   
    if(candidateResponseArray[particularPatientPosition].prescriptionPassed === true){
   setTimeout(()=>{setTestTaken(true)},5000)
    }else{
      setTestTaken(false)
    }

    
  }
  
  
  else if(particularPatientPosition !== -1 && (candidateResponseArray[particularPatientPosition].prescriptionPassed === true  )){

   setTestTaken(true)

  }else{
    setTestTaken(false)
  }


  setCandidateResponseArray(user.response? user.response:[])
  setParticularPatientPosition(selectedPatient && user.response && user.response.length> 0 ? user.response.map((item)=>(item.patientId)).indexOf(selectedPatient.id):-1)
  setNeverSubmitted(user.response.map((item)=>(item.patientId)).indexOf(selectedPatient.id) === -1  ?true:false)
  setHasSubmittedBefore(user.response.map((item)=>(item.patientId)).indexOf(selectedPatient.id) !== -1 /*&& (candidateResponseArray[particularPatientPosition] && candidateResponseArray[particularPatientPosition].hasOwnProperty("bloodInvestigationPassed"))*/?true:false)
  

 
}, [trigger]);
   /*LOGIC FOR SETTING VIEW RESULTS FOR BLOOD INVESTIGATION RERUN - END*/ 




  const submitPrescriptionResponse = (patientId,b1,b2) => {
    dispatch(submitPrescription(user.uid,patientId,b1,b2))
  }

  return (
    

     
        <Grid container spacing={1} sx={{minWidth: 100}}>
          <Grid item>
          <Avatar alt="avatar" src={getAvatarSrc(selectedPatient.icon.toLowerCase())} style={{ width: '80px', height: '80px', marginRight: '20px' }} />
            {/* </ButtonBase> */}
         
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs style={{ border: '0px solid red', display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography gutterBottom variant="subtitle1" component="div" style={mystyle}>
                    <b>{selectedPatient?.firstName + ' ' + ' ' + selectedPatient?.lastName}</b>
                  </Typography>
                  &nbsp; &nbsp; &nbsp;
                  <Divider
                    orientation="vertical"
                    flexItem
                    style={{
                      backgroundColor: 'black',
                      width: '1px',
                      // height: '100%',
                    }}
                  />
                  &nbsp; &nbsp; &nbsp;
                  <Typography variant="body2" color="text.secondary" style={mystyle}>
                    {selectedPatient?.complaint}
                  </Typography>
                </div>
              </Grid>
              <Typography variant="body2" gutterBottom style={mystyle} sx={{ ml: 1.8 }}>
                {selectedPatient?.age}YRS | {selectedPatient?.icon.toUpperCase()}
              </Typography>
            </Grid>
          </Grid>
    
      { testTaken === false?
         <>
          <div style={{width: '100%', margin: '20px'}}>
          <Grid item xs={12} md={12} lg={12}>
          
          <Typography variant="subtitle1" style={{marginBottom: '10px',fontSize:"18px"}}>
          
          <b>Prescription</b>
          
          </Typography>
          <br/>
         
          <TextField
            name="prescription"
            placeholder=""
            fullWidth
            multiline
            rows={6}
            maxRows={8} 
            value={state.specialInstruction}
            onChange={(e)=>{handleChange(e);splitPrescription(e.target.value)}}
            className={classes.searchInput}
            InputProps={{
              disableUnderline: true,
              style: {
                minHeight: '100px', 
                fontSize: '16px',
                padding: '8px',
                //   border: '1px solid #ccc',
                borderRadius: '4px',
                resize: 'vertical',
              },
            }}
          />
        </Grid>
        <div style={{ padding: '10px' }}>
            <br />
            <Grid container spacing={2} style={{ alignContent: 'bottom', alignItems: 'bottom' }}>
              <Grid item xs={4} md={4}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    backgroundColor:!state.prescription?'#199e94':'#21D0C3',
                    color: 'white',
                    fontSize: '15px',
                    padding: '4px',
                    height: '50px',
                  }}
                  disabled={!state.prescription||loading}
                  onClick={()=>{submitPrescriptionResponse(selectedPatient?.uid,prescriptionArray,selectedPatient?.complaintId)}}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </div>
          </div>
        
        </>
      
        :
         
       <Grid container spacing={2} style={{margin:"0 auto",display:"flex", alignItems: 'bottom', justifyContent:'center'}}>
               
       <Grid item xs={12} md={12} lg={12}>
       <Typography variant="subtitle1" style={{ marginTop: '4px',marginLeft:"4px",marginBottom: '50px',fontSize: '18px' }}>
        <b>Prescription</b>
      </Typography><br/>
      </Grid> 
       
      { testTaken !== false && testTaken === "loading"?

      <div style={{display:"flex",justifyContent:"center",flexDirection:"column",gap:"2rem"}}>
      "Checking..."
       <center>
      <CircularProgress />
      </center>
      </div>
      :


        <Grid item xs={4} md={4}>

         <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{
              backgroundColor:'#199e94',
              color: 'white',
              fontSize: '15px',
              padding: '8px',
              height: '60px',
            }}
             
          >
            Prescription Approved
          </Button>

        
        </Grid>

      }


     </Grid>

   }
  
   </Grid>

   

  
  )
}

export default Prescription;
