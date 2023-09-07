import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const EntryPage = () => {
    const navigate = useNavigate();
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
