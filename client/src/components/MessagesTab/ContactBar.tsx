import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  TextField,
  Divider,
  Toolbar,
  Paper,
  Container,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { BorderBottom } from "@mui/icons-material";
const drawerWidth = 250;
const contacts = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Yes of course. Are there problems...",
    avatar: "/path-to-avatar.jpg", // Replace with path to avatar image
  },
  // ... more contacts
];

export default function ContactBar() {
  return (
    <Paper
      variant="outlined"
      sx={{
        width: "30%",
        flexShrink: 0,
        overflow: "auto",
        mt: 10,
        ml: 10,
        mr: 5,
        mb: 1,
        padding: 1,
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem>
            <ListItemText
              primary={<Typography variant="h6">Messaging</Typography>}
            />
          </ListItem>
          <ListItem>
            <TextField
              size="small"
              placeholder="Find or start a conversation"
              fullWidth
            />
          </ListItem>
          {contacts.map((contact) => (
            <ListItem button key={contact.id} sx={{ borderBottom: 1 }}>
              <ListItemAvatar>
                <Avatar src={contact.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={contact.name}
                secondary={contact.lastMessage}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
}
