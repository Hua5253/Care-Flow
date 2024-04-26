import create from "./http-service";

export interface Message {
  id?: string;
  poster: string;
  content: string;
  time?: Date;
}

export default create("/users/message");
