import { Box, Button } from '@mui/material';

const ProcedureFooterButtons = () => {
  return (
    <Box display="flex" justifyContent="space-between" padding={2}>
      <Button variant="contained" color="primary">
        Add procedure
      </Button>
      <Box sx={{ display: 'flex', gap: 1 }}>  
        <Button variant="contained" color="primary">
          Delete selected procedure
        </Button>
        <Button variant="contained">
          Save changes
        </Button>
        <Button variant="contained">
          Cancel edit
        </Button>
      </Box>
    </Box>
  );
};

export default ProcedureFooterButtons;
