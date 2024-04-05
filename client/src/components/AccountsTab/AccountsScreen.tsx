import { Box, Container, Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import AppBanner from "../AppBanner/AppBanner";
import Accounts from "./Accounts";
import CreateNewUserModal from "../CareGivers/Modals/CreateNewUserModal";

export default function AccountsScreen() {
  const [createUserModal, setCreateUserModal] = useState(false);
  const toggleCreateNewUserModal = () => {
    setCreateUserModal(true);
  };
  const toggleClose = () => {
    setCreateUserModal(false);
  };
  return (
    <Container id="accountScreen" sx={{ display: "flex" }}>
      <AppBanner cred={true} section={"Accounts"} />
      <Accounts showModal={toggleCreateNewUserModal} />
      {createUserModal && <CreateNewUserModal onclose={toggleClose} />}
    </Container>
  );
}
