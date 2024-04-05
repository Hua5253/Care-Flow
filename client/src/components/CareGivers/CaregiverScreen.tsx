import CaregiverSchedules from "./CaregiverSchedules";
import { Container } from "@mui/material";
import AppBanner from "../AppBanner/AppBanner";
import CaregiverSideBar from "../SideBar/CaregiverSideBar";


export default function CaregiverScreen() {
  return (
    <Container sx={{ display: "flex" }}>
      <AppBanner cred={true} />
      <CaregiverSideBar />
      <CaregiverSchedules />
    </Container>
  );
}
