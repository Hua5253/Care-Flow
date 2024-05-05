import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import templatePathwayService from "../../../services/template-pathway-service";
import pathwayService, { Pathway } from "../../../services/pathway-service";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  bgcolor: "#5C6B73",
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
  const [allTemplatePathways, setAllTemplatePahtways] = useState<Pathway[]>([]);
  const [template, setTemplate] = useState<Pathway | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    templatePathwayService
      .getAll<Pathway>()
      .then(({ data: templatePathways }) =>
        setAllTemplatePahtways(templatePathways)
      );
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedTemplatePathway = allTemplatePathways.find(
      (pathway) => pathway.name === event.target.value
    );
    setTemplate(selectedTemplatePathway || null);
  };

  const handleCreatePathwayFromTemplate = () => {
    console.log(template);

    const newPathway = { ...template, is_template: false };
    pathwayService
      .create<Pathway>(newPathway as Pathway)
      .then(({ data: new_pathway }) =>
        navigate("/manager-pathway" + "/" + new_pathway._id)
      )
      .catch((err) => console.log(err));
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
              value={template ? template.name : ""}
              label="Procedure Template"
              onChange={handleChange}
              sx={{ mb: 2 }}
            >
              {allTemplatePathways.map((templatePathway) => (
                <MenuItem
                  key={templatePathway._id}
                  value={templatePathway.name}
                >
                  {templatePathway.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleCreatePathwayFromTemplate}>
            Create
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default TemplatePathwayModal;
