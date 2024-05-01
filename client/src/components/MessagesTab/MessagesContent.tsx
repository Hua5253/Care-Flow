import { Box, Container } from "@mui/material";
import ContactBar from "./ContactBar";
import ChatBox from "./ChatBox";
import userService, { User } from "../../services/user-service";
import roomService from "../../services/chatroom-service";
import messageService, { Message } from "../../services/message-service";
import { useEffect, useRef, useState } from "react";
import { socket } from "../../socket";

const profile = JSON.parse(localStorage.getItem("profile") || "{}");

let isSending = false;

export default function MessagesContent() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [_isConnected, setIsConnected] = useState(socket.connected);
  const [contacts, setContacts] = useState<User[]>();
  const [current, setCurrent] = useState<string>("");
  const [query, setQuery] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);

  const handleRoomCreate = async () => {
    const { data: roomId } = await roomService.create<
      { users: string[] },
      string
    >({ users: [profile._id, current].sort() });
    socket.emit("create or join", roomId, profile._id);
    setRoomId(roomId);
  };

  const fetchData = async (query: Record<string, any>) => {
    const { data = [] } = await userService.getAll<User>(query);
    setContacts(data.filter((i) => i._id !== profile._id));
  };

  const fetchMessage = async (newRoomId: string) => {
    if (newRoomId) {
      const { data = [] } = await roomService.getById<any>(newRoomId);
      setMessages(data);
    }
  };

  const handleMessageSend = async () => {
    if (message && roomId && !isSending) {
      isSending = true;
      const { data: messageId } = await messageService.create<Message>({
        poster: profile._id,
        content: message,
      });
      if (messageId) {
        const { data } = await roomService.updateById<
          { message: string },
          string
        >(roomId, { message: messageId });
        if (data) {
          socket.emit("chat", roomId, profile._id, message);
          setMessage("");
          isSending = false;
        }
      }
    }
  };

  useEffect(() => {
    fetchData(query);
  }, [JSON.stringify(query)]);

  useEffect(() => {
    if (current) {
      handleRoomCreate();
    }
  }, [current]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    async function onChat(roomId: string) {
      fetchMessage(roomId);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("chat", onChat);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onChat);
    };
  }, []);

  useEffect(() => {
    fetchMessage(roomId);
  }, [roomId]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        flexShrink: 3,
        //width: "100vw",
        //mt: 5,
        pt: 3,
        pr: 1,
        pb: 3,
        pl: 0,
        height: "fit-content",
      }}
    >
      <ContactBar
        contacts={contacts}
        current={current}
        setCurrent={setCurrent}
        query={query}
        setQuery={setQuery}
      />

      <ChatBox
        scrollRef={scrollRef}
        messages={messages}
        current={current}
        message={message}
        setMessage={setMessage}
        onMessageSend={handleMessageSend}
      />
    </Container>
  );
}
