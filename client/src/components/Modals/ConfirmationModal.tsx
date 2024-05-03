import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

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

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmationModal({
  open,
  onClose,
  onConfirm,
}: ConfirmationModalProps) {
  let procedure_name = "MRI";
  let patient_name = "john doe";
  let start_procedure = "Click confirm to start the procedure";

  let title = <h2 id="confirmation-modal-title">{start_procedure}</h2>;

  let body = (
    <Box>
      <h3 id="confirmation-modal-description">Patient: {patient_name}</h3>
      <h3 id="confirmation-modal-description">Procedure: {procedure_name}</h3>
    </Box>
  );

  return (
    <Modal
      open={open}
      style={modalStyle}
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
    >
      <Box sx={paperStyle}>
        <div>
          {title}
          {body}
          <div style={buttonContainerStyle}>
            <Button
              onClick={onConfirm}
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#253237", color: "#ffffff" }}
            >
              Confirm
            </Button>
            <Button
              onClick={onClose}
              variant="contained"
              color="primary"
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
