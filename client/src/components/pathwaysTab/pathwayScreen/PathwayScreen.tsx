import Box from "@mui/material/Box";
import PathwayList from "./PathwayList";
import CreatePathwayModal from "../modals/CreatePathwayModal";
import { useState } from "react";
import AppBanner from "../../AppBanner/AppBanner";
import { Container } from "@mui/material";

export default function PathwayScreen() {
  const [showAddPathwayModal, setShowAddPathwayModal] = useState(false);

  const handleAddPathwayModalClick = () => {
    setShowAddPathwayModal(true);
  };

  return (
    <Container id="app">
      <Box sx={{ flexGrow: 1 }}>
        <AppBanner />
        <PathwayList showModal={handleAddPathwayModalClick} />
        {showAddPathwayModal && <CreatePathwayModal handleClose={() => setShowAddPathwayModal(false)}/>}
      </Box>
    </Container>
  );
}
