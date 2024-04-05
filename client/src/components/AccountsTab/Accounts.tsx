import { Box, Fab, Typography } from "@mui/material";
import AccountsTable from "./AccountsTable";
import AccountsSearchBar from "./AccountsSearchBar";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";

interface user {
  id: String;
  name: String;
  username: String;
  email: String;
  phoneNumber: String;
  role: String;
}

const usersList: user[] = [
  {
    id: "LA-0233",
    name: "...",
    username: "...",
    email: "...",
    phoneNumber: "...",
    role: "...",
  },
  {
    id: "LA-0234",
    name: "...",
    username: "...",
    email: "...",
    phoneNumber: "...",
    role: "...",
  },
  {
    id: "LA-0235",
    name: "...",
    username: "...",
    email: "...",
    phoneNumber: "...",
    role: "...",
  },
  {
    id: "LA-0236",
    name: "...",
    username: "...",
    email: "...",
    phoneNumber: "...",
    role: "...",
  },
  {
    id: "LA-0237",
    name: "...",
    username: "...",
    email: "...",
    phoneNumber: "...",
    role: "...",
  },
  {
    id: "LA-0238",
    name: "...",
    username: "...",
    email: "...",
    phoneNumber: "...",
    role: "...",
  },
];

export default function Accounts() {
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
