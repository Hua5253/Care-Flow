import { Box, Container, Grid, Paper } from "@mui/material";
import React from "react";
import AppBanner from "./AppBanner";
import Accounts from "./Accounts";

export default function AccountsScreen() {
  return (
    <Container id="accountScreen" sx={{ display: "flex" }}>
      <AppBanner />
      <Accounts />
    </Container>
  );
}
