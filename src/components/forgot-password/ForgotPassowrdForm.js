import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../iconify';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from 'src/redux/actions/auth.action';

// ----------------------------------------------------------------------

export default function ForgotPasswordForm({setForgotPassword}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); 

  const forgotPassordFxn = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(forgotPassword(email, setLoading, setForgotPassword));
  }

  return (
    <>
     <form onSubmit={forgotPassordFxn}>
      <Stack spacing={3}>
        <TextField required name="email" type="email" label="Email address" onChange={(e) => setEmail(e.target.value)}/>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={loading}>
        {loading ? "Loading..." : "Send Verification"}
      </LoadingButton>
      </form>
    </>
  );
}
