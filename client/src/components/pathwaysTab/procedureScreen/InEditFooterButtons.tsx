import { Box, Button } from "@mui/material";

interface Props {
  handleSaveClick: () => void;
  handleAddProcedure: () => void;
}

const InEditFooterButtons = ({
  handleSaveClick,
  handleAddProcedure,
}: Props) => {
  return (
    <Box display="flex" justifyContent="space-between" padding={2}>
      <Button variant="contained" color="primary" onClick={handleAddProcedure}>
        Add
      </Button>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button variant="contained" color="primary">
          Delete
        </Button>
        <Button variant="contained" onClick={handleSaveClick}>
          Save
        </Button>
        <Button variant="contained">Cancel</Button>
      </Box>
    </Box>
  );
};

export default InEditFooterButtons;
