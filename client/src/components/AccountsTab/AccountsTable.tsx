import {
  Box,
  Button,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

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

export default function AccountsTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{ width: "100%", border: "solid 0.1em grey", shadow: "inherit" }}
    >
      <Table aria-label="simple table" stickyHeader sx={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone Number</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersList.map((user, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell align="right">{user.name}</TableCell>
              <TableCell align="right">{user.username}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.phoneNumber}</TableCell>
              <TableCell align="right">{user.role}</TableCell>
              <TableCell align="right" size="medium">
                <Button variant="outlined" sx={{ fontSize: "13px" }}>
                  Change Password
                </Button>
                <IconButton size="medium" sx={{ ml: 3 }}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
