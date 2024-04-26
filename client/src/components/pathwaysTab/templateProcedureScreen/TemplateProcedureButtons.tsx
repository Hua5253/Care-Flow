import { Box, Button } from "@mui/material";

interface Props {
  handleAddProcedure: () => void;
}

function TemplateProcedureButtons({ handleAddProcedure }: Props) {
  return (
    <Box display='flex' justifyContent='space-between' padding={2}>
      <Button variant='contained' color='primary' onClick={handleAddProcedure}>
        Add Procedure
      </Button>
      <Box sx={{ display: "flex", gap: 1 }}></Box>
    </Box>
  );
}

export default TemplateProcedureButtons;
