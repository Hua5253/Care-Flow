import {
  TextField,
  Button,
  Box,
  Typography,
  Modal,
} from "@mui/material";
interface Prop {
  onclose: () => void;
}

export default function ResetPasswordModal({ onclose }: Prop) {

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

  let username = "VPreze";

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
            <h2 id="confirmation-modal-description">Reset Passowrd</h2>
            <h4 id="confirmation-modal-description">
              For Username: {username}
            </h4>
          </Typography>

          <TextField
            required
            id="new-password"
            label="New Passowrd"
            sx={textFieldStyles} // Added more vertical spacing
          />
          <TextField
            required
            id="confirm-password"
            label="Confirm Password"
            sx={textFieldStyles} // Added more vertical spacing
          />

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
