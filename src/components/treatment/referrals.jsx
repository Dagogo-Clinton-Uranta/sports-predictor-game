import React, { useState ,useEffect} from 'react';
import IMG from '../../assets/images/empty-avatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Container, Chip, Paper, TextareaAutosize, Button, Typography, Divider, Avatar,CircularProgress } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { admitPatients, fetchAllTreatmentCategories, fetchAllTreatmentTests } from 'src/redux/actions/patient.action';
import { submitReferral} from 'src/redux/actions/candidate.action';

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
    background: '#FFFFFF',
    border: '1px solid #00000026',
    padding: '10px',
    borderRadius: '8px',
    cursor: 'pointer',
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

const Referrals = ({ state, setState, handleChange }) => {
  const { selectedPatient,admittedPatients } = useSelector((state) => state.patient);
  console.log("selected patient is",selectedPatient )
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {user } = useSelector((state) => state.auth);
  const [referral,setReferral] = useState([])
  const [referralIdArray,setReferralIdArray] = useState([])

  const [candidateResponseArray,setCandidateResponseArray]= useState(user.response? user.response:[])
  const [particularPatientPosition,setParticularPatientPosition] = useState(selectedPatient && candidateResponseArray.length > 0 ? candidateResponseArray.map((item)=>(item.patientId)).indexOf(selectedPatient.id):-1)

const [neverSubmitted,setNeverSubmitted] =  useState((particularPatientPosition === -1  ) ?true:false)
const [hasSubmittedBefore,setHasSubmittedBefore] = useState((particularPatientPosition !== -1  ) ?true:false)
const [trigger,setTrigger] = useState(true)
const [testTaken,setTestTaken] = useState(false);

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
    if(candidateResponseArray[particularPatientPosition].referralPassed === true){
    setTestTaken(true)
    }else{
      setTestTaken(false)
    }
  
  },5000)
    
  }
  
   
  else if( hasSubmittedBefore !== true && particularPatientPosition !== -1 && (candidateResponseArray[particularPatientPosition].referralPassed === true )){

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
   
    if(candidateResponseArray[particularPatientPosition].referralPassed === true){
   setTimeout(()=>{setTestTaken(true)},5000)
    }else{
      setTestTaken(false)
    }

    
  }
  
  
  else if(particularPatientPosition !== -1 && (candidateResponseArray[particularPatientPosition].referralPassed === true  )){

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





  const referralSetup = (e)=>{


    let   targetCategory =  allTreatmentTests.filter((item)=>(item.uid === e.target.value )).length > 0? allTreatmentTests.filter((item)=>(item.uid === e.target.value )):[{title:null}]
    console.log(targetCategory[0].title )
      
    if(!referral.includes(targetCategory[0].title)){ setReferral([...referral,targetCategory[0].title])}
    if(!referralIdArray.includes(targetCategory[0].title)){ setReferralIdArray([...referralIdArray,targetCategory[0].uid])}
    

    console.log("referral",referral )
     console.log("referralIdArray",referralIdArray )
     }

  useEffect(() => {
    
    dispatch(fetchAllTreatmentCategories());
    dispatch(fetchAllTreatmentTests());
  }, []);

  /*THIS USE EFFECT IS SO THAT WE CAN RESET THE SELECTIONS WHEN THE PATIENT IS CHANGED */
  useEffect(()=>{
   
     setReferral([])
     setReferralIdArray([])
   },[selectedPatient])
 

  const { allTreatmentCategories,allTreatmentTests } = useSelector((state) => state.patient);



  const submitReferralResponse = (patientId,b1,b2,b3,b4,admittedPatients) => {
    dispatch(submitReferral(user.uid,patientId,b1,b2,b3,b4,admittedPatients))
  }


  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete1 = (tbr,tbrId) => {
    let placeholder =   referral.filter((item)=>(item !== tbr))
     let placeholder2 =   referralIdArray.filter((item)=>(item !== tbrId))


      setReferral([...placeholder])
      setReferralIdArray([...placeholder2])
  };


  return (
    <>
     
        <Grid container spacing={1} sx={{ minWidth: 100 }}>
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

        { testTaken === false ?
          <div style={{ width: '100%', margin: '20px' }}>
            <Grid item xs={12} md={12} lg={12}>
              <Typography variant="subtitle1" style={{ marginBottom: '10px', fontSize: '18px' }}>
                <b>Referrals</b>
              </Typography>
              <br/>
              <select
                name="referral"
                value={state.referral}
                onChange={(e)=>{handleChange(e);referralSetup(e)}}
                className={classes.searchInput}
                style={{ minHeight: '50px', fontSize: '17px', outline: '1px solid #eee' }}
                required
              >
              {  allTreatmentTests.filter((item)=>(item.treatmentId === "wcN8WP6CXlG3SFDzJNsq" )).map((prop)=>(

               <option value={prop.uid}>{prop.title}</option>
                 
               
               ))  
               
               }
              </select>
            </Grid>
            <br/><br/>
            <div style={{padding: '10px', border: state.referral ? '1px solid #00000033' : ''}}>
             {referral && referral.length > 0 && 
             referral.map((item,index)=>(
              <Chip label={item} onClick={handleClick} onDelete={()=>{handleDelete1(item,referralIdArray[index])}} />
             
              ))
            }
             
            </div>
            <div style={{ padding: '10px' }}>
              <br />
              <Grid container spacing={2} style={{ alignContent: 'bottom', alignItems: 'bottom' }}>
                <Grid item xs={4} md={4}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{
                      backgroundColor:!state.referral || referralIdArray.length<1 ?'#199e94':'#21D0C3',
                      color: 'white',
                      fontSize: '15px',
                      padding: '4px',
                      height: '50px',
                    }}
                    disabled={!state.referral||referralIdArray.length<1 ||loading}
                    onClick={()=>{submitReferralResponse(selectedPatient?.uid,state.referral,referral,referralIdArray,selectedPatient?.complaintId,admittedPatients)}}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
          :
     
          <Grid container spacing={2} style={{margin:"0 auto",display:"flex", alignItems: 'bottom', justifyContent:'center'}}>
               
          <Grid item xs={12} md={12} lg={12}>
          <Typography variant="subtitle1" style={{ marginTop: '4px',marginLeft:"4px",marginBottom: '50px',fontSize: '18px' }}>
           <b>Referrals</b>
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
               Referrals Approved
             </Button>
   
           
           </Grid>
   
         }
   
   
        </Grid>

         }

        </Grid>
      
    </>
  );
};

export default Referrals;

