import create from "./http-service";

export interface Notification {
  _id: string;
  name: string;
  read_status: Boolean;
  type: String;
  content: String;
}

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
  notifications?: Notification[]
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

export default create("/users/notification");
