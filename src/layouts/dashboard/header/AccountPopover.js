import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover, Grid, CardMedia, Button } from '@mui/material';
// mocks_
import account from '../../../_mock/account';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateProfile, uploadProfileImage } from 'src/redux/actions/auth.action';
import { useNavigate } from 'react-router-dom';
import BLACKMAN from 'src/assets/images/man.jpeg'
import DEFAULTIMG from 'src/assets/images/rec.png';
import { notifyErrorFxn } from 'src/utils/toast-fxn';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const [openImage, setOpenImage] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [submittable,setSubmittable] = useState(false)

  const [selectedFile, setSelectedFile] = useState({selectedFile: [], selectedFileName: []});
  const [file, setFile] = useState();
   const [state, setState] = useState({
    paymentLink: user?.paymentLink ? user?.paymentLink : "",
    password: "",
    imageUrl: user?.imageUrl ? user?.imageUrl : "",
  })


  const dispatch = useDispatch();
  const navigate = useNavigate();


  const settingsUpdate = (e) => {
    e.preventDefault();
  //   console.log("OLD SATE: ",state);
   // state.paymentLink = state.paymentLink == "" ? user?.paymentLink : state.paymentLink;
  //   state.imageUrl = selectedFile.selectedFile == "" ? user?.imageUrl : selectedFile.selectedFile;
  //   return;
    setLoading(true);
    const id = user.id;
    const imageUrl = user.imageUrl;
    if(selectedFile.selectedFile.length == 0){
      notifyErrorFxn("You have not uploaded an Image");
      //dispatch(updateProfile(state, id, '', navigate, setLoading, imageUrl));
    }else{
      dispatch(uploadProfileImage(state, selectedFile.selectedFile, id, navigate, setLoading,setOpenImage,setOpen));
      //setTimeout(()=>{ setLoading(false);},2500)
    }
   
  }


  const handleselectedFile = event => {
    setSelectedFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
    setFile(URL.createObjectURL(event.target.files[0]));
    setSubmittable(true)
};



  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleOpenImage = (event) => {
    setOpenImage(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleCloseImage = () => {
    setOpenImage(null);
    setSubmittable(false)
    setFile('')
    setSelectedFile({selectedFile: [], selectedFileName: []})
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={user &&user.imageUrl ?user.imageUrl:BLACKMAN} alt="photoURL" />
      </IconButton>
      <ArrowDropDownIcon sx={{color: 'black'}} onClick={handleOpen}/>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            // width: 180,
            width: 200,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid sx={{mt: 1, ml: 1}}>
          <Avatar  onClick={handleOpenImage}  src={user && user.imageUrl?user.imageUrl:BLACKMAN} alt="photoURL" />

        {/*2nd level popover for image uploads */}
          <Popover
        open={Boolean(openImage)}
        anchorEl={openImage}
        onClose={handleCloseImage}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        PaperProps={{
          sx: {
            p: 2,
            mt: 1.5,
            ml: 0.75,
            // width: 180,
             width: 300,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >

     <center item xs={12} md={4} style={{border: '0px solid red', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{}}>
          <CardMedia
            style={{ border: '0.2px solid black', backgroundColor: '#fff', width: '240px' }}
            component="img"
            height="240"
           // width="540"
            image={file ? file : state.imageUrl !== "" ? state.imageUrl : DEFAULTIMG}
            alt="IMG"
          />
          <Button component="label" variant="contained" style={{ minHeight: '45px', minWidth: '145px', backgroundColor: '#348AED', marginTop: '15px' }}>
            <b>UPLOAD</b>
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={handleselectedFile}
            />
          </Button>

         { submittable &&
         
         <Button component="label"
         onClick={(e)=>{settingsUpdate(e)}}
         variant="contained" style={{ minHeight: '45px', minWidth: '145px', backgroundColor: '#348AED', marginTop: '15px' }}>
            <b>{loading?"loading...":"UPDATE PROFILE PIC"}</b>
            <input
              type="file"
              style={{ display: 'none' }}
             
            />
          </Button>}

        </div>
      </center>

      </Popover>
      {/*2nd level popover for image uploads -- END */}

          </Grid>
          <Box sx={{ my: 1.5, px: 1 }}>
          <Typography variant="subtitle2" noWrap>
            {user.firstName && user.lastName?
            
            user.firstName + " " + user.lastName
            :

            user && user.teamName ? user.teamName:' '}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>
        </Grid>


        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* <MenuItem sx={{ pt: 1 }}>
          Accounts
        </MenuItem>
        <Divider />
        <Stack sx={{color: '#828D9F' }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack> */}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={() => dispatch(logout(navigate))} sx={{ m: 1 }} >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
