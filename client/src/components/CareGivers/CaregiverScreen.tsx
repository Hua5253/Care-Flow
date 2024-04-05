import CaregiverSchedules from "./CaregiverSchedules";
import { Container } from "@mui/material";
import AppBanner from "../AppBanner/AppBanner";
import ViewProcedure from "./ViewProcedure";


export default function CaregiverScreen() {
  return (
    <Container sx={{ display: "flex" }}>
      <AppBanner cred={true} section={"Schedule"} />
      <CaregiverSchedules />
    </Container>
  );
}
