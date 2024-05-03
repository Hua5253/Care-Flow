import { TextField, Button, Box, Typography, Modal } from "@mui/material";
import { Pathway } from "../../../services/pathway-service";
import { useEffect, useState } from "react";

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

interface Props {
  pathway: Pathway;
  showModal: boolean;
  handleClose: () => void;
  handleEditPathway: (pathwayName: string, patient: string) => void;
}

export default function EditPathwayModal({
  pathway,
  showModal,
  handleClose,
  handleEditPathway,
}: Props) {
  const [pathwayName, setPathwayName] = useState("");
  const [patient, setPatient] = useState("");

  useEffect(() => {
    if (pathway) {
      setPathwayName(pathway.name || "");
      setPatient(pathway.patient || "");
    }
  }, [pathway]); 

  return (
    <div>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="procedure-modal-title"
      >
        <Box sx={style}>
          <Typography
            id="pathway-modal-title"
            variant="h6"
            component="h2"
            color="common.white"
          >
            Pathway Information
          </Typography>
          <TextField
            required
            id="pathway-name"
            label="Pathway Name"
            value={pathwayName}
            onChange={(event) => setPathwayName(event.target.value)}
            sx={textFieldStyles}
          />
          <TextField
            id="patient-name"
            label="Patient Name"
            value={patient}
            onChange={(event) => setPatient(event.target.value)}
            sx={textFieldStyles}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-around" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#253237", color: "#ffffff" }}
              onClick={() => handleEditPathway(pathwayName, patient)}
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
