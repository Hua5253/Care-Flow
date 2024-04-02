import { useEffect, useState } from "react";
import userService, { User } from "./services/user-service";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    userService.getAll<User>().then((res) => {
      setUsers(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  return <>
    <div>Hello Care Flow</div>
    {users.map(user => <li key={user.id}>{user.name}</li>)}
  </>
}

export default App
