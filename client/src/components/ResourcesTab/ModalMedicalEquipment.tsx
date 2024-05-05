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
}

const statusOptions = ["In Stock", "Low Stock", "Out of Stock", "On Order"];
const medicialEquipmentCategories = [
  "Diagonose Equipment",
  "Therapeutic Equipment",
  "Surgical Equipment",
  "Monitoring Equipment",
  "Laboratory Equipment",
  "Medical Consumables",
  "Radiology Equipment",
  "Durable Medical Equipment",
  "Others",
];

export default function ModalMedicalEquipment({
  open,
  onClose,
  onOk,
  title,
  item,
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
  const [category, setCategory] = useState(item?.category || "");
  const [quantity, setQuantity] = useState(item?.quantity ?? "");
  const [status, setStatus] = useState(item?.status || "");

  useEffect(() => {
    setName(item?.name || "");
    setCategory(item?.category || "");
    setQuantity(item?.quantity ?? "");
    setStatus(item?.status || "");
  }, [item]);

  const resetForm = () => {
    setName("");
    setCategory("");
    setQuantity("");
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
          <TextField
            required
            id="name"
            label="Name"
            sx={textFieldStyles} // Added more vertical spacing
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <FormControl required sx={textFieldStyles}>
            <InputLabel id="medical-equipment-category">Category</InputLabel>
            <Select
              labelId="medical-equipment-category"
              id="medical-equipment-category"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
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
              {medicialEquipmentCategories.map((category, index) => (
                <MenuItem value={category} key={category + index}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            required
            id="quantity"
            label="Quantity Available"
            sx={textFieldStyles} // Added more vertical spacing
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
          />
          <FormControl required sx={textFieldStyles}>
            <InputLabel id="medical-equipment-status">Status</InputLabel>
            <Select
              labelId="medical-equipment-status"
              id="medical-equipment-status"
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
                    width: "inherit",
                  },
                },
              }}
            >
              {statusOptions.map((option, index) => (
                <MenuItem value={option} key={option + index}>
                  {option}
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
                onOk({ name, category, quantity, status });
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
