import apiClient from "./api-client";
import { HttpService } from "./http-service";

export interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  phone_number: string;
  role: string;
}

class UserService extends HttpService {
  constructor(endpoint: string) {
    super(endpoint);
  }

  getUserByName(name: string) {
    return apiClient.get<User>(this.endpoint + "/" + name);
  }
}

export default new UserService("/users");
