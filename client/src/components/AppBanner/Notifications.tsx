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
    <Box
      sx={{
        //paddingLeft: "1em",
        display: "flex",
        alignItem: "center",
        justifyContent: "center",
      }}
    >
      <IconButton
        color="inherit"
        onClick={handleClick}
        size="large"
        aria-describedby={id}
      >
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
            width: "fit-content", // Adjust width to your requirement
            backgroundColor: "#ffffff",
            p: 2,
            borderRadius: 1, // Slightly rounded corners,
            boxShadow: 10,
            overflow: "visible", // Hide the overflow
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              width: 20,
              height: 20,
              left: "50%", // Aligns the arrow center with the center of the popover
              bgcolor: "background.paper",
              transform: "translateX(-50%) translateY(-50%) rotate(45deg)",
              zIndex: 0,

              overflow: "scroll", // Hide the overflow
            },
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
