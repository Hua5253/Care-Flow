import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  Alert,
  Box,
  Button,
  Container,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useState } from "react";
type FormData = {
  username: string;
};

export default function ForgetPassword() {
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
    mt: 1,
    width: "fit-content",
  };
  const navigate = useNavigate();
  const [noUserFoundError, setNoUserFoundError] = useState(false);

  const handleBack = () => {
    navigate("/login");
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data: FormData) => {
    console.log(data);
    reset();

    //find the user
    const foundUser = false;

    if (foundUser) {
      //sent request
      //when request is sent successfully the following is done
      navigate("/login", { state: { resetRequested: true } });
    } else {
      setNoUserFoundError(true);
    }

    //otherwise, display error if the username is not found
  });

  return (
    <Box sx={boxStyle} id="login-modal">
      <Container>
        <Typography variant="h3" gutterBottom component="h1" sx={{ mt: 4 }}>
          Forgot Password?
        </Typography>
        <Typography variant="h5" gutterBottom>
          Request for password reset
        </Typography>
        <Box sx={{ mt: 1 }} component="form" onSubmit={onSubmit}>
          {noUserFoundError && (
            <Alert severity="error">Username not found!</Alert>
          )}
          <TextField
            {...register("username", { required: "Username is required" })}
            margin="normal"
            fullWidth
            placeholder="Username"
            id="username"
            name="username"
            InputProps={{
              startAdornment: <AccountCircle sx={{ mr: 1, my: 0.5 }} />,
            }}
            error={Boolean(errors.username)}
            helperText={errors.username?.message}
          />
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mt: 1 }}
          >
            <Button color="primary" sx={buttonStyle} onClick={handleBack}>
              Back
            </Button>
            <Button type="submit" sx={buttonStyle}>
              Send Request
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
