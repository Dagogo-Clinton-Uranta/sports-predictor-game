import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React,{useEffect} from 'react';
import {  reset } from 'src/redux/actions/patient.action';



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
        height: '60vh',
      }}
    >
      <Button
        type="submit"
        fullWidth
        variant="contained"
        style={{
          maxWidth: '15%',
          backgroundColor: 'black',
          color: 'white',
          fontSize: '15px',
          padding: '6px',
          height: '60px',
        }}
        onClick={() => {
            navigate('/dashboard/home');
        }}
      >
        Click to Begin
      </Button>
    </div>
  );
};

export default EntryPage;
