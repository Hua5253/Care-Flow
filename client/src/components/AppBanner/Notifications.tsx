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

const formatTime = (time: string) => {
  if (!time) return "";
  return new Date(time).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatContent = (content?: String) => {
  if (!content) return "";
  const [_posterId, _name, patient, detail, time1, time2, time3] =
    content.split(":");
  return [
    patient,
    `${detail.substring(0, 15)}...`,
    formatTime(`${time1}:${time2}:${time3}`),
  ]
    .filter((i) => i)
    .join(",");
};

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

  const handleNotificationClick = async ({
    id,
    type,
  }: {
    id: string;
    type: String;
  }) => {
    const profile = JSON.parse(localStorage.getItem("profile") || "{}");
    const { data } = await notificationService.updateByPath("status/read", {
      posterId: id,
    });
    if (data) {
      if (type === "message") {
        navigate(`/messages/${profile.role}?id=${id}`);
      } else {
        navigate(`/schedule`);
      }
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
                  handleNotificationClick({
                    id: i?.content?.split(":")?.[0],
                    type: i.type,
                  })
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
                onClick={() =>
                  handleNotificationClick({
                    id: i?.content?.split(":")?.[0],
                    type: i.type,
                  })
                }
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
                  primary={i?.content?.split(":")?.[1] || "-"}
                  secondary={formatContent(i?.content)}
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
