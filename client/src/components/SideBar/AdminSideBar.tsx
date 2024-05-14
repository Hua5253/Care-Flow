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
        className="myDrawer"
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: { xs: 100, sm: 100, md: 100, lg: 240, xl: 240 },
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {adminTabs.map(({ icon, name, path }, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                data-testid={name}
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
                <ListItemText
                  sx={{
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "none",
                      lg: "block",
                      xl: "block",
                    },
                  }}
                  primary={name}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
