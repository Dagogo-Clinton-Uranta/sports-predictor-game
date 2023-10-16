import React, { useState,useEffect } from 'react';
import IMG from '../../assets/images/empty-avatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Container, Chip, Paper, TextareaAutosize, Button, Typography, Divider, Avatar,Box,CircularProgress  } from '@mui/material';
import Carousel from 'react-material-ui-carousel'
import Modal from '@mui/material/Modal';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { admitPatients, fetchAllTreatmentCategories, fetchAllTreatmentTests, getAdmittedPatients } from 'src/redux/actions/patient.action';
import { submitRadiology} from 'src/redux/actions/candidate.action';
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
  }
}));

const Radiology = ({ state, setState, handleChange }) => {
  const { selectedPatient ,admittedPatients} = useSelector((state) => state.patient);
  const {user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [testTaken,setTestTaken] = useState(false);
  const [radiology1,setRadiology1] = useState('')
  const [radiology2,setRadiology2] = useState([])
  const [radiology2IdArray,setRadiology2IdArray] = useState([])

  const [candidateResponseArray,setCandidateResponseArray]= useState(user.response? user.response:[])
  const [particularPatientPosition,setParticularPatientPosition] = useState(selectedPatient && candidateResponseArray.length > 0 ? candidateResponseArray.map((item)=>(item.patientId)).indexOf(selectedPatient.id):-1)

const [neverSubmitted,setNeverSubmitted] =  useState((particularPatientPosition === -1  ) ?true:false)
const [hasSubmittedBefore,setHasSubmittedBefore] = useState((particularPatientPosition !== -1  ) ?true:false)
const [trigger,setTrigger] = useState(true)

/*MODAL MANIPULATION LOGIC */
const [openPdf, setOpenPdf] = React.useState(false);
const handleOpenPdf = () => {setOpenPdf(true)}
const handleClosePdf = () => {setOpenPdf(false)};
/*MODAL MANIPULATION LOGIC END */


  const mystyle = {
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: 200,
    fontSize: '18px',
    lineHeight: '30px',
    color: 'black',
  };


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "95%",
    height:"90%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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

/*THIS USE EFFECT IS SO THAT WE CAN RESET THE SELECTIONS WHEN THE PATIENT IS CHANGED */
  useEffect(()=>{
   /*setState({
        ...state,
        radiology1: '',
        radiology2: '',
      });*/
    
    setRadiology2([])
    setRadiology2IdArray([])
  },[selectedPatient])



  useEffect(() => {
    console.log("NEW RESPONSE is!:",user.response)

    dispatch(fetchAllTreatmentCategories());
    dispatch(fetchAllTreatmentTests());
  }, []);

  const { allTreatmentCategories,allTreatmentTests } = useSelector((state) => state.patient);



  const radiology1Setup = (e)=>{


    let   targetCategory =  allTreatmentCategories.filter((item)=>(item.uid === e.target.value )).length > 0? allTreatmentCategories.filter((item)=>(item.uid === e.target.value )):[{title:null}]
    
       setRadiology1(targetCategory[0].title)
     
      /*setState({
        ...state,
        radiology2: '',
      });*/
    
      /*
      setRadiology2([])
      setRadiology2IdArray([])
      */
    
     }
   
     const radiology2Setup = (e)=>{
   
       let   targetCategoryTest =  allTreatmentTests.filter((item)=>(item.uid === e.target.value )).length > 0 ? allTreatmentTests.filter((item)=>(item.uid === e.target.value )):[{title:null}]
       

      if(!radiology2.includes(targetCategoryTest[0].title)){ setRadiology2([...radiology2,targetCategoryTest[0].title])}


       if(!radiology2IdArray.includes(targetCategoryTest[0].uid)){setRadiology2IdArray([...radiology2IdArray,targetCategoryTest[0].uid])}

        
      
     }

  const submitRadiologyResponse = (patientId,b1,b2,b3,b4,admittedPatients) => {
    dispatch(submitRadiology(user.uid,patientId,b1,b2,b3,b4,admittedPatients))
  }

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete1 = (tbr,tbrId) => {
    let placeholder =   radiology2.filter((item)=>(item !== tbr))
     let placeholder2 =   radiology2IdArray.filter((item)=>(item !== tbrId))


      setRadiology2([...placeholder])
      setRadiology2IdArray([...placeholder2])
  };





   /*LOGIC FOR SETTING VIEW RESULTS FOR RADIOLOGY*/ 
   useEffect(() => {
   
    setTestTaken(false)
   
   

   if(neverSubmitted===true && hasSubmittedBefore === true )
  {

    setTestTaken("loading")
   setTimeout(()=>{setTestTaken(true)},(selectedPatient && selectedPatient.waitTime?Number(selectedPatient.waitTime)*1000:5000))
    
  }
  
  
  else if(particularPatientPosition !== -1 && (candidateResponseArray[particularPatientPosition].radiologyPassed === true )){

   setTestTaken(true)

  }


  setCandidateResponseArray(user.response? user.response:[])
  setParticularPatientPosition(selectedPatient && user.response && user.response.length> 0 ? user.response.map((item)=>(item.patientId)).indexOf(selectedPatient.id):-1)
  setNeverSubmitted((particularPatientPosition === -1  ) ?true:false)

  //YOU PROBABLY NEED A DIFFERENT LOGIC THAN THE ONE COMMENTED OUT BELOW, TO HAVE SUBMITTED BEFORE OR NEVER BEEN SUBMITTED TO CHANGE ONLY AFTER THE FIRST SUBMIT OF A PATIENT
  setHasSubmittedBefore(user.response.map((item)=>(item.patientId)).indexOf(selectedPatient.id) !== -1 /*&& (candidateResponseArray[particularPatientPosition] && candidateResponseArray[particularPatientPosition].hasOwnProperty("radiologyPassed"))*/?true:false)
  setTrigger(!trigger)



  }, [selectedPatient,user]);
   //LOGIC FOR SETTING VIEW RESULTS FOR BLOOD INVESTIGATION - END 


     //LOGIC FOR SETTING VIEW RESULTS FOR BLOOD INVESTIGATION RERUN
  useEffect(() => {
   
    setTestTaken(false)
   
   

   if(neverSubmitted===true && hasSubmittedBefore === true )
  {

    setTestTaken("loading")
   setTimeout(()=>{setTestTaken(true)},(selectedPatient && selectedPatient.waitTime?Number(selectedPatient.waitTime)*1000:5000))
    
  }
  
  
  else if(particularPatientPosition !== -1 && (candidateResponseArray[particularPatientPosition].radiologyPassed === true )){

   setTestTaken(true)

  }else{
    setTestTaken(false)
  }


  setCandidateResponseArray(user.response? user.response:[])
  setParticularPatientPosition(selectedPatient && user.response && user.response.length> 0 ? user.response.map((item)=>(item.patientId)).indexOf(selectedPatient.id):-1)
  setNeverSubmitted(user.response.map((item)=>(item.patientId)).indexOf(selectedPatient.id) === -1  ?true:false)
  setHasSubmittedBefore(user.response.map((item)=>(item.patientId)).indexOf(selectedPatient.id) !== -1 /*&& (candidateResponseArray[particularPatientPosition] && candidateResponseArray[particularPatientPosition].hasOwnProperty("radiologyPassed"))*/?true:false)
  

 
}, [trigger]);
   //LOGIC FOR SETTING VIEW RESULTS FOR BLOOD INVESTIGATION RERUN - END


   const resetAllOptions = (tbr) => {
    setState({
        ...state,
        radiology1: '',
        radiology2: '',
      });

      setRadiology2([])
      setRadiology2IdArray([])
      setRadiology1('')

  };


  return (
    <>
      


<Modal
        open={openPdf}
        onClose={handleClosePdf}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
  
  <Box sx={style} > 
   <center >
   
   
    {user && user.response  && user.response[particularPatientPosition]  &&   user.response[particularPatientPosition].radiologyAnswerImages ?
    

    <Carousel
    navButtonsAlwaysVisible={true}
   
    sx={{position:"absolute",marginLeft:"10%",top:"0px",width:"60%",height:"92%",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center"}}>
  {  user.response[particularPatientPosition].radiologyAnswerImages.map((item)=>(
   
    <center style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center"}} >
    <img  src ={item} />
    </center>
))
 }
</Carousel  >

     : 

     <Carousel sx={{position:"absolute",marginLeft:"10%",top:"0px",width:"80%",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center"}}>
     
     <p>No images loaded for this test, please check back later..</p>
  
     </Carousel>

    }

   



   </center>
   </Box>  
    </Modal>


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


          {testTaken === false?
          <>
          <div style={{ width: '100%', margin: '20px' }}>
            <Grid item xs={12} md={12} lg={12}>
              <Typography variant="subtitle1" style={{ marginBottom: '10px', fontSize: '18px' }}>
                <b>Radiology</b>
              </Typography>
              <br/>
              <select
                name="radiology1"
                value={state.radiology1}
                onChange={(e)=>{handleChange(e);radiology1Setup(e)}}
                className={classes.searchInput}
                style={{ minHeight: '50px', fontSize: '17px', outline: '1px solid #eee' }}
                required
              >
               {  allTreatmentCategories.filter((item)=>(item.treatmentId === "j7ib7pKNXMCNWqnHRacC" )).map((prop)=>(

                <option value={prop.uid}>{prop.title}</option>
                  
                
                ))  
                
                }
              </select>
            </Grid>

            <div style={{ marginTop: '10px' }}></div>
            
            <Grid item xs={12} md={12} lg={12}>
              <select
                name="radiology2"
                value={state.radiology2}
                onChange={(e)=>{handleChange(e);radiology2Setup(e)}}
                className={classes.searchInput}
                style={{ minHeight: '50px', fontSize: '17px', outline: '1px solid #eee' }}
                required
                disabled={state.radiology1 && state.radiology1.length < 1 ? true : false}
              >
               {  allTreatmentTests.filter((item)=>(item.treatmentCategoryId === state.radiology1 )).map((prop)=>(

               <option value={prop.uid}>{prop.title}</option>
                 
               
               ))  
               
            }
              </select>
            </Grid>


            <br/><br/>
            <div style={{padding: '10px', border: state.radiology2 ? '1px solid #00000033' : ''}}>
             {state.radiology2  && 
              <> &nbsp; 
                {  radiology2.map((item,index)=>(
             <Chip label={item} onClick={handleClick} onDelete={()=>{handleDelete1(item,radiology2IdArray[index])}} />
             ))
            }

             </>
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
                     backgroundColor:state.radiology1 && state.radiology1.length <1  ||state.radiology2 &&  state.radiology2.length <1 ||radiology1 &&  radiology1.length <1||radiology2 &&  radiology2.length <1   ?'#199e94':'#21D0C3',
                      color: 'white',
                      fontSize: '15px',
                      padding: '4px',
                      height: '50px',
                    }}
                    disabled={state.radiology1 && state.radiology1.length <1  ||state.radiology2 && state.radiology2.length <1 ||radiology1 && radiology1.length <1||radiology2 && radiology2.length <1  ||loading}
                    onClick={()=>{submitRadiologyResponse(selectedPatient?.uid,radiology1,radiology2,radiology2IdArray,selectedPatient?.complaintId,admittedPatients)}}
                  >
                    Submit
                  </Button>
                </Grid>
              
                {testTaken === false &&
               
               <Grid item xs={4} md={4}>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    style={{
                      backgroundColor:'#21D0C3',
                      color: 'white',
                      fontSize: '15px',
                      padding: '4px',
                      height: '50px',
                    }}
                    disabled={false}
                    onClick={()=>{resetAllOptions()}}
                  >
                    Clear
                  </Button>
                </Grid>
                }


              </Grid>
            </div>
          </div>
 
          </>
          :

          <Grid container spacing={2} style={{margin:"0 auto",display:"flex", alignItems: 'bottom', justifyContent:'center'}}>
               
          <Grid item xs={12} md={12} lg={12}>
          <Typography variant="subtitle1" style={{ marginTop: '4px',marginLeft:"4px",marginBottom: '50px',fontSize: '18px' }}>
           <b>Radiology</b>
         </Typography><br/>
         </Grid> 
          
         { testTaken !== false && testTaken === "loading"?

         <div style={{display:"flex",justifyContent:"center",flexDirection:"column",gap:"2rem"}}>
         "Please wait while we fetch your results..."
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
                 backgroundColor:'#21D0C3',
                 color: 'white',
                 fontSize: '15px',
                 padding: '4px',
                 height: '50px',
               }}
               
               onClick={()=>{handleOpenPdf()}}
             >
               View Result
             </Button>

           
           </Grid>
         }
           

         </Grid>

     }

        </Grid>
      
    </>
  );
};

export default Radiology;
