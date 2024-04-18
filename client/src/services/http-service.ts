import apiClient from "./api-client";

class HttpService {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    return apiClient.get<T[]>(this.endpoint);
  }

  create<T>(entity: T) {
    return apiClient.post<T>(this.endpoint, entity);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
