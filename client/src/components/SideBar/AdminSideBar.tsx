import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import GroupIcon from "@mui/icons-material/Group";
import { Box, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function AdminSideBar() {
  const adminTabs = [
    { icon: <GroupIcon />, name: "Accounts", path: "/accounts" },
    { icon: <MailIcon />, name: "Message", path: "/Messages/admin" },
  ];
  const navigate = useNavigate();

  const goTo = (e: string) => {
    navigate(e);
  };

  return (
    <Box>
      <Drawer
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          display: {
            xs: "none",
            s: "none",
            md: "none",
            lg: "block",
            xl: "block",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {adminTabs.map(({ icon, name, path }, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => goTo(path)}>
                <ListItemIcon
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: "2rem" },
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Drawer
        open={true}
        sx={{
          flexShrink: 0,
          // "& .MuiDrawer-paper": {
          //   width: drawerWidth,
          //   boxSizing: "border-box",
          // },
          display: { lg: "none", xl: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "100px",
          },
        }}
        variant="persistent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {adminTabs.map(({ icon, name, path }, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => goTo(path)}
                sx={{ justifyContent: "center", pl: "auto" }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "auto",
                    "& .MuiSvgIcon-root": { fontSize: "2rem" },
                  }}
                  id={name}
                >
                  {icon}
                </ListItemIcon>
                {/* <ListItemText primary={name} /> */}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
