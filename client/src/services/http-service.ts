import apiClient from "./api-client";

export class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>(query?: Record<string, any>) {
    return apiClient.get<T[]>(this.endpoint, { params: query });
  }

  getById<T>(id: string) {
    return apiClient.get<T>(this.endpoint + "/" + id);
  }

  create<T, R = any>(entity: T) {
    return apiClient.post<T & R>(this.endpoint, entity);
  }

  updateById<T, R = any>(id: string, entity: T) {
    return apiClient.put<T & R>(this.endpoint + "/" + id, entity);
  }

  deleteById<T>(id: string) {
    return apiClient.delete<T>(this.endpoint + "/" + id);
  }

  updateByPath<T, R = any>(path: string, entity: T) {
    return apiClient.put<T & R>(this.endpoint + "/" + path, entity);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
