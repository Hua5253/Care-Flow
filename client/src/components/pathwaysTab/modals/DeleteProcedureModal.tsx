import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import pathwayService, { Pathway } from "../../../services/pathway-service";
import procedureService from "../../../services/procedure-service";
import { useNavigate } from "react-router-dom";

const modalStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const paperStyle = {
  backgroundColor: "#5C6B73",
  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
  padding: "20px",
  color: "#ffffff",
  textAlign: "center",
  fontSize: "1.5rem",
};

const buttonContainerStyle = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "space-around",
};

interface Props {
  handleCloseModal: () => void;
  pathway: Pathway;
  procedureToDeleteId: string;
}

export default function DeleteProcedureModal({
  handleCloseModal,
  pathway,
  procedureToDeleteId,
}: Props) {

  const confirmDeleteProcedure = () => {
    console.log(procedureToDeleteId);
    procedureService
      .deleteById(procedureToDeleteId)
      .catch(err => console.log(err));

    const updatedProcedures: string[] = pathway.procedures.filter(
      procedure => procedure !== procedureToDeleteId
    );

    const updatedPathway: Pathway = {
      name: pathway.name,
      patient: pathway.patient,
      status: pathway.status,
      is_template: pathway.is_template,
      procedures: updatedProcedures,
    };

    pathwayService.updateById(pathway._id as string, updatedPathway);

    handleCloseModal();
  };

  let title = (
    <h2 id='confirmation-modal-title'>
      Delete the Procedure from {pathway.name}
    </h2>
  );

  return (
    <Modal
      open={true}
      style={modalStyle}
      aria-labelledby='confirmation-modal-title'
      aria-describedby='confirmation-modal-description'
    >
      <Box sx={paperStyle}>
        <div>
          {title}
          <div style={buttonContainerStyle}>
            <Button
              onClick={confirmDeleteProcedure}
              variant='contained'
              color='primary'
              style={{ backgroundColor: "#253237", color: "#ffffff" }}
            >
              Confirm
            </Button>
            <Button
              onClick={handleCloseModal}
              variant='contained'
              color='primary'
              style={{ backgroundColor: "#253237", color: "#ffffff" }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
