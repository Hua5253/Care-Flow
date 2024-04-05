import { Box, Container } from "@mui/material";
import ProcedureBanner from "./ProcedureBanner";
import ProcedureList from "./ProcedureList";
import InEditFooterButtons from "./InEditFooterButtons";
import AppBanner from "../../AppBanner/AppBanner";
import { useState } from "react";
import FooterButtons from "./FooterButton";

function ProcedureScreen() {
  const [inEdit, setInEdit] = useState(true);

  return (
    <Container id="app">
      <Box sx={{ flexGrow: 1, mt: 8 }}>
        <AppBanner />
        <ProcedureBanner />
        <ProcedureList />
        {inEdit ? (
          <InEditFooterButtons handleSaveClick={() => setInEdit(false)} />
        ) : (
          <FooterButtons handleEditClick={() => setInEdit(true)} />
        )}
      </Box>
    </Container>
  );
}

export default ProcedureScreen;
