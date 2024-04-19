import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface closeModal {
  handleClose: () => void;
}

function TemplatePathwayModal({ handleClose }: closeModal) {
  const [template, setTemplate] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTemplate(event.target.value as string);
    console.log(template);
  };

  return (
    <>
      <Modal
        open={true}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200, textAlign: "center" }}>
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
          <h2 id="child-modal-title">Create Pathway</h2>
          <p>Procedure Template</p>
          <FormControl fullWidth>
            <InputLabel id="procedure-template-label">
              Choose a template
            </InputLabel>
            <Select
              labelId="procedure-template-label"
              id="procedure-template-select"
              value={template}
              label="Procedure Template"
              onChange={() => {
                handleChange;
              }}
              sx={{ mb: 2 }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"template1"}>Template 1</MenuItem>
              <MenuItem value={"template2"}>Template 2</MenuItem>
              <MenuItem value={"template3"}>Template 3</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/manager-procedure");
            }}
          >
            Create
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default TemplatePathwayModal;
