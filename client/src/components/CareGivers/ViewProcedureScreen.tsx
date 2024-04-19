import { Container } from "@mui/material";
import AppBanner from "../AppBanner/AppBanner";
import ViewProcedure from "./ViewProcedure";
import CaregiverSideBar from "../SideBar/CaregiverSideBar";

export default function ViewProcedureScreen() {
  return (
    <Container sx={{ display: "flex" }}>
      <AppBanner cred={true} />
      <CaregiverSideBar />
      <ViewProcedure />
    </Container>
  );
}
