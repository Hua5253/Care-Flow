import { Box, Fab, Typography } from "@mui/material";
import AccountsTable from "./AccountsTable";
import AccountsSearchBar from "./AccountsSearchBar";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import { useState } from "react";
interface showModal {
  showModal: () => void;
}

export default function Accounts({ showModal }: showModal) {
  const [searchInput, setSearchInpt] = useState<string>("");
  const handleSearch = (data: string) => {
    console.log("Search Accounts:", data);
    setSearchInpt(data);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        marginLeft: "6em",
        marginTop: 8,
        width: "90%",
        overflowX: "auto",
        minWidth: 1,
        minHeight: "80vh",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Users Dashboard
      </Typography>
      {/* <Toolbar variant="dense" /> */}
      {/* input search and filter bar here */}
      <Box display="flex" sx={{ mb: 3, mt: 3 }}>
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid item xs={12} sm={8} md={9} lg={10} sx={{ pr: 1 }}>
            <AccountsSearchBar
              onSearch={(data) => {
                handleSearch(data);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
              }}
            >
              <Fab
                variant="extended"
                size="small"
                color="primary"
                sx={{
                  fontSize: "12px",
                  borderRadius: 1,
                  height: "45px",
                }}
                onClick={showModal}
              >
                <AddIcon fontSize="small" />
                Create User
              </Fab>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <AccountsTable searchInput={searchInput} />
    </Box>
  );
}
