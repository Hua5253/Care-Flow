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
  Divider,
  Fade,
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

const UpcomingProcedureNotificationStyle = {
  wordWrap: "break-word",
  backgroundColor: "#e0e0e0",
  //border: "0.5px solid grey",
  borderBottom: "1px solid #f9f9f9",
  boxShadow: 1,
  mb: 1,
  mt: 1,
  width: "100%",
  borderRadius: "10px", // rounded corners
  "&:last-child": { mb: 0 }, // remove bottom margin for the last item
  "&:hover": {
    backgroundColor: "#B8BEC1", // change background color on hover
  },
};

const MessageNotificationStyle = {
  backgroundColor: "#9DB4C0",
  mb: 1, // margin bottom for spacing
  borderRadius: "10px", // rounded corners
  borderBottom: "1px solid #f9f9f9",
  boxShadow: 1,
  width: "100%",
  mt: 1,
  "&:hover": {
    backgroundColor: "#7D9BA6", // change background color on hover
  },
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
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        color="#f3f6f4"
        TransitionComponent={Fade}
        sx={{
          mt: 1.5,
          "& .MuiPopover-paper": {
            width: "20vw", // Adjust width to your requirement
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
              left: "50%",
              width: 20,
              height: 20,
              bgcolor: "background.paper",
              transform: "translateX(-50%) translateY(-50%) rotate(45deg)",
              zIndex: 0,
              overflow: "scroll", // Hide the overflow
            },
          },
        }}
      >
        <Typography sx={{ p: 2, cursor: "default" }} variant="h6">
          Notifications
        </Typography>
        <Divider sx={{ borderColor: "#bcbcbc" }} />
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
                sx={MessageNotificationStyle}
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
                sx={UpcomingProcedureNotificationStyle}
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
              mt: 1,
              p: 2,
            }}
          >
            <Typography variant="caption" component="div" gutterBottom>
              No New Notifications
            </Typography>
          </Box>
        )}
      </Popover>
    </Box>
  );
}
