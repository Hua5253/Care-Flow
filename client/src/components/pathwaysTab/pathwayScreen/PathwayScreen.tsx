import Box from "@mui/material/Box";
import PathwayList from "./PathwayList";
import CreatePathwayModal from "../modals/CreatePathwayModal";
import { useState } from "react";
import AppBanner from "../../AppBanner/AppBanner";
import { Container } from "@mui/material";
import ManagerSideBar from "../../SideBar/ManagerSideBar";
import BlankPathwayFormModal from "../modals/BlankPathwayFormModal";

export default function PathwayScreen() {
  const [showAddPathwayModal, setShowAddPathwayModal] = useState(false);
  const [showBlankPathwayFormModal, setShowBlankPathwayFormModal] =
    useState(false);

  const handleAddPathwayModalClick = () => {
    setShowAddPathwayModal(true);
  };

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
        <PathwayList showModal={handleAddPathwayModalClick} />
      </Box>
      {showAddPathwayModal && (
        <CreatePathwayModal
          handleClose={() => setShowAddPathwayModal(false)}
          createBlankPathway={() => setShowBlankPathwayFormModal(true)}
        />
      )}
      <BlankPathwayFormModal
        open={showBlankPathwayFormModal}
        handleClose={() => setShowBlankPathwayFormModal(false)}
      />
    </Container>
  );
}
