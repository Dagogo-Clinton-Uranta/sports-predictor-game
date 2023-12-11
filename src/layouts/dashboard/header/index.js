import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography, Grid, Button, Select, MenuItem } from '@mui/material';
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
import nigeria from "../../../assets/images/nig.png"

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
    <>
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
      <div style={{display:"flex",flexDirection:"row",gap:"1rem", alignItems:"center",justifyContent:"center"}}>
      <img src={nigeria} alt="nigeria flag"/> 

            <Typography variant="h4" sx={{color: '#392751', fontSize: '36px' }}>
        
 
           <RespHidden>  
              
           <Select
          style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"8rem"}}
         inputProps={{
         /* classes: {
              icon: classes.icon,
          },*/
      }}
        
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={"Select a Team"}
          label="icon"
          onChange={(event) => {
         
          }}
        >   
        {user && user.Leagues && 
        user.Leagues.map((item)=>(
  <MenuItem style={{color:"black"}} value={item.leagueName}>{item.leagueName}</MenuItem>
  
        )  
    )
       }
        </Select>
        
           
           </RespHidden>
        
     </Typography>
     </div>
            <Box sx={{ flexGrow: 1 }} />
           
          
      </RespDisplay>

        <Box sx={{ flexGrow: 1 }} />
        
        <Typography variant="h4" sx={{color: '#392751', fontSize: '20px',marginRight:"1rem",marginTop:"0rem" }}>
       
       {user.accountBalance >= 0 && 
        <RespHidden>
       
        {(user.accountBalance).toLocaleString()} &nbsp; PTS
        </RespHidden>
       }
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
      
      <RespHidden>
      <center>
         <Typography variant="h6" sx={{color: '#392751', fontSize: '16px' }}>
             {user && user.Leagues && user.Leagues.length >0  ?` WELCOME TO ${user.Leagues[0].leagueName}` :" "}&nbsp; 
            </Typography>
    </center>
    </RespHidden>

    </StyledRoot>

  

    </>
  );
}
