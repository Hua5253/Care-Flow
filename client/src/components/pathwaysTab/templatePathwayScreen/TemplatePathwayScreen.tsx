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
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
      }}
    >
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
        <TemplatePathwayList
          handleAddPathwayClick={() => setShowAddTemplatePathwayModal(true)}
        />
      </Box>
      <TemplatePathwayFormModal
        open={showAddTemplatePathwayModal}
        handleClose={() => setShowAddTemplatePathwayModal(false)}
      />
    </Container>
  );
}

export default TemplatePathwayScreen;
