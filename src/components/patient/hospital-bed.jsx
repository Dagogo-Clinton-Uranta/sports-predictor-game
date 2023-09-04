import React from 'react';
import { Grid, Container, Typography, Paper } from '@mui/material';

const HospitalBed = ({bedNum}) => {
  return (
    <Grid item xs={6}>
    <Paper
    sx={{
      border: '1px solid black',
      p: 1,
      mb: 2,
      display: 'flex',
      flexDirection: 'column',
      height: 80,
      alignContent: 'center',
      alignItems: 'center',
      justifyItems: 'center',
      justifyContent: 'center',
      
    }}
  >
    <Typography variant="subtitle1" style={{  }}>
        Hospital Bed {bedNum}
      </Typography>
  </Paper>
    </Grid>
  )
}

export default HospitalBed