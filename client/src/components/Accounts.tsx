import { Grid, Paper, Toolbar } from "@mui/material";
import React from "react";

export default function Accounts() {
  return (
    <Grid item xs={12} md={4} lg={3}>
      <Toolbar />
      <Paper
        sx={{
          p: 0,
          display: "grid",
          flexDirection: "column",
        }}
      >
        <h1>Users Dashboard</h1>
      </Paper>
    </Grid>
  );
}
