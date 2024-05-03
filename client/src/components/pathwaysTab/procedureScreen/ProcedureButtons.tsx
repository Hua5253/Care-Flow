import { Box, Button } from "@mui/material";
import { Pathway } from "../../../services/pathway-service";

interface Props {
  inEdit: boolean;
  pathway: Pathway;
  handleEditClick: () => void;
  handleSaveClick: () => void;
  handleAddProcedure: () => void;
  handleDeletePathway: () => void;
  handlePublishPathway: () => void;
}

// publish button will only be enable when the status of pathway is unpulished
// end pathway button will only be enable when all procedures are completed.

function ProcedureButtons({
  inEdit,
  pathway,
  handleEditClick,
  handleSaveClick,
  handleAddProcedure,
  handleDeletePathway,
  handlePublishPathway
}: Props) {

  const disablePublishButton: boolean =
    pathway.status === "unpublished" ? false : true;

  if (inEdit) {
    return (
      <Box display="flex" justifyContent="space-between" padding={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddProcedure}
        >
          Add Procedure
        </Button>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" onClick={handleSaveClick}>
            Save Changes
          </Button>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box display="flex" justifyContent="space-between" padding={2}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Edit
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={disablePublishButton}
            onClick={handlePublishPathway}
          >
            publish
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" onClick={handleDeletePathway}>
            Delete Pathway
          </Button>
          <Button variant="contained">End Pathway</Button>
        </Box>
      </Box>
    );
  }
}

export default ProcedureButtons;
