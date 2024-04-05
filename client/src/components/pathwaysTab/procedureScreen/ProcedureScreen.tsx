import { Box, Container } from "@mui/material";
import ProcedureBanner from "./ProcedureBanner";
import ProcedureList from "./ProcedureList";
import ProcedureFooterButtons from "./ProcedureFooterButtons";
import AppBanner from "../../AppBanner/AppBanner";

function ProcedureScreen() {
  return (
    <Container sx={{ display: "flex" }}>
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: "10em",
          marginTop: 8,
          width: "100%",
          overflowX: "auto",
          minWidth: 0,
        }}
      >
        <AppBanner cred={true} section={"Pathway"} />
        <ProcedureBanner />
        <ProcedureList />
        <ProcedureFooterButtons />
      </Box>
    </Container>
  );
}

export default ProcedureScreen;
