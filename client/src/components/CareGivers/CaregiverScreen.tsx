import CaregiverSchedules from "./CaregiverSchedules"
import { Box } from "@mui/material";

import ConfirmationModal from "./Modals/ConfirmationModal"
import ViewProcedure from "./ViewProcedure"

import CreateNewUserModal from "./Modals/CreateNewUserModal"
import ResetPasswordModal from "./Modals/ResetPasswordModal";


export default function CaregiverScreen() {
  return (
    <Box sx={{ display: "flex" }}>
      {/* <ConfirmationModal /> */}
       {/* <EditProcedureModal /> */}
      {/* <ViewProcedure/> */}
      {/* <CaregiverSchedules/> */}
      {/* <CreateNewUserModal/> */}
      <ResetPasswordModal/>
    </Box>
  );
}
