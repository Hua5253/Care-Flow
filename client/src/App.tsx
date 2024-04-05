import Container from "@mui/material/Container";
import PathwayScreen from "./components/pathwaysTab/pathwayScreen";
import ResourcesScreen from "./components/ResourcesTab/Screen";

function App() {

  return (
    <Container id="app">
      {/* <PathwayScreen /> */}
      <ResourcesScreen />
    </Container>
  );
}

export default App;
