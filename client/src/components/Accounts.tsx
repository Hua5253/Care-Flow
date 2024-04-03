import { Box, Grid, Paper, Toolbar } from "@mui/material";
import React from "react";

interface users {
  id: String;
  name: String;
  username: String;
  email: String;
  phoneNumber: String;
  Role: String;
}

const usersList: users[] = [
  {
    id: "LA-0233",
    name: "...",
    username: "...",
    email: "...",
    phoneNumber: "...",
    Role: "...",
  },
  {
    id: "LA-0234",
    name: "...",
    username: "...",
    email: "...",
    phoneNumber: "...",
    Role: "...",
  },
  {
    id: "LA-0235",
    name: "...",
    username: "...",
    email: "...",
    phoneNumber: "...",
    Role: "...",
  },
  {
    id: "LA-0236",
    name: "...",
    username: "...",
    email: "...",
    phoneNumber: "...",
    Role: "...",
  },
  {
    id: "LA-0237",
    name: "...",
    username: "...",
    email: "...",
    phoneNumber: "...",
    Role: "...",
  },
  {
    id: "LA-0238",
    name: "...",
    username: "...",
    email: "...",
    phoneNumber: "...",
    Role: "...",
  },
];

export default function Accounts() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Paper>
        <h1>Users Dashboard</h1>
      </Paper>
    </Box>
  );
}
