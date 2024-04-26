import { Box, Paper, Typography } from "@mui/material";
import { Pathway } from "../../../services/pathway-service";

interface Props {
    templatePathway: Pathway;
  }

function TemplateProcedureBanner({templatePathway}:Props) {
    return (
        <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography variant='h6' sx={{ marginRight: 2 }}>
              Pathway Name: {templatePathway.name}
            </Typography>
          </Box>
        </Paper>
      );
}

export default TemplateProcedureBanner;