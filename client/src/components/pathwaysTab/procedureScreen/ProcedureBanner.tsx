import { Paper, Typography, Box } from "@mui/material";
import { Pathway } from "../../../services/pathway-service";

interface Props {
  pathway: Pathway | null;
}

const ProcedureBanner = ({ pathway }: Props) => {
  return (
    <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography variant='h6' sx={{ marginRight: 2 }}>
          Pathway Name: {pathway?.name}
        </Typography>
        <Typography variant='subtitle1' sx={{ marginRight: 2 }}>
          Patient: {pathway?.patient}
        </Typography>
        <Typography variant='subtitle1'>Status: {pathway?.status}</Typography>
      </Box>
    </Paper>
  );
};

export default ProcedureBanner;
