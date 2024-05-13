// src/contexts/UserContext.js
import { createContext } from "react";
import { useState, useEffect } from "react";
import userService from "../../services/user-service";

export const UserContext = createContext([]);

const UserProvider = ({ children }: any) => {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    userService.getAll().then((res) => {
      const caregivers = res.data
        .filter((user: any) => user.role === "caregiver")
        .map((user: any) => user.name);
      setUsers(caregivers);
    });
  }, []);

  return <UserContext.Provider value={users}>{children}</UserContext.Provider>;
};

export default UserProvider;
