import { useEffect, useState } from "react";
import userService, { User } from "./services/user-service";
import PathwayScreen from "./components/PathwayScreen";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import Splash from "./components/Splash";
import SplashScreen from "./components/SplashScreen";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Accounts from "./components/Accounts";
import AppBanner from "./components/AppBanner";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    userService
      .getAll<User>()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container id="app" sx={{ display: "flex" }}>
      <AppBanner />
      <PathwayScreen />
      {/* <SplashScreen /> */}
    </Container>
  );
}

export default App;
