import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';

import BANNER_IMG from '../assets/images/banner-bg.png';
import IMG from '../assets/images/img-2.png';
import MALE from '../assets/images/man.png';
import FEMALE from '../assets/images/woman.png';
import FLOGO from '../assets/images/fLogo.png';
import RegisterForm from 'src/components/register/RegisterForm';

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

export default function RegisterPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> FANTASY PREDICTOR </title>
      </Helmet>

      <StyledRoot style={{  flexDirection: 'row' }}>
   

   <Container  style={{ display:'flex',  marginTop: '5%',gap:"1rem", marginBottom: '5%'}}>

      <Container  style={{display: 'flex', justifyContent: 'center',alignItems:"center",flex:4, border: '1px solid #0000001A',  marginTop: '2%', marginBottom: '2%', borderRadius: '15px' }}>
          <StyledContent>
          
            <Typography variant="h6" sx={{ textAlign: 'left', mb: 2}}>
                Register
              </Typography>
            <RegisterForm />
          

            {/* <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider> */}
          </StyledContent>
        </Container>

      <Container  style={{display: 'flex', justifyContent: 'center',alignItems:"center",flex:2, border: '1px solid #0000001A',   marginTop: '2%', marginBottom: '2%', borderRadius: '15px' }}>
          <StyledContent>
         
        
          <div style={{ display: 'flex', justifyContent: 'center',alignItems:"center", marginBottom: '50px' }}>
            
            <img src={FLOGO} width="160" height="160" />
            </div>
          
            <Typography variant="h4" gutterBottom style={{textAlign: 'center' }} >
          FANTASY PREDICTOR
          </Typography>

          </StyledContent>
        </Container>

     </Container>
     
      </StyledRoot>
    </>
  );
}
