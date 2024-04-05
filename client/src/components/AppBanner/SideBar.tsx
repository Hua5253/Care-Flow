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
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
interface Props {
  section: String;
}

export default function SideBar({ section }: Props) {
  const resourceTabs = [
    { icon: <LocalHospitalIcon />, name: "Resource", path: "/..." },
    { icon: <AssignmentIcon />, name: "Pathway", path: "/manager-pathway" },
    { icon: <ListIcon />, name: "Template", path: "/..." },
    { icon: <MailIcon />, name: "Message", path: "/Messages/" },
  ];
  const caregiverTabs = [
    { icon: <EventAvailableIcon />, name: "Schedule", path: "/schedule" },
    { icon: <MailIcon />, name: "Message", path: "/Messages/" },
  ];
  const adminTabs = [
    { icon: <GroupIcon />, name: "Accounts", path: "/accounts" },
    { icon: <MailIcon />, name: "Message", path: "/Messages/" },
  ];
  const navigate = useNavigate();
  // const [access, setAccess] = setState(null);

  // if (role === "admin") {
  //   setAccess(adminTabs);
  // } else if (role === "manager") {
  //   setAccess(resourceTabs);
  // } else if (role === "caregiver") {
  //   setAccess(caregiverTabs);
  // }

  const goTo = (e: string) => {
    navigate(e);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth - 100,
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
        {caregiverTabs.map(({ icon, name, path }, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              selected={section === name ? true : false}
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
