import { Box, Container } from "@mui/material";
import AppBanner from "../AppBanner/AppBanner";
import MessagesContent from "./MessagesContent";
import AdminSideBar from "../SideBar/AdminSideBar";
import { useLocation } from "react-router-dom";
import ManagerSideBar from "../SideBar/ManagerSideBar";
import CaregiverSideBar from "../SideBar/CaregiverSideBar";

export default function MessageTab() {
  const location = useLocation();
  const role = location.pathname.split("/")[2];
  const sideBar = () => {
    if (role === "admin") {
      return <AdminSideBar />;
    } else if (role === "manager") {
      return <ManagerSideBar />;
    } else if (role === "caregiver") {
      return <CaregiverSideBar />;
    } else return null;
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "start",
        overflow: "scroll",
        width: "80vw",
        mt: "10vh",
        ml: "18vw",
        //width: "calc(100vw - 20vw)",
        height: "inherit",
        background: "#f5f5f5",
      }}
    >
      <AppBanner cred={true} />
      {sideBar()}
      <Box component="main">
        <MessagesContent />
      </Box>
    </Container>
  );
}
