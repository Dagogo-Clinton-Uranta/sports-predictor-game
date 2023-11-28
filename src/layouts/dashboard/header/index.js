import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography, Grid, Button } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import Searchbar from './Searchbar2';
import AccountPopover from './AccountPopover';
import NotificationsPopover from './NotificationsPopover';
import Searchbar2 from './Searchbar2';
import { useSelector } from 'react-redux';
import CustomSearchBar from 'src/components/global/CustomSearchBar';
import { FaFlag } from "react-icons/fa6";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  backgroundColor: 'white',
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));


const RespDisplay = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
     display:"flex",
    flexDirection: 'column',
    
   
  },

  [theme.breakpoints.up('md')]: {
    display:"flex",
    flexDirection: 'row',
    gap:"6rem",
 
  },
}));


const RespHidden = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
     display:"none",
   
  },

  [theme.breakpoints.up('md')]: {
    display:"inline",
  
 },

}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const { user } = useSelector((state) => state.auth);
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      
      <RespDisplay>
            <Typography variant="h4" sx={{color: '#392751', fontSize: '36px' }}>
           <RespHidden> Dashboard</RespHidden>
             {/* Welcome {user?.firstName + " " + user?.lastName}🖐🏽 */}
            </Typography>
    
            <Box sx={{ flexGrow: 1 }} />
           
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{color: '#392751', fontSize: '16px' }}>
            WELCOME TO {user && user.leagues && user.leagues.length >0  ?user.leagues[0].leagueName :"919 DEFENDERS"},&nbsp; {user && user.firstName ?user.firstName :"JOE"}<RespHidden>&nbsp;&nbsp; - 10,000 Points</RespHidden>
            </Typography>
           </Grid>
       </RespDisplay>

        {/* <Searchbar /> */}
        {/* <Searchbar2 /> */}
        <Box sx={{ flexGrow: 1 }} />
        
        <Typography variant="h4" sx={{color: '#392751', fontSize: '32px',marginRight:"1rem",marginTop:"0.6rem" }}>
        <RespHidden>
        <FaFlag />
        </RespHidden>
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {/* <NotificationsPopover /> */}
          <AccountPopover />
        </Stack>   
        
         
      </StyledToolbar>
    </StyledRoot>
  );
}
