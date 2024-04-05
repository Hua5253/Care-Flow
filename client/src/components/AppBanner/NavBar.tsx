import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Notifications from "./Notifications";
import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
interface Prop {
  cred: Boolean;
}
export default function NavBar({ cred }: Prop) {
  const login = cred;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const handleNavToLoginScreen = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    navigate("/");
  };
  return (
    <AppBar
      sx={{
        flexGrow: 1,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      id="navbar"
      position="fixed"
      // style={{
      //   zIndex: 1100,
      // }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          noWrap
          sx={{ flexGrow: 1, textAlign: "left", paddingLeft: "2em" }}
        >
          CareFlow
        </Typography>
        {!login ? (
          <Button color="inherit" onClick={handleNavToLoginScreen}>
            Login
          </Button>
        ) : (
          <>
            <Notifications />
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
