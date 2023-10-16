import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React,{useEffect} from 'react';
import {  reset } from 'src/redux/actions/patient.action';

import LOGO from '../assets/images/ibara_logo.png';
import BACKGROUND_IMG from '../assets/images/background.png';
import BACKGROUND_IMG2 from '../assets/images/background2.jpeg';


const EntryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
   dispatch(reset(user?.uid))
  }, []);


  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(to bottom, #000000, #15197ED9)',
        position: 'relative',
        backgroundImage: `url(${BACKGROUND_IMG2})`,
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
        <img src={LOGO} alt="Logo" style={{ margin: '20px' }} />
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
          Royal College of Emergency Physicians Part 3 Exams
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
          5th Sept, 2023
        </h3>
        <h3
          style={{
            fontWeight: '400',
            fontSize: '37px',
            textAlign: 'center',
            color: 'white',
          }}
        >
          08:00 GMT +1
        </h3>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        
        style={{
          maxWidth: '20%',
          backgroundColor: 'black',
          color: 'white',
          fontSize: '15px',
          padding: '14px',
          height: '60px',
          zIndex:6,
        }}
        onClick={() => {
            navigate('/dashboard/home');
        }}
      >
       Begin Exam
      </Button>
      </div>
    </div>
  );
};

export default EntryPage;
