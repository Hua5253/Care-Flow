import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import TemplatePathwayModal from "./TemplatePathwayModal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#5C6B73",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface Props {
  handleClose: () => void;
  createBlankPathway: () => void;
}

function createPathwayModal({ handleClose, createBlankPathway }: Props) {
  const [showChildModal, setShowChildModal] = useState(false);

  return (
    <div>
      <Modal
        open={true}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 400,
            textAlign: "center",
            "& button": { m: 1 },
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <h2 id="parent-modal-title">Create Pathway</h2>
          <Button
            variant="contained"
            onClick={() => {
              setShowChildModal(true);
            }}
          >
            Template
          </Button>
          <Button variant="contained" onClick={createBlankPathway}>Blank Pathway</Button>
          {showChildModal && (
            <TemplatePathwayModal
              handleClose={() => setShowChildModal(false)}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default createPathwayModal;
