import AccountCircle from "@mui/icons-material/AccountCircle";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Box,
  Button,
  Container,
  Link,
  Paper,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // Should we put these stylings into css files separately?
  const boxStyle: SxProps<Theme> = {
    backgroundColor: "hsla(200,100%,50%,0.2);", // Replace with the actual color from the splash screen
    color: "black",
    padding: "2em",
    border: "2px solid #A8A8A8",
    borderRadius: 2,
    boxShadow: 5,
    textAlign: "center",
    width: "fit-content",
  };

  const buttonStyle: SxProps<Theme> = {
    backgroundColor: "#1976d2",
    ":hover": {
      backgroundColor: "#0d47a1", // Darker shade for hover state
    },
    color: "white",
    border: "1px solid #A8A8A8",
    mt: 3,
    mb: 2,
  };

  const navigate = useNavigate();
  const [usernameValue, setUsernameValue] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Update the inputValue state with the current input
    setUsernameValue(event.target.value);
  };

  const handleLogin = () => {
    if (usernameValue === "admin") {
      navigate("/Accounts");
    } else if (usernameValue === "manager") {
      navigate("/resources");
    } else if (usernameValue === "caregiver") {
      navigate("/schedule");
    } else {
      navigate("/");
    }
  };
  return (
    <Box sx={boxStyle} id="login-modal">
      <Container>
        <Typography variant="h3" gutterBottom component="h1" sx={{ mt: 4 }}>
          CareFlow
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            fullWidth
            required
            placeholder="Username"
            id="username"
            name="username"
            InputProps={{
              startAdornment: <AccountCircle sx={{ mr: 1, my: 0.5 }} />,
            }}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            placeholder="Password"
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            InputProps={{
              startAdornment: <LockOutlinedIcon sx={{ mr: 1, my: 0.5 }} />,
            }}
          />
          <Link
            href="/forgetPassword"
            variant="body2"
            sx={{ display: "block", textAlign: "center", mt: 2 }}
          >
            Forgot password?
          </Link>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={buttonStyle}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
}