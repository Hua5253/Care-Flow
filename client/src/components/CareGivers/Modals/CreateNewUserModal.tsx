import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
interface Prop {
  onclose: () => void;
}

export default function CreateNewUserModal({ onclose }: Prop) {
  // const [open, setOpen] = useState(true);
  const [role, setRole] = useState("");

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setRole(event.target.value);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500, // Increased width for better spacing
    bgcolor: "#5C6B73", // Updated background color
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    borderRadius: 2, // Optional: to have rounded corners for the modal
  };

  const textFieldStyles = {
    "& label.Mui-focused": {
      color: "white",
    },
    "& label": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
      "& input": {
        color: "white",
      },
      "& textarea": {
        color: "white",
      },
    },
    my: 2, // Added more vertical spacing
  };

  return (
    <div>
      <Modal
        open={true}
        onClose={onclose}
        aria-labelledby="create-user-modal-title"
      >
        <Box sx={style}>
          <Typography
            id="create-user-modal-title"
            variant="h6"
            component="h2"
            color="common.white"
          >
            Create New User
          </Typography>
          <TextField
            required
            id="full-name"
            label="Full Name"
            sx={textFieldStyles} // Added more vertical spacing
          />
          <TextField
            required
            id="username"
            label="Username"
            sx={textFieldStyles} // Added more vertical spacing
          />
          <TextField
            required
            id="phone-number"
            label="Phone NUmber"
            sx={textFieldStyles} // Added more vertical spacing
          />
          <TextField
            required
            id="email"
            label="Email"
            sx={textFieldStyles} // Added more vertical spacing
          />
          <TextField
            required
            id="password"
            label="Password"
            sx={textFieldStyles} // Added more vertical spacing
          />
          <FormControl fullWidth sx={{ ...textFieldStyles, mt: 3 }}>
            <InputLabel id="user-role-label" style={{ color: "white" }}>
              Role
            </InputLabel>
            <Select
              labelId="user-role-label"
              id="user-role-select"
              value={role}
              label="Role"
              onChange={handleRoleChange}
              sx={{ color: "white", "& .MuiSvgIcon-root": { color: "white" } }}
            >
              <MenuItem value={"caregiver"}>Caregiver</MenuItem>
              <MenuItem value={"manager"}>Manager</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-around" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#253237", color: "#ffffff" }}
              onClick={onclose}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#253237", color: "#ffffff" }}
              onClick={onclose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
