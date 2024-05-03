import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  TextField,
  Paper,
} from "@mui/material";

interface ContactBarProps {
  query: Record<string, string>;
  setQuery: (query: Record<string, string>) => void;
  contacts?: any[];
  current: string;
  setCurrent: (current: string) => void;
}

export default function ContactBar(props: ContactBarProps) {
  const { query, setQuery, contacts = [], current, setCurrent } = props;
  return (
    <Paper
      variant="outlined"
      sx={{
        width: "fit-content",
        flexShrink: 0,
        overflow: "auto",
        // mr: 5,
        // mb: 1,
        //p: 1,
        pt: 0,
        pr: 1,
        pl: 1,
        height: "80vh",
        border: "0.5px solid #989A9D",
        borderTopRightRadius: "0",
        borderBottomRightRadius: "0",
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="h5" fontWeight="bolder">
                  Messaging
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <TextField
              value={query.name}
              onChange={(e) => setQuery({ name: e.target.value })}
              size="small"
              placeholder="Find a contact..."
              fullWidth
            />
          </ListItem>
          {contacts?.map((contact) => (
            <ListItem
              key={contact.id}
              sx={{
                borderBottom: "0.5px solid #989A9D",
                cursor: "pointer",
                background: current === contact.id ? "#42a5f5" : "",
                "&:hover": {
                  backgroundColor:
                    current === contact.id ? "#42a5f5" : "#f5f5f5",
                },
              }}
              onClick={() => setCurrent(contact.id)}
            >
              <ListItemAvatar>
                <Avatar src={contact.avatar}>
                  {contact.name[0].toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  contact.name.length > 15
                    ? contact.name.substring(0, 15) + "..."
                    : contact.name
                }
                secondary={contact.lastMessage}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
}
