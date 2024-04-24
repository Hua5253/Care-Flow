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

interface Props {
    handleConfirm: (id: string) => void;
    handleCancel: () => void;
    pathwayId: string;
}

export default function DeletePathwayModal({handleConfirm, handleCancel, pathwayId}: Props) {

  let title = (
    <h2 id="confirmation-modal-title">Do you want to Delete this Pathway?</h2>
  );

  return (
    <Modal
      open={true}
      style={modalStyle}
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
    >
      <Box sx={paperStyle}>
        <div>
          {title}
          <div style={buttonContainerStyle}>
            <Button
              onClick={(e) => handleConfirm(pathwayId)}
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#253237", color: "#ffffff" }}
            >
              Confirm
            </Button>
            <Button
              onClick={handleCancel}
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
