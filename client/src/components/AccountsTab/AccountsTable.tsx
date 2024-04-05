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
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ResetPasswordModal from "../CareGivers/Modals/ResetPasswordModal";
import ConfirmationModal from "../Modals/ConfirmationModal";

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
  const [resetPsModal, setResetPsModal] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false); // State to control the ConfirmationModal

  const handleClose = () => {
    setResetPsModal(false);
  };

  const handleCloseDelete = () => {
    // Call this to close the modal
    setOpenConfirmation(false);
  };

  const handleConfirmDelete = () => {
    // Handle the confirmation action here
    console.log("Procedure started");
    setOpenConfirmation(false); // Close modal after confirmation
  };

  const handleDeleteUser = () => {
    // Call this when you want to open the confirmation modal
    setOpenConfirmation(true);
  };

  return (
    <Box>
    <TableContainer
      component={Paper}
      sx={{ width: "100%", border: "solid 0.1em grey", shadow: "inherit" }}
    >
      {resetPsModal && <ResetPasswordModal onclose={handleClose} />}
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
                <Button
                  variant="outlined"
                  sx={{ fontSize: "13px" }}
                  onClick={() => setResetPsModal(true)}
                >
                  Change Password
                </Button>
                <IconButton 
                  size="medium" sx={{ ml: 3 }}
                  onClick={handleDeleteUser}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    <ConfirmationModal
        open={openConfirmation}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />

    </Box>
  );
}
