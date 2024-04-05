import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Button, Box } from '@mui/material';

interface Procedure {
  date: string;
  time: string;
  patient: string;
  procedureType: string;
  location: string;
}

export default function ViewProcedure() {
  const [procedures, setProcedures] = useState<Procedure[]>([
    { date: 'Aug 24', time: '12:30 PM', patient: 'Alice Johnson', procedureType: 'MRI', location: 'Room 2020' },
    // Add more procedures as needed
  ]);

  const addProcedure = () => {
    const newProcedure = { date: 'Aug 25', time: '1:00 PM', patient: 'Bob Smith', procedureType: 'X-Ray', location: 'Room 2030' };
    setProcedures([...procedures, newProcedure]);
  };

  return (
    <Box sx={{ width: '100%', margin: 'auto', padding: '20px' }}>
      <Paper
        sx={{
          width: '200%',
          minHeight: '80vh', // Use vh unit to scale with the viewport height
          backgroundColor: '#9DB4C0',
          padding: 2,
          margin: 'auto',
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            whiteSpace: 'pre-line',
            backgroundColor: '#E0FBFC',
            padding: 2,
          }}
        >
          Schedule
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="left">Time</TableCell>
                <TableCell align="left">Patient</TableCell>
                <TableCell align="left">Procedure</TableCell>
                <TableCell align="left">Location</TableCell>
              </TableRow>
              {procedures.map((procedure, index) => (
                <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? '#C2DFE3' : null }}>
                  <TableCell>{procedure.date}</TableCell>
                  <TableCell align="left">{procedure.time}</TableCell>
                  <TableCell align="left">{procedure.patient}</TableCell>
                  <TableCell align="left">{procedure.procedureType}</TableCell>
                  <TableCell align="left">{procedure.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button onClick={addProcedure} sx={{ marginY: 2 }}>Add Procedure</Button>
      </Paper>
    </Box>
  );
}