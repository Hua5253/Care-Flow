import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Notifications from "./Notifications";
import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth";
import NotificationService, {
  Notification,
} from "../../services/notification-service";
import { socket } from "../../socket";

interface Prop {
  cred: Boolean;
}

export default function NavBar({ cred }: Prop) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { auth } = useContext<any>(AuthContext);
  const login = cred;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavToLoginScreen = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    await auth.logoutUser();
    navigate("/");
    localStorage.clear();
  };

  const fetchNotifications = async () => {
    const profile = JSON.parse(localStorage.getItem("profile") || "{}");
    const { data = [] } = await NotificationService.getAll<Notification>({
      userId: profile._id,
    });
    setNotifications(data.filter((i) => !i.read_status));
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    async function onNotification(message: {
      receiverId: string;
      content: string;
    }) {
      const profile = JSON.parse(localStorage.getItem("profile") || "{}");
      if (message.receiverId === profile._id && message.content) {
        fetchNotifications();
      }
    }
    socket.on("notification", onNotification);

    return () => {
      socket.off("notification", onNotification);
    };
  }, []);

  return (
    <AppBar
      sx={{
        flexGrow: 1,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      id="navbar"
      position="fixed"
    >
      <Toolbar>
        <Typography
          variant="h5"
          noWrap
          sx={{
            flexGrow: 1,
            textAlign: "left",
            paddingLeft: "2em",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          CareFlow
        </Typography>
        {!login ? (
          <Button color="inherit" onClick={handleNavToLoginScreen}>
            Login
          </Button>
        ) : (
          <>
            <Notifications dataSource={notifications} />
            <Box sx={{ paddingLeft: "2em", paddingRight: "2em" }}>
              <IconButton onClick={handleClick}>
                <Avatar />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
              >
                <MenuItem>Change Password</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
