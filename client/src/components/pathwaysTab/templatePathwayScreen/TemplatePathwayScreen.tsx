import { Box, Container } from "@mui/material";
import AppBanner from "../../AppBanner/AppBanner";
import ManagerSideBar from "../../SideBar/ManagerSideBar";
import TemplatePathwayList from "./TemplatePathwayList";
import TemplatePathwayFormModal from "./TemplatePathwayFormModal";
import { useState } from "react";

function TemplatePathwayScreen() {
  const [showAddTemplatePathwayModal, setShowAddTemplatePathwayModal] =
    useState(false);

  return (
    <Container sx={{ display: "flex" }}>
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: "6em",
          marginTop: 8,
          width: "100%",
          overflowX: "auto",
          minWidth: 0,
        }}
      >
        <AppBanner cred={true} />
        <ManagerSideBar />
        <TemplatePathwayList handleAddPathwayClick={() => setShowAddTemplatePathwayModal(true)}/>
        <TemplatePathwayFormModal
          open={showAddTemplatePathwayModal}
          handleClose={() => setShowAddTemplatePathwayModal(false)}
        />
      </Box>
    </Container>
  );
}

export default TemplatePathwayScreen;
