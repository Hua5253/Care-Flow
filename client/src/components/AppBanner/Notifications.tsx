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
  Fade,
  Divider,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ChatIcon from "@mui/icons-material/Chat";

export default function Notifications() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const UpcomingProcedureNotificationStyle = {
    backgroundColor: "#e0e0e0",
    //border: "0.5px solid grey",
    borderBottom: "1px solid #f9f9f9",
    boxShadow: 1,
    mb: 1,
    mt: 1,
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
    mt: 1,
    "&:hover": {
      backgroundColor: "#7D9BA6", // change background color on hover
    },
  };

  const notifications = [
    {
      action: "Upcoming procedure",
      title: "Upcoming procedure",
      details: "Aug 24 12:30pm, Alice Johnson, MRI",
    },
    {
      action: "Message",
      title: "John Doe",
      details: "Yes of course. Are there problems...",
    },
  ];

  return (
    <Box sx={{ paddingLeft: "1em" }}>
      <IconButton color="inherit" onClick={handleClick} size="large">
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
        // sx={{
        //   "& .MuiPopover-paper": {
        //     width: "fit-content",
        //     backgroundColor: "#5C6B73", // Outer popover background
        //     p: 1,
        //     borderRadius: 1, // rounded corners
        //     marginX: 1,
        //   },
        // }}
        color="#f3f6f4"
        TransitionComponent={Fade}
        sx={{
          mt: 1.5,
          "& .MuiPopover-paper": {
            width: "fit-contene", // Adjust width to your requirement
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
              right: "42%",
              width: 20,
              height: 20,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
              overflow: "scroll", // Hide the overflow
            },
          },
        }}
      >
        <Typography sx={{ p: 1, cursor: "default" }} variant="h6">
          Notifications
        </Typography>
        <Divider sx={{ borderColor: "#bcbcbc" }} />
        <List sx={{ pt: 0 }}>
          <ListItem button sx={UpcomingProcedureNotificationStyle}>
            <ListItemIcon>
              <EventNoteIcon color="action" />
            </ListItemIcon>
            <ListItemText
              primary="Upcoming procedure"
              secondary="Aug 24 12:30pm, Alice Johnson, MRI"
            />
          </ListItem>
          <ListItem button sx={MessageNotificationStyle}>
            <ListItemIcon>
              <ChatIcon color="action" />
            </ListItemIcon>
            <ListItemText
              primary="John Doe"
              secondary="Yes of course. Are there problems..."
            />
          </ListItem>
        </List>
      </Popover>
    </Box>
  );
}
