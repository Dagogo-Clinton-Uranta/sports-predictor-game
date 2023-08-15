import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Iconify from '../components/iconify';

import Piggy from '../assets/images/piggy2.jpg';
import CoolerEntryIMG from '../assets/images/cooler-entry.jpg';
import LoginForm from 'src/components/login/LoginForm';
import { useState } from 'react';
import ForgotPasswordForm from 'src/components/forgot-password/ForgotPassowrdForm';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const [forgotPassword, setForgotPassword] = useState(false);

  return (
    <>
      <Helmet>
        <title> Login | Cooler Web </title>
      </Helmet>

      <StyledRoot>
      {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
      <img src={Piggy} width="100" height="100"/>
    </Typography> */}
      

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src={CoolerEntryIMG} alt="login" />
            {/* <img src="/assets/illustrations/illustration_login.png" alt="login" /> */}
          </StyledSection>
        )}

        <Container maxWidth="sm">
          {forgotPassword ? <StyledContent>
            <Typography variant="h4" gutterBottom>
              Forgot your Password
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Enter email address to reset password {''}
            </Typography>

            <ForgotPasswordForm setForgotPassword={setForgotPassword}/>
            <Typography variant="body2" sx={{ mt: 2 }} onClick={() => setForgotPassword(false)}>
              <Link href='#' variant="subtitle2">Sign In</Link>
            </Typography>
          </StyledContent> : <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to Cooler(Employee)
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Don’t have an account? {''}
              <Link href='/register' variant="subtitle2">Get started</Link>
            </Typography>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <LoginForm />
            <Typography variant="body2" sx={{ mt: 2 }} onClick={() => setForgotPassword(true)}>
              <Link href='#' variant="subtitle2">Forgot Password?</Link>
            </Typography>
          </StyledContent>}
        </Container>
      </StyledRoot>
    </>
  );
}
