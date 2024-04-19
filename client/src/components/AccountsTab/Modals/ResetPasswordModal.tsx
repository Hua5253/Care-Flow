import { TextField, Button, Box, Typography, Modal } from "@mui/material";
import { useState } from "react";
// import bcrypt from "bcrypt";

interface Prop {
  onclose: () => void;
  handleResetPassword: (data: string) => void;
  user: {
    name: string;
    username: string;
  };
}

export default function ResetPasswordModal({
  onclose,
  handleResetPassword,
  user,
}: Prop) {
  //const [userData, setUserData] = useState({ username: "", name: "" });
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (newPassword === "" || confirmPassword === "") {
      setError("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      console.log(
        "Passwords match -> Process to change password for user ",
        user.name
      );
      setError("");
      // const saltRound = 10;
      // const salt = await bcrypt.genSalt(saltRound);
      // const hash = await bcrypt.hash(newPassword, salt);
      // handleResetPassword(hash);
      onclose();
    }
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
      <Modal open={true} aria-labelledby="create-user-modal-title">
        <Box sx={style}>
          <Typography
            id="reset-password-modal-title"
            variant="h4"
            component="h2" // Change the component prop to match the correct heading level
            color="common.white"
            gutterBottom
          >
            Reset Password
          </Typography>

          <Typography
            id="confirmation-modal-description"
            variant="subtitle1"
            component="h4" // Change the component prop to h4 for a subtitle or smaller heading
            color="common.white"
            gutterBottom
          >
            Username: {user.username}
            <br />
            Name: {user.name}
          </Typography>
          <TextField
            required
            id="new-password"
            label="New Password"
            sx={textFieldStyles} // Added more vertical spacing
            onChange={(e) => setNewPassword(e.target.value)}
            {...(error && { error: true })}
          />
          <TextField
            required
            id="confirm-password"
            label="Confirm Password"
            sx={textFieldStyles} // Added more vertical spacing
            onChange={(e) => setConfirmPassword(e.target.value)}
            {...(error && { error: true })}
          />
          {error && (
            <Box textAlign={"center"}>
              <Typography variant="subtitle1" component="h4" color="error">
                {error}
              </Typography>
            </Box>
          )}

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-around" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#253237", color: "#ffffff" }}
              onClick={handleSubmit}
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
