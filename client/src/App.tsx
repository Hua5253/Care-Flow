import Container from "@mui/material/Container";
import MessageTab from "./components/MessagesTab/MessageTab";
import AppBanner from "./components/AppBanner/AppBanner";

function App() {
  return (
    <Container id="app">
      <MessageTab />
    </Container>
  );
}

export default App;
