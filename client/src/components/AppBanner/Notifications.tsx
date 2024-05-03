import { useState } from "react";
import {
  Box,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ChatIcon from "@mui/icons-material/Chat";
import notificationService, {
  Notification,
} from "../../services/notification-service";
import { useNavigate } from "react-router-dom";

interface NotificationsProps {
  dataSource: Notification[];
}

export default function Notifications(props: NotificationsProps) {
  const navigate = useNavigate();
  const { dataSource = [] } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleNotificationClick = async (userId: string) => {
    const profile = JSON.parse(localStorage.getItem("profile") || "{}");
    const { data } = await notificationService.updateByPath("status/read", {
      posterId: userId,
    });
    if (data) {
      navigate(`/messages/${profile.role}?id=${userId}`);
    }
  };

  return (
    <Box sx={{ paddingLeft: "1em" }}>
      <IconButton color="inherit" onClick={handleClick}>
        <NotificationsIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPopover-paper": {
            width: "20em",
            backgroundColor: "#5C6B73", // Outer popover background
          },
        }}
      >
        <Typography sx={{ p: 2, color: "white" }}>Notifications</Typography>
        <List sx={{ pt: 0 }}>
          {dataSource.map((i) =>
            i.type === "message" ? (
              <ListItem
                key={i._id}
                onClick={() =>
                  handleNotificationClick(i?.content?.split(":")?.[0])
                }
                sx={{
                  backgroundColor: "#9DB4C0",
                  mb: 1,
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                <ListItemIcon>
                  <ChatIcon color="action" />
                </ListItemIcon>
                <ListItemText
                  primary={i?.name}
                  secondary={i?.content?.split(":")?.[1] || "-"}
                />
              </ListItem>
            ) : (
              <ListItem
                key={i._id}
                sx={{
                  backgroundColor: "#9DB4C0",
                  mb: 1,
                  borderRadius: "10px",
                  cursor: "pointer",
                  "&:last-child": { mb: 0 },
                }}
              >
                <ListItemIcon>
                  <EventNoteIcon color="action" />
                </ListItemIcon>
                <ListItemText
                  primary="Upcoming procedure"
                  secondary="Aug 24 12:30pm, Alice Johnson, MRI"
                />
              </ListItem>
            )
          )}
        </List>
        {dataSource.length === 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="caption" component="div" gutterBottom>
              No Data Here
            </Typography>
          </Box>
        )}
      </Popover>
    </Box>
  );
}
