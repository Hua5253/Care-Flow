import {
  Avatar,
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import Message from "./Message";
interface Message {
  message: String;
  date: String;
  self: Boolean;
}

const msglist: Message[] = [
  {
    message: "Morning John. I have a question about my assignment",
    date: "Today 11:52",
    self: true,
  },
  {
    message: "Yes, how can I help you?",
    date: "Today 11:53",
    self: false,
  },
  {
    message: "Is this answer suppose to be 2/3?",
    date: "Today 11:58",
    self: true,
  },
];
export default function ChatBox() {
  return (
    <Box sx={{ width: "100%", mt: 2, overflow: "auto" }}>
      <Toolbar />
      <Paper
        elevation={3}
        sx={{
          overflowY: "scroll",
          p: 2,
          height: "75vh",
          mb: 2,
        }}
        variant="elevation"
      >
        {/* Chat Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box display="flex" alignItems="center">
            <Avatar sx={{ mr: 3 }} />
            <Typography variant="h5">John Doe</Typography>
          </Box>
        </Box>
        <Divider />

        {/* Messages */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
            overflow: "auto",
          }}
        >
          {msglist.map((item, index) => {
            return (
              <Message key={index}
                message={item.message}
                date={item.date}
                self={item.self}
              />
            );
          })}
        </Box>
      </Paper>

      {/* Input Field */}
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 1,
          px: 2,
          py: 1,
          border: "2px solid black",
          borderColor: "divider",
          borderRadius: 1,
          height: 25,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Type your message"
          inputProps={{ "aria-label": "type your message" }}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="send">
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
