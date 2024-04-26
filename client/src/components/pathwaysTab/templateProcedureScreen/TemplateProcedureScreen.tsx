import { Box, Container } from "@mui/material";
import AppBanner from "../../AppBanner/AppBanner";
import ManagerSideBar from "../../SideBar/ManagerSideBar";
import TemplateProcedureBanner from "./TemplateProcedureBanner";
import { useEffect, useState } from "react";
import { Pathway } from "../../../services/pathway-service";
import templatePathwayService from "../../../services/template-pathway-service";
import { useParams } from "react-router-dom";
import TemplateProcedureList from "./TemplateProcedureList";
import AddTemplateProcedureModal from "./AddTemplateProcedureModal";
import TemplateProcedureButtons from "./TemplateProcedureButtons";

function TemplateProcedureScreen() {
  const [templatePathway, setTemplatePathway] = useState<Pathway>(
    {} as Pathway
  );
  const [showAddTemplateProcedureModal, setShowAddTemplateProcedureModal] =
    useState(false);

  const { id } = useParams();

  useEffect(() => {
    templatePathwayService
      .getById<Pathway>(id as string)
      .then(res => setTemplatePathway(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Container id='app'>
      <Box sx={{ flexGrow: 1, mt: 8 }}>
        <AppBanner cred={true} />
        <ManagerSideBar />
        <TemplateProcedureBanner templatePathway={templatePathway} />
        <TemplateProcedureList templatePathway={templatePathway} />
        <TemplateProcedureButtons
          handleAddProcedure={() => {
            setShowAddTemplateProcedureModal(true);
          }}
        />
        <AddTemplateProcedureModal
          showModal={showAddTemplateProcedureModal}
          handleClose={() => setShowAddTemplateProcedureModal(false)}
          templatePathway={templatePathway}
        />
      </Box>
    </Container>
  );
}

export default TemplateProcedureScreen;
