import { TextField, Button, Box, Typography, Modal } from "@mui/material";
import { useState } from "react";
import pathwayService, { Pathway } from "../../../services/pathway-service";
import procedureService, {
  Procedure,
} from "../../../services/procedure-service";

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
  showModal: boolean;
  templatePathway: Pathway;
  handleClose: () => void;
  updatePathway: (newProcedureId: string) => void;
}

export default function AddTemplateProcedureModal({
  showModal,
  templatePathway,
  handleClose,
  updatePathway,
}: Props) {
  const [procedureName, setProcedureName] = useState("");
  const [details, setDetails] = useState("");

  const confirmAddProcedure = () => {
    const newProcedure: Procedure = {
      name: procedureName,
      caregiver: [],
      location: "unknown",
      start: new Date(),
      end: new Date(),
      details: details,
      patient: "unknown",
      status: "unpublished",
    };

    procedureService
      .create<Procedure>(newProcedure)
      .then((res) => {
        updatePathway(res.data._id as string);
        const updatedPathway: Pathway = {
          ...templatePathway,
          procedures: [...templatePathway.procedures, res.data._id as string],
        };
        pathwayService
          .updateById<Pathway>(templatePathway._id as string, updatedPathway)
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    handleClose();
  };

  return (
    <div>
      <Modal
        open={showModal}
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
            value={procedureName}
            onChange={(event) => setProcedureName(event.target.value)}
            sx={textFieldStyles}
          />
          <TextField
            id="procedure-detail"
            label="Procedure Detail"
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            multiline
            rows={4}
            sx={textFieldStyles}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-around" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#253237", color: "#ffffff" }}
              onClick={confirmAddProcedure}
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
