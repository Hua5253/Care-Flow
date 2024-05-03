import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const modalStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const paperStyle = {
  backgroundColor: "#5C6B73",
  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
  padding: 5,
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
  user: { name: string; role: string };
}

export default function DeleteUserConfirmationModal({
  open,
  onClose,
  onConfirm,
  user,
}: ConfirmationModalProps) {
  let delete_user = "Click confirm to Delete the user";

  let title = (
    <Typography variant="h4" component="h2" id="confirmation-modal-title">
      {delete_user}
    </Typography>
  );

  let body = (
    <Box id="confirmation-modal-description" sx={{ p: 2 }}>
      <Typography variant="h6" component="h4">
        Name: {user.name}
      </Typography>
      <Typography variant="h6" component="h4">
        Role: {user.role}
      </Typography>
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
