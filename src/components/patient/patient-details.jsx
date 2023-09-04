import React from 'react';
import IMG from '../../assets/images/empty-avatar.png';
import { Grid, Container, Paper, Button, Typography, ButtonBase, Avatar } from '@mui/material';

const PatientDetails = () => {
  const mystyle = {
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: 200,
    fontSize: '18px',
    lineHeight: '30px',
    color: 'black',
  };

  return (
    <Grid container spacing={1}>
      <Grid item>
        <Avatar alt="avatar" src={IMG} style={{ width: '80px', height: '80px', marginRight: '20px' }} />
        {/* </ButtonBase> */}
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs style={{ border: '0px solid red' }}>
            <Typography gutterBottom variant="subtitle1" component="div" style={mystyle}>
              BELLA NEIL
            </Typography>
            <Typography variant="body2" gutterBottom style={mystyle}>
            4YRS | KID
            </Typography>

            <Typography variant="body2" color="text.secondary" style={mystyle}>
            COUGH
            </Typography>
          </Grid>

        </Grid>
      </Grid>
      <div style={{padding: '10px'}}>
      <center>
            <div style={{ marginTop: '10px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat......MORE
            </div>
          </center>
          {/* <hr /> */}
            <br/>
            <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "black",
                color: "white",
                fontSize: "15px",
                padding: '6px',
                height: '50px'
              }}
            >
              ADMIT
            </Button>
          </Grid>

          <Grid item xs={6} md={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "transparent",
                border: '1px solid black',
                color: "black",
                fontSize: "15px",
                padding: "6px",
                height: '50px'
              }}
              // onClick={() => setOpen(true)}
            >
              DISCHARGE
            </Button>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

export default PatientDetails;
