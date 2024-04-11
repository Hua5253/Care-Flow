import { Container } from "@mui/material";
import AppBanner from "../AppBanner/AppBanner";
import Resources from "./Resources";
import ManagerSideBar from "../SideBar/ManagerSideBar";

export default function ResourceScreen() {
  return (
    <Container id="resourceScreen" sx={{ display: "flex" }}>
      <ManagerSideBar />
      <AppBanner cred={true} />
      <Resources />
    </Container>
  );
}
