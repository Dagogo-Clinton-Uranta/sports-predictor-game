import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Typography, Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../iconify';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from 'src/redux/actions/auth.action';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); 

  const userSignin = (e) => {
    e.preventDefault();
    setLoading(true);
    const user = { email, password };
    dispatch(signin(user, navigate, setLoading));
    //navigate('/dashboard/home')
  }

  return (
    <>
     <form onSubmit={userSignin}>
      <Stack spacing={3}>
      <TextField
      required
      name="Username"
      type="text"
      label="Username"
      onChange={(e) => setEmail(e.target.value)}
      sx={{ borderRadius: '12px', background: '#D9D9D921' }}
    />

        <TextField
          name="password"
          label="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          sx={{ borderRadius: '12px', background: '#D9D9D921' }}
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
      </Stack>

      


      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
      </Stack>


      <LoadingButton fullWidth size="large" type="submit" disabled={loading} style={{backgroundColor: '#260952', color: 'white'}}>
        {loading ? "Loading..." : "Login"}
      </LoadingButton>

      <Typography variant="body2" sx={{ mt: 2, mb: 2, color: '#260952', textAlign: 'left' }}>
              <Link href='/register' variant="subtitle2"><span style={{color: '#260952' }}>Dont have an account? Register</span></Link>
            </Typography>
      </form>
    </>
  );
}
