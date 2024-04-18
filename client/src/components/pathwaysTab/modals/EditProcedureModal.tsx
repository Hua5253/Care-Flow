import { TextField, Button, Box, Typography, Modal } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface Props {
  handleClose: () => void;
}

export default function EditProcedureModal({ handleClose }: Props) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500, 
    bgcolor: "#5C6B73", 
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    borderRadius: 2, 
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
    my: 2, 
  };

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="procedure-modal-title"
      >
        <Box sx={style}>
          <Typography
            id="procedure-modal-title"
            variant="h6"
            component="h2"
            color="common.white"
          >
            Procedure Information
          </Typography>
          <TextField
            required
            id="procedure-name"
            label="Procedure Name"
            sx={textFieldStyles}
          />
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            sx={{
              ...textFieldStyles,
              color: "white",
              borderColor: "white",
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              },
              my: 1,
            }}
          >
            Add Caregiver
          </Button>
          <TextField
            required
            id="location"
            label="Location"
            sx={textFieldStyles}
          />
          <TextField
            required
            id="start-time"
            label="Start Time"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            sx={textFieldStyles}
          />
          <TextField
            required
            id="end-time"
            label="End Time"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            sx={textFieldStyles}
          />
          <TextField
            id="procedure-detail"
            label="Procedure Detail"
            multiline
            rows={4}
            sx={textFieldStyles}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-around" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#253237", color: "#ffffff" }}
              onClick={handleClose}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#253237", color: "#ffffff" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
