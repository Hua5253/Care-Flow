import apiClient from "./api-client";
interface Entity {
  username: string;
  password: string;
}

class AuthHttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  //login
  login<T extends Entity>({ username, password }: T) {
    return apiClient.post(`${this.endpoint}/login`, { username, password });
  }

  //logout
  logout() {
    return apiClient.post(`${this.endpoint}/logout`);
  }
}
const create = (endpoint: string) => new AuthHttpService(endpoint);

export default create("/auth");
