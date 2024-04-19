import { Container } from "@mui/material";
import ContactBar from "./ContactBar";
import ChatBox from "./ChatBox";

export default function MessagesContent() {
  return (
    <Container sx={{ display: "flex", width: "100vw" }}>
      <ContactBar />
      <ChatBox />
    </Container>
  );
}
