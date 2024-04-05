import Container from "@mui/material/Container";
import PathwayScreen from "./components/pathwaysTab/pathwayScreen";
import SplashScreen from "./components/SplashTab/SplashScreen";
import AccountsScreen from "./components/AccountsTab/AccountsScreen";

function App() {

  return (
    <Container id="app">
      <AccountsScreen />
    </Container>
  );
}

export default App;
