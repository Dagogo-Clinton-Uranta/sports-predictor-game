import * as React from 'react';
import Typography from '@mui/material/Typography';
// import Title from './title';
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import INJECT from '../../assets/images/inject.png';




export default function EmptyPane({title}) {
 const navigate = useNavigate();
  return (
    <>
      <Typography
            color="textPrimary"
            style={{padding: '10px'}}
            variant="h6"
            component="p"
          >
        <b>{title}</b> 
      </Typography>
      <br/><br/>
      <center>
      {/* <br/><br/> */}
        <img src={INJECT} alt="Inject" />
        <Typography
          style={{color: '#00000033', fontSize: '16px'}}
            component="p"
          >
        No action available
      </Typography>
      </center>
    </>
  );
}