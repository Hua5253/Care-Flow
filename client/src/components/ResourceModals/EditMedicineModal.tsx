import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Modal } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function EditMedicineModal() {
  const [open, setOpen] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500, // Increased width for better spacing
    bgcolor: '#5C6B73', // Updated background color
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 2, // Optional: to have rounded corners for the modal
  };

  const textFieldStyles = {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& label': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
      '& input': {
        color: 'white',
      },
      '& textarea': {
        color: 'white',
      },
    },
    my: 2, // Added more vertical spacing
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="procedure-modal-title"
      >
        <Box sx={style}>
          <Typography id="procedure-modal-title" variant="h6" component="h2" color="common.white">
            Edit Medicine
          </Typography>
          <TextField 
            required 
            id="name" 
            label="Name" 
            sx={textFieldStyles} // Added more vertical spacing
          />
          <TextField 
            required 
            id="catagory" 
            label="Catagory" 
            sx={textFieldStyles} // Added more vertical spacing
          />
          <TextField 
            required 
            id="usage" 
            label="Usage" 
            sx={textFieldStyles} // Added more vertical spacing
          />
          <TextField 
            required 
            id="packaging" 
            label="Packaging" 
            sx={textFieldStyles} // Added more vertical spacing
          />
          <TextField 
            required 
            id="quantity" 
            label="Stock Quantity" 
            sx={textFieldStyles} // Added more vertical spacing
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }}>
            <Button variant="contained" color="primary" style={{ backgroundColor: '#253237', color: '#ffffff' }} onClick={handleClose}>
              Confirm
            </Button>
            <Button variant="contained" color="primary" style={{ backgroundColor: '#253237', color: '#ffffff' }} onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
