import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Notifications from "./Notifications";
import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";

export default function NavBar() {
  const login = false;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      sx={{ flexGrow: 1 }}
      id="navbar"
      position="absolute"
      style={{ zIndex: 1100 }}
    >
      <Toolbar>
        <Typography variant="h5" noWrap sx={{ flexGrow: 1, textAlign: "left" }}>
          CareFlow
        </Typography>
        {!login ? (
          <Button color="inherit">Login</Button>
        ) : (
          <>
            <Notifications />
            <Box sx={{ paddingLeft: "1em" }}>
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
                <MenuItem>Logout</MenuItem>
              </Menu>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
