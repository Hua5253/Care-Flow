import { Box, Container } from "@mui/material";
import Splash from "./Splash";
import NavBar from "./NavBar";

export default function SplashScreen() {
  return (
    <Container
      id="splashScreen"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10%",
      }}
    >
      <NavBar />
      <Splash />
    </Container>
  );
}
