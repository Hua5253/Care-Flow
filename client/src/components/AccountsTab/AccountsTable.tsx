import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ResetPasswordModal from "./Modals/ResetPasswordModal";
import userService, { User } from "../../services/user-service";
import DeleteUserConfirmationModal from "./Modals/DeleteUserConfirmationModal";

export default function AccountsTable() {
  const [resetPsModal, setResetPsModal] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState({
    id: "",
    name: "",
    role: "",
    username: "",
  });

  const handleClose = () => {
    setResetPsModal(false);
  };

  const handleCloseDelete = () => {
    // Call this to close the modal
    setOpenConfirmation(false);
  };

  const handleConfirmDelete = () => {
    // Handle the confirmation action here
    userService
      .deleteById(selectedUser.id)
      .then((res) => {
        const userData = res.data as User; // Type assertion
        console.log(`delete user ${userData.name} success`);
        setOpenConfirmation(false); // Close modal after confirmation
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteUser = () => {
    // Call this when you want to open the confirmation modal
    setOpenConfirmation(true);
  };
  const handleResetPassword = (pw: string) => {
    console.log(selectedUser);
    
    //next call the user service to reset the password of this user
    userService
      .updateById(selectedUser.id, { password: pw })
      .then(() => {
        console.log("Password reset success!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    userService
      .getAll<User>()
      .then((res) => {
        setUsersList(res.data);
      })
      .catch((err) => console.log(err));
  }, [usersList]);

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{ width: "100%", border: "solid 0.1em grey", shadow: "inherit" }}
      >
        <Table aria-label="simple table" stickyHeader sx={{ width: "100%" }}>
          <TableHead
            sx={{
              cursor: "default",
            }}
          >
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Username</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="left">Phone Number</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              cursor: "default",
            }}
          >
            {usersList.map((user, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <TableCell component="th" scope="row">
                  {user._id?.substring(0, 10) + "..."}
                </TableCell>
                <TableCell align="left">{user.name}</TableCell>
                <TableCell align="left">{user.username}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="left">{user.phone_number}</TableCell>
                <TableCell align="left">{user.role}</TableCell>
                <TableCell align="right" size="medium">
                  <Button
                    variant="outlined"
                    sx={{ fontSize: "13px" }}
                    onClick={() => {
                      setSelectedUser({
                        id: user._id?.toString() || "",
                        name: user.name,
                        username: user.username,
                        role: user.role,
                      });
                      setResetPsModal(true);
                    }}
                  >
                    Change Password
                  </Button>
                  <IconButton
                    size="medium"
                    sx={{ ml: 3 }}
                    onClick={() => {
                      setSelectedUser({
                        id: user._id?.toString() || "",
                        name: user.name,
                        username: user.username,
                        role: user.role,
                      });
                      handleDeleteUser();
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DeleteUserConfirmationModal
        open={openConfirmation}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        user={{ name: selectedUser.name, role: selectedUser.role }}
      />
      {resetPsModal && (
        <ResetPasswordModal
          onclose={handleClose}
          handleResetPassword={(data: string) => handleResetPassword(data)}
          user={{ name: selectedUser.name, username: selectedUser.username }}
        />
      )}
    </Box>
  );
}
