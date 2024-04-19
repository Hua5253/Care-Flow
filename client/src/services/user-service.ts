import create from "./http-service";

export interface User {
  _id?: string;
  name: string;
  username: string;
  password: string;
  email: string;
  phone_number: string;
  role: string;
}

export default create("/users");
