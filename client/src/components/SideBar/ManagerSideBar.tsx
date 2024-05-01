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
import { Box, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function ManagerSideBar() {
  const managerTabs = [
    { icon: <LocalHospitalIcon />, name: "Resource", path: "/resources" },
    { icon: <AssignmentIcon />, name: "Pathway", path: "/manager-pathway" },
    { icon: <ListIcon />, name: "Template", path: "/manager-template" },
    { icon: <MailIcon />, name: "Message", path: "/Messages/manager" },
  ];

  const navigate = useNavigate();

  const goTo = (e: string) => {
    navigate(e);
  };
  console.log(location.pathname);

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
          {managerTabs.map(({ icon, name, path }, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => goTo(path)}
                sx={{
                  backgroundColor:
                    location.pathname === path ||
                    location.pathname.includes(path)
                      ? "#cfe8fc"
                      : "inherit", // Highlight if active
                  "&:hover": {
                    backgroundColor:
                      location.pathname === path ||
                      location.pathname.includes(path)
                        ? "#cfe8fc"
                        : "#f4f4f4", // Different hover color if not active
                  },
                  borderRight:
                    location.pathname === path ||
                    location.pathname.includes(path)
                      ? "5px solid #2196f3"
                      : "none", // Highlight if active
                }}
              >
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
          {managerTabs.map(({ icon, name, path }, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => goTo(path)}
                sx={{
                  justifyContent: "center",
                  pl: "auto",
                  backgroundColor:
                    location.pathname === path ||
                    location.pathname.includes(path)
                      ? "#cfe8fc"
                      : "inherit", // Highlight if active
                  "&:hover": {
                    backgroundColor:
                      location.pathname === path ||
                      location.pathname.includes(path)
                        ? "#cfe8fc"
                        : "#f4f4f4", // Different hover color if not active
                  },
                  borderRight:
                    location.pathname === path ||
                    location.pathname.includes(path)
                      ? "5px solid #2196f3"
                      : "none", // Highlight if active
                }}
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
