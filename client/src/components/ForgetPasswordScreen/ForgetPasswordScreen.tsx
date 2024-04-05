import { Box, Container } from "@mui/material";
import NavBar from "../AppBanner/NavBar";
import ForgetPassword from "./ForgetPassword";

export default function ForgetPasswordScreen() {
  return (
    <Container
      id="forgetPasswordScreen"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10%",
      }}
    >
      <NavBar cred={false} />
      <ForgetPassword />
    </Container>
  );
}
