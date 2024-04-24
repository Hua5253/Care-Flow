import apiClient from "./api-client";

export class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    return apiClient.get<T[]>(this.endpoint);
  }

  getById<T>(id: string) {
    return apiClient.get<T>(this.endpoint + "/" + id);
  }

  create<T>(entity: T) {
    return apiClient.post<T>(this.endpoint, entity);
  }

  updateById<T>(id: string, entity: T) {
    return apiClient.put<T>(this.endpoint + "/" + id, entity);
  }

  deleteById<T>(id: string) {
    return apiClient.delete<T>(this.endpoint + "/" + id);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
