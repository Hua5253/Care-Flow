import create from "./http-service";

export interface User {
  id?: string;
  _id?: string;
  name: string;
  username: string;
  password: string;
  email: string;
  phone_number: string;
  role: string;
  chat_rooms?: Chatroom;
  Notifications?: [
    {
      read_status: Boolean;
      type: String;
      content: String;
    }
  ];
}

interface Chatroom {
  history: Message[];
  users: User[];
}

interface Message {
  poster: User;
  content: string;
  time: Date;
}

export default create("/users/chatroom");
