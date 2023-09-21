import React, { useState } from 'react';
import IMG from '../../assets/images/empty-avatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Container, Chip, Paper, TextareaAutosize, Button, Typography, Divider, Avatar } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { admitPatients } from 'src/redux/actions/patient.action';
import { submitBloodInvestigation } from 'src/redux/actions/candidate.action';
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

const BloodInvestigation = ({ state, setState, handleChange }) => {
  const { selectedPatient } = useSelector((state) => state.patient);
  const {user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const classes = useStyles();
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

  const getAvatarSrc = (gender) => {
    switch (gender) {
      case 'Male':
        return MAN;
      case 'Female':
        return WOMAN;
      case 'Kid':
        return KID;
      default:
        return MAN; 
    }
  };



  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const submitBIresponse = (patientId,b1,b2) => {
    dispatch(submitBloodInvestigation(user.uid,patientId,b1,b2))
  }

  const handleDelete = () => {
    setState({
        ...state,
        bloodInv1: '',
        bloodInv2: '',
      });
  };


  return (
    <>
      {selectedPatient && (
        <Grid container spacing={1} sx={{ minWidth: 100 }}>
          <Grid item>
          <Avatar alt="avatar" src={getAvatarSrc(selectedPatient.gender)} style={{ width: '80px', height: '80px', marginRight: '20px' }} />
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
                {selectedPatient?.age}YRS | {selectedPatient?.gender.toUpperCase()}
              </Typography>
            </Grid>
          </Grid>

          <div style={{ width: '100%', margin: '20px' }}>
            <Grid item xs={12} md={12} lg={12}>
              <Typography variant="subtitle1" style={{ marginBottom: '10px',fontSize: '18px' }}>
                <b>Blood Investigation</b>
              </Typography><br/>
              <select
                name="bloodInv1"
                value={state.bloodInv1}
                onChange={handleChange}
                className={classes.searchInput}
                style={{ minHeight: '50px', fontSize: '17px', outline: '1px solid #eee' }}
                required
              >
                <option value=""></option>
                <option value="Toxicology">Toxicology</option>
                <option value="Pantalogy">Pantalogy</option>
                <option value="Heriye">+Heriye</option>
              </select>
            </Grid>
            <div style={{ marginTop: '10px' }}></div>
            <Grid item xs={12} md={12} lg={12}>
              <select
                name="bloodInv2"
                value={state.bloodInv2}
                onChange={handleChange}
                className={classes.searchInput}
                style={{ minHeight: '50px', fontSize: '17px', outline: '1px solid #eee' }}
                required
                disabled={!state.bloodInv1 ? true : false}
              >
                <option value=""></option>
                <option value="Full Blood Count">Full Blood Count</option>
                <option value="Half Blood Count">Half Blood Count</option>
              </select>
            </Grid>
            <br/>
            <div style={{padding: '10px', border: state.bloodInv2 ? '1px solid #00000033' : ''}}>
             {state.bloodInv2 && <> &nbsp; 
              <Chip label={state.bloodInv2} onClick={handleClick} onDelete={handleDelete} /></>}
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
                      backgroundColor:!state.bloodInv1||!state.bloodInv2?'#199e94':'#21D0C3',
                      color: 'white',
                      fontSize: '15px',
                      padding: '4px',
                      height: '50px',
                    }}
                    disabled={!state.bloodInv1 ||!state.bloodInv1  ||loading}
                    onClick={()=>{submitBIresponse(selectedPatient?.uid,state.bloodInv1,state.bloodInv2)}}
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

export default BloodInvestigation;
