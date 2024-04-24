import { TextField, Button, Box, Typography, Modal } from "@mui/material";
import { useState } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onOk: (data: any) => void;
  title: string;
}

export default function ModalRoom({ open, onClose, onOk, title }: ModalProps) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [status, setStatus] = useState("");
  const schedule = [];

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
        open={open}
        //onClose={onClose}
        aria-labelledby="procedure-modal-title"
      >
        <Box sx={style}>
          <Typography
            id="procedure-modal-title"
            variant="h6"
            component="h2"
            color="common.white"
          >
            {title}
          </Typography>
          <TextField
            required
            id="name"
            label="Name"
            sx={textFieldStyles} // Added more vertical spacing
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            id="room-number"
            label="Room Number"
            sx={textFieldStyles} // Added more vertical spacing
            onChange={(e) => setLocation(e.target.value)}
          />
          <TextField
            required
            id="capacity"
            label="Capacity"
            sx={textFieldStyles} // Added more vertical spacing
            onChange={(e) => setCapacity(e.target.value)}
          />
          <TextField
            required
            id="current-status"
            label="Current Status"
            sx={textFieldStyles} // Added more vertical spacing
            onChange={(e) => setStatus(e.target.value)}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-around" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#253237", color: "#ffffff" }}
              onClick={() =>
                onOk({
                  name,
                  location,
                  capacity,
                  status,
                  schedule: [] as any[],
                })
              }
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#253237", color: "#ffffff" }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
