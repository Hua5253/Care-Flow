import { Box, Container } from "@mui/material";
import ProcedureBanner from "./ProcedureBanner";
import ProcedureList from "./ProcedureList";
import AppBanner from "../../AppBanner/AppBanner";
import { useState } from "react";
import DeleteProcedureModal from "../modals/DeleteProcedureModal";
import EditProcedureModal from "../modals/EditProcedureModal";
import ManagerSideBar from "../../SideBar/ManagerSideBar";
import ProcedureButtons from "./ProcedureButtons";
import DeletePathwayModal from "../modals/DeletePathwayModal";

function ProcedureScreen() {
  const [inEdit, setInEdit] = useState(false);
  const [showDeleteProcedureModal, setShowDeleteProcedureModal] =
    useState(false);
  const [showEditProcedureModal, setShowEditProcedureModal] = useState(false);
  const [showDeletePathwayModal, setShowDeletePathwayModal] = useState(false);

  return (
    <Container id="app">
      <Box sx={{ flexGrow: 1, mt: 8 }}>
        <AppBanner cred={true} />
        <ManagerSideBar />
        <ProcedureBanner />
        <ProcedureList
          inEdit={inEdit}
          handleDeleteProcedure={() => setShowDeleteProcedureModal(true)}
        />
        <ProcedureButtons
          inEdit={inEdit}
          handleEditClick={() => setInEdit(true)}
          handleSaveClick={() => setInEdit(false)}
          handleAddProcedure={() => setShowEditProcedureModal(true)}
          handleDeletePathway={() => setShowDeletePathwayModal(true)}
        />
        {showDeleteProcedureModal && (
          <DeleteProcedureModal
            handleConfirm={() => setShowDeleteProcedureModal(false)}
            handleCancel={() => setShowDeleteProcedureModal(false)}
          />
        )}
        {showEditProcedureModal && (
          <EditProcedureModal
            handleClose={() => setShowEditProcedureModal(false)}
          />
        )}
        {showDeletePathwayModal && (
          <DeletePathwayModal
            handleConfirm={() => setShowDeletePathwayModal(false)}
            handleCancel={() => setShowDeletePathwayModal(false)}
          />
        )}
      </Box>
    </Container>
  );
}

export default ProcedureScreen;
