import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Notifications from "./Notifications";
import { Avatar, Box, Fade, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
interface Prop {
  cred: Boolean;
}

import AuthContext from "../../auth";
export default function NavBar({ cred }: Prop) {
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
  const navigate = useNavigate();
  const handleNavToLoginScreen = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    auth.logoutUser();
    navigate("/");
  };
  if (auth.user) {
    console.log(auth.user?.name, auth.user?.role);
  } else {
    console.log("no auth");
  }
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
              cursor: "default",
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
            <Notifications />
            <Box
              sx={{
                paddingLeft: "2em",
                paddingRight: "2em",
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton onClick={handleClick} sx={{ gap: "8px" }}>
                <Avatar variant="rounded">{auth.user?.name[0]}</Avatar>
                <Typography variant="body1" noWrap sx={{ color: "white" }}>
                  {auth.user?.name}
                </Typography>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                color="#f3f6f4"
                TransitionComponent={Fade}
                sx={{
                  overflow: "visible",
                  mt: 1,
                  "& .MuiPaper-root": {
                    overflow: "visible",
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: "40%",
                      width: 20,
                      height: 20,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
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
