import apiClient from "./api-client";

export interface User {
    id: number;
    name: string;
}

class UserService {
    getAllUsers() {
        return apiClient.get<User[]>("/users");
    }
}

export default new UserService;