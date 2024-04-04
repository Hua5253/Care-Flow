import Container from "@mui/material/Container";
import AppBanner from "./components/AppBanner";
import PathwayScreen from "./components/pathwayscreen";

function App() {

  return (
    <Container id="app" sx={{ display: "flex" }}>
      <AppBanner />
      <PathwayScreen />
    </Container>
  );
}

export default App;
