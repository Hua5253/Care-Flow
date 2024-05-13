import { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { Pathway } from "../../../services/pathway-service";
import { useNavigate } from "react-router-dom";
import templatePathwayService from "../../../services/template-pathway-service";

interface Prop {
  open: boolean;
  handleClose: () => void;
}

function TemplatePathwayFormModal({ open, handleClose }: Prop) {
  const [pathwayName, setName] = useState("");

  const navigate = useNavigate();

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

  const handleSubmit = () => {
    let newTemplatePathway: Pathway = {
      name: pathwayName,
      patient: "unknown",
      status: "unpublished",
      is_template: true,
      procedures: [],
    };

    templatePathwayService
      .create(newTemplatePathway)
      .then((res) => {
        navigate("/manager-template" + "/" + res.data._id);
      })
      .catch((err) => console.log(err));

    handleClose();
  };

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#5C6B73",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="blank-pathway-modal-title"
    >
      <Box sx={modalStyle}>
        <Typography
          id="blank-pathway-modal-title"
          variant="h6"
          component="h2"
          sx={{ color: "white" }}
        >
          Create New Template Pathway
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          required
          label="Pathway Name"
          value={pathwayName}
          onChange={(e) => setName(e.target.value)}
          sx={textFieldStyles}
        />
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Confirm
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default TemplatePathwayFormModal;
