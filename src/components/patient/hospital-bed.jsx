import React from 'react';
import { Grid, Container, Typography, Paper } from '@mui/material';
import HBED from '../../assets/images/hospital-bed.png';

const HospitalBed = ({ bedNum }) => {
  return (
    <Grid item xs={6}>
      <Paper
        sx={{
          border: '1px solid #eee',
          borderRadius: '9px',
          backgroundColor: '#EBEBEB80',
          p: 1,
          mb: 2,
          display: 'flex',
          flexDirection: 'row',
          height: 80,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={HBED} alt="HBED" style={{ marginRight: '56px' }} /> 
        <Typography variant="subtitle1" style={{ flex: 1 }}> 
          Hospital Bed {bedNum}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default HospitalBed;
