import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function CaregiverSideBar() {
    const caregiverTabs = [
        { icon: <EventAvailableIcon />, name: "Schedule", path: "/schedule" },
        { icon: <MailIcon />, name: "Message", path: "/Messages/" },
      ];

  const navigate = useNavigate();

  const goTo = (e: string) => {
    navigate(e);
  };

  return (
    <Drawer
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <List>
        {caregiverTabs.map(({ icon, name, path }, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => goTo(path)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
