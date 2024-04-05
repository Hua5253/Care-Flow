import * as React from 'react';
import  { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Button, Box, TextField, } from '@mui/material';

import ConfirmationModal from './Modals/ConfirmationModal';

export default function ViewProcedure() {

  const [isEditing, setEditMode] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false); // State to control the ConfirmationModal

  const [text, setText] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lacinia metus a malesuada tristique." +
    "Nunc non tortor a dolor vestibulum pulvinar." +
    "Morbi placerat felis nec diam dictum pellentesque." +
    "Nunc non ex facilisis ex condimentum sagittis ut vitae nulla." +
    "Vivamus ut turpis quis velit ullamcorper tincidunt." +
    "Pellentesque et enim viverra, hendrerit risus eu, ornare sem." +
    "Pellentesque porta metus nec egestas aliquet." +
    "Aliquam vulputate tellus non nibh placerat posuere." +
    "Donec sed dolor et nisi mattis tincidunt in varius leo." +
    "Vestibulum eget tortor porttitor, laoreet sem sed, feugiat quam." +
    "Nulla dictum ligula in dolor pharetra fermentum." +
    "Integer sit amet nibh non leo gravida bibendum non sit amet turpis."
  );

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value);

  const handleStartProcedure = () => {
    // Call this when you want to open the confirmation modal
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    // Call this to close the modal
    setOpenConfirmation(false);
  };

  const handleConfirmProcedure = () => {
    // Handle the confirmation action here
    console.log("Procedure started");
    setOpenConfirmation(false); // Close modal after confirmation
  };

  return (
    <Paper
      sx={{
        width: '100%',
        padding: 2,
        margin: 'auto',
        marginTop: 8,
        maxWidth: 'none',
        backgroundColor: '#9DB4C0',
        flexGrow: 1,
        overflow: 'hidden', // Add this to handle overflow if the content exceeds the viewport width
      }}
    >
      <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
        <Table sx={{ width: '100%' }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="left">Time</TableCell>
              <TableCell align="left">Patient</TableCell>
              <TableCell align="left">Procedure</TableCell>
              <TableCell align="left">Location</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#C2DFE3' }}> {/* Color applied here */}
              <TableCell>Aug 24</TableCell>
              <TableCell align="left">12:30 PM</TableCell>
              <TableCell align="left">Alice Johnson</TableCell>
              <TableCell align="left">MRI</TableCell>
              <TableCell align="left">Room 2020</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {
        isEditing ? (
          <TextField
            fullWidth
            multiline
            minRows={4}
            value={text}
            onChange={handleChange}
            variant="outlined"
            sx={{
              backgroundColor: '#FFFFFF',
              margin: '16px 0',
              minHeight: '500px',
              
            }}
          />
        ) : (
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              whiteSpace: 'pre-line',
              backgroundColor: '#E0FBFC',
              padding: 2,
              minHeight: '500px',
             
            }}
          >
            {text}
          </Typography>
        )
      }
      <Box >
        
        {isEditing ? (
          <Box>
            <Button variant="contained" onClick={handleSaveClick} sx={{  backgroundColor: '#5C6B73', marginRight: '8px' }}>Save changes</Button>
            <Button variant="contained" color="error" sx={{ backgroundColor: '#5C6B73' }}>Cancel edit</Button>
          </Box>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }} >
              <Box>
                <Button variant="contained" onClick={handleStartProcedure} sx={{ backgroundColor: '#5C6B73', marginRight: '8px' } }>Start procedure</Button>
                <Button variant="contained" onClick={handleStartProcedure} sx={{ backgroundColor: '#5C6B73', marginRight: '8px' }}>End procedure</Button>
                
              </Box>
              <Box>
                <Button variant="contained" onClick={handleEditClick} sx={{  backgroundColor: '#5C6B73', marginRight: '8px' }}>Edit procedure</Button>
                <Button variant="contained" onClick={handleStartProcedure} color="error" sx={{ backgroundColor: '#5C6B73' }}>Cancel procedure</Button>
              </Box>

            </Box>
          )}
      </Box>
      <ConfirmationModal
        open={openConfirmation}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmProcedure}
      />
    </Paper>
  );
}