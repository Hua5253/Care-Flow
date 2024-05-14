import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Message from "./Message";
import userService, { User } from "../../services/user-service";
import MailIconTwoTone from "@mui/icons-material/Mail";

interface ChatBoxProps {
  loading: boolean;
  current: string;
  message: string;
  setMessage: (message: string) => void;
  onMessageSend: () => void;
  messages: any[];
  scrollRef: React.RefObject<HTMLDivElement>;
}

function formatTime(timestamp: string) {
  const now = new Date();
  const date = new Date(timestamp);
  const timeDiff = Math.floor(
    (Number(now) - Number(date)) / (1000 * 60 * 60 * 24)
  );

  if (timeDiff === 0) {
    return `Today ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  } else if (timeDiff === 1) {
    return `Yesterday ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  } else {
    return date.toLocaleString([], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}

export default function ChatBox(props: ChatBoxProps) {
  const {
    current,
    message,
    setMessage,
    onMessageSend,
    messages,
    scrollRef,
    loading,
  } = props;
  const [user, setUser] = useState<User>();
  const profile = JSON.parse(localStorage.getItem("profile") || "{}");
  const msglist = messages.map((i) => ({
    ...i,
    self: profile._id === i.poster,
  }));

  const fetchUser = async () => {
    const { data } = await userService.getById<User>(current);
    if (data.id) {
      setUser(data);
    }
  };

  useEffect(() => {
    if (current) {
      fetchUser();
    }
  }, [current]);

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [JSON.stringify(messages)]);

  return (
    <>
      {!current && (
        <Box
          sx={{
            width: "100%",
            height: "80vh",
            background: "#f5f5f5",
            pl: 1.5,
            pr: 1.5,
            //pt: 0,
            //height: "80vh",
            backgroundColor: "#E3E3E4",
            borderTopRightRadius: "5px",
            borderBottomRightRadius: "5px",
            border: "0.5px solid #989A9D",
            borderLeft: "none",
            alignContent: "center",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <MailIconTwoTone sx={{ fontSize: 80, color: "#989A9D" }} />
          <Typography variant="h4" sx={{ ml: 2, color: "#989A9D" }}>
            Messaging...
          </Typography>
          <Typography variant="h6" sx={{ ml: 2, color: "#989A9D" }}>
            Select a user to start messaging
          </Typography>
        </Box>
      )}
      {current && (
        <Box
          sx={{
            width: "100%",
            height: "80vh",
            background: "#f5f5f5",
            pl: 1.5,
            pr: 1.5,
            //pt: 0,
            //height: "80vh",
            backgroundColor: "#E3E3E4",
            borderTopRightRadius: "5px",
            borderBottomRightRadius: "5px",
            border: "0.5px solid #989A9D",
            borderLeft: "none",
            alignContent: "space-around",
            mx: 1,
          }}
        >
          <Paper
            ref={scrollRef}
            elevation={3}
            sx={{
              overflowY: "scroll",
              overflowX: "hidden",
              pl: 0,
              pr: 2,
              pb: 1,
              mb: 2,
              flexShrink: 0,
              height: "85%",
            }}
            variant="elevation"
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                mb: 2,
                position: "sticky",
                p: 1.5,
                background: "white",
                top: 0,
                zIndex: 1,
                borderBottom: "1px solid #f5f5f5",
                width: "120%",
                flexDirection: "column",
                boxShadow: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ mr: 3 }} variant="rounded">
                    {user?.name[0].toUpperCase()}
                  </Avatar>
                  <Typography variant="h6">{user?.name}</Typography>
                </Box>
              </Box>
              <Divider />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 2,
                p: 1,
                pl: 2,
                overflow: "auto",
              }}
            >
              {msglist.map((item) => {
                return (
                  <Message
                    key={item._id}
                    message={item.content}
                    date={formatTime(item.time)}
                    self={item.self}
                  />
                );
              })}
            </Box>
          </Paper>
          <Box
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
              px: 2,
              py: 1,
              // border: "2px solid black",
              // borderColor: "divider",
              borderRadius: 1,
              height: 30,
              background: "white",
              boxShadow: 2,
            }}
            onSubmit={onMessageSend}
          >
            <InputBase
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Type your message"
              inputProps={{ "aria-label": "type your message" }}
            />
            {loading ? (
              <CircularProgress size={20} />
            ) : (
              <IconButton
                sx={{ p: "10px" }}
                aria-label="send"
                onClick={onMessageSend}
              >
                <SendIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
