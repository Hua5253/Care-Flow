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
        <AppBanner cred={true} section={"Pathway"} />
        <PathwayList showModal={handleAddPathwayModalClick} />
        {showAddPathwayModal && (
          <CreatePathwayModal
            handleClose={() => setShowAddPathwayModal(false)}
          />
        )}
      </Box>
    </Container>
  );
}
