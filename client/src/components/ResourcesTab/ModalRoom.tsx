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
} from "@mui/material";
import { useEffect, useState } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onOk: (data: any) => void;
  title: string;
  item?: any;
  error?: string;
}

const roomOccupacyOptions = [
  "Vacant",
  "Low Occupancy",
  "Moderate Occupancy",
  "High Occupancy",
  "Near Capacity",
  "Full Capacity",
];

export default function ModalRoom({
  open,
  onClose,
  onOk,
  title,
  item,
  error,
}: ModalProps) {
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
  const [name, setName] = useState(item?.name || "");
  const [location, setLocation] = useState(item?.location || "");
  const [capacity, setCapacity] = useState(item?.capacity ?? "");
  const [status, setStatus] = useState(item?.status || "");

  useEffect(() => {
    setName(item?.name || "");
    setLocation(item?.location || "");
    setCapacity(item?.capacity ?? "");
    setStatus(item?.status || "");
  }, [item]);

  const resetForm = () => {
    setName("");
    setLocation("");
    setCapacity("");
    setStatus("");
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
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <TextField
            required
            id="name"
            label="Name"
            sx={textFieldStyles} // Added more vertical spacing
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <TextField
            required
            id="room-number"
            label="Room Number"
            sx={textFieldStyles} // Added more vertical spacing
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
          <TextField
            required
            id="capacity"
            label="Capacity"
            sx={textFieldStyles} // Added more vertical spacing
            onChange={(e) => setCapacity(e.target.value)}
            value={capacity}
          />
          <FormControl required sx={textFieldStyles}>
            <InputLabel id="room-status">Status</InputLabel>
            <Select
              labelId="room-status"
              id="room-status-options"
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
              sx={{
                color: "white",
                "& .MuiSvgIcon-root": { color: "white" },
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 30 * 4.5,
                    width: "inherit",
                  },
                  sx: {
                    "&::-webkit-scrollbar": {
                      width: "10px", // adjust scrollbar width
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "rgba(0,0,0,0.5)", // scrollbar color
                      borderRadius: "4px", // scrollbar corner radius
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "white", // scrollbar track color
                    },
                    "&.MuiPaper-root": {
                      overflowY: "scroll", // Ensures scrollbar is always shown
                    },
                  },
                },
              }}
            >
              {roomOccupacyOptions.map((status, index) => (
                <MenuItem value={status} key={status + index}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-around" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#253237", color: "#ffffff" }}
              onClick={() => {
                onOk({
                  name,
                  location,
                  capacity,
                  status,
                  schedule: [] as any[],
                  item: item,
                });
                resetForm();
              }}
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
