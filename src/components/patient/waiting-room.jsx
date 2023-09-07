import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fCurrency } from 'src/utils/formatNumber';
import { Paper } from '@material-ui/core';
import { setSelectedPatient } from 'src/redux/reducers/patient.slice';

function preventDefault(event) {
  event.preventDefault();
}

export default function WaitingRoom({ patientData }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (index, row) => {
    setSelectedRow(index === selectedRow ? null : index);
    console.log('SelectedRow:::', row);
    dispatch(setSelectedPatient(row));
  };

  return (
    <>
      <Typography color="textPrimary" variant="h6" component="p" style={{ textAlign: 'left', color: 'white' }}>
        <b>Waiting Room</b>
      </Typography>
      <TableContainer style={{ marginTop: '10px', color: 'white' }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                '& th': {
                  color: 'white',
                  backgroundColor: '#AEAEAE47',
                },
              }}
            >
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Age</b>
              </TableCell>
              <TableCell>
                <b>Gender</b>
              </TableCell>
              <TableCell>
                <b>Nature of Illness</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientData.length > 0 ? (
              patientData.map((row, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleRowClick(index, row)}
                  style={{
                    backgroundColor: selectedRow === index ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <TableCell style={{ color: 'white' }}>{row.name}</TableCell>
                  <TableCell style={{ color: 'white' }}>{row.age}</TableCell>
                  <TableCell style={{ color: 'white' }}>{'Male'}</TableCell>
                  <TableCell style={{ color: 'white' }}>{row.issue}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} style={{ textAlign: 'center' }}>
                  <b>No user in the waiting room</b>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
