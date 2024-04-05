import { Paper, Typography, Box } from '@mui/material';

const ProcedureBanner = () => {
  return (
    <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" sx={{ marginRight: 2 }}>
          Pathway Name: PEDIATRIC SURGERY BUNDLE
        </Typography>
        <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
          Patient: John Doe
        </Typography>
        <Typography variant="subtitle1">
          Status: Unpublished
        </Typography>
      </Box>
    </Paper>
  );
};

export default ProcedureBanner;
