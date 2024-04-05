import { Container } from "@mui/material";
import AppBanner from "../AppBanner/AppBanner";
import Resources from "./Resources";

export default function ResourceScreen() {
  return (
    <Container id="resourceScreen" sx={{ display: "flex" }}>
      <AppBanner cred={true} section={"Resource"} />
      <Resources />
    </Container>
  );
}
