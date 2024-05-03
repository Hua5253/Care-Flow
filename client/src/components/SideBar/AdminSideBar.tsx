import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import GroupIcon from "@mui/icons-material/Group";
import { Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const adminTabs = [
  { icon: <GroupIcon />, name: "Accounts", path: "/accounts" },
  { icon: <MailIcon />, name: "Message", path: "/Messages/admin" },
];

export default function AdminSideBar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isBetweenXsAndMd = useMediaQuery(theme.breakpoints.between("xs", "xl"));

  const drawerWidth = isBetweenXsAndMd ? 0 : 240;

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
        {adminTabs.map(({ icon, name, path }, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => goTo(path)}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
