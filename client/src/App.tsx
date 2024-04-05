import Container from "@mui/material/Container";
import AppBanner from "./components/AppBanner";
import PathwayScreen from "./components/pathwaysTab/pathwayScreen";
import ProcedureScreen from "./components/pathwaysTab/procedureScreen";

function App() {

  return (
    <Container id="app" sx={{ display: "flex" }}>
      <AppBanner />
      {/* <PathwayScreen /> */}
      <ProcedureScreen />
    </Container>
  );
}

export default App;
