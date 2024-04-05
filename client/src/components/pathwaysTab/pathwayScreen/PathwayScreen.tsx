import Box from "@mui/material/Box";
import PathwayList from "./PathwayList";
import CreatePathwayModal from "../modals/CreatePathwayModal";
import { useState } from "react";

export default function PathwayScreen() {
  const [showAddPathwayModal, setShowAddPathwayModal] = useState(false);

  const handleAddPathwayModalClick = () => {
    setShowAddPathwayModal(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <PathwayList showModal={handleAddPathwayModalClick} /> 
      {showAddPathwayModal && <CreatePathwayModal handleClose={() => setShowAddPathwayModal(false)}/>}
    </Box>
  );
}
