import Container from "@mui/material/Container";
import PathwayScreen from "./components/pathwaysTab/pathwayScreen";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import AccountsScreen from "./components/AccountsTab/AccountsScreen";

import CaregiverScreen from "./components/CareGivers/CaregiverScreen";

function App() {

  return (
    <Container id="app">
      <CaregiverScreen />
    </Container>
  );
}

export default App;
