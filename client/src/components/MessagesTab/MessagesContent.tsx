import { Box } from "@mui/material";
import ContactBar from "./ContactBar";
import ChatBox from "./ChatBox";
import userService, { User } from "../../services/user-service";
import roomService from "../../services/chatroom-service";
import { Message } from "../../services/message-service";
import { useEffect, useRef, useState } from "react";
import { socket } from "../../socket";
import { useSearchParams, useLocation } from "react-router-dom";

export default function MessagesContent() {
  const [isSending, setIsSending] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [_isConnected, setIsConnected] = useState(socket.connected);
  const [contacts, setContacts] = useState<User[]>();
  const [current, setCurrent] = useState<string>("");
  const [query, setQuery] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [search] = useSearchParams();
  const location = useLocation();

  const handleRoomCreate = async () => {
    const profile = JSON.parse(localStorage.getItem("profile") || "{}");
    const { data: roomId } = await roomService.create<
      { users: string[] },
      string
    >({ users: [profile._id, current].sort() });
    socket.emit("create or join", roomId, profile._id);
    setRoomId(roomId);
  };

  const fetchData = async (query: Record<string, any>) => {
    const profile = JSON.parse(localStorage.getItem("profile") || "{}");
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
    const profile = JSON.parse(localStorage.getItem("profile") || "{}");
    if (message && roomId && !isSending) {
      setIsSending(true);
      const { data } = await roomService.updateById<Message>(roomId, {
        poster: profile._id,
        content: message,
      });
      if (data) {
        socket.emit("chat", roomId, profile._id, {
          receiverId: current,
          content: message,
        });
        socket.once("chat", () => {
          setMessage("");
          setIsSending(false);
        });
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
      socket.off("chat", onChat);
    };
  }, []);

  useEffect(() => {
    fetchMessage(roomId);
  }, [roomId]);

  useEffect(() => {
    const currentId = search.get("id");
    if (currentId !== current) {
      setCurrent(currentId as string);
    }
  }, [current, location.search]);

  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "64px",
        width: "100%",
        flexDirection: "row",
        alignItems: "self-start",
        gap: 2,
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
        loading={isSending}
        scrollRef={scrollRef}
        messages={messages}
        current={current}
        message={message}
        setMessage={setMessage}
        onMessageSend={handleMessageSend}
      />
    </Box>
  );
}
