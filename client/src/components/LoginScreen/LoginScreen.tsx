import { Box, Container } from "@mui/material";
import Login from "./Login";
import NavBar from "../AppBanner/NavBar";

export default function LoginScreen() {
  return (
    <Container
      id="loginScreen"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10%",
      }}
    >
      <NavBar />
      <Login />
    </Container>
  );
}
