import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {Typography, Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Grid, Button, Avatar, MenuItem, Select, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../iconify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signup, uploadImage } from 'src/redux/actions/auth.action';
import { notifySuccessFxn } from 'src/utils/toast-fxn';



const schema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required')
  });



  

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [leagueCode,setLeagueCode] =  useState('');
  const [teamName,setTeamName] =  useState('');
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [userLocation,setUserLocation] = useState('');


  const { isLoading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState({selectedFile: [], selectedFileName: []});
  const [file, setFile] = useState();

  const handleselectedFile = event => {
    setSelectedFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
    setFile(URL.createObjectURL(event.target.files[0]));
};
  

  const userSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    const user = {firstName,lastName,fname, password,teamName,leagueCode,userLocation};
    dispatch(signup(user, navigate, setLoading)); 
  }


  // const userSignup = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const user = {fname, lname, email, password};
  //   dispatch(uploadImage(user, selectedFile.selectedFile, navigate, setLoading)); 
  // }

  return (
    <>
      <form onSubmit={userSignup}>
      <Stack spacing={3}>
      <TextField name="First Name" required label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
      <TextField name="Last Name" required label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        <TextField name="Email" required label="Email" value={fname} onChange={(e) => setFName(e.target.value)}/>
       
       
        <TextField
          name="password"
          label="Password"
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
        />

   <TextField name="Team name" required label="Team Name" value={teamName} onChange={(e) => setTeamName(e.target.value)}/>

   {<>
   
    <Select
          style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%"}}
         inputProps={{
          classes: {
            
          },
      }}
           required
          labelId="hi-label"
          id="hi"
          value={userLocation}
          label={"Location"}
          placeholder={"Location"}
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>Location</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setUserLocation(event.target.value);
          }}
        >
       
  <MenuItem disabled value=""> Location</MenuItem> 
  <MenuItem  value={"Nigeria"}>NG</MenuItem>
  <MenuItem   value={"United States of America"}>US</MenuItem>
  <MenuItem   value={"United Kingdom"}>UK</MenuItem>

       
        </Select>
        </>}
   {/*<TextField name="League Code" required label="League Code" value={leagueCode} onChange={(e) => setLeagueCode(e.target.value)}/>*/}
          {/* <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          >
          <Avatar
              alt="Profile Picture"
              src={file}
              sx={{ width: 56, height: 56 }}
            />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <center>
              <Button
              // fullWidth
              variant="contained"
              component="label"
              style={{backgroundColor: 'black', height:"40px", width: '100%',  fontSize:"15px"}}
            >
              UPLOAD PROFILE PIC
              <input
              type="file"
              style={{ display: 'none' }}
              // hidden
              required
              onChange={handleselectedFile}
              />
            </Button>
            <p>{selectedFile?.selectedFileName}</p>
            </center>
          </Grid> */}
        
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={loading} style={{backgroundColor:'#260952', color: 'white'}}>
        {isLoading ? "Loading..." : "Register"}
      </LoadingButton>


      <Typography variant="body2" sx={{ mt: 2, mb: 2, color: '#260952', textAlign: 'left' }}>
              <Link href='/login' variant="subtitle2"><span style={{color: '#260952' }}>Have an account? Login</span></Link>
            </Typography>
      </form>
    </>
  );
}
