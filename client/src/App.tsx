import { useEffect, useState } from "react";
import userService, { User } from "./services/user-service";
import PathwayScreen from "./components/PathwayScreen";
import SideBar from "./components/AppBanner/SideBar";
import NavBar from "./components/AppBanner/NavBar";
import Splash from "./components/SplashTab/Splash";
import SplashScreen from "./components/SplashTab/SplashScreen";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Accounts from "./components/AccountsTab/Accounts";
import AppBanner from "./components/AppBanner/AppBanner";
import AccountsScreen from "./components/AccountsTab/AccountsScreen";
import LoginScreen from "./components/LoginTab/LoginScreen";
import ForgetPassword from "./components/ForgetPasswordTab/ForgetPassword";
import ForgetPasswordScreen from "./components/ForgetPasswordTab/ForgetPasswordScreen";

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
    <Container id="app">
      {/* <AppBanner /> */}
      {/* <PathwayScreen /> */}
      {/* <SplashScreen /> */}
      <AccountsScreen />
      {/* <LoginScreen /> */}
      {/* <ForgetPasswordScreen /> */}
    </Container>
  );
}

export default App;
