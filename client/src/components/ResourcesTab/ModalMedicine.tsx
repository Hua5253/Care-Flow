import { TextField, Button, Box, Typography, Modal } from "@mui/material";
import { useState } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onOk: (data: any) => void;
  title: string;
}

export default function ModalMedicine({
  open,
  onClose,
  onOk,
  title,
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
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [usage, setUsage] = useState("");
  const [packaging, setPackaging] = useState("");
  const [quantity, setQuantity] = useState("");

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
            id="category"
            label="Category"
            sx={textFieldStyles} // Added more vertical spacing
            onChange={(e) => setCategory(e.target.value)}
          />
          <TextField
            required
            id="usage"
            label="Usage"
            sx={textFieldStyles} // Added more vertical spacing
            onChange={(e) => setUsage(e.target.value)}
          />
          <TextField
            required
            id="packaging"
            label="Packaging"
            sx={textFieldStyles} // Added more vertical spacing
            onChange={(e) => setPackaging(e.target.value)}
          />
          <TextField
            required
            id="quantity"
            label="Stock Quantity"
            sx={textFieldStyles} // Added more vertical spacing
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-around" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#253237", color: "#ffffff" }}
              onClick={() =>
                onOk({ name, category, usage, packaging, quantity })
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
