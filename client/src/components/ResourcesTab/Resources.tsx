import { Box, Fab, Typography } from "@mui/material";
import Table from "./Table";
import SearchBar  from "./SearchBar";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";

export default function Resources() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        marginLeft: "6em",
        marginTop: 8,
        width: "100%",
        minWidth: 0,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Resource
      </Typography>
      <Box display="flex" sx={{ mb: 3, mt: 3 }}>
        <Grid
          container
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Grid item xs={10}>
            <SearchBar />
          </Grid>
          <Grid item xs={2}>
            <Fab
              variant="extended"
              size="small"
              color="primary"
              sx={{
                fontSize: "12px",
                alignItems: "center",
                borderRadius: 1,
                height: "45px",
              }}
            >
              <AddIcon fontSize="small" />
              Create Item
            </Fab>
          </Grid>
        </Grid>
      </Box>
      <Table />
    </Box>
  );
}
