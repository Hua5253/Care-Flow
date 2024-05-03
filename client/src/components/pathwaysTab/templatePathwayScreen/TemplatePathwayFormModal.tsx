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
      .then(res => {
        navigate("/template-pathways" + "/" + res.data._id);
      })
      .catch(err => console.log(err));

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
      aria-labelledby='blank-pathway-modal-title'
    >
      <Box sx={modalStyle}>
        <Typography id='blank-pathway-modal-title' variant='h6' component='h2'>
          Create New Pathway
        </Typography>
        <TextField
          fullWidth
          margin='normal'
          required
          label='Pathway Name'
          value={pathwayName}
          onChange={e => setName(e.target.value)}
        />
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button variant='contained' color='primary' onClick={handleSubmit}>
            Confirm
          </Button>
          <Button variant='contained' onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default TemplatePathwayFormModal;
