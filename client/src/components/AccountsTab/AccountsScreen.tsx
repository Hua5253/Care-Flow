import { Box, Container } from "@mui/material";
import { useState } from "react";
import AppBanner from "../AppBanner/AppBanner";
import Accounts from "./Accounts";
import CreateNewUserModal from "./Modals/CreateNewUserModal";
import AdminSideBar from "../SideBar/AdminSideBar";

export default function AccountsScreen() {
  const [createUserModal, setCreateUserModal] = useState(false);
  const toggleCreateNewUserModal = () => {
    setCreateUserModal(true);
  };
  const toggleClose = () => {
    setCreateUserModal(false);
  };
  return (
    <Container
      id="accountScreen"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <AppBanner cred={true} />

      <AdminSideBar />
      <Box
        component="main"
        ml={{ xs: "20vw", sm: "20vw", md: "20vw", lg: "12vw", xl: "2vw" }}
        width="75vw"
      >
        <Accounts showModal={toggleCreateNewUserModal} />
      </Box>
      {createUserModal && <CreateNewUserModal onclose={toggleClose} />}
    </Container>
  );
}
