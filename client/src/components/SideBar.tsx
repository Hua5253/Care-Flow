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

export default function SideBar() {
  // const drawerWidth = 240;
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
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
      style={{ zIndex: 1000 }}
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
