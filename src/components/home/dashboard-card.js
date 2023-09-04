import * as React from 'react';
import Typography from '@mui/material/Typography';
// import Title from './title';
import { Button, Divider, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { fCurrency } from 'src/utils/formatNumber';


function preventDefault(event) {
  event.preventDefault();
}

export default function DashboardCard({header, value, img, type}) {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
     <Grid container alignItems="center">
      <Grid item xs={6}>
      <Typography color="textPrimary" variant="h6" component="p" style={{color: '#392751', fontSize: '17px'}}>
        <b>{header}</b>
      </Typography>
      </Grid>
      {type === "last" && (
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', border: '0px solid red', minHeight: '25px', minWidth: '100px' }}>
        <select>
          <option value="option1">Monthly</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
          </select>
        </Grid>
      )}
    </Grid>

      <br/>
      <Grid container alignItems="center">
      <Grid item xs={6}>
        <Typography color="textPrimary" variant="h1" component="p" style={{color: '#392751', fontSize: '36px'}}>
          <b>{value}</b>
        </Typography>
      </Grid>
      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', border: '0px solid red' }}>
        <img src={img} alt="Your Image" style={{ maxWidth: '100%', height: 'auto', border: '0px solid green' }} />
        </Grid>

    </Grid>
      <br />
    </>
  );
}
