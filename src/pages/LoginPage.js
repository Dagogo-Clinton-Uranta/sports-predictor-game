import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';

import BANNER_IMG from '../assets/images/banner-bg.png';
import IMG from '../assets/images/img-2.png';
import MALE from '../assets/images/male.png';
import FEMALE from '../assets/images/female.png';
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
  backgroundImage: `url(${BANNER_IMG})`,
  backgroundSize: '100% 100%',
  objectFit: 'cover',
  backgroundPosition: 'center',
  alignItems: 'center',
  justifyItems: 'center',
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '50vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(5, 5, 12, 5),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> IBARA </title>
      </Helmet>

      <StyledRoot style={{ flexDirection: 'row-reverse' }}>
      <Container maxWidth="sm" style={{ border: '1px solid #0000001A', flex: 2,   marginTop: '2%', marginBottom: '2%', borderRadius: '15px' }}>
          <StyledContent>
          <Typography variant="h4" gutterBottom style={{textAlign: 'center', fontSize: '46px'}} >
              Login
            </Typography>

          <Typography variant="h6" gutterBottom style={{textAlign: 'center', marginTop: '60px' }} >
          Select your gender
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
              <img src={MALE} width="130" height="130" />
              <Divider sx={{ my: 3,}}>
                OR
              </Divider>
            <img src={FEMALE} width="130" height="130" />
            </div>
            <Typography variant="h6" sx={{ textAlign: 'center', mb: 2}}>
                Enter login details
              </Typography>
            <LoginForm />
          

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
