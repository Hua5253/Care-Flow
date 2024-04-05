import Container from "@mui/material/Container";
import PathwayScreen from "./components/pathwaysTab/pathwayScreen";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import AccountsScreen from "./components/AccountsTab/AccountsScreen";

function App() {

  return (
    <Container id="app">
      <SplashScreen />
    </Container>
  );
}

export default App;
