import { Box, Button } from "@mui/material";
import { Pathway } from "../../../services/pathway-service";
import { useEffect, useState } from "react";
import procedureService, { Procedure } from "../../../services/procedure-service";

interface Props {
  inEdit: boolean;
  pathway: Pathway;
  handleEditClick: () => void;
  handleSaveClick: () => void;
  handleAddProcedure: () => void;
  handleDeletePathway: () => void;
  handlePublishPathway: () => void;
  handleEndPathway: () => void;
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
  handlePublishPathway,
  handleEndPathway
}: Props) {
  const [allProcedures, setAllProcedures] = useState<Procedure[]>([]);
  useEffect(() => {
    procedureService
      .getAll<Procedure>()
      .then((res) => setAllProcedures(res.data))
      .catch((err) => console.log(err));
  }, [pathway.procedures]);

  const procedures: Procedure[] = [];

  for (let procedure of allProcedures) {
    if (pathway.procedures?.includes(procedure._id as string))
      procedures.push(procedure);
  }

  const disablePublishButton: boolean =
    pathway.status === "unpublished" ? false : true;

  let disableEndPathwayButton: boolean = false;
  if(pathway.procedures?.length === 0) disableEndPathwayButton = true;
  if(pathway.status === "unpublished") disableEndPathwayButton = true;
  if(pathway.status === "completed") disableEndPathwayButton = true;
  for(let procedure of procedures) {
    if(procedure.status !== "completed") disableEndPathwayButton = true;
  }

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
          <Button variant="contained" disabled={disableEndPathwayButton} onClick={handleEndPathway}>End Pathway</Button>
        </Box>
      </Box>
    );
  }
}

export default ProcedureButtons;
