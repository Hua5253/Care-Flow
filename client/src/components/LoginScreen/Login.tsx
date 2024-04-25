import AccountCircle from "@mui/icons-material/AccountCircle";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Link,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import AuthContext from "../../auth";

type FormData = {
  username: string;
  password: string;
};

interface Prop {
  closeAlert: () => void;
}

export default function Login({ closeAlert }: Prop) {
  const { auth } = useContext<any>(AuthContext);
  const [error, setError] = useState("");
  useEffect(() => {
    const role = auth?.user?.role;
    console.log(role);
    if (role === "admin") {
      navigate("/accounts");
    } else if (role === "manager") {
      navigate("/resources");
    } else if (role === "caregiver") {
      navigate("/schedule");
    } else {
      navigate("/login");
    }
  }, [auth?.user]);

  useEffect(() => {
    setError(auth?.errorMsg);
  }, [auth?.errorMsg]);
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
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevents the form from resetting
  };
  const handleForgetPassword = () => navigate("/forgetPassword");

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data: FormData) => {
    reset();
    closeAlert();

    //login to the user using auth.login
    auth.loginUser(data.username, data.password);
  });

  return (
    <Box sx={boxStyle} id="login-modal">
      <Container>
        <Typography variant="h3" gutterBottom component="h1" sx={{ mt: 4 }}>
          CareFlow
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box sx={{ mt: 2 }} component="form" onSubmit={onSubmit}>
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
            onChange={() => clearErrors("username")}
          />
          <TextField
            {...register("password", { required: "Password is required" })}
            margin="normal"
            fullWidth
            placeholder="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            InputProps={{
              startAdornment: <LockOutlinedIcon sx={{ mr: 1, my: 0.5 }} />,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            onChange={() => clearErrors("password")}
          />
          <Link
            onClick={handleForgetPassword}
            variant="body2"
            sx={{
              display: "block",
              textAlign: "center",
              mt: 2,
              "&:hover": {
                cursor: "pointer",
                color: "#0d47a1",
                textDecoration: "underline",
              },
              textDecoration: "none",
            }}
          >
            Forgot password?
          </Link>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={buttonStyle}
          >
            Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
