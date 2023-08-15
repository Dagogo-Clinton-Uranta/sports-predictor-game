import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Chip, Typography, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { signup, uploadImage } from 'src/redux/actions/auth.action';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, CssBaseline, IconButton, InputAdornment, TextField, Grid, Button } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import { LoadingButton } from '@mui/lab';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [employeer, setEmployeer] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState({ selectedFile: [], selectedFileName: [] });
  const [file, setFile] = useState();

  const handleselectedFile = (event) => {
    setSelectedFile({
      selectedFile: event.target.files[0],
      selectedFileName: event.target.files[0].name,
    });
    setFile(URL.createObjectURL(event.target.files[0]));
  };

  const userSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    const user = { fname, lname, email, employeer, password };
    console.log('USER: ', user);
    dispatch(signup(user, navigate, setLoading));
  };

  const inputContainer = {
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyle = {
    background: 'white',
    marginRight: '30px',
    width: '100%',
  };

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Container
        component="main"
        maxWidth="lg"
        style={{ background: '#6077F00F', margin: '20px'}}
      >
        <div style={{}}>
          <CssBaseline />
          <br />
          <br />
          <div style={{ marginLeft: '8%' }}>
            <p style={{ fontSize: '20px', color: '#130C66' }}>
              <b>Employee Registration</b>
            </p>
          </div>
          <hr />
          <form onSubmit={userSignup}>
          <Grid container direction="column" spacing={6} style={{ paddingLeft: '100px', paddingRight: '100px' }}>
            <Grid item xs>
              <Grid container direction="row">
                <Grid item xs={4}>
                  <p style={{ fontSize: '17px', width: '40%' }}>First name</p>
                  <div style={inputContainer}>
                    <TextField
                      name="fname"
                      required
                      value={fname}
                      onChange={(e) => setFName(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <p style={{ fontSize: '17px', width: '40%' }}>Last name</p>
                  <div style={inputContainer}>
                    <TextField
                      name="lname"
                      required
                      value={lname}
                      onChange={(e) => setLName(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid container direction="row">
                <Grid item xs={4}>
                  <p style={{ fontSize: '17px', width: '40%' }}>Email address</p>
                  <div style={inputContainer}>
                    <TextField
                      name="email"
                      required
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <p style={{ fontSize: '17px', width: '40%' }}>Employer</p>
                  <div style={inputContainer}>
                    <TextField
                      name="employeer"
                      required
                      type="number"
                      onChange={(e) => setEmployeer(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid container direction="row">
                <Grid item xs={4}>
                  <p style={{ fontSize: '17px', width: '40%' }}>Password</p>
                  <div style={inputContainer}>
                    <TextField
                      name="password"
                      required
                      type={showPassword ? 'text' : 'password'}
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                              <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      style={inputStyle}
                    />
                  </div>
                </Grid>
                <Grid item xs={4}></Grid>

                <Grid container direction="row" style={{marginTop: '2%'}}>
              <Grid item xs={2}>
                <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={loading} style={{background: '#348AED'}}>
                  {loading ? 'Loading...' : 'Sumbit'}
                </LoadingButton>
              </Grid>
              &nbsp; &nbsp; &nbsp;
              <Grid item xs={2}>
                <LoadingButton onClick={() => {
                  navigate('/login');
                }} fullWidth size="large" variant="contained" disabled={loading} style={{background: '#348AED'}}>
                  {loading ? 'Loading...' : 'Cancel'}
                </LoadingButton>
              </Grid>
            </Grid>
              </Grid>
            </Grid>
          </Grid>
          </form>
        </div>
      </Container>
      </div>
    </>
  );
}
