import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ListIcon from "@mui/icons-material/List";
import GroupIcon from "@mui/icons-material/Group";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Divider, Toolbar } from "@mui/material";

const drawerWidth = 240;

export default function SideBar() {
  const resourceTabs = [
    { icon: <LocalHospitalIcon />, name: "Resource" },
    { icon: <AssignmentIcon />, name: "Pathway" },
    { icon: <ListIcon />, name: "Template" },
    { icon: <MailIcon />, name: "Message" },
  ];
  const caregiverTabs = [
    { icon: <EventAvailableIcon />, name: "Schedule" },
    { icon: <MailIcon />, name: "Message" },
  ];
  const adminTabs = [
    { icon: <GroupIcon />, name: "Accounts" },
    { icon: <MailIcon />, name: "Message" },
  ];

  return (
    <Drawer
      sx={{
        // fixed scroll
        // width: drawerWidth - 100,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
      // style={{ zIndex: 1000, position: "fixed" }}
    >
      <Toolbar />
      <List>
        {adminTabs.map(({ icon, name }, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
