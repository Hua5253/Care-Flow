import { Container } from "@mui/material";
import AppBanner from "../AppBanner/AppBanner";
import Resources from "./Resources";

export default function Screen() {
  return (
    <Container id="resourceScreen" sx={{ display: "flex" }}>
      <AppBanner />
      <Resources />
    </Container>
  );
}
