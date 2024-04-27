import { Container } from "@mui/material";
import NavBar from "../AppBanner/NavBar";
import ForgetPassword from "./ForgetPassword";

export default function ForgetPasswordScreen() {
  return (
    <Container
      id="forgetPasswordScreen"
      sx={{
        display: "flex",
        height: { xs: "100vh", sm: "100vh", md: "100%" },
        //height: "100%",
        flexDirection: "column",
        justifyContent: { xs: "center", s: "space-evenly", md: "flex-start" },
        alignItems: "center",
        marginTop: { xs: "10%", s: "0" },
        paddingY: { s: 0, md: 10 },
      }}
    >
      <NavBar cred={false} />
      <ForgetPassword />
    </Container>
  );
}
