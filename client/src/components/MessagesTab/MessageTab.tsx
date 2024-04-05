import { Container } from "@mui/material";
import AppBanner from "../AppBanner/AppBanner";
import MessagesContent from "./MessagesContent";
import AdminSideBar from "../SideBar/AdminSideBar";

export default function MessageTab() {
  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <AppBanner cred={true} />
      <AdminSideBar />
      <MessagesContent />
    </Container>
  );
}
