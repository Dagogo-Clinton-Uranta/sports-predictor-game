import React, { useState,useEffect } from 'react';
import IMG from '../../assets/images/empty-avatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Container, Paper, TextareaAutosize, Button, Typography, Divider, Avatar } from '@mui/material';
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


  useEffect(() => {
    
    dispatch(fetchAllTreatmentCategories());
    dispatch(fetchAllTreatmentTests());
  }, []);

  const { allTreatmentCategories,allTreatmentTests } = useSelector((state) => state.patient);


  const submitPrescriptionResponse = (patientId,b1) => {
    dispatch(submitPrescription(user.uid,patientId,b1))
  }

  return (
    <>
      {selectedPatient && (
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

          <div style={{width: '100%', margin: '20px'}}>
          <Grid item xs={12} md={12} lg={12}>
          <Typography variant="subtitle1" style={{marginBottom: '10px',fontSize:"18px"}}><b>Prescription</b></Typography>
          <br/>
          <TextField
            name="prescription"
            placeholder=""
            fullWidth
            multiline
            rows={6}
            maxRows={8} 
            value={state.specialInstruction}
            onChange={handleChange}
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
                  onClick={()=>{submitPrescriptionResponse(selectedPatient?.uid,state.prescription)}}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </div>
          </div>
        </Grid>
      )}
    </>
  );
};

export default Prescription;
