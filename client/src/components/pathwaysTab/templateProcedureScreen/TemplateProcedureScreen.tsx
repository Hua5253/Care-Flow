import { Box, Container } from "@mui/material";
import AppBanner from "../../AppBanner/AppBanner";
import ManagerSideBar from "../../SideBar/ManagerSideBar";
import TemplateProcedureBanner from "./TemplateProcedureBanner";
import { useEffect, useState } from "react";
import pathwayService, { Pathway } from "../../../services/pathway-service";
import templatePathwayService from "../../../services/template-pathway-service";
import { useParams } from "react-router-dom";
import TemplateProcedureList from "./TemplateProcedureList";
import AddTemplateProcedureModal from "./AddTemplateProcedureModal";
import TemplateProcedureButtons from "./TemplateProcedureButtons";
import procedureService, {
  Procedure,
} from "../../../services/procedure-service";
import EditTemplateProcedureModal from "./EditTemplateProcedureModal";

import UserProvider from "../UserContext";

function TemplateProcedureScreen() {
  const [templatePathway, setTemplatePathway] = useState<Pathway>(
    {} as Pathway
  );
  const [showAddTemplateProcedureModal, setShowAddTemplateProcedureModal] =
    useState(false);
  const [showEditTemplateProcedureModal, setShowEditTemplateProcedureModal] =
    useState(false);
  const [templateProcedureToEditId, setTemplateProcedureToEditId] =
    useState("");

  const [allProcedures, setAllProcedures] = useState<Procedure[]>([]);
  const [refetchToggle, setRefetchToggle] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    templatePathwayService
      .getById<Pathway>(id as string)
      .then((res) => setTemplatePathway(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchAllProcedures();
  }, [templatePathway, refetchToggle]);

  const fetchAllProcedures = () => {
    procedureService
      .getAll<Procedure>()
      .then((res) => setAllProcedures(res.data))
      .catch((err) => console.log(err));
  };

  const toggleRefetch = () => {
    setRefetchToggle((prev) => !prev);
  };

  const updateTemplatePathwayWithNewProcedure = (newProcedureId: string) => {
    const updatedProcedures = [...templatePathway.procedures, newProcedureId];
    const updatedTemplatePathway = {
      ...templatePathway,
      procedures: updatedProcedures,
    };
    setTemplatePathway(updatedTemplatePathway);
  };

  const handleDeleteProcedure = (id: string) => {
    procedureService
      .deleteById<Procedure>(id)
      .then(() => {
        const updatedAllProcedures = allProcedures.filter(
          (procedure) => procedure._id !== id
        );
        setAllProcedures(updatedAllProcedures);
        const updatedProceduresList = templatePathway.procedures.filter(
          (procedureId) => procedureId !== id
        );
        const updatedTemplatePathway: Pathway = {
          ...templatePathway,
          procedures: updatedProceduresList,
        };
        pathwayService.updateById<Pathway>(
          templatePathway._id as string,
          updatedTemplatePathway
        );
      })
      .catch((err) => console.log(err));
  };

  const handleEditTemplateProcedure = (procedureId: string) => {
    setTemplateProcedureToEditId(procedureId);
    setShowEditTemplateProcedureModal(true);
  };

  return (
    <Container id="app">
      <UserProvider>
        <AppBanner cred={true} />
        <ManagerSideBar />
        <Box
          component="main"
          sx={{
            mt: "75px",
            ml: { sm: "100px", md: "120px" },
            pl: { sm: "50px", md: "40px" },
            backgroundColor: "#f5f5f5",
            width: "80%",
            height: "90%",
            pr: 9,
            pt: 2,
            pb: 2,
            overflow: "scroll",
          }}
        >
          <TemplateProcedureBanner templatePathway={templatePathway} />
          <TemplateProcedureList
            templatePathway={templatePathway}
            allProcedures={allProcedures}
            handleDeleteProcedure={handleDeleteProcedure}
            handleEditProcedure={handleEditTemplateProcedure}
          />
          <TemplateProcedureButtons
            handleAddProcedure={() => {
              setShowAddTemplateProcedureModal(true);
            }}
          />
          <AddTemplateProcedureModal
            showModal={showAddTemplateProcedureModal}
            handleClose={() => setShowAddTemplateProcedureModal(false)}
            templatePathway={templatePathway}
            updatePathway={updateTemplatePathwayWithNewProcedure}
          />
          <EditTemplateProcedureModal
            modalOpen={showEditTemplateProcedureModal}
            procedureToEditId={templateProcedureToEditId}
            handleClose={() => setShowEditTemplateProcedureModal(false)}
            pathway={templatePathway}
            refetchProcedures={toggleRefetch}
          />
        </Box>
      </UserProvider>
    </Container>
  );
}

export default TemplateProcedureScreen;
