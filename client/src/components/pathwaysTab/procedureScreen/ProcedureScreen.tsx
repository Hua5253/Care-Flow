import { Box, Container } from "@mui/material";
import ProcedureBanner from "./ProcedureBanner";
import ProcedureList from "./ProcedureList";
import InEditFooterButtons from "./InEditFooterButtons";
import AppBanner from "../../AppBanner/AppBanner";
import { useState } from "react";
import FooterButtons from "./FooterButton";
import DeleteProcedureModal from "../modals/DeleteProcedureModal";
import EditProcedureModal from "../modals/EditProcedureModal";

function ProcedureScreen() {
  const [inEdit, setInEdit] = useState(true);
  const [showDeleteProcedureModal, setShowDeleteProcedureModal] =
    useState(false);
  const [showEditProcedureModal, setShowEditProcedureModal] = useState(false);

  return (
    <Container id="app">
      <Box sx={{ flexGrow: 1, mt: 8 }}>
        <AppBanner />
        <ProcedureBanner />
        <ProcedureList />
        {inEdit ? (
          <InEditFooterButtons
            handleSaveClick={() => setInEdit(false)}
            handleAddProcedure={() => setShowEditProcedureModal(true)}
          />
        ) : (
          <FooterButtons
            handleEditClick={() => setInEdit(true)}
            handleDelete={() => setShowDeleteProcedureModal(true)}
          />
        )}
        {showDeleteProcedureModal && (
          <DeleteProcedureModal
            handleConfirm={() => setShowDeleteProcedureModal(false)}
            handleCancel={() => setShowDeleteProcedureModal(false)}
          />
        )}
        {showEditProcedureModal && <EditProcedureModal />}
      </Box>
    </Container>
  );
}

export default ProcedureScreen;
