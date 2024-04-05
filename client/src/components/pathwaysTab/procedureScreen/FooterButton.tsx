import { Box, Button } from "@mui/material";

interface Props {
  handleEditClick: () => void;
  handleDelete: () => void;
}

const FooterButtons = ({ handleEditClick, handleDelete }: Props) => {
  return (
    <Box display="flex" justifyContent="space-between" padding={2}>
      <Button variant="contained" color="primary" onClick={handleEditClick}>
        Edit
      </Button>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button variant="contained" color="primary">
          Publish
        </Button>
        <Button variant="contained">End</Button>
        <Button variant="contained" onClick={handleDelete}>
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default FooterButtons;
