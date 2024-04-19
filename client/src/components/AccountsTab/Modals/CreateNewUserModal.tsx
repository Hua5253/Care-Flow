import { useState } from "react";
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
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import userService, { User } from "../../../services/user-service";
import { useNavigate } from "react-router-dom";

interface Prop {
  onclose: () => void;
}
type FormData = {
  fullName: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  role: string;
};

export default function CreateNewUserModal({ onclose }: Prop) {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data: FormData) => {
    reset();
    console.log(data);
    let newUser: User = {
      name: data.fullName,
      username: data.username,
      password: data.password,
      email: data.email,
      phone_number: data.phoneNumber,
      role: data.role,
    };

    userService
      .create(newUser)
      .then(() => console.log("User created"))
      .catch((err) => console.log(err));

    onclose();
    navigate("/accounts");
  });

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
            {...register("fullName", { required: "Full Name is required" })}
            error={Boolean(errors.fullName)}
            helperText={errors.fullName?.message}
          />
          <TextField
            required
            id="username"
            label="Username"
            sx={textFieldStyles} // Added more vertical spacing
            {...register("username", { required: "Username is required" })}
            error={Boolean(errors.username)}
            helperText={errors.username?.message}
          />
          <TextField
            required
            id="phone-number"
            label="Phone Number"
            sx={textFieldStyles} // Added more vertical spacing
            {...register("phoneNumber", {
              required: "Phone Number is required",
            })}
            error={Boolean(errors.phoneNumber)}
            helperText={errors.phoneNumber?.message}
          />
          <TextField
            required
            id="email"
            label="Email"
            sx={textFieldStyles} // Added more vertical spacing
            {...register("email", { required: "Email is required" })}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
          <TextField
            required
            id="password"
            label="Password"
            sx={textFieldStyles} // Added more vertical spacing
            {...register("password", { required: "Password is required" })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
          <FormControl
            fullWidth
            sx={{ ...textFieldStyles, mt: 3 }}
            error={Boolean(errors.role)}
          >
            <InputLabel id="user-role-label">Role</InputLabel>
            <Select
              labelId="user-role-label"
              id="user-role-select"
              value={role}
              label="Role"
              {...register("role", { required: "Role is required" })}
              onChange={(e) => setRole(e.target.value)}
              sx={{
                color: "white",
                "& .MuiSvgIcon-root": { color: "white" },
              }}
            >
              <MenuItem value={"caregiver"}>Caregiver</MenuItem>
              <MenuItem value={"manager"}>Manager</MenuItem>
            </Select>
            {errors.role && (
              <FormHelperText style={{ color: "red" }}>
                {errors.role.message}
              </FormHelperText>
            )}
          </FormControl>

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-around" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#253237", color: "#ffffff" }}
              onClick={onSubmit}
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
