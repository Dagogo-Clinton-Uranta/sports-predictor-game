import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';

import IMG from '../assets/images/child.png';
import BONLOGO from '../assets/images/logo.png';
import LoginForm from 'src/components/login/LoginForm';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 680,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
  backgroundImage: `url(${IMG})`,
  backgroundSize: '100% 130%', 
  objectFit: 'cover',
  backgroundPosition: 'center',
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

  return (
    <>
      <Helmet>
        <title> Login | BON Web </title>
      </Helmet>

      <StyledRoot style={{ flexDirection: 'row-reverse' }}>
        {mdUp && (
           <StyledSection style={{ border: '0px solid green', flex: 2 }}>
       </StyledSection>
        )}

        <Container maxWidth="sm" style={{ border: '0px solid red', flex: 2 }}>
          <StyledContent>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
          <img src={BONLOGO} width="300" height="60" />
          </div>
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            <LoginForm />
            <Typography variant="body2" sx={{ mt: 2 }}>
              Don’t have an account yet? {''}
              <Link href='/register' variant="subtitle2">Register here</Link>
            </Typography>

            {/* <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider> */}
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
