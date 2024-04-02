import { useEffect, useState } from "react";
import userService, { User } from "./services/user-service";
import PathwayScreen from "./components/PathwayScreen";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import Splash from "./components/Splash";
import SplashScreen from "./components/SplashScreen";
import { Box } from "@mui/material";

function App() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        userService
            .getAll<User>()
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div id="app">
            {/* <div>Hello Care Flow</div> */}
            {/* {users.map((user) => (
                <li key={user.id}>{user.name}</li>
            ))} */}
            {/* <PathwayScreen /> */}
            <Box sx={{ display: "flex" }}>
                <NavBar />
                <SideBar />
            </Box>
            {/* <SplashScreen /> */}
        </div>
    );
}

export default App;
