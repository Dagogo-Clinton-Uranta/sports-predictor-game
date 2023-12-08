import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React,{useEffect} from 'react';
import {  logout } from 'src/redux/actions/auth.action';

import LOGO from '../assets/images/fLogo.png';
import BACKGROUND_IMG from '../assets/images/background.png';
import BACKGROUND_IMG2 from '../assets/images/background2.jpg';


const EntryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth);

 



 useEffect(()=>{
if(user && user.Leagues && user.Leagues.length > 0){
  navigate('/dashboard/football-goalscorers')
}
 },[user])


  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
       
        position: 'relative',
        backgroundImage: `url(${BACKGROUND_IMG2})`,
        background: 'linear-gradient(to bottom, #000000, #15197ED9)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
       
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <img src={LOGO} alt="Logo" style={{height:"100px", margin: '20px' }} />
      </div>

      <div
        style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        
        }}
      >
        <h1
          style={{
            fontWeight: '700',
            fontSize: '48px',
            textAlign: 'center',
            color: 'white',
          
            zIndex: 1,
          }}
        >
          You are currently not in any league
        </h1>
        <h3
          style={{
            fontWeight: '400',
            fontSize: '37px',
            textAlign: 'center',
            lineHeight: '1px',
            color: 'white',
            margin: '0',
            zIndex:1,
          }}
        >
          Please Pick a League
        </h3>
        <h3
          style={{
            fontWeight: '400',
            fontSize: '37px',
            textAlign: 'center',
            color: 'white',
          }}
        >
          and join
        </h3>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        
        style={{
          maxWidth: '20%',
          backgroundColor: '#260952',
          color: 'white',
          fontSize: '15px',
          padding: '14px',
          height: '60px',
          zIndex:6,
        }}
        onClick={() => {
            navigate('/entry');
        }}
      >
       Join 
      </Button>


      <Button
        type="submit"
        fullWidth
        variant="contained"
        
        style={{
          maxWidth: '20%',
          marginTop:"1rem",
          backgroundColor: '#260952',
          color: 'white',
          fontSize: '15px',
          padding: '14px',
          height: '60px',
          zIndex:6,
        }}
        onClick={() => {
           dispatch(logout(navigate))
        }}
      >
       Log Out 
      </Button>
      </div>
    </div>
  );
};

export default EntryPage;
