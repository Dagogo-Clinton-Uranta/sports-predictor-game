import React from 'react';
import { Grid, Container, Typography, Paper, Avatar } from '@mui/material';
import HBED from '../../assets/images/hospital-bed.png';
import { useDispatch } from 'react-redux';
import { setSelectedPatient } from 'src/redux/reducers/patient.slice';

import MAN from '../../assets/images/man.png';
import WOMAN from '../../assets/images/woman.png';
import KID from '../../assets/images/kid.png';

const HospitalBed = ({ bedNum, patient, onSelectBed, selectedBed  }) => {
  const dispatch = useDispatch();

  const handleBedClick = () => {
    console.log("PATIENT__", patient);
    console.log("SELECTED_BED", selectedBed);
    if(patient != undefined){
      onSelectBed(bedNum);
      dispatch(setSelectedPatient(patient));
    }
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

  return (
    <Grid item xs={6}>
      <Paper
        sx={{
          border: '1px solid #eee',
          borderRadius: '9px',
          cursor: 'pointer',
          backgroundColor: bedNum === selectedBed ? '#23C6B3' : '#EBEBEB80',
          p: 1,
          mb: 2,
          display: 'flex',
          flexDirection: 'row',
          height: 89,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={handleBedClick}
      >
        <img src={HBED} alt="HBED" style={{ marginRight: patient ? '30px' : '56px' }} />
        {patient ? (
          <>
           <Avatar alt="PRF IMG" src={getAvatarSrc(patient.gender)} />
           
            <Typography variant="subtitle1" style={{ flex: 1, marginLeft: '10px' }}>
              {patient?.firstName + ' ' + ' ' + patient?.lastName}
            </Typography>
          </>
        ) : (
          <Typography variant="subtitle1" style={{ flex: 1 }}>
            Hospital Bed {bedNum}
          </Typography>
        )}
      </Paper>
    </Grid>
  );
};

export default HospitalBed;
