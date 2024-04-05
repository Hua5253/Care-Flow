import { Container } from "@mui/material";
import React from "react";
import AppBanner from "../AppBanner/AppBanner";
import MessagesContent from "./MessagesContent";
import ChatBox from "./ChatBox";

export default function MessageTab() {
  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <AppBanner cred={true} section={"Message"} />
      <MessagesContent />
    </Container>
  );
}
