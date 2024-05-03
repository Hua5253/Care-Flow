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
import { useSearchParams } from "react-router-dom";

interface ContactBarProps {
  query: Record<string, string>;
  setQuery: (query: Record<string, string>) => void;
  contacts?: any[];
  current: string;
  setCurrent: (current: string) => void;
}

export default function ContactBar(props: ContactBarProps) {
  const { query, setQuery, contacts = [], current, setCurrent } = props;
  const [_, setSearch] = useSearchParams();

  const handleCurrent = (id: string) => {
    setSearch({ id });
    setCurrent(id);
  };
  return (
    <Paper
      variant="outlined"
      sx={{
        width: "30%",
        flexShrink: 0,
        overflow: "auto",
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
              value={query.name}
              onChange={(e) => setQuery({ name: e.target.value })}
              size="small"
              placeholder="Find or start a conversation"
              fullWidth
            />
          </ListItem>
          {contacts?.map((contact) => (
            <ListItem
              key={contact.id}
              sx={{
                borderBottom: 1,
                cursor: "pointer",
                background: current === contact.id ? "#42a5f5" : "",
              }}
              onClick={() => handleCurrent(contact.id)}
            >
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
