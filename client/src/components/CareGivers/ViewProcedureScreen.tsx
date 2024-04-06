import { Container } from "@mui/material";
import AppBanner from "../AppBanner/AppBanner";
import ViewProcedure from "./ViewProcedure";

export default function ViewProcedureScreen() {
  return (
    <Container sx={{ display: "flex" }}>
      <AppBanner cred={true} />
      <ViewProcedure />
    </Container>
  );
}
