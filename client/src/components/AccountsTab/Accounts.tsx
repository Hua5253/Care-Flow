import { Box, Fab, Typography } from "@mui/material";
import AccountsTable from "./AccountsTable";
import AccountsSearchBar from "./AccountsSearchBar";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
interface showModal {
  showModal: () => void;
}

export default function Accounts({ showModal }: showModal) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        marginLeft: "6em",
        marginTop: 8,
        width: "100%",
        overflowX: "auto",
        minWidth: 0,
      }}
    >
      {/* Title */}
      <Typography variant="h5" gutterBottom>
        Users Dashboard
      </Typography>
      {/* <Toolbar variant="dense" /> */}
      {/* input search and filter bar here */}
      <Box display="flex" sx={{ mb: 3, mt: 3 }}>
        <Grid
          container
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Grid item xs={10}>
            <AccountsSearchBar />
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
              onClick={showModal}
            >
              <AddIcon fontSize="small" />
              Create User
            </Fab>
          </Grid>
        </Grid>
      </Box>
      <AccountsTable />
    </Box>
  );
}
