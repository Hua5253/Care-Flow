import { Container } from "@mui/material";
import Splash from "./Splash";
import NavBar from "../AppBanner/NavBar";

export default function SplashScreen() {
  return (
    <Container
      id="splashScreen"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: { xs: "center", s: "flex-start", md: "flex-start" },
        alignItems: "center",
        //marginTop: "10%",
        pt: { xs: 2, sm: 12, md: 10, lg: 18 },
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <NavBar cred={false} />
      <Splash />
    </Container>
  );
}
