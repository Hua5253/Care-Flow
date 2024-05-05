import { Alert, Box, Container } from "@mui/material";
import Login from "./Login";
import NavBar from "../AppBanner/NavBar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LoginScreen() {
  const location = useLocation();
  const [openAlert, setOpenAlert] = useState(false);

  // Check if we navigated back from the password reset page
  useEffect(() => {
    if (location.state?.resetRequested) {
      setOpenAlert(true);
      // Clear the state so it doesn't show the alert if the user navigates away and comes back
      location.state.resetRequested = false;
    }
  }, [location]);

  const closeAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Container
      id="loginScreen"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: { xs: "center", md: "flex-start" },
        alignItems: "center",
        pt: { xs: 2, sm: 8, md: 10, lg: 20 },
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <NavBar cred={false} />
      <Box display="flex" flexDirection="column">
        <Login closeAlert={closeAlert} />
        {openAlert && (
          <Alert
            severity="success"
            sx={{
              width: "inherit",
              mt: 1,
              borderRadius: 2,
              boxShadow: 5,
              border: "solid 1.5px #8bc34a",
            }}
            onClose={() => {
              setOpenAlert(false);
            }}
          >
            Reset Password request is sent to the admin!
          </Alert>
        )}
      </Box>
    </Container>
  );
}
