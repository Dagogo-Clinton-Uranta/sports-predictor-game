import React, { useState ,useEffect,useRef} from 'react';
import IMG from '../../assets/images/empty-avatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Container, Chip, Paper, TextareaAutosize, Button, Typography, Divider, Avatar } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { admitPatients } from 'src/redux/actions/patient.action';
import { notifySuccessFxn } from 'src/utils/toast-fxn';
import { useNavigate } from 'react-router-dom';
import ECGIMG from '../../assets/images/ecg.png';
import MAN from '../../assets/images/man.png';
import WOMAN from '../../assets/images/woman.png';
import KID from '../../assets/images/kid.png';
import Modal from '@mui/material/Modal';



//import { BodyComponent } from 'reactjs-human-body';
//import { PartsInput } from 'reactjs-human-body/dist/components/BodyComponent/BodyComponent';
//import {useFloating} from '@floating-ui/react';

import styled from 'styled-components';



const StyledDiv = styled.div`
  padding: 10px;
  background-color: white;
  color: black;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '4rem',
    paddingRight: '4rem',
  },
  searchInput: {
    background: '#00000033',
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

const ECG = ({ state, setState, handleChange }) => {
  const { selectedPatient,admittedPatients } = useSelector((state) => state.patient);
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


  const admitPatientFxn = () => {
    dispatch(admitPatients(selectedPatient?.uid, setLoading, navigate));
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete1 = () => {
    setState({
        ...state,
        ecg: '',
      });
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {setOpen(false)};

  /*BODY PARTS LOGIC */
  const [params, setParams] = useState(true);


const exampleParams = {
  head: { selected: true },
  leftArm: { show: false },
};

  const onChange = (parts) => console.log('Changed Parts:', parts);
  const onClick = (id) => console.log('Changed Id:', id);
  console.log("params are",params);
/*BODY PARTS LOGIC END */


/*FLOATING UI LOGIC */
//const {refs, x, y, strategy,floatingStyles} = useFloating();
/*FLOATING UI LOGIC END */

  return (
    <>
   
   <Modal
        style={{display:"flex",justifyContent:"center",alignItems:"center"}}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
       <center style={{backgroundColor:"white",borderRadius:"10px",width:"90%",height:"90%"}}>

       {<img src={ECGIMG}   /*ref={refs.setReference}*/ style={{height:"70%",width:"20%" ,position:"relative",top:"20%"}}/>}
       <div /*ref={refs.setFloating} */ style={{
     position: "absolute",
      left: "-490",
      top: "100",
      width: 'max-content',
        }}>
        Tooltip
      </div>

      <div /*ref={refs.setFloating} */ style={{
      position: "absolute",
      left: "-190",
      top: "845",
      width: 'max-content',
        }}>
        Oladipo
      </div>
        {/*params ? (
        <StyledDiv>
          Showing with params {JSON.stringify(exampleParams, null, 2)}
          <BodyComponent
              partsInput={{
                head: { show: true },
              }}
            onChange={onChange}
            onClick={onClick}
          />
        </StyledDiv>
      ) : (
        <StyledDiv>
          Example With no Params
          <BodyComponent onChange={onChange} onClick={onClick} />
        </StyledDiv>
      )*/}
       </center>

      
    </Modal>
     
   {
      selectedPatient && (
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

          <div style={{ width: '100%', margin: '20px' }}>
            <Grid item xs={12} md={12} lg={12}>
              <Typography variant="subtitle1" style={{ marginBottom: '0px', fontSize: '18px' }}>
                <b>ECG</b>
              </Typography>
             <center style={{position:"relative",marginTop:"-2%"}} /*onClick={()=>{setOpen(true)}}*/ >
               <img src={ECGIMG} style={{height:"220px",width:"110px" ,position:"relative",top:"20%"}}/>
               </center>
              {/* <select
                name="ECG"
                value={state.ECG}
                onChange={handleChange}
                className={classes.searchInput}
                style={{ minHeight: '50px', fontSize: '17px', outline: '1px solid #eee' }}
                required
              >
                <option value=""></option>
                <option value="CXray">CXray</option>
                <option value="YGray">YGray</option>
                <option value="Sinsa">Sinsa</option>
              </select> */}
            </Grid>
            <div style={{padding: '10px',marginTop:"0px", border: state.ecg ? '1px solid #00000033' : ''}}>
             {state.ecg &&  <Chip label={state.ecg} onClick={handleClick} onDelete={handleDelete1} />}
             
            </div>
            <div style={{ padding: '10px' }}>
              <br />
              <Grid container spacing={2} style={{ alignContent: 'bottom', alignItems: 'top' }}>
                <Grid item xs={4} md={4}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{
                      backgroundColor: '#21D0C3',
                      color: 'white',
                      fontSize: '15px',
                      padding: '4px',
                      height: '50px',
                      marginTop:"-5px"
                    }}
                    disabled={loading}
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

export default ECG;

