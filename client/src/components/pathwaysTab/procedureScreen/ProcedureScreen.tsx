import { Box, Container } from "@mui/material";
import ProcedureBanner from "./ProcedureBanner";
import ProcedureList from "./ProcedureList";
import InEditFooterButtons from "./InEditFooterButtons";
import AppBanner from "../../AppBanner/AppBanner";
import { useState } from "react";
import FooterButtons from "./FooterButton";
import DeleteProcedureModal from "../modals/DeleteProcedureModal";

function ProcedureScreen() {
  const [inEdit, setInEdit] = useState(true);
  const [showDeleteProcedureModal, setShowDeleteProcedureModal] =
    useState(false);

  return (
    <Container id="app">
      <Box sx={{ flexGrow: 1, mt: 8 }}>
        <AppBanner />
        <ProcedureBanner />
        <ProcedureList />
        {inEdit ? (
          <InEditFooterButtons handleSaveClick={() => setInEdit(false)} />
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
      </Box>
    </Container>
  );
}

export default ProcedureScreen;
