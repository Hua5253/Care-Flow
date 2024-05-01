import { Box, Container } from "@mui/material";
import AppBanner from "../AppBanner/AppBanner";
import Resources from "./Resources";
import ManagerSideBar from "../SideBar/ManagerSideBar";

export default function ResourceScreen() {
  return (
    <Container
      id="resourceScreen"
      // sx={{ display: "flex", width: "100vw", height: "100vh", p: 3 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "start",
        overflow: "scroll",
        width: "100vw",
        //width: "calc(100vw - 20vw)",
        height: "100vh",
      }}
    >
      <ManagerSideBar />
      <AppBanner cred={true} />
      <Box
        component="main"
        sx={{
          mt: "75px",
          ml: { sm: "100px", md: "120px" },
          pl: { sm: "50px", md: "40px" },
          backgroundColor: "#f5f5f5",
          width: "80%",
          height: "90%",
          pr: 9,
          pt: 2,
          pb: 2,
          overflow: "scroll",
        }}
      >
        <Resources />
      </Box>
    </Container>
  );
}
